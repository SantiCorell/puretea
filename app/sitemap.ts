import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/mock/blog";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretea.es";

/** Rutas estáticas principales para SEO */
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
  { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/benefits`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/how-to-brew`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/collections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPart = STATIC_ROUTES.map((entry) => ({
    ...entry,
    url: entry.url.replace(/\/$/, ""),
  }));

  // Productos: /products/[handle]
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const { products } = await getProducts({ first: 250 });
    productUrls = products.map((p) => ({
      url: `${BASE_URL}/products/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {
    // Si falla Shopify/mock, sitemap sigue con el resto
  }

  // Categorías: /category/[slug]
  let categoryUrls: MetadataRoute.Sitemap = [];
  const categorySlugs = [
    "matcha",
    "green-tea",
    "black-tea",
    "herbal-tea",
    "wellness-blends",
    "frontpage",
  ];
  try {
    const collections = await getCollections();
    const handles = new Set(collections.map((c) => c.handle));
    categorySlugs.forEach((slug) => handles.add(slug));
    categoryUrls = [...handles].map((handle) => ({
      url: `${BASE_URL}/category/${handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  } catch {
    categoryUrls = categorySlugs.map((handle) => ({
      url: `${BASE_URL}/category/${handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    }));
  }

  // Blog: /blog/[slug]
  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPart, ...productUrls, ...categoryUrls, ...blogUrls];
}
