'use client';

import { useState } from 'react';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

interface ProductProps {
  product: {
    title: string;
    variants: { id: string }[];
    priceRange: { minVariantPrice: { amount: string } };
    featuredImage: { url: string };
  };
}

export default function AddToCartSection({ product }: ProductProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between border border-puretea-sand rounded-full px-6 py-3 bg-puretea-cream/20 min-w-[140px]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="text-xl font-medium text-puretea-dark hover:text-puretea-organic transition-colors w-10"
          >
            –
          </button>
          <span className="text-base font-bold tabular-nums text-puretea-dark">
            {qty} {qty === 1 ? 'unidad' : 'unidades'}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="text-xl font-medium text-puretea-dark hover:text-puretea-organic transition-colors w-10"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton
          variantId={product.variants[0].id}
          title={product.title}
          price={product.priceRange.minVariantPrice.amount}
          image={product.featuredImage.url}
          quantity={qty}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-bold transition-all shadow-lg active:scale-95 hover:bg-puretea-organic"
        />
      </div>
      
      <p className="text-sm text-puretea-dark/60 flex items-center gap-2 px-2">
        <svg className="w-4 h-4 text-puretea-organic" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Envío gratuito en pedidos superiores a 50€
      </p>
    </div>
  );
}