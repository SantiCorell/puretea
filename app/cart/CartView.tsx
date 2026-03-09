"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Cart, CartLine } from "@/lib/shopify/cart";

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

export function CartView() {
  const [cart, setCart] = useState<Cart | null | "loading">("loading");
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    setError(null);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cargar el carrito");
      setCart(data.cart);
    } catch (e) {
      setCart(null);
      setError(e instanceof Error ? e.message : "Error al cargar el carrito");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
    if (!cart || typeof cart === "string" || !cart.checkoutUrl || cart.lines.length === 0) return;
    setCheckoutLoading(true);
    window.location.href = cart.checkoutUrl;
  };

  if (cart === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-puretea-sand/50 rounded" />
          <div className="h-24 bg-puretea-sand/30 rounded" />
          <div className="h-24 bg-puretea-sand/30 rounded" />
        </div>
      </div>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
        <h1 className="font-canela text-3xl text-puretea-dark mb-4">Tu carrito está vacío</h1>
        <p className="text-puretea-dark/70 mb-8">
          Añade productos desde la tienda y vuelve aquí para finalizar tu compra.
        </p>
        <Link
          href="/shop"
          className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 font-semibold hover:bg-puretea-organic transition-colors"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-canela text-3xl text-puretea-dark mb-8">Tu carrito</h1>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-800 text-sm">
          {error}
        </div>
      )}

      <ul className="divide-y divide-puretea-sand/50 space-y-6 pb-8">
        {cart.lines.map((line: CartLine) => (
          <li key={line.id} className="flex gap-4 py-6">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-puretea-cream shrink-0">
              {line.product.imageUrl ? (
                <Image
                  src={line.product.imageUrl}
                  alt={line.product.imageAlt ?? line.product.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-puretea-dark/30 text-xs">
                  Sin imagen
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${line.product.handle}`}
                className="font-canela font-semibold text-puretea-dark hover:text-puretea-organic line-clamp-2"
              >
                {line.product.title}
              </Link>
              <p className="mt-1 text-sm text-puretea-dark/70">
                {formatPrice(line.price.amount, line.price.currencyCode)} × {line.quantity}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <select
                  value={line.quantity}
                  onChange={(e) => updateQuantity(line.id, Number(e.target.value))}
                  className="rounded-lg border border-puretea-sand bg-white px-2 py-1 text-sm text-puretea-dark"
                >
                  {Array.from({ length: 99 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeLine(line.id)}
                  className="text-sm text-puretea-dark/70 hover:text-red-600 underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold text-puretea-dark">
                {formatPrice(
                  (parseFloat(line.price.amount) * line.quantity).toFixed(2),
                  line.price.currencyCode
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-puretea-sand pt-6 space-y-2">
        <div className="flex justify-between text-puretea-dark/80">
          <span>Subtotal</span>
          <span>{formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}</span>
        </div>
        {cart.cost.totalTaxAmount && parseFloat(cart.cost.totalTaxAmount.amount) > 0 && (
          <div className="flex justify-between text-puretea-dark/80">
            <span>Impuestos</span>
            <span>{formatPrice(cart.cost.totalTaxAmount.amount, cart.cost.totalTaxAmount.currencyCode)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-puretea-dark text-lg pt-2">
          <span>Total</span>
          <span>{formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-puretea-dark/70">
        El pago y los datos de envío se completan de forma segura en el checkout de Shopify.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={goToCheckout}
          disabled={checkoutLoading}
          className="inline-flex justify-center items-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 font-semibold hover:bg-puretea-organic transition-colors disabled:opacity-70"
        >
          {checkoutLoading ? "Redirigiendo..." : "Proceder al pago"}
        </button>
        <Link
          href="/shop"
          className="inline-flex justify-center rounded-full border-2 border-puretea-dark text-puretea-dark px-8 py-4 font-semibold hover:bg-puretea-sand/30 transition-colors text-center"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
