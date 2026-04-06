import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretea.es";

export interface PageMetadataParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path = "",
  image = "/images/hero/og-default.jpg",
  noIndex = false,
}: PageMetadataParams): Metadata {
  const url = `${siteUrl}${path || ""}`;
  const ogImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title: title ?? undefined,
    description: description ?? undefined,
    openGraph: {
      title: title ?? "Comprar té online | PureTea",
      description: description ?? undefined,
      url,
      siteName: "PureTea",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title ?? "PureTea" }],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? "Comprar té online | PureTea",
      description: description ?? undefined,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical: url },
  };
}
