<<<<<<< HEAD
/**
 * Shopify Storefront API (solo esta API, no Admin).
 * Scopes necesarios en la app: unauthenticated_read_product_listings, unauthenticated_write_checkouts, unauthenticated_read_checkouts.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN ?? process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? process.env.SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2024-01";

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Storefront API no configurada. Define SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN (o SHOPIFY_STOREFRONT_TOKEN) en .env"
    );
=======
// We use the NEXT_PUBLIC prefix so the Debug Tool can see these values in the browser
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION || "2024-01";

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error("Storefront API variables missing in .env.local. Please check SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.");
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
<<<<<<< HEAD
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error: ${res.status} ${text}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  }
=======
    // Revalidate 0 ensures you see Shopify changes (like price) instantly in dev mode
    next: { 
      revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 
    },
  });

  const json = await res.json();
  
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join(", "));
  }
  
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
  return json.data as T;
}

export function isShopifyConfigured(): boolean {
  return Boolean(domain && token);
<<<<<<< HEAD
}
=======
}
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
