'use client';

import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { setIsOpen, cart } = useCart();
  
  // Calculate total units (e.g., 2 Matcha + 1 Green Tea = 3)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={() => setIsOpen(true)}
      className="relative p-2 text-puretea-dark hover:text-puretea-organic transition-colors group"
      aria-label="Ver carrito"
    >
      {/* The Shopping Bag Icon - Refined stroke for premium look */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
      </svg>

      {/* The Temu-style Bubble - Better positioning */}
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-puretea-organic text-[10px] font-bold text-white shadow-sm animate-in zoom-in duration-300">
          {totalItems}
        </span>
      )}
    </button>
  );
}