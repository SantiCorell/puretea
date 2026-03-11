import { Suspense } from "react";
import { CartView } from "./CartView";
import { buildPageMetadata } from "@/lib/seo/metadata";

// Metadata is good for SEO and ensures Vercel treats this as a real page
export const metadata = buildPageMetadata({
  title: "Carrito",
  description: "Revisa tu carrito y completa tu compra. Envíos a toda Europa.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf9]">
      {/* Suspense is CRITICAL here. 
        Without it, if CartView uses 'useSearchParams' or 'useCart', 
        Vercel will fail the build and keep showing the 404 from the old version.
      */}
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