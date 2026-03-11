'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
}

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('puretea-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2. Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('puretea-cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (item: CartItem) => {
    // PREVENT DEFAULT BEHAVIOR: Ensure this doesn't trigger a page reload
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    
    // This only triggers the UI Drawer, not a URL change
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(id);
    setCart((prev) => 
      prev.map((item) => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  // 3. Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')); // Clean price string
    return acc + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  // Calculate total unit count for the Navbar bubble
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalPrice, 
      totalItems,
      isOpen, 
      setIsOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};