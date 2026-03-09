/**
 * Types aligned with Shopify Storefront API (GraphQL).
 * Use these when switching from mock to real Shopify client.
 * @see https://shopify.dev/docs/api/storefront
 */

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  tags: string[];
  productType: string;
  vendor: string;
  seo?: { title: string; description: string } | null;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: { node: ShopifyProduct }[] };
  seo?: { title: string; description: string } | null;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: { edges: unknown[] };
}
