import { NextRequest, NextResponse } from "next/server";
import {
  getCart,
  createCart,
  createCartWithLines,
  addLinesToCart,
  updateCartLine,
  removeCartLine,
  type Cart,
} from "@/lib/shopify/cart";

const CART_COOKIE = "puretea_cart_id";
const CART_MAX_AGE = 60 * 60 * 24 * 30; // 30 días
const CART_HEADER = "x-puretea-cart-id";
const MUTATION_HEADER = "x-client-mutation-id";
const RETRY_ATTEMPTS = 2;

function getCartIdFromCookie(request: NextRequest): string | null {
  return request.cookies.get(CART_COOKIE)?.value ?? null;
}

function getCartIdFromRequest(request: NextRequest): string | null {
  const fromCookie = getCartIdFromCookie(request);
  if (fromCookie) return fromCookie;
  const fromHeader = request.headers.get(CART_HEADER);
  return fromHeader?.trim() || null;
}

function getMutationId(request: NextRequest, body?: unknown): string {
  const fromHeader = request.headers.get(MUTATION_HEADER)?.trim();
  if (fromHeader) return fromHeader;
  if (body && typeof body === "object" && "clientMutationId" in body) {
    const value = (body as { clientMutationId?: unknown }).clientMutationId;
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return `srv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function setCartCookie(cartId: string) {
  return `${CART_COOKIE}=${encodeURIComponent(cartId)}; Path=/; Max-Age=${CART_MAX_AGE}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

function clearCartCookie() {
  return `${CART_COOKIE}=; Path=/; Max-Age=0`;
}

async function withRetry<T>(fn: () => Promise<T>, retries = RETRY_ATTEMPTS): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i === retries) break;
      await new Promise((resolve) => setTimeout(resolve, 120 * (i + 1)));
    }
  }
  throw lastError instanceof Error ? lastError : new Error("Error inesperado");
}

function isInvalidCartError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return (
    message.includes("cart") &&
    (message.includes("invalid") ||
      message.includes("not found") ||
      message.includes("expired") ||
      message.includes("no se ha podido"))
  );
}

/**
 * GET /api/cart
 * Devuelve el carrito actual (por cookie). Incluye checkoutUrl para redirigir al pago.
 */
export async function GET(request: NextRequest) {
  const mutationId = getMutationId(request);
  try {
    const cartIdFromCookie = getCartIdFromCookie(request);
    const cartId = cartIdFromCookie ?? request.headers.get(CART_HEADER)?.trim() ?? null;
    if (!cartId) {
      const res = NextResponse.json({ cart: null, meta: { clientMutationId: mutationId } });
      res.headers.set(MUTATION_HEADER, mutationId);
      return res;
    }
    const cart = await withRetry(() => getCart(cartId), 1);
    if (!cart) {
      const res = NextResponse.json({ cart: null });
      res.headers.set(MUTATION_HEADER, mutationId);
      res.headers.set("Set-Cookie", clearCartCookie());
      return res;
    }
    const res = NextResponse.json({ cart, meta: { clientMutationId: mutationId } });
    res.headers.set(MUTATION_HEADER, mutationId);
    if (!cartIdFromCookie) {
      res.headers.set("Set-Cookie", setCartCookie(cart.id));
    }
    return res;
  } catch (error) {
    console.warn("[API cart GET] reset cookie", { mutationId, error });
    const res = NextResponse.json({ cart: null });
    res.headers.set(MUTATION_HEADER, mutationId);
    res.headers.set("Set-Cookie", clearCartCookie());
    return res;
  }
}

