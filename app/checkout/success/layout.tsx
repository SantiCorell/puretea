import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Pedido completado",
  description: "Gracias por tu compra. Recibirás la confirmación por email.",
  path: "/checkout/success",
});

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
