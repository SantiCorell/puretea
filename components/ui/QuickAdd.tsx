'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

// Add 'product' to the props so we have the title, price, and image for the cart
export function QuickAdd({ 
  variantId, 
  product 
}: { 
  variantId: string; 
  product: any 
}) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // 1. Add to our local "Ritual" cart
    addToCart({
      id: variantId,
      title: product.title,
      price: product.variants[0].price.amount,
      image: product.featuredImage?.url || "/images/products/placeholder.svg",
      quantity: qty,
    });

    // 2. Visual feedback on the button
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      {/* Unit Selector */}
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-3 py-1 bg-puretea-cream/30">
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); setQty(Math.max(1, qty - 1)); }}
          className="w-8 h-8 flex items-center justify-center font-bold text-puretea-dark hover:text-puretea-organic transition-colors cursor-pointer"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="text-xs font-bold tabular-nums text-puretea-dark">
          {qty} {qty === 1 ? 'un.' : 'uns.'}
        </span>
        <button 
          type="button"
          onClick={(e) => { e.preventDefault(); setQty(qty + 1); }}
          className="w-8 h-8 flex items-center justify-center font-bold text-puretea-dark hover:text-puretea-organic transition-colors cursor-pointer"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      {/* New "Add to Ritual" Button (No Redirect) */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`w-full text-puretea-cream text-[10px] uppercase tracking-widest font-bold py-3 rounded-full transition-all text-center shadow-md active:scale-95 flex items-center justify-center gap-2 ${
          isAdded 
            ? 'bg-puretea-organic' 
            : 'bg-puretea-dark hover:bg-puretea-organic'
        }`}
      >
        {isAdded ? (
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Añadido</span>
          </div>
        ) : (
          'Añadir al Ritual'
        )}
      </button>
    </div>
  );
}