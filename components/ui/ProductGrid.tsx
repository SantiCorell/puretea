"use client";

import { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/data";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  /** Base path for product links, e.g. /products for /products/[handle] */
  productPageBase?: string;
  /** Shopify domain for the quick-add functionality */
  shopifyDomain?: string;
}

export function ProductGrid({ 
  products, 
  columns = 4, 
  productPageBase,
  shopifyDomain 
}: ProductGridProps) {
  const mobileRailRef = useRef<HTMLDivElement | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    if (!showSwipeHint) return;
    const timer = window.setTimeout(() => setShowSwipeHint(false), 5000);
    return () => window.clearTimeout(timer);
  }, [showSwipeHint]);
  
  if (!products?.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-puretea-dark/40 font-medium italic">No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile: carrusel horizontal tipo Temu (2x2 tarjetas visibles) */}
      <div className="sm:hidden -mx-4 px-4">
        {showSwipeHint && (
          <div className="mb-3 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-puretea-sand/60 bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-puretea-dark/70 shadow-sm animate-pulse">
              <span className="inline-block animate-bounce">👉</span>
              Desliza a la derecha
            </div>
          </div>
        )}
        <div
          ref={mobileRailRef}
          onScroll={() => setShowSwipeHint(false)}
          className="relative grid grid-rows-2 auto-cols-[48%] grid-flow-col gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          role="list"
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              role="listitem"
              className="snap-start"
            >
              <ProductCard
                product={product}
                productPageBase={productPageBase}
                shopifyDomain={shopifyDomain}
                imagePriority={index < 4}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet / Desktop: grid clásica */}
      <div
        className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
      >
        {products.map((product, index) => (
          <div key={product.id} role="listitem">
            <ProductCard
              product={product}
              productPageBase={productPageBase}
              shopifyDomain={shopifyDomain}
              imagePriority={index < 4}
            />
          </div>
        ))}
      </div>
    </>
  );
}