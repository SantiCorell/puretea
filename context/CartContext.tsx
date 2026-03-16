'use client';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface CartItem {
  id: string;       // Shopify variant GID, e.g. "gid://shopify/ProductVariant/12345"
  title: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  checkoutUrl: string | null;
  isCheckingOut: boolean;
  handleCheckout: () => Promise<void>;
}

// ─────────────────────────────────────────────
// Shopify cartCreate mutation
// Uses the Cart API (2024-01+) which returns checkoutUrl directly.
// ─────────────────────────────────────────────
const CART_CREATE_MUTATION = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

async function createShopifyCheckout(items: CartItem[]): Promise<string> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      'Faltan variables de entorno: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN o NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    );
  }

  const lines = items.map((item) => ({
    merchandiseId: item.id, // must be a valid variant GID
    quantity: item.quantity,
  }));

  const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: CART_CREATE_MUTATION,
      variables: { lines },
    }),
  });

  if (!response.ok) {
    throw new Error(`Error de red Shopify: ${response.status} ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  // GraphQL-level errors
  if (errors?.length) {
    throw new Error(`GraphQL error: ${errors.map((e: any) => e.message).join(', ')}`);
  }

  // Business-logic errors
  const userErrors = data?.cartCreate?.userErrors ?? [];
  if (userErrors.length) {
    throw new Error(`Error en carrito: ${userErrors.map((e: any) => e.message).join(', ')}`);
  }

  const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error('Shopify no devolvió una URL de checkout válida.');
  }

  return checkoutUrl;
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // ── Hydrate from localStorage (client-only, avoids SSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('puretea-cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.error('Error al cargar el carrito:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ── Persist to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('puretea-cart', JSON.stringify(cart));
      // Invalidate cached checkoutUrl whenever cart changes
      setCheckoutUrl(null);
    }
  }, [cart, isInitialized]);

  // ── Cart mutations
  const addToCart = useCallback((item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    setCheckoutUrl(null);
  }, []);

  // ── Checkout: calls Shopify, then redirects
  const handleCheckout = useCallback(async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    try {
      // Re-use cached URL if cart hasn't changed
      const url = checkoutUrl ?? await createShopifyCheckout(cart);
      setCheckoutUrl(url);
      window.location.href = url;
    } catch (err) {
      console.error('Error al crear el checkout:', err);
      alert(
        'No se pudo iniciar el proceso de pago. Por favor, inténtalo de nuevo o contacta con soporte.'
      );
    } finally {
      setIsCheckingOut(false);
    }
  }, [cart, checkoutUrl]);

  // ── Derived totals
  const { totalPrice, totalItems } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const clean = (item.price ?? '0').toString().replace(',', '.').replace(/[^0-9.]/g, '');
        const price = parseFloat(clean);
        return {
          totalPrice: acc.totalPrice + (isNaN(price) ? 0 : price * item.quantity),
          totalItems: acc.totalItems + item.quantity,
        };
      },
      { totalPrice: 0, totalItems: 0 }
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isOpen,
        setIsOpen,
        checkoutUrl,
        isCheckingOut,
        handleCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Safe hook — throws a clear error in dev, but won't crash prod
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};