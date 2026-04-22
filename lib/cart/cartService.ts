"use client";

import type { Cart } from "@/lib/shopify/cart";
import {
  clearStoredCartId,
  clearStoredCheckoutUrl,
  readStoredCartId,
  writeStoredCartId,
  writeStoredCheckoutUrl,
} from "@/lib/cart/storage";
import { CART_UPDATED_EVENT } from "@/lib/cart/constants";
import { createClientMutationId } from "@/lib/cart/mutation";

type JsonValue = Record<string, unknown>;
const RETRY_ATTEMPTS = 2;
const MUTATION_HEADER = "x-client-mutation-id";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>, retries = RETRY_ATTEMPTS): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === retries) break;
      await sleep((i + 1) * 120);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Error inesperado del carrito");
}

async function parseApiResponse<T>(res: Response): Promise<T> {
  const raw = (await res.json().catch(() => ({}))) as JsonValue;
  if (!res.ok) {
    throw new Error(
      typeof raw.error === "string" && raw.error.length > 0
        ? raw.error
        : "Error al procesar el carrito"
    );
  }
  return raw as T;
}

async function request<T>(method: "GET" | "POST" | "PATCH" | "DELETE", body?: JsonValue): Promise<T> {
  const clientMutationId = createClientMutationId(method.toLowerCase());

  return withRetry(async () => {
    const cartId = readStoredCartId();
    const res = await fetch("/api/cart", {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(cartId ? { "x-puretea-cart-id": cartId } : {}),
        [MUTATION_HEADER]: clientMutationId,
      },
      body: body ? JSON.stringify({ ...body, clientMutationId }) : undefined,
    });
    return parseApiResponse<T>(res);
  });
}

function syncStorageFromCart(cart: Cart | null): void {
  if (!cart) {
    clearStoredCartId();
    clearStoredCheckoutUrl();
    return;
  }

  writeStoredCartId(cart.id);
  if (cart.checkoutUrl) {
    writeStoredCheckoutUrl(cart.checkoutUrl);
  }
}

function emitCartUpdated(cart: Cart | null): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: { cart } }));
}

export async function getCartSnapshot(): Promise<Cart | null> {
  const data = await request<{ cart: Cart | null }>("GET");
  syncStorageFromCart(data.cart);
  return data.cart;
}

export async function addItemToCart(variantId: string, quantity: number): Promise<Cart> {
  const data = await request<{ cart: Cart }>("POST", { variantId, quantity });
  syncStorageFromCart(data.cart);
  emitCartUpdated(data.cart);
  return data.cart;
}

export async function updateCartItem(lineId: string, quantity: number): Promise<Cart> {
  const data = await request<{ cart: Cart }>("PATCH", {
    action: "update",
    lineId,
    quantity,
  });
  syncStorageFromCart(data.cart);
  emitCartUpdated(data.cart);
  return data.cart;
}

export async function removeCartItem(lineId: string): Promise<Cart> {
  const data = await request<{ cart: Cart }>("PATCH", { action: "remove", lineId });
  syncStorageFromCart(data.cart);
  emitCartUpdated(data.cart);
  return data.cart;
}

export async function clearCartState(): Promise<void> {
  await request<{ ok: boolean }>("DELETE");
  syncStorageFromCart(null);
  emitCartUpdated(null);
}

export function persistCartLocally(cart: Cart | null): void {
  syncStorageFromCart(cart);
  emitCartUpdated(cart);
}