/**
 * POST /api/cart
 * Body: { variantId: string, quantity: number }
 * Crea carrito o añade línea. Establece cookie y devuelve carrito.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  let mutationId = getMutationId(request);
  try {
    body = await request.json();
    mutationId = getMutationId(request, body);
    const action = (body as { action?: string })?.action;

    if (action === "ensure-checkout") {
      const cartId = getCartIdFromRequest(request);
      if (!cartId) {
        const res = NextResponse.json(
          { error: "No hay carrito", meta: { clientMutationId: mutationId } },
          { status: 400 }
        );
        res.headers.set(MUTATION_HEADER, mutationId);
        return res;
      }

      const current = await withRetry(() => getCart(cartId), 1);
      let cart = current;

      if (!cart) {
        cart = await withRetry(() => createCartWithLines([]), 1);
      } else if (!cart.checkoutUrl) {
        const lines = cart.lines.map((line) => ({
          merchandiseId: line.merchandiseId,
          quantity: line.quantity,
        }));
        cart = await withRetry(() => createCartWithLines(lines), 1);
      }

      const res = NextResponse.json({ cart, meta: { clientMutationId: mutationId } });
      res.headers.set(MUTATION_HEADER, mutationId);
      res.headers.set("Set-Cookie", setCartCookie(cart.id));
      return res;
    }

    const variantId = (body as { variantId?: string })?.variantId;
    const quantity = Math.max(1, Math.min(Number((body as { quantity?: number })?.quantity) || 1, 99));

    if (!variantId || typeof variantId !== "string") {
      const res = NextResponse.json(
        { error: "variantId es obligatorio", meta: { clientMutationId: mutationId } },
        { status: 400 }
      );
      res.headers.set(MUTATION_HEADER, mutationId);
      return res;
    }

    const cartId = getCartIdFromRequest(request);
    let cart: Cart;

    if (cartId) {
      try {
        cart = await withRetry(() => addLinesToCart(cartId, variantId, quantity));
      } catch (e) {
        if (!isInvalidCartError(e)) {
          throw e;
        }

        // Solo recreamos si el carrito realmente está inválido.
        cart = await withRetry(() => createCart(variantId, quantity));
      }
    } else {
      cart = await withRetry(() => createCart(variantId, quantity));
    }

    const res = NextResponse.json({ cart, meta: { clientMutationId: mutationId } });
    res.headers.set(MUTATION_HEADER, mutationId);
    res.headers.set("Set-Cookie", setCartCookie(cart.id));
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar el carrito";
    console.error("[API cart POST]", { mutationId, error });
    const res = NextResponse.json(
      { error: message, meta: { clientMutationId: mutationId } },
      { status: 400 }
    );
    res.headers.set(MUTATION_HEADER, mutationId);
    return res;
  }
}

/**
 * PATCH /api/cart
 * Body: { action: 'update' | 'remove', lineId: string, quantity?: number }
 */
export async function PATCH(request: NextRequest) {
  let body: unknown;
  let mutationId = getMutationId(request);
  try {
    const cartId = getCartIdFromRequest(request);
    if (!cartId) {
      const res = NextResponse.json(
        { error: "No hay carrito", meta: { clientMutationId: mutationId } },
        { status: 400 }
      );
      res.headers.set(MUTATION_HEADER, mutationId);
      return res;
    }

    body = await request.json();
    mutationId = getMutationId(request, body);
    const action = (body as { action?: string })?.action;
    const lineId = (body as { lineId?: string })?.lineId;

    if (!action || !lineId) {
      const res = NextResponse.json(
        { error: "action y lineId son obligatorios", meta: { clientMutationId: mutationId } },
        { status: 400 }
      );
      res.headers.set(MUTATION_HEADER, mutationId);
      return res;
    }

    let cart: Cart;

    if (action === "remove") {
      cart = await withRetry(() => removeCartLine(cartId, lineId));
    } else if (action === "update") {
      const quantity = Math.max(0, Math.min(Number((body as { quantity?: number })?.quantity) ?? 1, 99));
      if (quantity === 0) {
        cart = await withRetry(() => removeCartLine(cartId, lineId));
      } else {
        cart = await withRetry(() => updateCartLine(cartId, lineId, quantity));
      }
    } else {
      const res = NextResponse.json(
        { error: "action debe ser update o remove", meta: { clientMutationId: mutationId } },
        { status: 400 }
      );
      res.headers.set(MUTATION_HEADER, mutationId);
      return res;
    }

    const res = NextResponse.json({ cart, meta: { clientMutationId: mutationId } });
    res.headers.set(MUTATION_HEADER, mutationId);
    res.headers.set("Set-Cookie", setCartCookie(cart.id));
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar el carrito";
    console.error("[API cart PATCH]", { mutationId, error });
    const res = NextResponse.json({ error: message, meta: { clientMutationId: mutationId } }, { status: 400 });
    res.headers.set(MUTATION_HEADER, mutationId);
    return res;
  }
}

/**
 * DELETE /api/cart
 * Limpia la cookie del carrito (tras compra completada).
 */
export async function DELETE() {
  const mutationId = `srv_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const res = NextResponse.json({ ok: true, meta: { clientMutationId: mutationId } });
  res.headers.set(MUTATION_HEADER, mutationId);
  res.headers.set("Set-Cookie", clearCartCookie());
  return res;
}
