'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsOpen(false)} 
      />
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-[#fdfcf9] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-puretea-sand flex justify-between items-center">
          <h2 className="font-canela text-2xl text-puretea-dark">Tu Ritual</h2>
          <button onClick={() => setIsOpen(false)} className="text-puretea-dark p-2 hover:scale-110 transition-transform">✕</button>
        </div>

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
            cart.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-puretea-cream rounded-xl relative overflow-hidden border border-puretea-sand flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
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
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-puretea-sand bg-white space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-puretea-dark/60 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-puretea-dark">{totalPrice.toFixed(2)}€</span>
            </div>
            <button 
              className="w-full bg-puretea-dark text-puretea-cream py-4 rounded-full font-bold hover:bg-puretea-organic transition-all shadow-lg active:scale-95"
              onClick={() => {
                // Here we would ideally call the Shopify Checkout API
                alert('Redirigiendo al pago seguro...');
              }}
            >
              Finalizar Pedido
            </button>
            <p className="text-[10px] text-center text-puretea-dark/40 italic">
              Envío gratuito en pedidos superiores a 50€
            </p>
          </div>
        )}
      </div>
    </div>
  );
}