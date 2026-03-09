import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Privacidad",
    description: "Política de privacidad de PureTea.",
    path: "/legal/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Política de privacidad
      </h1>
      <p className="mt-4 text-puretea-dark/80">
        En PureTea respetamos tu privacidad. Los datos de tu cuenta y pedidos se procesan de forma segura a través de Shopify. Consulta la política de privacidad de Shopify para más detalles sobre el tratamiento de datos en la tienda.
      </p>
    </div>
  );
}
