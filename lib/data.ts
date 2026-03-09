/**
 * Data layer: single entry point for ecommerce data.
 * Uses MOCK data by default. Switch to Shopify by setting USE_SHOPIFY=true
 * and configuring Storefront API env vars.
 */

import { isShopifyConfigured } from "@/lib/shopify/client";
import type { ShopifyProduct, ShopifyCollection } from "@/lib/shopify/types";

// Re-export types for consumers
export type { ShopifyProduct, ShopifyCollection, ShopifyProductVariant, ShopifyImage } from "@/lib/shopify/types";

// Normalized types used across the app (compatible with both mock and Shopify)
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  featuredImage: { url: string; altText: string | null } | null;
  images: { url: string; altText: string | null }[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
    compareAtPrice?: { amount: string; currencyCode: string } | null;
  }[];
  tags: string[];
  productType: string;
  vendor: string;
  seo?: { title: string; description: string } | null;
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
  products?: Product[];
  seo?: { title: string; description: string } | null;
}

function shopifyProductToProduct(p: ShopifyProduct): Product {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage,
    images: p.images?.edges?.map((e) => e.node) ?? [],
    variants: p.variants?.edges?.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: e.node.availableForSale,
      price: e.node.price,
      compareAtPrice: e.node.compareAtPrice ?? null,
    })) ?? [],
    tags: p.tags ?? [],
    productType: p.productType,
    vendor: p.vendor,
    seo: p.seo ?? null,
  };
}

function shopifyCollectionToCollection(c: ShopifyCollection): Collection {
  return {
    id: c.id,
    handle: c.handle,
    title: c.title,
    description: c.description,
    image: c.image,
    products: c.products?.edges?.map((e) => shopifyProductToProduct(e.node as unknown as ShopifyProduct)) ?? [],
    seo: c.seo ?? null,
  };
}

/** Log Shopify fallback only once per source to avoid console spam. */
const shopifyFallbackLogged = new Set<string>();

function logShopifyFallbackOnce(source: string, err: unknown) {
  if (shopifyFallbackLogged.has(source)) return;
  shopifyFallbackLogged.add(source);
  const msg = err instanceof Error ? err.message : String(err);
  console.warn(`[PureTea] Shopify ${source} fallback a mock: ${msg}`);
}

async function getProductsFromSource(options?: {
  first?: number;
  query?: string;
  after?: string;
}): Promise<{ products: Product[]; pageInfo?: { hasNextPage: boolean; endCursor: string | null } }> {
  const limit = options?.first ?? 48;
  if (isShopifyConfigured()) {
    try {
      const { getShopifyProducts } = await import("@/lib/shopify/products");
      const res = await getShopifyProducts(options);
      return {
        products: res.products.map(shopifyProductToProduct),
        pageInfo: res.pageInfo,
      };
    } catch (error) {
      logShopifyFallbackOnce("productos", error);
      const { isAdminApiConfigured, getProductsFromAdmin } = await import("@/lib/shopify-admin");
      if (isAdminApiConfigured()) {
        try {
          const products = await getProductsFromAdmin({ limit });
          return { products };
        } catch {
          // sigue a mock
        }
      }
    }
  }
  const { getMockProducts } = await import("@/lib/mock/products");
  return { products: getMockProducts(options) };
}

async function getProductByHandleFromSource(handle: string): Promise<Product | null> {
  if (isShopifyConfigured()) {
    try {
      const { getShopifyProductByHandle } = await import("@/lib/shopify/products");
      const p = await getShopifyProductByHandle(handle);
      return p ? shopifyProductToProduct(p) : null;
    } catch (error) {
      logShopifyFallbackOnce("producto", error);
      const { isAdminApiConfigured, getProductByHandleFromAdmin } = await import("@/lib/shopify-admin");
      if (isAdminApiConfigured()) {
        try {
          return await getProductByHandleFromAdmin(handle);
        } catch {
          // sigue a mock
        }
      }
    }
  }
  const { getMockProductByHandle } = await import("@/lib/mock/products");
  return getMockProductByHandle(handle);
}

async function getCollectionsFromSource(): Promise<Collection[]> {
  if (isShopifyConfigured()) {
    try {
      const { getShopifyCollections } = await import("@/lib/shopify/collections");
      const cols = await getShopifyCollections();
      return cols.map(shopifyCollectionToCollection);
    } catch (error) {
      logShopifyFallbackOnce("colecciones", error);
    }
  }
  const { getMockCollections } = await import("@/lib/mock/collections");
  return getMockCollections();
}

async function getCollectionByHandleFromSource(
  handle: string,
  options?: { productsFirst?: number }
): Promise<Collection | null> {
  if (isShopifyConfigured()) {
    try {
      const { getShopifyCollectionByHandle } = await import("@/lib/shopify/collections");
      const c = await getShopifyCollectionByHandle(handle, options);
      return c ? shopifyCollectionToCollection(c) : null;
    } catch (error) {
      logShopifyFallbackOnce("colección", error);
    }
  }
  const { getMockCollectionByHandle } = await import("@/lib/mock/collections");
  return getMockCollectionByHandle(handle, options);
}

/** Get products (paginated). Used by /shop and category pages. */
export async function getProducts(options?: {
  first?: number;
  query?: string;
  after?: string;
}): Promise<{ products: Product[]; pageInfo?: { hasNextPage: boolean; endCursor: string | null } }> {
  return getProductsFromSource(options);
}

/** Get single product by handle. Used by /product/[slug]. */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  return getProductByHandleFromSource(handle);
}

/** Get all collections. Used by /collections. */
export async function getCollections(): Promise<Collection[]> {
  return getCollectionsFromSource();
}

/** Get collection by handle with products. Used by /category/[slug]. */
export async function getCollectionByHandle(
  handle: string,
  options?: { productsFirst?: number }
): Promise<Collection | null> {
  return getCollectionByHandleFromSource(handle, options);
}
