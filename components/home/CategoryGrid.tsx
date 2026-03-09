import Link from "next/link";
import Image from "next/image";

export interface CategoryItem {
  handle: string;
  title: string;
  description: string;
  image: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="categories-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center mb-12">
          Explora por categoría
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.handle}
              href={`/category/${cat.handle}`}
              className="group block rounded-2xl overflow-hidden bg-puretea-sand/50 border border-puretea-sand hover:border-puretea-organic transition-colors"
            >
              <div className="aspect-square relative bg-puretea-organic/20">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-canela text-lg font-semibold text-puretea-dark group-hover:text-puretea-organic">
                  {cat.title}
                </h3>
                <p className="mt-1 text-sm text-puretea-dark/80 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
