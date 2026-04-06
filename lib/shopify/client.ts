/**
 * Shopify Storefront API (solo esta API, no Admin).
 * Scopes necesarios en la app: unauthenticated_read_product_listings, carrito/checkout, etc.
 */

// We use the NEXT_PUBLIC prefix so the Debug Tool can see these values in the browser
const domain = (
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
  process.env.SHOPIFY_STORE_DOMAIN ||
  ""
).trim();
/** Solo token público Storefront en `X-Shopify-Storefront-Access-Token` (el shpat_ es Admin, no Storefront). */
const token = (
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  ""
).trim();

/** Versiones probadas en orden si la tienda devuelve 404 (API antigua retirada). */
const DEFAULT_API_VERSION_CHAIN = ["2026-01", "2025-10", "2025-07", "2025-04", "2024-10"];

function getApiVersionCandidates(): string[] {
  const fromEnv = process.env.SHOPIFY_API_VERSION?.trim();
  if (fromEnv) {
    const rest = DEFAULT_API_VERSION_CHAIN.filter((v) => v !== fromEnv);
    return [fromEnv, ...rest];
  }
  return [...DEFAULT_API_VERSION_CHAIN];
}

const SHOPIFY_401_HINT =
  "401 Unauthorized: el token PÚBLICO de Storefront y el dominio xxx.myshopify.com deben ser de la MISMA tienda. " +
  "En Shopify: Ajustes → Dominios (copia el dominio .myshopify.com). " +
  "En Headless / API Storefront: copia el token público de esa tienda. " +
  "Reinicia el servidor (npm run dev) tras cambiar .env.local.";

const SHOPIFY_404_HINT =
  "Storefront 404 en TODAS las versiones: casi siempre el host .myshopify.com NO existe (nombre inventado o tienda distinta). " +
  "En Shopify: Ajustes → Dominios → copia el dominio que termina en .myshopify.com (el subdominio puede no parecerse al nombre de la marca). " +
  "El nombre visible «Pure Tea» no tiene por qué coincidir con el subdominio.";

type GraphQLBody<T> = { data?: T; errors?: { message?: string; extensions?: { code?: string } }[] };

async function storefrontRequest(
  apiVersion: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<{ httpStatus: number; body: GraphQLBody<unknown> | null; rawText: string }> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
    },
  });

  const rawText = await res.text();
  let body: GraphQLBody<unknown> | null = null;
  try {
    body = JSON.parse(rawText) as GraphQLBody<unknown>;
  } catch {
    body = null;
  }
  return { httpStatus: res.status, body, rawText };
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  if (!domain || !token) {
    throw new Error(
      "Faltan variables de Storefront en .env.local: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN y NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN."
    );
  }

  const versions = getApiVersionCandidates();
  let lastHttpError: string | null = null;

  for (let i = 0; i < versions.length; i++) {
    const apiVersion = versions[i];
    const { httpStatus, body, rawText } = await storefrontRequest(apiVersion, query, variables);

    if (httpStatus === 404) {
      lastHttpError = `404 ${rawText.slice(0, 200)}`;
      if (i < versions.length - 1) {
        continue;
      }
      throw new Error(
        `${SHOPIFY_404_HINT} Último intento (${apiVersion}): ${lastHttpError} | dominio: ${domain}`
      );
    }

    if (httpStatus === 401) {
      throw new Error(`${SHOPIFY_401_HINT} (dominio usado: ${domain})`);
    }

    if (!body || typeof body !== "object") {
      throw new Error(`Shopify API error: ${httpStatus} ${rawText.slice(0, 500)}`);
    }

    if (httpStatus < 200 || httpStatus >= 300) {
      throw new Error(`Shopify API error: ${httpStatus} ${rawText.slice(0, 500)}`);
    }

    if (body.errors?.length) {
      const msg = body.errors
        .map((e) => e.message || e.extensions?.code || "")
        .filter(Boolean)
        .join(", ");
      throw new Error(msg || "Error GraphQL en Storefront");
    }

    if (body.data === undefined) {
      throw new Error(`Respuesta Storefront inválida: ${rawText.slice(0, 300)}`);
    }

    return body.data as T;
  }

  throw new Error(lastHttpError || "Shopify Storefront: sin respuesta válida");
}

export function isShopifyConfigured(): boolean {
  return Boolean(domain && token);
}
