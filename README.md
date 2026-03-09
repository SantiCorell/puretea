# PureTea — Frontend

Frontend de ecommerce **headless** para **PureTea**. Next.js 15 (App Router) + Tailwind, preparado para conectarse a **Shopify** vía Storefront API.

## Stack

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **TailwindCSS**
- **Server Components** por defecto
- Datos: **mock** por defecto; **Shopify Storefront API** al configurar env

## Arquitectura Headless Shopify

- **Frontend (este repo):** UI, contenido, SEO, páginas de producto/colecciones/blog, flujo de conversión.
- **Backend (Shopify):** productos, inventario, pedidos, checkout, pagos, envíos, descuentos.

El checkout y el pago se realizan en **Shopify**. El frontend solo muestra productos y redirige al checkout de Shopify cuando el usuario compra.

## Capa de datos

```
lib/
  data.ts          → Punto de entrada: getProducts, getProductByHandle, getCollections, getCollectionByHandle
  shopify/
    client.ts      → shopifyFetch (GraphQL) — requiere env
    types.ts       → Tipos alineados con Storefront API
    products.ts    → getShopifyProducts, getShopifyProductByHandle
    collections.ts → getShopifyCollections, getShopifyCollectionByHandle
    checkout.ts   → Placeholder para URL de checkout
  mock/
    products.ts    → Productos de prueba
    collections.ts → Colecciones (matcha, green-tea, black-tea, herbal-tea, wellness-blends)
    blog.ts        → Artículos del blog
```

- **Por defecto** se usan los datos de `lib/mock/*`.
- **Para usar Shopify:** define `NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN` y `SHOPIFY_STOREFRONT_ACCESS_TOKEN`. En `lib/data.ts` se comprueba `isShopifyConfigured()` y se delega en `lib/shopify/*`.

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/shop` | Tienda (todos los productos) |
| `/category/[slug]` | Categoría (matcha, green-tea, black-tea, herbal-tea, wellness-blends) |
| `/product/[slug]` | Ficha de producto |
| `/collections` | Listado de colecciones |
| `/blog`, `/blog/[slug]` | Blog y artículo |
| `/about`, `/benefits`, `/how-to-brew` | Páginas de contenido |
| `/contact` | Contacto |
| `/creators`, `/creator/[slug]` | Placeholder para futuro marketplace de creadores |
| `/legal/privacy`, `/legal/terms` | Legales |

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build y producción

```bash
npm run build
npm start
```

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena:

- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio (SEO, OG, canonical).
- Para **Shopify:**  
  `NEXT_PUBLIC_SHOPIFY_STOREFRONT_DOMAIN`,  
  `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.  
  Opcional: `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` para enlaces de checkout.

## Estructura de assets

```
public/
  images/
    products/   → Imágenes de productos
    hero/       → Hero home, OG
    brand/      → Imágenes de marca
    icons/      → Iconos UI
    backgrounds/
    blog/
    categories/
  logos/        → Logo PureTea
```

Coloca aquí las imágenes reales (productos, hero, categorías, blog). Hay placeholders SVG donde hace falta.

**Hero:** `public/images/hero/tea-landscape.png` es el fondo del hero con efecto Ken Burns.

**Nosotros:** En `public/images/about/` puedes añadir: `hero-journey.jpg` (viaje/equipo en plantación), `origins-suppliers.jpg` (paisaje de orígenes), `selection-process.jpg` (catación/proceso), `ritual-quality.jpg` (ritual/taza). Actualiza las rutas en `app/about/page.tsx` (const `ABOUT_IMAGES`).

Para más transiciones en el hero, añade más rutas en `components/home/HeroBackground.tsx` (array `HERO_IMAGES`). Para video de fondo, añade `hero-video.mp4` en `public/images/hero/` y actívalo en el componente con `poster` para carga rápida.

## SEO

- Metadata y Open Graph en `lib/seo/metadata.ts`.
- Schema.org en `lib/seo/schema.ts`: Product, Article, FAQ, Organization, WebSite.
- Uso de `buildPageMetadata()` y scripts `application/ld+json` en las páginas.

## Diseño (PureTea)

- Colores en `tailwind.config.ts`: `puretea-dark`, `puretea-cream`, `puretea-organic`, `puretea-sand`, `puretea-gold`.
- Fuentes: Canela (títulos) y Satoshi (texto) — actualmente suplidas por Cormorant Garamond y DM Sans; se pueden sustituir por fuentes locales en `lib/fonts.ts`.
