'use client';

import { useState } from 'react';

export default function AddToCartSection({ variantId, domain }: { variantId: string, domain: string }) {
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const cleanId = variantId.split('/').pop();
  const checkoutUrl = `https://${domain}/cart/${cleanId}:${qty}`;

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Quantity Selector */}
        <div className="flex items-center justify-between border border-puretea-sand rounded-full px-6 py-3 bg-puretea-cream/20 min-w-[140px]">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="text-xl font-medium text-puretea-dark hover:text-puretea-organic transition-colors w-10"
            disabled={isLoading}
          >
            –
          </button>
          <span className="text-base font-bold tabular-nums text-puretea-dark">
            {qty} {qty === 1 ? 'unidad' : 'unidades'}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="text-xl font-medium text-puretea-dark hover:text-puretea-organic transition-colors w-10"
            disabled={isLoading}
          >
            +
          </button>
        </div>

        {/* Buy Button */}
        <a
          href={checkoutUrl}
          onClick={() => setIsLoading(true)}
          className={`flex-1 inline-flex items-center justify-center rounded-full text-puretea-cream px-8 py-4 text-base font-bold transition-all shadow-lg active:scale-95 ${
            isLoading ? 'bg-puretea-organic animate-pulse cursor-wait' : 'bg-puretea-dark hover:bg-puretea-organic'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Procesando...
            </span>
          ) : (
            'Comprar ahora'
          )}
        </a>
      </div>
      
      <p className="text-sm text-puretea-dark/60 flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04 obstructionM12 21.355r7.117-7.117a9.945 9.945 0 000-14.054L12 21.355z" />
        </svg>
        Pago seguro y envío gestionado por Shopify
      </p>
    </div>
  );
}