/**
 * Mock collections (categories). Handles match Shopify collection handles
 * used in routes: matcha, green-tea, black-tea, herbal-tea, wellness-blends.
 * Replace with getShopifyCollectionByHandle when using Shopify.
 */

import type { Collection, Product } from "@/lib/data";
import { getMockProducts } from "./products";

const COLLECTION_HANDLES = [
  "matcha",
  "green-tea",
  "black-tea",
  "herbal-tea",
  "wellness-blends",
] as const;

const COLLECTION_META: Record<
  string,
  { title: string; description: string; image: string }
> = {
  matcha: {
    title: "Matcha",
    description: "Matcha japonés de grado ceremonial y culinario. Origen Uji.",
    image: "/images/categories/placeholder.svg",
  },
  "green-tea": {
    title: "Té Verde",
    description: "Tés verdes japoneses y chinos. Sencha, Gyokuro y más.",
    image: "/images/categories/placeholder.svg",
  },
  "black-tea": {
    title: "Té Negro",
    description: "Tés negros clásicos. Earl Grey, Assam, Ceylon.",
    image: "/images/categories/placeholder.svg",
  },
  "herbal-tea": {
    title: "Infusiones Herbales",
    description: "Infusiones sin cafeína. Manzanilla, lavanda, rooibos.",
    image: "/images/categories/placeholder.svg",
  },
  "wellness-blends": {
    title: "Wellness Blends",
    description: "Mezclas funcionales: focus, energía, relax.",
    image: "/images/categories/placeholder.svg",
  },
};

function productsForCollection(handle: string): Product[] {
  const all = getMockProducts({ first: 50 });
  const tagMap: Record<string, string> = {
    matcha: "matcha",
    "green-tea": "green-tea",
    "black-tea": "black-tea",
    "herbal-tea": "herbal-tea",
    "wellness-blends": "wellness",
  };
  const tag = tagMap[handle];
  if (!tag) return all;
  return all.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tag)));
}

export function getMockCollections(): Collection[] {
  return COLLECTION_HANDLES.map((handle) => {
    const meta = COLLECTION_META[handle];
    const products = productsForCollection(handle);
    return {
      id: `mock-${handle}`,
      handle,
      title: meta.title,
      description: meta.description,
      image: { url: meta.image, altText: meta.title },
      products,
      seo: {
        title: `${meta.title} | PureTea`,
        description: meta.description,
      },
    };
  });
}

export function getMockCollectionByHandle(
  handle: string,
  options?: { productsFirst?: number }
): Collection | null {
  const meta = COLLECTION_META[handle];
  if (!meta) return null;
  const products = productsForCollection(handle);
  const first = options?.productsFirst ?? 24;
  return {
    id: `mock-${handle}`,
    handle,
    title: meta.title,
    description: meta.description,
    image: { url: meta.image, altText: meta.title },
    products: products.slice(0, first),
    seo: { title: `${meta.title} | PureTea`, description: meta.description },
  };
}
