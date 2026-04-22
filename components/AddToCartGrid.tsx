'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function AddToCartGrid({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addItem, isAddingVariant } = useCart();

  const variantId = product?.variants?.[0]?.id;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variantId) {
      console.error('No variant ID found for:', product?.title);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await addItem({ variantId, quantity, productTitle: product?.title });
    } catch (err) {
      console.error('[AddToCartGrid]', err);
      setError(err instanceof Error ? err.message : 'Error al añadir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-4 py-2 bg-puretea-cream/10">
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setQuantity(Math.max(1, quantity - 1)); }}
          className="text-puretea-dark hover:text-puretea-organic transition-colors px-2 cursor-pointer"
        >
          –
        </button>
        <span className="text-sm font-bold text-puretea-dark tabular-nums">{quantity}</span>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); setQuantity(quantity + 1); }}
          className="text-puretea-dark hover:text-puretea-organic transition-colors px-2 cursor-pointer"
        >
          +
        </button>
      </div>

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {/* Add to Cart Button */}
      <button
        type="button"
        onClick={handleAdd}
        disabled={loading || !variantId || isAddingVariant(variantId)}
        className="w-full bg-puretea-dark text-puretea-cream text-[11px] uppercase tracking-wider font-bold py-3 rounded-full hover:bg-puretea-organic transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Añadiendo...' : 'Añadir al Ritual'}
      </button>
    </div>
  );
}