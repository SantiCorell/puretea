"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CartApiResponse {
  cart?: {
    lines?: { quantity: number }[];
    cost?: {
      subtotalAmount: { amount: string; currencyCode: string };
    };
  } | null;
}

function formatPrice(amount: string, currency: string) {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency || "EUR",
      maximumFractionDigits: 0,
    }).format(parseFloat(amount));
  } catch {
    return `${amount} €`;
  }
}

export function FloatingCartButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState<string | null>(null);
  const [currency, setCurrency] = useState("EUR");

  useEffect(() => {
    let cancelled = false;

    const syncFromApi = async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) {
            setItemCount(0);
            setSubtotal(null);
          }
          return;
        }
        const data = (await res.json()) as CartApiResponse;
        const cart = data.cart;
        const lines = cart?.lines ?? [];
        const count = lines.reduce((acc, l) => acc + (l.quantity || 0), 0);
        if (cancelled) return;
        setItemCount(count);
        if (cart?.cost?.subtotalAmount) {
          setSubtotal(cart.cost.subtotalAmount.amount);
          setCurrency(cart.cost.subtotalAmount.currencyCode);
        } else {
          setSubtotal(null);
        }
      } catch {
        if (!cancelled) {
          setItemCount(0);
          setSubtotal(null);
        }
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

  if (itemCount === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return null;

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
      type="button"
      onClick={handleClick}
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-puretea-dark text-puretea-cream px-4 py-3 shadow-xl shadow-puretea-dark/30 md:bottom-7 md:right-6 md:px-5 md:py-3.5 md:text-sm lg:hidden"
      aria-label="Ver carrito y proceder al pago"
    >
      <div className="relative">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-puretea-cream text-puretea-dark text-xs font-bold">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[11px] uppercase tracking-widest font-semibold">
          Ir al checkout
        </span>
        {subtotal && (
          <span className="text-xs font-semibold opacity-80">
            {formatPrice(subtotal, currency)}
          </span>
        )}
      </div>
    </button>
  );
}

