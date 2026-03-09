import { NextResponse } from "next/server";
import { getProducts, type ShopifyProduct, type ProductListItem } from "@/lib/shopify";

function normalizeForList(p: ShopifyProduct): ProductListItem {
  const variant = p.variants?.[0];
  const image = p.images?.[0]?.src ?? null;
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    image,
    price: variant?.price ?? "0",
    compareAtPrice: variant?.compare_at_price ?? null,
  };
}

/**
 * GET /api/shopify/products
 * Fetches products from Shopify Admin API and returns normalized JSON.
 * Handles: invalid token, API errors, empty list.
 */
export async function GET() {
  try {
    const products = await getProducts();

    if (!products.length) {
      return NextResponse.json(
        { products: [], message: "No products found." },
        { status: 200 }
      );
    }

    const list = products.map(normalizeForList);
    return NextResponse.json({ products: list });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Shopify API error";
    const isAuth = message.toLowerCase().includes("oauth") || message.toLowerCase().includes("token");
    return NextResponse.json(
      { error: message },
      { status: isAuth ? 401 : 502 }
    );
  }
}
