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
        {/* Mobile: carrusel horizontal de categorías */} 
        <div className="flex gap-4 overflow-x-auto sm:hidden -mx-4 px-4 pb-2 snap-x snap-mandatory">
          {categories.map((cat, index) => (
            <Link
              key={cat.handle}
              href={`/category/${cat.handle}`}
              className="group block min-w-[65%] max-w-[70%] rounded-2xl overflow-hidden bg-puretea-sand/60 border border-puretea-sand hover:border-puretea-organic transition-colors snap-start"
            >
              <div className="aspect-[4/5] relative bg-puretea-organic/20">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  priority={index < 2}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="70vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-canela text-base font-semibold text-puretea-dark group-hover:text-puretea-organic line-clamp-1">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs text-puretea-dark/80 line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* Tablet / Desktop: grid clásica */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
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
                  priority={index < 5}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 33vw, 20vw"
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
