"use client";

import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

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
  const pathname = usePathname();
  const { totalItems, cart, startCheckout } = useCart();

  const subtotal = cart?.cost?.subtotalAmount?.amount ?? null;
  const currency = cart?.cost?.subtotalAmount?.currencyCode ?? "EUR";

  if (totalItems === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/checkout")) return null;

  return (
    <button
      type="button"
      onClick={startCheckout}
      className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-puretea-dark text-puretea-cream px-4 py-3 shadow-xl shadow-puretea-dark/30 md:bottom-7 md:right-6 md:px-5 md:py-3.5 md:text-sm lg:hidden"
      aria-label="Ver carrito y proceder al pago"
    >
      <div className="relative">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-puretea-cream text-puretea-dark text-xs font-bold">
          {totalItems > 99 ? "99+" : totalItems}
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

