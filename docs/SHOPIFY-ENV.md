# Variables Shopify (local y producción)

## Versión de API Storefront (404 NOT_FOUND)

- Si **fallan todas** las versiones (2026-01 … 2024-10) con el mismo 404: el **`xxx.myshopify.com` está mal** (subdominio que no existe en Shopify). El nombre de la marca en el admin no es el subdominio: revisa **Ajustes → Dominios**.
- Prueba rápida: `curl -o /dev/null -w "%{http_code}" -X POST "https://TU-TIENDA.myshopify.com/api/2026-01/graphql.json" -H "Content-Type: application/json" -H "X-Shopify-Storefront-Access-Token: x" -d '{}' — **404** = tienda/host incorrecto; **401** = host OK, token mal.

**No fijes `SHOPIFY_API_VERSION=2024-01`** salvo que Shopify siga soportándola en tu plan.

---

## Qué va en cada variable

| Variable | Qué es |
|----------|--------|
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Dominio de la tienda: `tu-tienda.myshopify.com` (Ajustes → Dominios). |
| `SHOPIFY_STORE_DOMAIN` | El mismo valor (para Admin API en servidor). |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | **Token público** de la API Storefront (Headless). Va en el header `X-Shopify-Storefront-Access-Token`. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Mismo token (opcional; útil si solo quieres duplicar en servidor). |
| `SHOPIFY_ADMIN_ACCESS_TOKEN` | Token **privado** tipo `shpat_...` (Admin API). Solo servidor; nunca `NEXT_PUBLIC_`. |

No mezcles el `shpat_` con Storefront: el cliente GraphQL Storefront solo acepta el token público (o el token privado de Storefront si Shopify te lo da en ese formato, no el de Admin).

## Si ves 401 UNAUTHORIZED

Shopify devuelve 401 cuando **el token público de Storefront no pertenece a esa tienda** (dominio incorrecto) o el token fue revocado.

1. **Ajustes → Dominios** en Shopify: copia el dominio que termina en **`.myshopify.com`** (no el dominio personalizado tipo `puretea.es`).
2. Pon **exactamente** ese valor en `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STORE_DOMAIN`.
3. El **token público** debe ser el de **API Storefront** de esa misma tienda (Headless / canal sin autenticación). No uses el `shpat_` de Admin como token de Storefront.
4. Guarda `.env.local`, **para y vuelve a ejecutar** `npm run dev` (Next solo lee env al arrancar).

El **`xxx.myshopify.com` exacto** sale de **Ajustes → Dominios**. Si mezclas dominio de otra tienda o un subdominio inventado, Storefront responderá **401** aunque el token sea correcto para tu canal Headless.

## Customer Account API (login de clientes)

Variables en `.env.example`. Flujo:

1. Usuario entra en `/account` → **Continuar con PureTea** → `GET /api/auth/customer/login` (PKCE + cookies).
2. Shopify redirige a `GET /api/auth/customer/callback` con `code` → canje por `access_token` → cookie httpOnly `puretea_customer_access_token`.
3. **Cerrar sesión**: `GET /api/auth/customer/logout` (borra cookies; opcional redirect al logout de Shopify).

**Importante:** Shopify suele exigir **HTTPS** para el `redirect_uri` del Customer Account API. En local, configura **ngrok** (u otro túnel), registra `https://TU-TUNEL/api/auth/customer/callback` en el canal Headless y pon esa misma URL en `NEXT_PUBLIC_CUSTOMER_ACCOUNT_REDIRECT_URI` y `NEXT_PUBLIC_SITE_URL` si hace falta.

No uses el token `shpat_` como token de Storefront: el público de Storefront y el `shpat_` de Admin son cosas distintas al OAuth de clientes.

### Checklist en Shopify (Headless → API de cuenta de cliente → Configuración de la aplicación)

1. **URI de devolución de llamada:** exactamente igual que `NEXT_PUBLIC_CUSTOMER_ACCOUNT_REDIRECT_URI` (p. ej. producción `https://www.puretea.es/api/auth/customer/callback`; en local, la URL HTTPS del túnel + `/api/auth/customer/callback`).
2. **Origen(es) de Javascript:** el origen de tu front (p. ej. `https://www.puretea.es`; en desarrollo con túnel, el origen `https://....ngrok-free.app`).
3. **URI de cierre de sesión (opcional):** p. ej. `https://www.puretea.es` o la página a la que quieras volver tras logout.

Tras rotar credenciales, actualiza en `.env.local`: `NEXT_PUBLIC_CUSTOMER_ACCOUNT_CLIENT_ID`, tokens Storefront públicos y `SHOPIFY_ADMIN_ACCESS_TOKEN` (`shpat_`). **Reinicia** el servidor de Next.

## Archivos

- Copia `.env.example` a `.env.local` y rellena.
- `.env.local` no se sube a git (está en `.gitignore`).
