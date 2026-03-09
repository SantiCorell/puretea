import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Placeholder for future creator profile pages.
 * Will show creator info and their tea collections.
 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return buildPageMetadata({
    title: `Creador: ${slug}`,
    description: "Perfil de creador PureTea. Próximamente.",
    path: `/creator/${slug}`,
    noIndex: true,
  });
}

export default async function CreatorPage({ params }: PageProps) {
  const { slug } = await params;
  // When implemented: fetch creator by slug from API
  if (!slug) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Creador: {slug}
      </h1>
      <p className="mt-4 text-puretea-dark/80">
        Esta página estará disponible próximamente con la colección y recomendaciones del creador.
      </p>
    </div>
  );
}
