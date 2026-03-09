/**
 * Shopify integration: Admin API (REST, server-only) and Storefront API (GraphQL).
 * Admin: getShopifyAccessToken(), getProducts() — use SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, SHOPIFY_STORE_DOMAIN.
 * Storefront: shopifyFetch, getProductsStorefront, getProductByHandle — use SHOPIFY_STOREFRONT_ACCESS_TOKEN.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const clientId = process.env.SHOPIFY_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-01";

const endpoint = domain ? `https://${domain}/api/${apiVersion}/graphql.json` : "";
const adminBase = domain ? `https://${domain}/admin/api/${apiVersion}` : "";
const oauthUrl = domain ? `https://${domain}/admin/oauth/access_token` : "";

// ——— Admin API types (REST response) ———

export interface ShopifyImage {
  id: number;
  product_id: number;
  src: string;
  alt: string | null;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  available: boolean;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  status?: string;
}

/** Normalized product for listing (image, title, price). */
export interface ProductListItem {
  id: number;
  handle: string;
  title: string;
  image: string | null;
  price: string;
  compareAtPrice: string | null;
}

interface OAuthTokenResponse {
  access_token: string;
  scope?: string;
  expires_in?: number;
}

/** Admin API: obtain access token via client_credentials (server-only). */
export async function getShopifyAccessToken(): Promise<string> {
  if (!domain || !clientId || !clientSecret) {
    throw new Error(
      "Shopify Admin API not configured. Set SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET."
    );
  }
  const res = await fetch(oauthUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify OAuth error: ${res.status} ${text}`);
  }
  const data = (await res.json()) as OAuthTokenResponse;
  if (!data.access_token) {
    throw new Error("Shopify OAuth did not return an access token.");
  }
  return data.access_token;
}

/** Admin API: fetch products (GET /admin/api/.../products.json). Server-only. */
export async function getProducts(): Promise<ShopifyProduct[]> {
  const accessToken = await getShopifyAccessToken();
  const url = `${adminBase}/products.json?limit=250`;
  const res = await fetch(url, {
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify Admin API error: ${res.status} ${text}`);
  }
  const json = (await res.json()) as { products?: ShopifyProduct[] };
  if (!Array.isArray(json.products)) {
    return [];
  }
  return json.products;
}

// ——— Storefront API (GraphQL) ———

export interface ShopifyProductNormalized {
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

interface GqlProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: { url: string; altText: string | null } | null;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
      };
    }[];
  };
  tags: string[];
  productType: string;
  vendor: string;
  seo: { title: string; description: string } | null;
}

function normalizeProduct(p: GqlProduct): ShopifyProductNormalized {
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage,
    images: p.images?.edges?.map((e) => ({ url: e.node.url, altText: e.node.altText })) ?? [],
    variants:
      p.variants?.edges?.map((e) => ({
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

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Shopify Storefront API not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error: ${res.status} ${text}`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  if (json.data == null) {
    throw new Error("Shopify API returned no data");
  }
  return json.data as T;
}

const productFields = `
  id handle title description descriptionHtml
  featuredImage { url altText width height }
  images(first: 10) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id title availableForSale
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
      }
    }
  }
  tags productType vendor
  seo { title description }
`;

const productsQuery = `
  query GetProducts($first: Int!, $query: String, $after: String) {
    products(first: $first, query: $query, after: $after) {
      edges { node { ${productFields} } cursor }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const productByHandleQuery = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ${productFields} }
  }
`;

/** Storefront API: products (GraphQL). Use when SHOPIFY_STOREFRONT_ACCESS_TOKEN is set. */
export async function getProductsStorefront(options?: {
  first?: number;
  query?: string;
  after?: string | null;
}): Promise<{
  products: ShopifyProductNormalized[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const first = options?.first ?? 24;
  const query = options?.query ?? null;
  const after = options?.after ?? null;

  const data = await shopifyFetch<{
    products: {
      edges: { node: GqlProduct; cursor: string }[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(productsQuery, { first, query: query || undefined, after });

  return {
    products: data.products.edges.map((e) => normalizeProduct(e.node)),
    pageInfo: data.products.pageInfo,
  };
}

export async function getProductByHandle(handle: string): Promise<ShopifyProductNormalized | null> {
  const data = await shopifyFetch<{ productByHandle: GqlProduct | null }>(productByHandleQuery, {
    handle,
  });
  return data.productByHandle ? normalizeProduct(data.productByHandle) : null;
}

export function isShopifyConfigured(): boolean {
  return Boolean(domain && token);
}
