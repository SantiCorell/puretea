"use client";

import {
  CART_STORAGE_KEY,
  CHECKOUT_URL_STORAGE_KEY,
  CART_STORAGE_UPDATED_AT_KEY,
  CART_TTL_MS,
} from "@/lib/cart/constants";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function readStoredCartId(): string | null {
  if (!isBrowser()) return null;
  if (isStorageExpired()) {
    clearStoredCartId();
    clearStoredCheckoutUrl();
    return null;
  }
  return window.localStorage.getItem(CART_STORAGE_KEY);
}

export function writeStoredCartId(cartId: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_KEY, cartId);
  touchStorageTimestamp();
}

export function clearStoredCartId(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CART_STORAGE_KEY);
  window.localStorage.removeItem(CART_STORAGE_UPDATED_AT_KEY);
}

export function readStoredCheckoutUrl(): string | null {
  if (!isBrowser()) return null;
  if (isStorageExpired()) {
    clearStoredCartId();
    clearStoredCheckoutUrl();
    return null;
  }
  return window.localStorage.getItem(CHECKOUT_URL_STORAGE_KEY);
}

export function writeStoredCheckoutUrl(checkoutUrl: string): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CHECKOUT_URL_STORAGE_KEY, checkoutUrl);
  touchStorageTimestamp();
}

export function clearStoredCheckoutUrl(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(CHECKOUT_URL_STORAGE_KEY);
  window.localStorage.removeItem(CART_STORAGE_UPDATED_AT_KEY);
}

function touchStorageTimestamp(): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CART_STORAGE_UPDATED_AT_KEY, String(Date.now()));
}

function isStorageExpired(): boolean {
  if (!isBrowser()) return false;
  const raw = window.localStorage.getItem(CART_STORAGE_UPDATED_AT_KEY);
  if (!raw) return false;
  const timestamp = Number(raw);
  if (!Number.isFinite(timestamp)) return true;
  return Date.now() - timestamp > CART_TTL_MS;
}
