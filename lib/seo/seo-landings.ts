import type { SeoLanding } from "./seo-landing-types";
import { SEO_LANDINGS_DATA } from "./seo-landings-data";

/**
 * Evita que rutas reales de la app caigan en el segmento dinámico `[slug]`.
 * Incluye carpetas de primer nivel con page o con hijo dinámico sin index.
 */
export const RESERVED_SLUGS = new Set([
  "account",
  "api",
  "about",
  "benefits",
  "blog",
  "cart",
  "category",
  "checkout",
  "collections",
  "contact",
  "creator",
  "creators",
  "how-to-brew",
  "legal",
  "product",
  "products",
  "shop",
  "icon",
  "apple-icon",
  "opengraph-image",
  "twitter-image",
  "sitemap",
  "robots",
  "favicon",
]);

const bySlug = new Map<string, SeoLanding>(
  SEO_LANDINGS_DATA.map((p) => [p.slug, p])
);

export function getSeoLandingSlugs(): string[] {
  return SEO_LANDINGS_DATA.map((p) => p.slug);
}

export function getSeoLanding(slug: string): SeoLanding | null {
  return bySlug.get(slug) ?? null;
}

export function getAllSeoLandings(): SeoLanding[] {
  return SEO_LANDINGS_DATA;
}
