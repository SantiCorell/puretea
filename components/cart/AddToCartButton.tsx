"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  variantId: string;
  title: string;
  price: string;
  image: string;
  quantity?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  variantId,
  title,
  price,
  image,
  quantity = 1,
  disabled = false,
  className = "",
  children,
}: AddToCartButtonProps) {
  const { addToCart, setIsOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleAdd = async () => {
    if (disabled || loading) return;
    
    setLoading(true);
    setDone(false);

    try {
      // 1. Add directly to the global cart context
      await addToCart({
        id: variantId,
        title,
        price,
        image,
        quantity,
      });

      // 2. Visual feedback
      setDone(true);

      // 3. AUTO-OPEN: This opens the drawer as soon as the item is added
      setIsOpen(true);

      // 4. Reset button text after a delay
      setTimeout(() => setDone(false), 2000);
    } catch (e) {
      console.error("Error adding to cart:", e);
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