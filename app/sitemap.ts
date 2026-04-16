import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/data";
import { BLOG_POSTS } from "@/lib/mock/blog";
import { getAllSeoLandings } from "@/lib/seo/seo-landings";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretea.es"
).replace(/\/$/, "");

const now = () => new Date();

/** Rutas estáticas indexables (sin paginación ni duplicados de bajo valor). */
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: now(), changeFrequency: "daily", priority: 1 },
  { url: `${BASE_URL}/shop`, lastModified: now(), changeFrequency: "daily", priority: 0.95 },
  { url: `${BASE_URL}/products`, lastModified: now(), changeFrequency: "daily", priority: 0.95 },
  { url: `${BASE_URL}/blog`, lastModified: now(), changeFrequency: "daily", priority: 0.9 },
  { url: `${BASE_URL}/about`, lastModified: now(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/benefits`, lastModified: now(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/contact`, lastModified: now(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/how-to-brew`, lastModified: now(), changeFrequency: "monthly", priority: 0.85 },
  { url: `${BASE_URL}/collections`, lastModified: now(), changeFrequency: "weekly", priority: 0.85 },
  { url: `${BASE_URL}/creators`, lastModified: now(), changeFrequency: "monthly", priority: 0.55 },
  { url: `${BASE_URL}/legal/privacy`, lastModified: now(), changeFrequency: "yearly", priority: 0.35 },
  { url: `${BASE_URL}/legal/terms`, lastModified: now(), changeFrequency: "yearly", priority: 0.35 },
  { url: `${BASE_URL}/legal/returns`, lastModified: now(), changeFrequency: "yearly", priority: 0.45 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPart = STATIC_ROUTES.map((entry) => ({
    ...entry,
    url: entry.url.replace(/\/$/, ""),
  }));

  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const { products } = await getProducts({ first: 250 });
    productUrls = products.map((p) => ({
      url: `${BASE_URL}/products/${p.handle}`,
      lastModified: now(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {
    /* vacío */
  }

  const categorySlugs = [
    "matcha",
    "green-tea",
    "black-tea",
    "herbal-tea",
    "wellness-blends",
  ];
  let categoryUrls: MetadataRoute.Sitemap = [];
  try {
    const collections = await getCollections();
    const handles = new Set(collections.map((c) => c.handle));
    categorySlugs.forEach((slug) => handles.add(slug));
    categoryUrls = [...handles]
      .filter((handle) => handle && handle !== "frontpage")
      .map((handle) => ({
        url: `${BASE_URL}/category/${handle}`,
        lastModified: now(),
        changeFrequency: "weekly" as const,
        priority: 0.88,
      }));
  } catch {
    categoryUrls = categorySlugs.map((handle) => ({
      url: `${BASE_URL}/category/${handle}`,
      lastModified: now(),
      changeFrequency: "weekly" as const,
      priority: 0.88,
    }));
  }

  /** Solo artículos; sin /blog?page= (paginación no indexable en sitemap). */
  const blogUrls: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const seoLandings = getAllSeoLandings();
  const seoUrls: MetadataRoute.Sitemap = seoLandings.map((p) => ({
    url: `${BASE_URL}/${p.slug}`,
    lastModified: now(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const seen = new Set<string>();
  const merged: MetadataRoute.Sitemap = [];
  for (const entry of [
    ...staticPart,
    ...seoUrls,
    ...productUrls,
    ...categoryUrls,
    ...blogUrls,
  ]) {
    const u = entry.url.replace(/\/$/, "");
    if (seen.has(u)) continue;
    seen.add(u);
    merged.push({ ...entry, url: u });
  }
  return merged;
}
