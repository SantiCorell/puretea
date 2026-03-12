'use client';

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface CartApiResponse {
  cart?: {
    lines?: { quantity: number }[];
  } | null;
}

export function CartButton() {
  const router = useRouter();
  const [totalItems, setTotalItems] = useState(0);
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    const syncFromApi = async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) {
          setTotalItems(0);
          return;
        }
        const data = (await res.json()) as CartApiResponse;
        const lines = data.cart?.lines ?? [];
        const count = lines.reduce((acc, l) => acc + (l.quantity || 0), 0);
        if (cancelled) return;
        setTotalItems(count);
        if (count > 0 && count !== prevCountRef.current) {
          prevCountRef.current = count;
          setBump(true);
        } else {
          prevCountRef.current = count;
        }
      } catch {
        if (!cancelled) setTotalItems(0);
      }
    };

    syncFromApi();
    const handler = () => {
      void syncFromApi();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("puretea-cart-updated", handler as EventListener);
    }

    return () => {
      cancelled = true;
      if (typeof window !== "undefined") {
        window.removeEventListener("puretea-cart-updated", handler as EventListener);
      }
    };
  }, []);

  useEffect(() => {
    if (!bump) return;
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [bump]);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      if (!res.ok) {
        router.push("/cart");
        return;
      }
      const data = (await res.json()) as CartApiResponse & { cart?: { checkoutUrl?: string | null } };
      const checkoutUrl = data.cart?.checkoutUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        router.push("/cart");
      }
    } catch {
      router.push("/cart");
    }
  };

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