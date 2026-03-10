import { getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = {
  title: "Productos | PureTea",
  description:
    "Té premium PureTea: matcha, té verde, té negro, infusiones y blends de bienestar. Envíos a toda Europa.",
};

export default async function ProductsPage() {
  // Using a more flexible type for the build process
  let products: any[] = [];
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";

  try {
    const result = await getProducts({ first: 48 });
    products = result?.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
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
          title="No hay productos por el momento"
          message="Estamos preparando nuevos rituales para ti. Vuelve pronto."
        />
      ) : (
        <ProductGrid 
          products={products} 
          productPageBase="/product" 
          shopifyDomain={shopifyDomain}
        />
      )}
    </div>
  );
}