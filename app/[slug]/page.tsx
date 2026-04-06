import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { seoLandingSchema } from "@/lib/seo/schema";
import { RESERVED_SLUGS, getSeoLanding, getSeoLandingSlugs } from "@/lib/seo/seo-landings";
import { SeoLandingView } from "@/components/seo/SeoLandingView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSeoLandingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};
  const landing = getSeoLanding(slug);
  if (!landing) return {};
  return buildPageMetadata({
    title: landing.title,
    description: landing.description,
    path: `/${slug}`,
    image: "/images/hero/og-default.jpg",
  });
}

export default async function SeoLandingPage({ params }: PageProps) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();
  const landing = getSeoLanding(slug);
  if (!landing) notFound();

  const jsonLd = seoLandingSchema({
    title: landing.title,
    description: landing.description,
    path: `/${slug}`,
    h1: landing.h1,
    faqs: landing.faqs,
  });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SeoLandingView landing={landing} />
    </>
  );
}
