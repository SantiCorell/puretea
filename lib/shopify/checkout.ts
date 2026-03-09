/**
 * Checkout is handled by Shopify.
 * Cart can be managed via Storefront API (cartCreate, cartLinesAdd, etc.)
 * or by redirecting to Shopify Checkout URL.
 *
 * When using headless:
 * - Option A: Build cart via Storefront API, then redirect to checkoutUrl from cart.
 * - Option B: Use Shopify's Buy SDK or custom cart + redirect to /checkouts/... or Shopify checkout URL.
 *
 * This module is a placeholder for the chosen approach.
 */

export function getCheckoutUrl(cartId?: string): string {
  // When using Shopify: return cart checkout URL or store checkout URL.
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (storeDomain) {
    return `https://${storeDomain}/checkout`;
  }
  return "#";
}
