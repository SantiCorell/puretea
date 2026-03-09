import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/data";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Colecciones",
    description: "Explora nuestras categorías: matcha, té verde, té negro, infusiones y wellness blends.",
    path: "/collections",
  });
}

export default async function CollectionsPage() {
  let collections: Awaited<ReturnType<typeof getCollections>> = [];
  try {
    collections = await getCollections();
  } catch {
    collections = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-12">
        <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
          Colecciones
        </h1>
        <p className="mt-2 text-puretea-dark/80">
          Navega por categorías y encuentra tu té ideal.
        </p>
      </header>
      {collections.length === 0 ? (
        <EmptyState
          title="No hay datos por el momento"
          message="Estamos preparando las colecciones. Vuelve pronto."
        />
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.handle}`}
            className="group block rounded-2xl overflow-hidden border border-puretea-sand hover:border-puretea-organic hover:shadow-lg transition-all"
          >
            <div className="aspect-[4/3] relative bg-puretea-sand/30">
              <Image
                src={c.image?.url ?? "/images/categories/placeholder.svg"}
                alt={c.image?.altText ?? c.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="font-canela text-xl font-semibold text-puretea-dark group-hover:text-puretea-organic">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-puretea-dark/80 line-clamp-2">
                {c.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}
