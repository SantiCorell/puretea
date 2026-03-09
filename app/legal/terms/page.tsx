import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Términos y condiciones",
    description: "Términos de uso y condiciones de compra de PureTea.",
    path: "/legal/terms",
  });
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Términos y condiciones
      </h1>
      <p className="mt-4 text-puretea-dark/80">
        Las compras en PureTea se rigen por los términos de uso de Shopify y nuestras condiciones de envío y devoluciones. Para cualquier duda, contacta con nosotros.
      </p>
    </div>
  );
}
