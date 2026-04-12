import { NextRequest, NextResponse } from "next/server";
import {
  CUSTOMER_OAUTH_COOKIES,
  getCustomerAccountConfig,
  isCustomerAccountOAuthConfigured,
} from "@/lib/shopify/customer-account-auth";

const COOKIE_STATE = "puretea_ca_state";
const COOKIE_VERIFIER = "puretea_ca_verifier";
const ACCESS_COOKIE = CUSTOMER_OAUTH_COOKIES.accessToken;
const ACCESS_MAX_AGE = 60 * 60 * 24 * 7; // 7 días máx.; Shopify suele mandar expires_in

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const err = url.searchParams.get("error");
  const desc = url.searchParams.get("error_description");
  if (err) {
    return NextResponse.redirect(
      new URL(`/account?error=${encodeURIComponent(desc || err)}`, url.origin)
    );
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) {
    return NextResponse.redirect(new URL("/account?error=missing_code", url.origin));
  }

  if (!isCustomerAccountOAuthConfigured()) {
    return NextResponse.redirect(new URL("/account?error=oauth_not_configured", url.origin));
  }

  const cookieState = request.cookies.get(COOKIE_STATE)?.value;
  const codeVerifier = request.cookies.get(COOKIE_VERIFIER)?.value;
  if (!cookieState || !codeVerifier || cookieState !== state) {
    return NextResponse.redirect(new URL("/account?error=invalid_state", url.origin));
  }

  const { clientId, tokenUrl, redirectUri } = getCustomerAccountConfig();
  if (!clientId || !tokenUrl) {
    return NextResponse.redirect(new URL("/account?error=config", url.origin));
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: codeVerifier,
  });

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const clearPkce = new URL("/", url.origin);
  const failRedirect = (msg: string) => {
    const r = NextResponse.redirect(new URL(`/account?error=${encodeURIComponent(msg)}`, url.origin));
    r.cookies.delete(COOKIE_STATE);
    r.cookies.delete(COOKIE_VERIFIER);
    return r;
  };

  if (!tokenRes.ok) {
    const t = await tokenRes.text();
    console.error("[customer callback] token exchange", tokenRes.status, t);
    return failRedirect(`token_${tokenRes.status}`);
  }

  const json = (await tokenRes.json()) as {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
    id_token?: string;
  };
  if (!json.access_token) {
    return failRedirect("no_access_token");
  }

  const maxAge =
    typeof json.expires_in === "number" && json.expires_in > 0
      ? Math.min(json.expires_in, ACCESS_MAX_AGE)
      : ACCESS_MAX_AGE;

  const res = NextResponse.redirect(new URL("/account?welcome=1", url.origin));
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(ACCESS_COOKIE, json.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  res.cookies.delete(COOKIE_STATE);
  res.cookies.delete(COOKIE_VERIFIER);

  if (json.id_token) {
    res.cookies.set(CUSTOMER_OAUTH_COOKIES.idToken, json.id_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge,
    });
  }

  if (json.refresh_token) {
    res.cookies.set(CUSTOMER_OAUTH_COOKIES.refreshToken, json.refresh_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });
  }

  return res;
}
