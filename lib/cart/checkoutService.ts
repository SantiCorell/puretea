"use client";

import type { Cart } from "@/lib/shopify/cart";
import { CHECKOUT_HOST } from "@/lib/cart/constants";
import { getCartSnapshot } from "@/lib/cart/cartService";
import { readStoredCartId, readStoredCheckoutUrl, writeStoredCheckoutUrl } from "@/lib/cart/storage";
import { createClientMutationId } from "@/lib/cart/mutation";
const CHECKOUT_REQUEST_TIMEOUT_MS = 10000;

export interface CheckoutRedirectPlan {
  url: string;
  fallbackUrl?: string;
}

function normalizeCheckoutUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    parsed.host = process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN?.trim() || CHECKOUT_HOST;
    return parsed.toString();
  } catch {
    return null;
  }
}

async function ensureCheckoutByApi(): Promise<Cart> {
  const cartId = readStoredCartId();
  const clientMutationId = createClientMutationId("checkout");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CHECKOUT_REQUEST_TIMEOUT_MS);
  const res = await fetch("/api/cart", {
    method: "POST",
    cache: "no-store",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      ...(cartId ? { "x-puretea-cart-id": cartId } : {}),
      "x-client-mutation-id": clientMutationId,
    },
    body: JSON.stringify({ action: "ensure-checkout", clientMutationId }),
  }).finally(() => window.clearTimeout(timeout));

  const data = (await res.json().catch(() => ({}))) as { cart?: Cart; error?: string };
  if (!res.ok || !data.cart) {
    throw new Error(data.error || "No se pudo recuperar el checkout");
  }
  return data.cart;
}

export async function resolveCheckoutUrlFromCart(cart: Cart | null): Promise<string> {
  if (cart && cart.lines.length === 0) {
    throw new Error("Tu carrito está vacío. Añade productos antes de continuar al checkout.");
  }

  const immediate = normalizeCheckoutUrl(cart?.checkoutUrl);
  if (immediate) {
    writeStoredCheckoutUrl(immediate);
    return immediate;
  }

  const latest = await getCartSnapshot();
  if (latest && latest.lines.length === 0) {
    throw new Error("Tu carrito está vacío. Añade productos antes de continuar al checkout.");
  }
  const fromLatest = normalizeCheckoutUrl(latest?.checkoutUrl);
  if (fromLatest) {
    writeStoredCheckoutUrl(fromLatest);
    return fromLatest;
  }

  try {
    const ensured = await ensureCheckoutByApi();
    if (!ensured.lines.length) {
      throw new Error("No se pudo preparar el checkout con productos válidos.");
    }
    const recovered = normalizeCheckoutUrl(ensured.checkoutUrl);
    if (!recovered) throw new Error("No se pudo generar una URL de checkout válida");
    writeStoredCheckoutUrl(recovered);
    return recovered;
  } catch {
    // Último recurso para UX offline/transitoria.
    const fromStorage = normalizeCheckoutUrl(readStoredCheckoutUrl());
    if (fromStorage) return fromStorage;
    throw new Error("No se pudo recuperar el checkout");
  }
}

export async function resolveCheckoutRedirectPlanFromCart(
  cart: Cart | null
): Promise<CheckoutRedirectPlan> {
  const url = await resolveCheckoutUrlFromCart(cart);
  const fallbackUrl = normalizeCheckoutUrl(cart?.rawCheckoutUrl) ?? undefined;
  return { url, fallbackUrl };
}
