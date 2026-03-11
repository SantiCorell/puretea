import { Suspense } from "react"; // 1. Add this import
import { CartView } from "./CartView";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Carrito",
  description: "Revisa tu carrito y completa tu compra. Envíos a toda Europa.",
  path: "/cart",
});

export default function CartPage() {
  return (
    // 2. Wrap your view in Suspense
    <Suspense fallback={<div className="min-h-screen bg-puretea-cream animate-pulse" />}>
      <CartView />
    </Suspense>
  );
}