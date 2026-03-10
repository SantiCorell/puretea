import { getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Tienda",
    description: "Compra matcha, té verde, té negro, infusiones y blends de bienestar. Envíos a toda Europa.",
    path: "/shop",
  });
}

export default async function ShopPage() {
  let products: any[] = [];
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "";

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
          Tienda
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
        /* Passing the domain to the grid so it can handle quick-add links */
        <ProductGrid products={products} shopifyDomain={shopifyDomain} />
      )}
    </div>
  );
}