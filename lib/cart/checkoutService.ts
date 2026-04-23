"use client";

import type { Cart } from "@/lib/shopify/cart";
import { CHECKOUT_HOST } from "@/lib/cart/constants";
import { getCartSnapshot } from "@/lib/cart/cartService";
import { readStoredCartId, readStoredCheckoutUrl, writeStoredCheckoutUrl } from "@/lib/cart/storage";
import { createClientMutationId } from "@/lib/cart/mutation";
import { persistCheckoutDebug } from "@/lib/cart/debug-client";
const CHECKOUT_REQUEST_TIMEOUT_MS = 10000;
const CHECKOUT_DEBUG = process.env.NODE_ENV !== "production";

function checkoutLog(scope: string, payload: Record<string, unknown>) {
  if (!CHECKOUT_DEBUG) return;
  persistCheckoutDebug(`[checkoutService][${scope}]`, payload);
  console.info(`[checkoutService][${scope}]`, payload);
}

export interface CheckoutRedirectPlan {
  url: string;
  fallbackUrl?: string;
}

function isLikelyStorefrontLoop(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return host.endsWith("puretea.es");
  } catch {
    return false;
  }
}

function safeAbsoluteUrl(rawUrl: string | null | undefined): string | null {
  if (!rawUrl) return null;
  try {
    return new URL(rawUrl).toString();
  } catch {
    return null;
  }
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

function extractVariantIdFromGid(merchandiseId: string): string | null {
  const match = merchandiseId.match(/ProductVariant\/(\d+)/);
  return match?.[1] ?? null;
}

function buildMyShopifyCheckoutPermalink(cart: Cart | null): string | null {
  if (!cart || !cart.lines.length) return null;
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
  if (!shopDomain) return null;

  const lines = cart.lines
    .map((line) => {
      const numericVariantId = extractVariantIdFromGid(line.merchandiseId);
      if (!numericVariantId) return null;
      return `${numericVariantId}:${line.quantity}`;
    })
    .filter((entry): entry is string => Boolean(entry));

  if (!lines.length) return null;
  return `https://${shopDomain}/cart/${lines.join(",")}`;
}

async function ensureCheckoutByApi(): Promise<Cart> {
  const cartId = readStoredCartId();
  const clientMutationId = createClientMutationId("checkout");
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), CHECKOUT_REQUEST_TIMEOUT_MS);
  checkoutLog("ensure:start", { cartId, clientMutationId });
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
  checkoutLog("ensure:response", {
    status: res.status,
    ok: res.ok,
    hasCart: Boolean(data.cart),
    error: data.error ?? null,
  });
  if (!res.ok || !data.cart) {
    throw new Error(data.error || "No se pudo recuperar el checkout");
  }
  checkoutLog("ensure:success", {
    cartId: data.cart.id,
    lineCount: data.cart.lines.length,
    checkoutUrl: data.cart.checkoutUrl,
    rawCheckoutUrl: data.cart.rawCheckoutUrl,
  });
  return data.cart;
}

export async function resolveCheckoutUrlFromCart(cart: Cart | null): Promise<string> {
  checkoutLog("resolve:start", {
    cartId: cart?.id ?? null,
    lineCount: cart?.lines.length ?? 0,
    checkoutUrl: cart?.checkoutUrl ?? null,
    rawCheckoutUrl: cart?.rawCheckoutUrl ?? null,
  });
  if (cart && cart.lines.length === 0) {
    throw new Error("Tu carrito está vacío. Añade productos antes de continuar al checkout.");
  }

  const immediate = normalizeCheckoutUrl(cart?.checkoutUrl);
  if (immediate) {
    writeStoredCheckoutUrl(immediate);
    checkoutLog("resolve:immediate", { url: immediate });
    return immediate;
  }

  const latest = await getCartSnapshot();
  checkoutLog("resolve:latest-snapshot", {
    cartId: latest?.id ?? null,
    lineCount: latest?.lines.length ?? 0,
    checkoutUrl: latest?.checkoutUrl ?? null,
    rawCheckoutUrl: latest?.rawCheckoutUrl ?? null,
  });
  if (latest && latest.lines.length === 0) {
    throw new Error("Tu carrito está vacío. Añade productos antes de continuar al checkout.");
  }
  const fromLatest = normalizeCheckoutUrl(latest?.checkoutUrl);
  if (fromLatest) {
    writeStoredCheckoutUrl(fromLatest);
    checkoutLog("resolve:latest", { url: fromLatest });
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
    checkoutLog("resolve:ensured", { url: recovered });
    return recovered;
  } catch {
    // Último recurso para UX offline/transitoria.
    const fromStorage = normalizeCheckoutUrl(readStoredCheckoutUrl());
    if (fromStorage) {
      checkoutLog("resolve:storage-fallback", { url: fromStorage });
      return fromStorage;
    }
    checkoutLog("resolve:failed", {});
    throw new Error("No se pudo recuperar el checkout");
  }
}

export async function resolveCheckoutRedirectPlanFromCart(
  cart: Cart | null
): Promise<CheckoutRedirectPlan> {
  const resolvedUrl = await resolveCheckoutUrlFromCart(cart);
  const myShopifyFallback = buildMyShopifyCheckoutPermalink(cart);
  const rawFallback = safeAbsoluteUrl(cart?.rawCheckoutUrl);
  const fallbackUrl =
    [myShopifyFallback, rawFallback].find((candidate) => candidate && candidate !== resolvedUrl) ?? undefined;

  const useMyShopifyAsPrimary =
    Boolean(myShopifyFallback) && isLikelyStorefrontLoop(resolvedUrl);
  const url = useMyShopifyAsPrimary ? (myShopifyFallback as string) : resolvedUrl;
  const effectiveFallback =
    [resolvedUrl, rawFallback]
      .find((candidate) => candidate && candidate !== url) ?? fallbackUrl;

  checkoutLog("redirect-plan", {
    primary: url,
    resolvedUrl,
    useMyShopifyAsPrimary,
    myShopifyFallback,
    rawFallback,
    selectedFallback: effectiveFallback ?? null,
  });

  return { url, fallbackUrl: effectiveFallback };
}

export function getEmergencyCheckoutFallback(cart: Cart | null): string | null {
  return (
    buildMyShopifyCheckoutPermalink(cart) ||
    safeAbsoluteUrl(cart?.rawCheckoutUrl) ||
    normalizeCheckoutUrl(cart?.checkoutUrl)
  );
}
