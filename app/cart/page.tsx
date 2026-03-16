import { Suspense } from "react";
import { CartView } from "./CartView";
import { buildPageMetadata } from "@/lib/seo/metadata";

// CRITICAL: Prevents Next.js from prerendering this page at build time.
// CartView fetches live data from /api/cart — it must run at request time.
export const dynamic = 'force-dynamic';

export const metadata = buildPageMetadata({
  title: "Carrito",
  description: "Revisa tu carrito y completa tu compra. Envíos a toda Europa.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf9]">
      <Suspense fallback={
        <div className="min-h-screen bg-puretea-cream animate-pulse flex items-center justify-center">
          <p className="font-canela text-puretea-dark/40 italic">Cargando tu ritual...</p>
        </div>
      }>
        <CartView />
      </Suspense>
    </main>
  );
}