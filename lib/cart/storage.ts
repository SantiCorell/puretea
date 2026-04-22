"use client";

import { CART_STORAGE_KEY, CHECKOUT_URL_STORAGE_KEY } from "@/lib/cart/constants";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readStoredCartId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(CART_STORAGE_KEY);
}

export function writeStoredCartId(cartId: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, cartId);
}

export function clearStoredCartId(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CART_STORAGE_KEY);
}

export function readStoredCheckoutUrl(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(CHECKOUT_URL_STORAGE_KEY);
}

export function writeStoredCheckoutUrl(checkoutUrl: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CHECKOUT_URL_STORAGE_KEY, checkoutUrl);
}

export function clearStoredCheckoutUrl(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CHECKOUT_URL_STORAGE_KEY);
}
