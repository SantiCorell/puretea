import { NextResponse } from "next/server";
import { getShopifyAccessToken } from "@/lib/shopify";

/**
 * GET /api/shopify/token
 * Returns the Shopify Admin API access token (server-only).
 * Use for debugging or when another server component needs the token.
 */
export async function GET() {
  try {
    const accessToken = await getShopifyAccessToken();
    return NextResponse.json({ access_token: accessToken });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get access token";
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}
