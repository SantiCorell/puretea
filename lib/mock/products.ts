/**
 * Mock product data. Replace with Shopify Storefront API when going live.
 * Structure mirrors Shopify product shape for easy swap.
 */

import type { Product } from "@/lib/data";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/1",
    handle: "ceremonial-matcha",
    title: "Matcha Ceremonial Grado Premium",
    description:
      "Matcha japonés de grado ceremonial. Cultivado a la sombra en Uji, Japón. Sabor umami, color verde intenso. Ideal para la ceremonia del té.",
    descriptionHtml:
      "<p>Matcha japonés de grado ceremonial. Cultivado a la sombra en Uji, Japón. Sabor umami, color verde intenso. Ideal para la ceremonia del té.</p>",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Matcha Ceremonial Grado Premium",
    },
    images: [
      { url: "/images/products/placeholder.svg", altText: "Matcha Ceremonial" },
      { url: "/images/products/placeholder.svg", altText: "Matcha Ceremonial detalle" },
    ],
    variants: [
      {
        id: "gid://shopify/ProductVariant/1",
        title: "30g",
        availableForSale: true,
        price: { amount: "34.00", currencyCode: "EUR" },
        compareAtPrice: { amount: "39.00", currencyCode: "EUR" },
      },
      {
        id: "gid://shopify/ProductVariant/2",
        title: "60g",
        availableForSale: true,
        price: { amount: "59.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["matcha", "japanese", "ceremonial", "premium"],
    productType: "Matcha",
    vendor: "PureTea",
    seo: {
      title: "Matcha Ceremonial Grado Premium | PureTea",
      description: "Matcha japonés ceremonial de Uji. Sabor umami, color verde intenso.",
    },
  },
  {
    id: "gid://shopify/Product/2",
    handle: "sencha-organic",
    title: "Sencha Orgánico",
    description:
      "Té verde japonés Sencha de cultivo orgánico. Hojas de primera cosecha. Aroma fresco, sabor vegetal suave.",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Sencha Orgánico",
    },
    images: [{ url: "/images/products/placeholder.svg", altText: "Sencha Orgánico" }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/3",
        title: "50g",
        availableForSale: true,
        price: { amount: "18.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["green-tea", "japanese", "organic"],
    productType: "Green Tea",
    vendor: "PureTea",
    seo: {
      title: "Sencha Orgánico | PureTea",
      description: "Té verde Sencha orgánico japonés. Hojas de primera cosecha.",
    },
  },
  {
    id: "gid://shopify/Product/3",
    handle: "earl-grey-premium",
    title: "Earl Grey Premium",
    description:
      "Té negro con bergamota. Mezcla clásica de Ceilán con aceite esencial de bergamota. Intenso y aromático.",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Earl Grey Premium",
    },
    images: [{ url: "/images/products/placeholder.svg", altText: "Earl Grey" }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/4",
        title: "50g",
        availableForSale: true,
        price: { amount: "14.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["black-tea", "earl-grey", "bergamota"],
    productType: "Black Tea",
    vendor: "PureTea",
    seo: {
      title: "Earl Grey Premium | PureTea",
      description: "Té negro Earl Grey con bergamota. Mezcla clásica.",
    },
  },
  {
    id: "gid://shopify/Product/4",
    handle: "chamomile-lavender",
    title: "Manzanilla y Lavanda",
    description:
      "Infusión herbal relajante. Manzanilla y lavanda. Sin cafeína. Ideal para antes de dormir.",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Manzanilla y Lavanda",
    },
    images: [{ url: "/images/products/placeholder.svg", altText: "Manzanilla y Lavanda" }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/5",
        title: "40g",
        availableForSale: true,
        price: { amount: "12.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["herbal-tea", "relax", "caffeine-free"],
    productType: "Herbal Tea",
    vendor: "PureTea",
    seo: {
      title: "Manzanilla y Lavanda | PureTea",
      description: "Infusión herbal relajante con manzanilla y lavanda.",
    },
  },
  {
    id: "gid://shopify/Product/5",
    handle: "focus-blend",
    title: "Focus Blend — Té para la Concentración",
    description:
      "Mezcla de té verde, ginkgo y romero. Diseñada para mejorar la concentración y la claridad mental.",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Focus Blend",
    },
    images: [{ url: "/images/products/placeholder.svg", altText: "Focus Blend" }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/6",
        title: "45g",
        availableForSale: true,
        price: { amount: "22.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["wellness", "focus", "functional", "green-tea"],
    productType: "Wellness Blend",
    vendor: "PureTea",
    seo: {
      title: "Focus Blend — Té para la Concentración | PureTea",
      description: "Mezcla funcional para concentración con té verde, ginkgo y romero.",
    },
  },
  {
    id: "gid://shopify/Product/6",
    handle: "relax-blend",
    title: "Relax Blend — Té para el Relax",
    description:
      "Mezcla de pasiflora, valeriana y manzanilla. Sin cafeína. Para calmar y preparar el descanso.",
    featuredImage: {
      url: "/images/products/placeholder.svg",
      altText: "Relax Blend",
    },
    images: [{ url: "/images/products/placeholder.svg", altText: "Relax Blend" }],
    variants: [
      {
        id: "gid://shopify/ProductVariant/7",
        title: "45g",
        availableForSale: true,
        price: { amount: "20.00", currencyCode: "EUR" },
        compareAtPrice: null,
      },
    ],
    tags: ["wellness", "relax", "herbal-tea", "caffeine-free"],
    productType: "Wellness Blend",
    vendor: "PureTea",
    seo: {
      title: "Relax Blend — Té para el Relax | PureTea",
      description: "Mezcla herbal para relajación con pasiflora, valeriana y manzanilla.",
    },
  },
];

export function getMockProducts(options?: {
  first?: number;
  query?: string;
  after?: string;
}): Product[] {
  let list = [...MOCK_PRODUCTS];
  const first = options?.first ?? 24;
  if (options?.query) {
    const q = options.query.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return list.slice(0, first);
}

export function getMockProductByHandle(handle: string): Product | null {
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
}
