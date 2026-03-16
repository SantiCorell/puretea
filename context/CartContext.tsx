'use client';
/**
 * CartContext — simplified.
 *
 * Cart data (items, totals, checkoutUrl) now lives entirely in Shopify,
 * accessed via /api/cart. This context only manages UI state (drawer open/close)
 * and totalItems for the FloatingCartButton badge.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  totalItems: number;
  refreshBadge: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch item count from Shopify to drive the badge on FloatingCartButton
  const refreshBadge = useCallback(async () => {
    try {
      const res = await fetch('/api/cart', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      const lines: { quantity: number }[] = data?.cart?.lines ?? [];
      const count = lines.reduce((sum, l) => sum + l.quantity, 0);
      setTotalItems(count);
    } catch {
      // silently fail — badge just won't update
    }
  }, []);

  // Load badge count on mount
  useEffect(() => {
    refreshBadge();
  }, [refreshBadge]);

  // Refresh badge whenever drawer closes
  useEffect(() => {
    if (!isOpen) refreshBadge();
  }, [isOpen, refreshBadge]);

  return (
    <CartContext.Provider value={{ isOpen, setIsOpen, totalItems, refreshBadge }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};