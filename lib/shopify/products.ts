/**
 * Shopify Storefront API – products.
 * Replace usage in app with these functions when going live.
 */

import type { ShopifyProduct } from "./types";
import { shopifyFetch } from "./client";

const productFragment = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    featuredImage { url altText width height }
    images(first: 10) { edges { node { url altText width height } } }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
    tags
    productType
    vendor
    seo { title description }
  }
`;

export async function getShopifyProducts(options?: {
  first?: number;
  query?: string;
  after?: string;
}): Promise<{ products: ShopifyProduct[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }> {
  const first = options?.first ?? 24;
  const query = options?.query ?? "";
  const after = options?.after ?? null;

  const data = await shopifyFetch<{
    products: {
      edges: { node: ShopifyProduct; cursor: string }[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(
    `
    ${productFragment}
    query GetProducts($first: Int!, $query: String, $after: String) {
      products(first: $first, query: $query, after: $after) {
        edges { node { ...ProductFields } cursor }
        pageInfo { hasNextPage endCursor }
      }
    }
  `,
    { first, query: query || undefined, after }
  );

  return {
    products: data.products.edges.map((e) => e.node),
    pageInfo: data.products.pageInfo,
  };
}

export async function getShopifyProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>(
    `
    ${productFragment}
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) { ...ProductFields }
    }
  `,
    { handle }
  );
  return data.productByHandle;
}
