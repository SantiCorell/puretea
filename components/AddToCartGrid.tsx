'use client';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function AddToCartGrid({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.variants[0].id,
      title: product.title,
      price: product.variants[0].price.amount,
      image: product.featuredImage?.url,
      quantity: quantity
    });
  };

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-4 py-2 bg-white">
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>–</button>
        <span className="text-sm font-bold">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      
      <button
        onClick={handleAdd}
        className="w-full bg-puretea-dark text-white text-xs font-bold py-3 rounded-full hover:bg-puretea-organic transition-all"
      >
        Add to Ritual
      </button>
    </div>
  );
}