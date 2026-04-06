import { Suspense } from "react";
import { getProducts, getCollections, getCollectionByHandle } from "@/lib/data";
import type { Product } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Tienda · Comprar té online | Matcha, verde, negro e infusiones",
    description:
      "Comprar té online: matcha japonés, té verde, negro, infusiones y wellness. Envío gratis desde 50€. Catálogo PureTea con pago seguro.",
    path: "/shop",
  });
}

function filterProductsByQuery(products: Product[], q: string): Product[] {
  if (!q || !q.trim()) return products;
  const lower = q.trim().toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      (p.productType && p.productType.toLowerCase().includes(lower)) ||
      (p.description && p.description.toLowerCase().includes(lower)) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(lower)))
  );
}

interface ShopPageProps {
  searchParams: Promise<{ q?: string; collection?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const collectionHandle = params.collection?.trim() || null;

  let products: Product[] = [];
  let collections: { handle: string; title: string }[] = [];
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";

  try {
    const cols = await getCollections();
    collections = cols.map((c) => ({ handle: c.handle, title: c.title }));
  } catch {
    collections = [];
  }

  if (collectionHandle) {
    try {
      const collection = await getCollectionByHandle(collectionHandle, { productsFirst: 100 });
      products = collection?.products ?? [];
      if (q) products = filterProductsByQuery(products, q);
    } catch {
      products = [];
    }
  } else {
    try {
      const result = await getProducts({ first: 100, query: q || undefined });
      products = result.products;
    } catch {
      products = [];
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-8">
        <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
          Tienda
        </h1>
        <p className="mt-2 text-puretea-dark/80">
          Té premium para cada momento. Matcha, tés verdes, negros e infusiones.
        </p>
      </header>

      <Suspense fallback={<div className="mb-10 h-24 rounded-xl bg-puretea-sand/20 animate-pulse" />}>
        <ShopToolbar
          collections={collections}
          currentCollection={collectionHandle}
          currentQuery={q}
        />
      </Suspense>

      {(q || collectionHandle) && products.length > 0 && (
        <p className="text-sm text-puretea-dark/70 mb-6">
          {products.length} {products.length === 1 ? "producto" : "productos"}
          {collectionHandle && " en esta categoría"}
          {q && ` para "${q}"`}
        </p>
      )}

      {products.length === 0 ? (
        <EmptyState
          title={q || collectionHandle ? "No hay resultados" : "No hay datos por el momento"}
          message={
            q || collectionHandle
              ? "Prueba otra búsqueda o quita el filtro de categoría."
              : "Estamos preparando nuevos productos. Vuelve pronto."
          }
        />
      ) : (
        <ProductGrid
          products={products}
          productPageBase="/products"
          shopifyDomain={shopifyDomain}
        />
      )}
    </div>
  );
}