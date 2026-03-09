import { notFound } from "next/navigation";
import { getCollectionByHandle, getCollections } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollectionByHandle(slug);
  if (!collection) return {};
  return buildPageMetadata({
    title: collection.seo?.title ?? collection.title,
    description: collection.seo?.description ?? collection.description,
    path: `/category/${slug}`,
    image: collection.image?.url,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollectionByHandle(slug, { productsFirst: 24 });
  if (!collection) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-12">
        <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
          {collection.title}
        </h1>
        <p className="mt-2 text-puretea-dark/80 max-w-2xl">
          {collection.description}
        </p>
      </header>
      {collection.products && collection.products.length > 0 ? (
        <ProductGrid products={collection.products} />
      ) : (
        <EmptyState
          title="No hay datos por el momento"
          message="Próximamente más productos en esta categoría. Renovaremos stock pronto."
        />
      )}
    </div>
  );
}
