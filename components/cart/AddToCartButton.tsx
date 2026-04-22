"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  variantId: string;
  title?: string;
  price?: string;
  image?: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  variantId,
  title,
  quantity = 1,
  disabled = false,
  className = "",
  children,
}: AddToCartButtonProps) {
  const { setIsOpen, addItem, isAddingVariant } = useCart();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAdd = async () => {
    if (disabled || loading || isAddingVariant(variantId) || !variantId) return;
    setLoading(true);
    setDone(false);
    setErrorMsg(null);

    try {
      await addItem({ variantId, quantity, productTitle: title });
      setDone(true);
      setIsOpen(true);
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al añadir';
      setErrorMsg(msg.length > 220 ? `${msg.slice(0, 220)}…` : msg);
      console.error("Error adding to cart:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleAdd}
        disabled={disabled || loading || isAddingVariant(variantId)}
        className={className}
        aria-label="Añadir al carrito"
      >
        {children ?? (
          <>{loading ? "Añadiendo..." : done ? "Añadido ✓" : "Añadir al carrito"}</>
        )}
      </button>
      {errorMsg && (
        <p className="mt-2 text-xs text-red-600 leading-snug" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  );
}