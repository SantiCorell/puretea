'use client';

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export function CartButton() {
  const { setIsOpen, totalItems } = useCart(); // totalItems comes from CartContext badge counter
  const [bump, setBump] = useState(false);

  const handleClick = () => setIsOpen(true);

  // Bump animation when item count changes
  useEffect(() => {
    if (totalItems === 0) return;
    setBump(true);
    const timer = setTimeout(() => setBump(false), 300);
    return () => clearTimeout(timer);
  }, [totalItems]);

  return (
    <button
      onClick={handleClick}
      className={`relative p-2 text-puretea-dark hover:text-puretea-organic transition-colors group ${bump ? "animate-bounce" : ""}`}
      aria-label="Ver carrito"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
      </svg>

      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-puretea-organic text-[10px] font-bold text-white shadow-sm animate-in zoom-in duration-300">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}