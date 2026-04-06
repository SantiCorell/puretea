import { NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  codeChallengeS256,
  getCustomerAccountConfig,
  isCustomerAccountOAuthConfigured,
  randomBase64Url,
} from "@/lib/shopify/customer-account-auth";

const COOKIE_STATE = "puretea_ca_state";
const COOKIE_VERIFIER = "puretea_ca_verifier";
const PKCE_MAX_AGE = 600;

export async function GET() {
  if (!isCustomerAccountOAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          "Customer Account API no configurada. Añade NEXT_PUBLIC_CUSTOMER_ACCOUNT_CLIENT_ID, NEXT_PUBLIC_SHOPIFY_CUSTOMER_AUTHORIZE_URL y SHOPIFY_CUSTOMER_TOKEN_URL en .env.local",
      },
      { status: 503 }
    );
  }

  const { redirectUri, siteUrl } = getCustomerAccountConfig();
  const accountBase = new URL(siteUrl);

  // Shopify Customer Account API: HTTPS obligatorio y no admite localhost (docs Headless).
  try {
    const u = new URL(redirectUri);
    const host = u.hostname.toLowerCase();
    const disallowedHost = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
    if (u.protocol !== "https:" || disallowedHost) {
      accountBase.pathname = "/account";
      accountBase.searchParams.set("error", "oauth_https_required");
      return NextResponse.redirect(accountBase);
    }
  } catch {
    accountBase.pathname = "/account";
    accountBase.searchParams.set("error", "oauth_bad_redirect_uri");
    return NextResponse.redirect(accountBase);
  }

  const codeVerifier = randomBase64Url(32);
  const state = randomBase64Url(16);
  const nonce = randomBase64Url(16);
  const codeChallenge = codeChallengeS256(codeVerifier);

  const url = buildAuthorizeUrl({ codeChallenge, state, nonce });
  if (!url) {
    return NextResponse.json({ error: "No se pudo construir la URL de autorización" }, { status: 500 });
  }

  const res = NextResponse.redirect(url);
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(COOKIE_STATE, state, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: PKCE_MAX_AGE,
  });
  res.cookies.set(COOKIE_VERIFIER, codeVerifier, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: PKCE_MAX_AGE,
  });
  return res;
}
