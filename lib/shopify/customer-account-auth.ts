/**
 * Customer Account API (Headless) — OAuth 2.0 con PKCE.
 * @see https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/authenticate-customers
 */

import { createHash, randomBytes } from "node:crypto";

const SCOPE = "openid email customer-account-api:full";

export function randomBase64Url(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

export function codeChallengeS256(verifier: string): string {
  return createHash("sha256").update(verifier, "utf8").digest("base64url");
}

export function getCustomerAccountConfig() {
  const clientId = process.env.NEXT_PUBLIC_CUSTOMER_ACCOUNT_CLIENT_ID?.trim();
  const authorizeUrl =
    process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_AUTHORIZE_URL?.trim() || "";
  const tokenUrl = process.env.SHOPIFY_CUSTOMER_TOKEN_URL?.trim() || "";
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const redirectUri =
    process.env.NEXT_PUBLIC_CUSTOMER_ACCOUNT_REDIRECT_URI?.trim() ||
    `${siteUrl}/api/auth/customer/callback`;

  return { clientId, authorizeUrl, tokenUrl, redirectUri, siteUrl };
}

export function isCustomerAccountOAuthConfigured(): boolean {
  const c = getCustomerAccountConfig();
  return Boolean(c.clientId && c.authorizeUrl && c.tokenUrl);
}

export function buildAuthorizeUrl(params: {
  codeChallenge: string;
  state: string;
  nonce: string;
}): string | null {
  const { clientId, authorizeUrl, redirectUri } = getCustomerAccountConfig();
  if (!clientId || !authorizeUrl) return null;

  const u = new URL(authorizeUrl);
  u.searchParams.set("client_id", clientId);
  u.searchParams.set("response_type", "code");
  u.searchParams.set("redirect_uri", redirectUri);
  u.searchParams.set("scope", SCOPE);
  u.searchParams.set("state", params.state);
  u.searchParams.set("nonce", params.nonce);
  u.searchParams.set("code_challenge", params.codeChallenge);
  u.searchParams.set("code_challenge_method", "S256");
  return u.toString();
}
