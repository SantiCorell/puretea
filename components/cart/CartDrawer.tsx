'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const {
    isOpen,
    setIsOpen,
    cart,
    isHydrating,
    isMutating,
    isCheckingOut,
    error,
    refreshBadge,
    updateLine,
    removeLine,
    startCheckout,
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 50;
  const total = parseFloat(cart?.cost?.totalAmount?.amount ?? '0');
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const progressPercentage = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);
  const loading = isHydrating || (isMutating && !cart);

  if (!isOpen) return null;

  const lines = cart?.lines ?? [];

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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

        {/* Free Shipping Progress */}
        {lines.length > 0 && (
          <div className="px-6 py-4 bg-puretea-cream/30 border-b border-puretea-sand/50">
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs font-medium text-puretea-dark">
                {remaining > 0
                  ? `Te faltan ${remaining.toFixed(2)}€ para el envío gratis`
                  : '¡Enhorabuena! Tienes envío gratis'}
              </p>
              <span className="text-[10px] text-puretea-organic font-bold">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-puretea-sand rounded-full overflow-hidden">
              <div
                className="h-full bg-puretea-organic transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* Loading skeleton */}
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-24 bg-puretea-sand/20 rounded-2xl" />
              <div className="h-24 bg-puretea-sand/20 rounded-2xl" />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="text-center py-10">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={refreshBadge} className="mt-3 text-puretea-organic underline text-sm">
                Reintentar
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && lines.length === 0 && (
            <div className="text-center py-20">
              <p className="text-puretea-dark/40 font-medium italic">Tu carrito está vacío</p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-puretea-organic underline text-sm"
              >
                Volver a la tienda
              </button>
            </div>
          )}

          {/* Items */}
          {!loading && lines.length > 0 && (
            <div className="space-y-6">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-puretea-cream rounded-xl relative overflow-hidden border border-puretea-sand flex-shrink-0">
                    {line.product?.imageUrl && (
                      <Image
                        src={line.product.imageUrl}
                        alt={line.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-puretea-dark text-sm">{line.product?.title}</h3>
                    <p className="text-xs text-puretea-dark/60 mt-1">
                      {line.quantity} × {line.price.amount}€
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 border border-puretea-sand/50 rounded-full px-2 py-1">
                      <button
                        onClick={() => updateLine(line.id, line.quantity - 1)}
                        className="text-puretea-dark/50 hover:text-puretea-dark font-bold w-5 text-center"
                        disabled={isMutating}
                      >
                        –
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{line.quantity}</span>
                      <button
                        onClick={() => updateLine(line.id, line.quantity + 1)}
                        className="text-puretea-dark/50 hover:text-puretea-dark font-bold w-5 text-center"
                        disabled={isMutating}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeLine(line.id)}
                      className="text-[10px] text-red-300 hover:text-red-500 transition-colors"
                      disabled={isMutating}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && !loading && (
          <div className="p-6 border-t border-puretea-sand bg-white space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-puretea-dark/60 font-medium text-sm">Total</span>
              <span className="text-xl font-bold text-puretea-dark">{total.toFixed(2)}€</span>
            </div>
            <button
              type="button"
              onClick={startCheckout}
              disabled={isCheckingOut || isMutating || lines.length === 0}
              className="w-full bg-puretea-dark text-puretea-cream py-4 rounded-full font-bold hover:bg-puretea-organic transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? 'Redirigiendo...' : 'Finalizar Pedido'}
            </button>
            <p className="text-[10px] text-center text-puretea-dark/40 italic">
              {remaining > 0
                ? `Faltan ${remaining.toFixed(2)}€ para envío gratuito`
                : '¡Tienes envío gratuito aplicado!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}