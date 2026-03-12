"use client";

import { useState } from "react";

interface AddToCartButtonProps {
  variantId: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  variantId,
  quantity = 1,
  disabled = false,
  className = "",
  children,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAdd = async () => {
    if (disabled || loading) return;
    setLoading(true);
    setDone(false);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variantId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al añadir");

      // Notificamos al resto de la app (navbar, botón flotante, etc.)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("puretea-cart-updated"));
      }

      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled || loading}
      className={className}
      aria-label="Añadir al carrito"
    >
      {children ?? (
        <>
          {loading ? "Añadiendo..." : done ? "Añadido ✓" : "Añadir al carrito"}
        </>
      )}
    </button>
  );
}
