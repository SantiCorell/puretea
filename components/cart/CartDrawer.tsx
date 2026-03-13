'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, totalPrice, addToCart } = useCart();

  const FREE_SHIPPING_THRESHOLD = 50;
  const safeTotalPrice = typeof totalPrice === 'number' ? totalPrice : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - safeTotalPrice);
  const progressPercentage = Math.min(100, (safeTotalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  const recommendedProduct: CartItem = {
    id: '47852134567890',
    title: 'Batidor de Bambú',
    price: '15.00',
    image: '/images/products/placeholder.svg',
    quantity: 1
  };

  if (!isOpen) return null;

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Direct to Shopify — no API call needed, no URL building, cannot fail
    window.location.href = 'https://puretea-5911.myshopify.com/cart';
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-md bg-[#fdfcf9] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-puretea-sand flex justify-between items-center">
          <h2 className="font-canela text-2xl text-puretea-dark">Tu Ritual</h2>
          <button onClick={() => setIsOpen(false)} className="text-puretea-dark p-2 hover:scale-110 transition-transform">✕</button>
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-4 bg-puretea-cream/30 border-b border-puretea-sand/50">
            <div className="flex justify-between items-end mb-2">
              <p className="text-xs font-medium text-puretea-dark">
                {remaining > 0
                  ? `Te faltan ${remaining.toFixed(2)}€ para el envío gratis`
                  : "¡Enhorabuena! Tienes envío gratis"}
              </p>
              <span className="text-[10px] text-puretea-organic font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 w-full bg-puretea-sand rounded-full overflow-hidden border border-puretea-sand/10">
              <div
                className="h-full bg-puretea-organic transition-all duration-700 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-puretea-dark/40 font-medium italic">Tu carrito está vacío</p>
              <button onClick={() => setIsOpen(false)} className="mt-4 text-puretea-organic underline text-sm">
                Volver a la tienda
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-puretea-cream rounded-xl relative overflow-hidden border border-puretea-sand flex-shrink-0">
                      {item.image && <Image src={item.image} alt={item.title} fill className="object-cover" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-puretea-dark text-sm">{item.title}</h3>
                      <p className="text-xs text-puretea-dark/60 mt-1">{item.quantity} × {item.price}€</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-300 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-puretea-sand/40">
                <p className="text-xs font-bold text-puretea-dark uppercase tracking-widest mb-4">Completa tu Ritual</p>
                <div className="bg-white rounded-2xl p-4 border border-puretea-sand flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-puretea-cream rounded-lg relative overflow-hidden flex-shrink-0 border border-puretea-sand/30" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-puretea-dark">{recommendedProduct.title}</p>
                    <p className="text-[10px] text-puretea-organic font-medium">{recommendedProduct.price}€</p>
                  </div>
                  <button onClick={() => addToCart(recommendedProduct)} className="bg-puretea-dark text-puretea-cream text-[10px] px-4 py-2 rounded-full font-bold hover:bg-puretea-organic transition-colors">
                    + Añadir
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-puretea-sand bg-white space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-puretea-dark/60 font-medium text-sm">Subtotal</span>
              <span className="text-xl font-bold text-puretea-dark">{safeTotalPrice.toFixed(2)}€</span>
            </div>
            <button
              type="button"
              className="w-full bg-puretea-dark text-puretea-cream py-4 rounded-full font-bold hover:bg-puretea-organic transition-all shadow-lg active:scale-95"
              onClick={handleCheckout}
            >
              Finalizar Pedido
            </button>
            <p className="text-[10px] text-center text-puretea-dark/40 italic">
              {remaining > 0 ? `Faltan ${remaining.toFixed(2)}€ para envío gratuito` : "¡Tienes envío gratuito aplicado!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}