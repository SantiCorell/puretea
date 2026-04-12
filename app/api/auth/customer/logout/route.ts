import { NextRequest, NextResponse } from "next/server";
import {
  CUSTOMER_OAUTH_COOKIES,
  getCustomerAccountConfig,
} from "@/lib/shopify/customer-account-auth";

/**
 * Cierre de sesión OIDC en Shopify: exige id_token_hint + post_logout_redirect_uri.
 * @see https://shopify.dev/docs/api/customer/latest#logging-out
 */
export async function GET(request: NextRequest) {
  const logoutUrlBase =
    process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_LOGOUT_URL?.trim() || "";
  const { postLogoutRedirectUri } = getCustomerAccountConfig();
  const origin = request.nextUrl.origin;

  const clearSession = (r: NextResponse) => {
    r.cookies.delete(CUSTOMER_OAUTH_COOKIES.accessToken);
    r.cookies.delete(CUSTOMER_OAUTH_COOKIES.refreshToken);
    r.cookies.delete(CUSTOMER_OAUTH_COOKIES.idToken);
    return r;
  };

  const backToAccount = () =>
    clearSession(
      NextResponse.redirect(new URL("/account", origin))
    );

  if (!logoutUrlBase.startsWith("http")) {
    return backToAccount();
  }

  const idToken = request.cookies.get(CUSTOMER_OAUTH_COOKIES.idToken)?.value;
  if (!idToken) {
    return backToAccount();
  }

  const endSession = new URL(logoutUrlBase);
  endSession.searchParams.set("id_token_hint", idToken);
  endSession.searchParams.set("post_logout_redirect_uri", postLogoutRedirectUri);

  return clearSession(NextResponse.redirect(endSession.toString()));
}
