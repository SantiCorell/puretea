/**
 * Shopify Storefront API – collections.
 * Replace usage in app with these functions when going live.
 */

import type { ShopifyCollection } from "./types";
import { shopifyFetch } from "./client";

const collectionFragment = `
  fragment CollectionFields on Collection {
    id
    handle
    title
    description
    image { url altText width height }
    seo { title description }
  }
`;

const productSummaryFragment = `
  fragment ProductSummary on Product {
    id
    handle
    title
    featuredImage { url altText width height }
    variants(first: 1) {
      edges {
        node {
          id
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

export async function getShopifyCollections(): Promise<ShopifyCollection[]> {
  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollection }[] };
  }>(
    `
    ${collectionFragment}
    query GetCollections {
      collections(first: 50) {
        edges { node { ...CollectionFields } }
      }
    }
  `
  );
  return data.collections.edges.map((e) => e.node);
}

export async function getShopifyCollectionByHandle(
  handle: string,
  options?: { productsFirst?: number }
): Promise<ShopifyCollection | null> {
  const first = options?.productsFirst ?? 24;
  const data = await shopifyFetch<{
    collectionByHandle: (ShopifyCollection & {
      products: { edges: { node: unknown }[] };
    }) | null;
  }>(
    `
    ${collectionFragment}
    ${productSummaryFragment}
    query GetCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        ...CollectionFields
        products(first: $first) { edges { node { ...ProductSummary } } }
      }
    }
  `,
    { handle, first }
  );
  return data.collectionByHandle;
}
