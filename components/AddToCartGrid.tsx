'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function AddToCartGrid({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const cartContext = useCart();

  // Safety check: Ensure context exists to prevent crashes if used outside provider
  if (!cartContext) return null;
  const { addToCart, setIsOpen } = cartContext;

  const handleAdd = () => {
    // 1. Extract data safely with fallbacks to prevent "undefined" crashes
    const variantId = product?.variants?.[0]?.id;
    const price = product?.variants?.[0]?.price?.amount || "0.00";
    const title = product?.title || "Producto";
    const image = product?.featuredImage?.url || "/placeholder.png";

    if (!variantId) {
      console.error("No variant ID found for product:", product?.title);
      return;
    }

    // 2. Add the item to the global cart
    addToCart({
      id: variantId,
      title: title,
      price: price,
      image: image,
      quantity: quantity
    });

    // 3. AUTO-OPEN: Slide the drawer out
    setIsOpen(true);
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-4 py-2 bg-puretea-cream/10">
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault(); // Prevent accidental navigation
            setQuantity(Math.max(1, quantity - 1));
          }}
          className="text-puretea-dark hover:text-puretea-organic transition-colors px-2 cursor-pointer"
        >
          –
        </button>
        <span className="text-sm font-bold text-puretea-dark tabular-nums">
          {quantity}
        </span>
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setQuantity(quantity + 1);
          }}
          className="text-puretea-dark hover:text-puretea-organic transition-colors px-2 cursor-pointer"
        >
          +
        </button>
      </div>
      
      {/* Action Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault(); // Stop page jumps
          handleAdd();
        }}
        className="w-full bg-puretea-dark text-puretea-cream text-[11px] uppercase tracking-wider font-bold py-3 rounded-full hover:bg-puretea-organic transition-all shadow-sm active:scale-95"
      >
        Añadir al Ritual
      </button>
    </div>
  );
}