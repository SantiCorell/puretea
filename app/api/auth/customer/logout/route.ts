import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "puretea_customer_access_token";
const REFRESH_COOKIE = "puretea_customer_refresh_token";

export async function GET(request: NextRequest) {
  const logoutUrl =
    process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_LOGOUT_URL?.trim() || "";
  const site = new URL("/", request.nextUrl.origin);

  const res = logoutUrl.startsWith("http")
    ? NextResponse.redirect(logoutUrl)
    : NextResponse.redirect(site);

  res.cookies.delete(ACCESS_COOKIE);
  res.cookies.delete(REFRESH_COOKIE);

  return res;
}
