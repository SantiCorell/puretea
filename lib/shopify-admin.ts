/**
 * Shopify Admin REST API – fallback cuando Storefront falla (401, etc.).
 * Usa SHOPIFY_ADMIN_ACCESS_TOKEN (token shpat_, privado). Solo servidor, nunca exponer al cliente.
 */

import type { Product } from "@/lib/data";

const domain =
  process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-01";

interface AdminImage {
  id: number;
  src: string;
  alt: string | null;
}

interface AdminVariant {
  id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  available: boolean;
}

interface AdminProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  variants: AdminVariant[];
  images: AdminImage[];
  tags?: string[];
}

function adminProductToProduct(p: AdminProduct): Product {
  const img0 = p.images?.[0];
  return {
    id: String(p.id),
    handle: p.handle,
    title: p.title,
    description: p.body_html ?? p.title,
    descriptionHtml: p.body_html ?? undefined,
    featuredImage: img0 ? { url: img0.src, altText: img0.alt } : null,
    images: (p.images ?? []).map((img) => ({ url: img.src, altText: img.alt })),
    variants: (p.variants ?? []).map((v) => ({
      id: String(v.id),
      title: v.title,
      availableForSale: v.available,
      price: { amount: v.price, currencyCode: "EUR" },
      compareAtPrice: v.compare_at_price ? { amount: v.compare_at_price, currencyCode: "EUR" } : null,
    })),
    tags: p.tags ?? [],
    productType: p.product_type ?? "",
    vendor: p.vendor ?? "",
    seo: null,
  };
}

export function isAdminApiConfigured(): boolean {
  return Boolean(domain && adminToken);
}

export async function getProductsFromAdmin(options?: { limit?: number }): Promise<Product[]> {
  if (!domain || !adminToken) return [];
  const limit = options?.limit ?? 250;
  const url = `https://${domain}/admin/api/${apiVersion}/products.json?limit=${limit}&status=active`;
  const res = await fetch(url, {
    headers: {
      "X-Shopify-Access-Token": adminToken,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const json = (await res.json()) as { products?: AdminProduct[] };
  const list = Array.isArray(json.products) ? json.products : [];
  return list.map(adminProductToProduct);
}

export async function getProductByHandleFromAdmin(handle: string): Promise<Product | null> {
  const products = await getProductsFromAdmin({ limit: 250 });
  const found = products.find((p) => p.handle === handle);
  return found ?? null;
}
