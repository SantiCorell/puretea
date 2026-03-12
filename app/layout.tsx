import type { Metadata } from "next";
import "./globals.css";
import { TopBanner } from "@/components/layout/TopBanner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCartButton } from "@/components/cart/FloatingCartButton";
import { fontSatoshi, fontCanela } from "@/lib/fonts";
import { getCollections } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://puretea.es"),
  title: {
    default: "PureTea | Premium Tea & Wellness",
    template: "%s | PureTea",
  },
  description:
    "Premium tea brand. Japanese matcha, green tea, black tea, herbal infusions and wellness blends. Pure tea, pure ritual.",
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
      <body className="min-h-screen flex flex-col bg-[#fdfcf9] antialiased">
        <TopBanner />
        <Navbar collections={collections} />

        <main className="flex-1">{children}</main>

        <FloatingCartButton />
        <Footer />
      </body>
    </html>
  );
}