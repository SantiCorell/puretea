'use client';

import { useState } from 'react';

export function QuickAdd({ variantId, domain }: { variantId: string; domain: string }) {
  const [qty, setQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract the numeric ID and build the checkout URL
  const cleanId = variantId?.split('/').pop();
  const checkoutUrl = domain && cleanId 
    ? `https://${domain}/cart/${cleanId}:${qty}` 
    : '#';

  const handleCheckout = () => {
    if (checkoutUrl !== '#') {
      setIsLoading(true);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      {/* Unit Selector */}
      <div className="flex items-center justify-between border border-puretea-sand rounded-full px-3 py-1 bg-puretea-cream/30">
        <button 
          type="button"
          disabled={isLoading}
          onClick={(e) => { e.preventDefault(); setQty(Math.max(1, qty - 1)); }}
          className="w-8 h-8 flex items-center justify-center font-bold text-puretea-dark hover:text-puretea-organic transition-colors disabled:opacity-30 cursor-pointer"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <span className="text-xs font-bold tabular-nums text-puretea-dark">
          {qty} {qty === 1 ? 'un.' : 'uns.'}
        </span>
        <button 
          type="button"
          disabled={isLoading}
          onClick={(e) => { e.preventDefault(); setQty(qty + 1); }}
          className="w-8 h-8 flex items-center justify-center font-bold text-puretea-dark hover:text-puretea-organic transition-colors disabled:opacity-30 cursor-pointer"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      {/* Temu-Style Buy Button */}
      <a
        href={checkoutUrl}
        onClick={handleCheckout}
        className={`w-full text-puretea-cream text-[10px] uppercase tracking-widest font-bold py-3 rounded-full transition-all text-center shadow-md active:scale-95 flex items-center justify-center gap-2 ${
          isLoading 
            ? 'bg-puretea-organic cursor-wait animate-pulse' 
            : 'bg-puretea-dark hover:bg-puretea-organic'
        } ${checkoutUrl === '#' ? 'pointer-events-none opacity-50' : ''}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-3 w-3 text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Procesando...</span>
          </div>
        ) : (
          'Comprar ahora'
        )}
      </a>
    </div>
  );
}