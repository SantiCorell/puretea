"use client";

type EventPayload = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (action: "track", event: string, payload?: EventPayload) => void;
    gtag?: (command: "event", event: string, params?: EventPayload) => void;
    dataLayer?: unknown[];
  }
}

function pushDataLayer(event: string, payload: EventPayload): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackAddToCart(payload: EventPayload): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "add_to_cart", payload);
  window.fbq?.("track", "AddToCart", payload);
  pushDataLayer("add_to_cart", payload);
}

export function trackInitiateCheckout(payload: EventPayload): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "begin_checkout", payload);
  window.fbq?.("track", "InitiateCheckout", payload);
  pushDataLayer("begin_checkout", payload);
}

export function trackPurchase(payload: EventPayload): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "purchase", payload);
  window.fbq?.("track", "Purchase", payload);
  pushDataLayer("purchase", payload);
}
