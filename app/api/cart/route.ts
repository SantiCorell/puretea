import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getCart,
  createCart,
  addLinesToCart,
  updateCartLine,
  removeCartLine,
  type Cart,
} from "@/lib/shopify/cart";

const CART_COOKIE = "puretea_cart_id";
const CART_MAX_AGE = 60 * 60 * 24 * 30; // 30 días

function getCartIdFromCookie(request: NextRequest): string | null {
  return request.cookies.get(CART_COOKIE)?.value ?? null;
}

function setCartCookie(cartId: string) {
  return `${CART_COOKIE}=${encodeURIComponent(cartId)}; Path=/; Max-Age=${CART_MAX_AGE}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}

function clearCartCookie() {
  return `${CART_COOKIE}=; Path=/; Max-Age=0`;
}

/**
 * GET /api/cart
 * Devuelve el carrito actual (por cookie). Incluye checkoutUrl para redirigir al pago.
 */
export async function GET(request: NextRequest) {
  try {
    const cartId = getCartIdFromCookie(request);
    if (!cartId) {
      return NextResponse.json({ cart: null });
    }
    const cart = await getCart(cartId);
    if (!cart) {
      const res = NextResponse.json({ cart: null });
      res.headers.set("Set-Cookie", clearCartCookie());
      return res;
    }
    return NextResponse.json({ cart });
  } catch (error) {
    console.warn("[API cart GET] reset cookie", error);
    const res = NextResponse.json({ cart: null });
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
  try {
    const body = await request.json();
    const variantId = body?.variantId;
    const quantity = Math.max(1, Math.min(Number(body?.quantity) || 1, 99));

    if (!variantId || typeof variantId !== "string") {
      return NextResponse.json(
        { error: "variantId es obligatorio" },
        { status: 400 }
      );
    }

    const cartId = getCartIdFromCookie(request);
    let cart: Cart;

    if (cartId) {
      try {
        cart = await addLinesToCart(cartId, variantId, quantity);
      } catch (e) {
        // Carrito inválido o expirado: crear uno nuevo
        cart = await createCart(variantId, quantity);
      }
    } else {
      cart = await createCart(variantId, quantity);
    }

    const res = NextResponse.json({ cart });
    res.headers.set("Set-Cookie", setCartCookie(cart.id));
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar el carrito";
    console.error("[API cart POST]", error);
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

/**
 * PATCH /api/cart
 * Body: { action: 'update' | 'remove', lineId: string, quantity?: number }
 */
export async function PATCH(request: NextRequest) {
  try {
    const cartId = getCartIdFromCookie(request);
    if (!cartId) {
      return NextResponse.json({ error: "No hay carrito" }, { status: 400 });
    }

    const body = await request.json();
    const action = body?.action;
    const lineId = body?.lineId;

    if (!action || !lineId) {
      return NextResponse.json(
        { error: "action y lineId son obligatorios" },
        { status: 400 }
      );
    }

    let cart: Cart;

    if (action === "remove") {
      cart = await removeCartLine(cartId, lineId);
    } else if (action === "update") {
      const quantity = Math.max(0, Math.min(Number(body?.quantity) ?? 1, 99));
      if (quantity === 0) {
        cart = await removeCartLine(cartId, lineId);
      } else {
        cart = await updateCartLine(cartId, lineId, quantity);
      }
    } else {
      return NextResponse.json({ error: "action debe ser update o remove" }, { status: 400 });
    }

    const res = NextResponse.json({ cart });
    res.headers.set("Set-Cookie", setCartCookie(cart.id));
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al actualizar el carrito";
    console.error("[API cart PATCH]", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/**
 * DELETE /api/cart
 * Limpia la cookie del carrito (tras compra completada).
 */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearCartCookie());
  return res;
}
