import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { TopBanner } from "@/components/layout/TopBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCartButton } from "@/components/cart/FloatingCartButton";
import CartDrawer from "@/components/cart/CartDrawer"; // Import the Drawer
import { fontSatoshi, fontCanela } from "@/lib/fonts";
import { getCollections } from "@/lib/data";
import { CartProvider } from "@/context/CartContext"; 

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.puretea.es"),
  title: {
    default: "Comprar té online | Matcha, té verde y wellness | PureTea",
    template: "%s | PureTea",
  },
  description:
    "Comprar té online: matcha japonés, té verde, negro e infusiones premium. Envío gratis desde 50€. Pago seguro. PureTea — pure tea, pure ritual.",
  openGraph: {
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F2E23",
};

const FALLBACK_COLLECTIONS = [
  { handle: "matcha", title: "Matcha" },
  { handle: "green-tea", title: "Té verde" },
  { handle: "black-tea", title: "Té negro" },
  { handle: "herbal-tea", title: "Infusiones" },
  { handle: "wellness-blends", title: "Wellness" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let collections: { handle: string; title: string }[] = [];
  try {
    const cols = await getCollections();
    collections = cols.map((c) => ({ handle: c.handle, title: c.title }));
  } catch {
    collections = FALLBACK_COLLECTIONS;
  }

  if (collections.length === 0) collections = FALLBACK_COLLECTIONS;

  return (
    <html
      lang="es"
      className={`${fontSatoshi.variable} ${fontCanela.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fdfcf9] antialiased">
        <CartProvider>
          <TopBanner />
          <Navbar collections={collections} />

          <main className="flex-1">{children}</main>

          {/* This is crucial: The drawer MUST be here to handle the "setIsOpen" trigger */}
          <CartDrawer /> 
          <FloatingCartButton />
          <Footer />
          {process.env.NODE_ENV === "production" ? (
            <>
              <SpeedInsights />
              <Analytics />
            </>
          ) : null}
        </CartProvider>
      </body>
    </html>
  );
}