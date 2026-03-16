'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, totalPrice } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const FREE_SHIPPING_THRESHOLD = 50;
  const safeTotalPrice = typeof totalPrice === 'number' ? totalPrice : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - safeTotalPrice);
  const progressPercentage = Math.min(100, (safeTotalPrice / FREE_SHIPPING_THRESHOLD) * 100);



  if (!isOpen) return null;

  /**
   * FIX: Instead of manually building a /cart/variantId:qty URL (which is
   * fragile and causes 404s), we POST each item to /api/cart to create a
   * real Shopify cart, then redirect to the checkoutUrl Shopify returns.
   *
   * This is the same flow CartView.tsx uses — it's the correct approach.
   */
  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (cart.length === 0 || checkoutLoading) return;

    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      let checkoutUrl: string | null = null;

      // Send each cart item to the API route sequentially.
      // The first POST creates the cart; subsequent POSTs add lines to it.
      // The cookie is set server-side by the route, so the cart persists.
      for (const item of cart) {
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            variantId: item.id,   // full GID: "gid://shopify/ProductVariant/..."
            quantity: item.quantity,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error al crear el carrito');
        }

        // The last response will have the fully-populated cart with checkoutUrl
        checkoutUrl = data.cart?.checkoutUrl ?? null;
      }

      if (!checkoutUrl) {
        throw new Error('Shopify no devolvió una URL de pago válida.');
      }

      // Redirect to the real Shopify checkout
      window.location.href = checkoutUrl;

    } catch (err) {
      console.error('[CartDrawer checkout]', err);
      setCheckoutError(
        err instanceof Error
          ? err.message
          : 'No se pudo iniciar el pago. Inténtalo de nuevo.'
      );
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#fdfcf9] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-puretea-sand flex justify-between items-center bg-white">
          <h2 className="font-canela text-2xl text-puretea-dark">Tu Ritual</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-puretea-dark p-2 hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        {cart.length > 0 && (
          <div className="px-6 py-4 bg-puretea-cream/30 border-b border-puretea-sand/50">
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs font-medium text-puretea-dark">
                {remaining > 0
                  ? `Te faltan ${remaining.toFixed(2)}€ para el envío gratis`
                  : "¡Enhorabuena! Tienes envío gratis"}
              </p>
              <span className="text-[10px] text-puretea-organic font-bold">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-puretea-sand rounded-full overflow-hidden border border-puretea-sand/10">
              <div
                className="h-full bg-puretea-organic transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-puretea-dark/40 font-medium italic">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsOpen(false)} 
                className="mt-4 text-puretea-organic underline text-sm"
              >
                Volver a la tienda
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-puretea-cream rounded-xl relative overflow-hidden border border-puretea-sand flex-shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-puretea-dark text-sm">{item.title}</h3>
                      <p className="text-xs text-puretea-dark/60 mt-1">
                        {item.quantity} × {item.price}€
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="p-2 text-red-300 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-puretea-sand bg-white space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-puretea-dark/60 font-medium text-sm">Subtotal</span>
              <span className="text-xl font-bold text-puretea-dark">{safeTotalPrice.toFixed(2)}€</span>
            </div>

            {/* Checkout error message */}
            {checkoutError && (
              <p className="text-xs text-red-500 text-center px-2">{checkoutError}</p>
            )}

            <button
              type="button"
              className="w-full bg-puretea-dark text-puretea-cream py-4 rounded-full font-bold hover:bg-puretea-organic transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Preparando pago...' : 'Finalizar Pedido'}
            </button>

            <p className="text-[10px] text-center text-puretea-dark/40 italic">
              {remaining > 0 
                ? `Faltan ${remaining.toFixed(2)}€ para envío gratuito` 
                : "¡Tienes envío gratuito aplicado!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}