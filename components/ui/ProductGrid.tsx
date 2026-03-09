import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  /** Base path for product links, e.g. /products for /products/[handle] */
  productPageBase?: string;
}

export function ProductGrid({ products, columns = 4, productPageBase }: ProductGridProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} productPageBase={productPageBase} />
        </div>
      ))}
    </div>
  );
}
