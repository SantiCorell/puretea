import { CartView } from "./CartView";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Carrito",
  description: "Revisa tu carrito y completa tu compra. Envíos a toda Europa.",
  path: "/cart",
});

export default function CartPage() {
  return <CartView />;
}
