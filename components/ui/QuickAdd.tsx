'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export function QuickAdd({
  variantId,
  product
}: {
  variantId: string;
  product: any;
}) {
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addItem, isAddingVariant } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (loading || isAddingVariant(variantId) || !variantId) return;
    setLoading(true);

    try {
      await addItem({ variantId, quantity: qty, productTitle: product?.title });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (e) {
      console.error('[QuickAdd]', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-3 py-1 bg-puretea-cream/30">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setQty(Math.max(1, qty - 1)); }}
          className="w-8 h-8 flex items-center justify-center font-bold text-puretea-dark hover:text-puretea-organic transition-colors cursor-pointer"
          aria-label="Reducir cantidad"
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
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={loading || isAddingVariant(variantId)}
        className={`w-full text-puretea-cream text-[10px] uppercase tracking-widest font-bold py-3 rounded-full transition-all text-center shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 ${
          isAdded ? 'bg-puretea-organic' : 'bg-puretea-dark hover:bg-puretea-organic'
        }`}
      >
        {loading ? 'Añadiendo...' : isAdded ? (
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Añadido</span>
          </div>
        ) : 'Añadir al Ritual'}
      </button>
    </div>
  );
}