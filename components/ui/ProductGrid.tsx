import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  /** Base path for product links, e.g. /products for /products/[handle] */
  productPageBase?: string;
<<<<<<< HEAD
}

export function ProductGrid({ products, columns = 4, productPageBase }: ProductGridProps) {
=======
  // Add the domain prop here
  shopifyDomain?: string;
}

export function ProductGrid({ 
  products, 
  columns = 4, 
  productPageBase,
  shopifyDomain 
}: ProductGridProps) {
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="list"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
<<<<<<< HEAD
          <ProductCard product={product} productPageBase={productPageBase} />
=======
          <ProductCard 
            product={product} 
            productPageBase={productPageBase} 
            shopifyDomain={shopifyDomain} // Pass it down to the card
          />
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
        </div>
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 0ca79a1 (feat: implement temu-style quick buy and quantity selectors)
