import { getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Productos",
  description:
    "Té premium PureTea: matcha, té verde, té negro, infusiones y blends de bienestar. Envíos a toda Europa.",
};

export default async function ProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  try {
    const result = await getProducts({ first: 48 });
    products = result.products;
  } catch {
    products = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-12">
        <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
          Productos
        </h1>
        <p className="mt-2 text-puretea-dark/80">
          Té premium para cada momento. Matcha, tés verdes, negros e infusiones.
        </p>
      </header>

      {products.length === 0 ? (
        <EmptyState
          title="No hay datos por el momento"
          message="Estamos preparando nuevos productos. Vuelve pronto."
        />
      ) : (
        <ProductGrid products={products} productPageBase="/products" />
      )}
    </div>
  );
}
