'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Cart } from '@/lib/shopify/cart';
import { addItemToCart, getCartSnapshot, persistCartLocally, removeCartItem, updateCartItem } from '@/lib/cart/cartService';
import { getEmergencyCheckoutFallback, resolveCheckoutRedirectPlanFromCart } from '@/lib/cart/checkoutService';
import { trackAddToCart, trackInitiateCheckout } from '@/lib/tracking/conversion';
import { persistCheckoutDebug } from '@/lib/cart/debug-client';

interface CartContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cart: Cart | null;
  isHydrating: boolean;
  isMutating: boolean;
  isCheckingOut: boolean;
  error: string | null;
  totalItems: number;
  refreshBadge: () => Promise<Cart | null>;
  addItem: (payload: { variantId: string; quantity: number; productTitle?: string }) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  startCheckout: () => Promise<void>;
  clearError: () => void;
  isAddingVariant: (variantId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_CONTEXT_DEBUG = process.env.NODE_ENV !== "production";

function cartUiLog(scope: string, payload: Record<string, unknown>) {
  if (!CART_CONTEXT_DEBUG) return;
  persistCheckoutDebug(`[CartContext][${scope}]`, payload);
  console.info(`[CartContext][${scope}]`, payload);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);
  const [pendingOps, setPendingOps] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutationQueueRef = useRef<Promise<void>>(Promise.resolve());
  const pendingVariantsRef = useRef<Set<string>>(new Set());
  const lastActionByVariantRef = useRef<Map<string, number>>(new Map());
  const cartRef = useRef<Cart | null>(null);
  const isMutating = pendingOps > 0;

  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  const refreshBadge = useCallback(async (): Promise<Cart | null> => {
    try {
      const freshCart = await getCartSnapshot();
      setCart(freshCart);
      cartRef.current = freshCart;
      persistCartLocally(freshCart);
      setError(null);
      return freshCart;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo sincronizar el carrito');
      return cartRef.current;
    } finally {
      setIsHydrating(false);
    }
  }, []);

  useEffect(() => {
    void refreshBadge();
  }, [refreshBadge]);

  useEffect(() => {
    // Evita refetch agresivo al abrir drawer (provocaba flicker y sensación de lentitud).
    if (!isOpen) return;
    if (cartRef.current) return;
    void refreshBadge();
  }, [isOpen, refreshBadge]);

  const clearError = useCallback(() => setError(null), []);

  const totalItems = useMemo(
    () => cart?.lines.reduce((sum, line) => sum + line.quantity, 0) ?? 0,
    [cart]
  );

  const optimisticAdd = useCallback((baseCart: Cart | null, variantId: string, quantity: number, productTitle?: string): Cart | null => {
    if (!baseCart) return baseCart;
    const existing = baseCart.lines.find((line) => line.merchandiseId === variantId);
    if (!existing) {
      return {
        ...baseCart,
        lines: [
          ...baseCart.lines,
          {
            id: `optimistic-${variantId}-${Date.now()}`,
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
              currencyCode: baseCart.cost.totalAmount.currencyCode,
            },
          },
        ],
      };
    }

    return {
      ...baseCart,
      lines: baseCart.lines.map((line) =>
        line.id === existing.id ? { ...line, quantity: line.quantity + quantity } : line
      ),
    };
  }, []);

  const enqueueMutation = useCallback((task: () => Promise<void>) => {
    const run = mutationQueueRef.current.catch(() => undefined).then(task);
    mutationQueueRef.current = run;
    return run;
  }, []);

  const addItem = useCallback(
    async ({ variantId, quantity, productTitle }: { variantId: string; quantity: number; productTitle?: string }) => {
      const now = Date.now();
      const lastAction = lastActionByVariantRef.current.get(variantId) ?? 0;
      if (now - lastAction < 250) return;
      lastActionByVariantRef.current.set(variantId, now);

      pendingVariantsRef.current.add(variantId);
      return enqueueMutation(async () => {
        setPendingOps((value) => value + 1);
        setError(null);
        const previous = cartRef.current;
        const optimistic = optimisticAdd(previous, variantId, quantity, productTitle);
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
          pendingVariantsRef.current.delete(variantId);
          setPendingOps((value) => Math.max(0, value - 1));
        }
      });
    },
    [optimisticAdd, enqueueMutation]
  );

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    return enqueueMutation(async () => {
      setPendingOps((value) => value + 1);
      setError(null);
      const previous = cartRef.current;

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
  }, [enqueueMutation]);

  const removeLine = useCallback(async (lineId: string) => {
    await updateLine(lineId, 0);
  }, [updateLine]);

  const startCheckout = useCallback(async () => {
    setIsCheckingOut(true);
    setError(null);
    const immediateFallbackUrl = getEmergencyCheckoutFallback(cartRef.current);
    cartUiLog("startCheckout:clicked", {
      lineCount: cartRef.current?.lines.length ?? 0,
      pendingOps,
      immediateFallbackUrl,
    });
    try {
      // Espera a que terminen mutaciones en vuelo (adds/updates) antes de construir checkout.
      await mutationQueueRef.current.catch(() => undefined);
      cartUiLog("startCheckout:queue-drained", {});
      const latestCart = await refreshBadge();
      cartUiLog("startCheckout:latest-cart", {
        cartId: latestCart?.id ?? null,
        lineCount: latestCart?.lines.length ?? 0,
        checkoutUrl: latestCart?.checkoutUrl ?? null,
        rawCheckoutUrl: latestCart?.rawCheckoutUrl ?? null,
      });

      const plan = await resolveCheckoutRedirectPlanFromCart(latestCart);
      cartUiLog("startCheckout:redirect-plan", {
        url: plan.url,
        fallbackUrl: plan.fallbackUrl ?? null,
      });
      trackInitiateCheckout({
        value: Number(latestCart?.cost.totalAmount.amount ?? 0),
        currency: latestCart?.cost.totalAmount.currencyCode ?? 'EUR',
        num_items: latestCart?.lines.length ?? 0,
      });
      const currentUrl = window.location.href;
      window.location.assign(plan.url);
      cartUiLog("startCheckout:navigate-primary", { to: plan.url });

      window.setTimeout(() => {
        if (window.location.href !== currentUrl) return;
        if (plan.fallbackUrl && plan.fallbackUrl !== plan.url) {
          cartUiLog("startCheckout:navigate-fallback", { to: plan.fallbackUrl });
          window.location.assign(plan.fallbackUrl);
          return;
        }
        cartUiLog("startCheckout:stuck-no-fallback", {});
        setError("No se pudo abrir el checkout. Reintenta o cambia de red.");
        setIsCheckingOut(false);
      }, 2200);
    } catch (e) {
      cartUiLog("startCheckout:error", {
        error: e instanceof Error ? e.message : String(e),
        immediateFallbackUrl,
      });
      if (immediateFallbackUrl) {
        const currentUrl = window.location.href;
        cartUiLog("startCheckout:immediate-fallback", { to: immediateFallbackUrl });
        window.location.assign(immediateFallbackUrl);
        window.setTimeout(() => {
          if (window.location.href !== currentUrl) return;
          cartUiLog("startCheckout:immediate-fallback-failed", {});
          setError("No se pudo abrir el checkout. Reintenta en 10 segundos.");
          setIsCheckingOut(false);
        }, 2200);
      } else {
        setError(e instanceof Error ? e.message : 'No se pudo iniciar checkout');
        setIsCheckingOut(false);
      }
    }
  }, [refreshBadge, pendingOps]);

  const isAddingVariant = useCallback((variantId: string) => {
    return pendingVariantsRef.current.has(variantId);
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