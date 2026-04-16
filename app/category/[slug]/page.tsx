import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle, getCollections } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getCategorySeo } from "@/lib/seo/category-seo";

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
  const seo = getCategorySeo(slug);
  return buildPageMetadata({
    title: collection.seo?.title ?? `${seo.h1} | PureTea`,
    description:
      collection.seo?.description ??
      `${collection.title}: té e infusiones online en PureTea. Envío gratis desde 50€.`,
    path: `/category/${slug}`,
    image: collection.image?.url,
  });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = await getCollectionByHandle(slug, { productsFirst: 24 });
  if (!collection) notFound();

  const block = getCategorySeo(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <section
        className="mb-10 max-w-3xl rounded-2xl border border-puretea-organic/25 bg-puretea-organic/5 p-5 sm:p-6"
        aria-labelledby="category-aeo-heading"
      >
        <h2 id="category-aeo-heading" className="font-canela text-xl sm:text-2xl text-puretea-dark">
          {block.aeoQuestion}
        </h2>
        <p className="mt-3 text-puretea-dark/90 leading-relaxed">{block.aeoAnswer}</p>
      </section>

      <header className="mb-10 max-w-3xl">
        <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">{block.h1}</h1>
        {collection.description ? (
          <p className="mt-3 text-puretea-dark/80 leading-relaxed">{collection.description}</p>
        ) : null}
      </header>

      <section className="mb-12 max-w-3xl space-y-4 text-puretea-dark/85 leading-relaxed">
        {block.intro.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </section>

      <section className="mb-12 max-w-3xl" aria-label="Artículos relacionados">
        <h2 className="font-canela text-lg text-puretea-dark mb-3">Leer en el blog</h2>
        <ul className="flex flex-wrap gap-4 text-sm">
          {block.blogLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-puretea-organic font-medium underline-offset-2 hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/" className="text-puretea-organic font-medium underline-offset-2 hover:underline">
              Inicio
            </Link>
          </li>
        </ul>
      </section>

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
