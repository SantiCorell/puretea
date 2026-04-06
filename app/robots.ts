import type { MetadataRoute } from "next";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretea.es"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${BASE_URL}/sitemap.xml`;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout/", "/cart/c/"],
      },
    ],
    sitemap: sitemapUrl,
  };
}
