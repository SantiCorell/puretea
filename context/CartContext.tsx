'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Cart } from '@/lib/shopify/cart';
import { addItemToCart, getCartSnapshot, persistCartLocally, removeCartItem, updateCartItem } from '@/lib/cart/cartService';
import { resolveCheckoutUrlFromCart } from '@/lib/cart/checkoutService';
import { trackAddToCart, trackInitiateCheckout } from '@/lib/tracking/conversion';

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: Cart | null;
  isHydrating: boolean;
  isMutating: boolean;
  isCheckingOut: boolean;
  error: string | null;
  totalItems: number;
  refreshBadge: () => Promise<void>;
  addItem: (payload: { variantId: string; quantity: number; productTitle?: string }) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  startCheckout: () => Promise<void>;
  clearError: () => void;
  isAddingVariant: (variantId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);
  const [pendingOps, setPendingOps] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queueByVariantRef = useRef<Map<string, Promise<void>>>(new Map());
  const queueByLineRef = useRef<Map<string, Promise<void>>>(new Map());
  const lastActionByVariantRef = useRef<Map<string, number>>(new Map());
  const isMutating = pendingOps > 0;

  const refreshBadge = useCallback(async () => {
    try {
      const freshCart = await getCartSnapshot();
      setCart(freshCart);
      persistCartLocally(freshCart);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo sincronizar el carrito');
    } finally {
      setIsHydrating(false);
    }
  }, []);

  useEffect(() => {
    void refreshBadge();
  }, [refreshBadge]);

  useEffect(() => {
    if (!isOpen) return;
    void refreshBadge();
  }, [isOpen, refreshBadge]);

  const clearError = useCallback(() => setError(null), []);

  const totalItems = useMemo(
    () => cart?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0,
    [cart]
  );

  const optimisticAdd = useCallback((variantId: string, quantity: number, productTitle?: string): Cart | null => {
    if (!cart) return cart;
    const existing = cart.lines.find((line) => line.merchandiseId === variantId);
    if (!existing) {
      return {
        ...cart,
        lines: [
          ...cart.lines,
          {
            id: `optimistic-${variantId}`,
            quantity,
            merchandiseId: variantId,
            product: {
              id: variantId,
              handle: "",
              title: productTitle || "Producto",
              imageUrl: null,
              imageAlt: null,
            },
            price: {
              amount: "0",
              currencyCode: cart.cost.totalAmount.currencyCode,
            },
          },
        ],
      };
    }

    return {
      ...cart,
      lines: cart.lines.map((line) =>
        line.id === existing.id ? { ...line, quantity: line.quantity + quantity } : line
      ),
    };
  }, [cart]);

  const enqueueByKey = useCallback(
    (queueRef: React.MutableRefObject<Map<string, Promise<void>>>, key: string, task: () => Promise<void>) => {
      const previous = queueRef.current.get(key) ?? Promise.resolve();
      const next = previous.catch(() => undefined).then(task);

      const cleanup = next.finally(() => {
        if (queueRef.current.get(key) === cleanup) {
          queueRef.current.delete(key);
        }
      });

      queueRef.current.set(key, cleanup);
      return next;
    },
    []
  );

  const addItem = useCallback(
    async ({ variantId, quantity, productTitle }: { variantId: string; quantity: number; productTitle?: string }) => {
      const now = Date.now();
      const lastAction = lastActionByVariantRef.current.get(variantId) ?? 0;
      if (now - lastAction < 250) return;
      lastActionByVariantRef.current.set(variantId, now);

      return enqueueByKey(queueByVariantRef, variantId, async () => {
        setPendingOps((value) => value + 1);
        setError(null);
        const previous = cart;
        const optimistic = optimisticAdd(variantId, quantity, productTitle);
        if (optimistic) {
          setCart(optimistic);
          persistCartLocally(optimistic);
        }

        try {
          const updated = await addItemToCart(variantId, quantity);
          setCart(updated);
          persistCartLocally(updated);
          trackAddToCart({
            content_ids: [variantId],
            value: Number(updated.cost.totalAmount.amount),
            currency: updated.cost.totalAmount.currencyCode,
            quantity,
            content_name: productTitle,
          });
          setIsOpen(true);
        } catch (e) {
          setCart(previous);
          persistCartLocally(previous);
          setError(e instanceof Error ? e.message : 'Error al añadir al carrito');
          throw e;
        } finally {
          setPendingOps((value) => Math.max(0, value - 1));
        }
      });
    },
    [cart, optimisticAdd, enqueueByKey]
  );

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    return enqueueByKey(queueByLineRef, lineId, async () => {
      setPendingOps((value) => value + 1);
      setError(null);
      const previous = cart;

      if (previous) {
        const optimistic = {
          ...previous,
          lines: previous.lines
            .map((line) => (line.id === lineId ? { ...line, quantity } : line))
            .filter((line) => line.quantity > 0),
        };
        setCart(optimistic);
        persistCartLocally(optimistic);
      }

      try {
        const updated = quantity <= 0 ? await removeCartItem(lineId) : await updateCartItem(lineId, quantity);
        setCart(updated);
        persistCartLocally(updated);
      } catch (e) {
        setCart(previous);
        persistCartLocally(previous);
        setError(e instanceof Error ? e.message : 'Error al actualizar el carrito');
      } finally {
        setPendingOps((value) => Math.max(0, value - 1));
      }
    });
  }, [cart, enqueueByKey]);

  const removeLine = useCallback(async (lineId: string) => {
    await updateLine(lineId, 0);
  }, [updateLine]);

  const startCheckout = useCallback(async () => {
    setIsCheckingOut(true);
    setError(null);
    try {
      const checkoutUrl = await resolveCheckoutUrlFromCart(cart);
      trackInitiateCheckout({
        value: Number(cart?.cost.totalAmount.amount ?? 0),
        currency: cart?.cost.totalAmount.currencyCode ?? 'EUR',
        num_items: cart?.lines.length ?? 0,
      });
      window.location.href = checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar checkout');
      setIsCheckingOut(false);
    }
  }, [cart]);

  const isAddingVariant = useCallback((variantId: string) => {
    return queueByVariantRef.current.has(variantId);
  }, []);

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cart,
        isHydrating,
        isMutating,
        isCheckingOut,
        error,
        totalItems,
        refreshBadge,
        addItem,
        updateLine,
        removeLine,
        startCheckout,
        clearError,
        isAddingVariant,
      }}
    >
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