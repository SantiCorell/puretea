"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Cart, CartLine } from "@/lib/shopify/cart";

function formatPrice(amount: string, currency: string): string {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency || "EUR",
    }).format(parseFloat(amount));
  } catch (e) {
    return `${amount} €`;
  }
}

export function CartView() {
  const [cart, setCart] = useState<Cart | null | "loading">("loading");
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar el carrito");
      setCart(data.cart);
    } catch (e) {
      setCart(null);
      setError(e instanceof Error ? e.message : "Error al cargar el carrito");
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart || typeof cart === "string") return;
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", lineId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCart(data.cart);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al actualizar");
    }
  };

  const removeLine = async (lineId: string) => {
    if (!cart || typeof cart === "string") return;
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", lineId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCart(data.cart);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al eliminar");
    }
  };

  const goToCheckout = () => {
    if (!cart || typeof cart === "string" || !cart.lines?.length) return;
    setCheckoutLoading(true);

    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      // Safe fallback — always goes to Shopify, never routes through Next.js
      window.location.href = "https://puretea-5911.myshopify.com/cart";
    }
  };

  if (cart === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24">
        <div className="animate-pulse space-y-8">
          <div className="h-10 w-48 bg-puretea-sand/30 rounded-lg" />
          <div className="space-y-4">
            <div className="h-32 bg-puretea-sand/10 rounded-2xl" />
            <div className="h-32 bg-puretea-sand/10 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.lines || cart.lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-canela text-4xl text-puretea-dark mb-6">
          Tu carrito está vacío
        </h1>
        <p className="text-puretea-dark/60 text-lg mb-10 leading-relaxed">
          Parece que aún no has empezado tu ritual. Explora nuestra colección de
          té matcha premium.
        </p>
        <Link
          href="/shop"
          className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-10 py-4 font-bold hover:bg-puretea-organic transition-all active:scale-95"
        >
          Explorar la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="flex justify-between items-end mb-12">
        <h1 className="font-canela text-4xl text-puretea-dark">Tu carrito</h1>
        <p className="text-sm text-puretea-dark/50 italic">
          {cart.lines.length} artículos
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-800 text-sm flex items-center gap-3">
          <span className="text-lg">⚠️</span> {error}
        </div>
      )}

      <ul className="divide-y divide-puretea-sand/30 border-t border-puretea-sand/30">
        {cart.lines.map((line: CartLine) => (
          <li key={line.id} className="flex gap-6 py-8">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-white border border-puretea-sand/20 shrink-0 shadow-sm">
              {line.product?.imageUrl ? (
                <Image
                  src={line.product.imageUrl}
                  alt={line.product.title}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-puretea-cream/50 text-puretea-dark/20 text-xs">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <Link
                  href={`/products/${line.product?.handle}`}
                  className="font-canela text-xl text-puretea-dark hover:text-puretea-organic transition-colors line-clamp-1"
                >
                  {line.product?.title}
                </Link>
                <p className="text-sm text-puretea-dark/60 mt-1">
                  {formatPrice(line.price.amount, line.price.currencyCode)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 bg-white border border-puretea-sand/50 rounded-full px-3 py-1">
                  <button
                    onClick={() =>
                      line.quantity > 1 &&
                      updateQuantity(line.id, line.quantity - 1)
                    }
                    className="text-puretea-dark/40 hover:text-puretea-dark font-bold px-2"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">
                    {line.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(line.id, line.quantity + 1)}
                    className="text-puretea-dark/40 hover:text-puretea-dark font-bold px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="text-xs font-bold uppercase tracking-tighter text-red-300 hover:text-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 p-8 rounded-3xl bg-white border border-puretea-sand/30 shadow-sm">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-puretea-dark/60">
            <span>Subtotal</span>
            <span>
              {formatPrice(
                cart.cost.subtotalAmount.amount,
                cart.cost.subtotalAmount.currencyCode
              )}
            </span>
          </div>
          <div className="flex justify-between font-bold text-puretea-dark text-2xl pt-3 border-t border-puretea-sand/20">
            <span>Total</span>
            <span>
              {formatPrice(
                cart.cost.totalAmount.amount,
                cart.cost.totalAmount.currencyCode
              )}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={goToCheckout}
          disabled={checkoutLoading}
          className="w-full bg-puretea-dark text-puretea-cream rounded-full py-5 font-bold text-lg hover:bg-puretea-organic transition-all active:scale-[0.98] shadow-xl shadow-puretea-dark/10 disabled:opacity-50"
        >
          {checkoutLoading ? "Cargando Checkout..." : "Finalizar Pedido"}
        </button>
      </div>
    </div>
  );
}