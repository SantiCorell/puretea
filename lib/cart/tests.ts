"use client";

import { addItemToCart, getCartSnapshot } from "@/lib/cart/cartService";
import { resolveCheckoutUrlFromCart } from "@/lib/cart/checkoutService";

type CartTestResult = {
  ok: boolean;
  step: string;
  details?: string;
};

export async function testAddToCart(variantId: string): Promise<CartTestResult[]> {
  const results: CartTestResult[] = [];

  try {
    const before = await getCartSnapshot();
    results.push({
      ok: true,
      step: "creacion_o_recuperacion_checkout",
      details: before?.id || "Carrito vacío, se creará en el add",
    });

    const updated = await addItemToCart(variantId, 1);
    const found = updated.lines.some((line) => line.merchandiseId === variantId);
    results.push({
      ok: found,
      step: "anadir_producto",
      details: found ? `Lineas tras add: ${updated.lines.length}` : "La variante no aparece en el carrito",
    });

    const persisted = await getCartSnapshot();
    results.push({
      ok: Boolean(persisted?.id && persisted.lines.length >= 1),
      step: "persistencia_carrito",
      details: persisted?.id || "No se pudo recuperar el carrito tras refresco",
    });
  } catch (error) {
    results.push({
      ok: false,
      step: "error",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }

  return results;
}

export async function testCheckoutFlow(variantId: string): Promise<CartTestResult[]> {
  const results: CartTestResult[] = [];

  try {
    const cart = await addItemToCart(variantId, 1);
    const checkoutUrl = await resolveCheckoutUrlFromCart(cart);

    results.push({
      ok: Boolean(checkoutUrl),
      step: "checkout_url_valida",
      details: checkoutUrl,
    });

    const hasCheckoutDomain = checkoutUrl.includes("checkout.puretea.es");
    results.push({
      ok: hasCheckoutDomain,
      step: "dominio_checkout_canonico",
      details: hasCheckoutDomain ? "checkout.puretea.es OK" : `Dominio devuelto: ${checkoutUrl}`,
    });
  } catch (error) {
    results.push({
      ok: false,
      step: "error",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }

  return results;
}
