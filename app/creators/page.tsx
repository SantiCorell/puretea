import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Creadores",
    description: "Descubre colecciones y recomendaciones de creadores PureTea. Próximamente.",
    path: "/creators",
    noIndex: true,
  });
}

/**
 * Placeholder for future creator marketplace.
 * Will list creators and link to /creator/[slug].
 */
export default function CreatorsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
        Creadores
      </h1>
      <p className="mt-4 text-puretea-dark/80">
        Próximamente: colecciones curadas por creadores e influencers. Si quieres ser parte, escríbenos.
      </p>
    </div>
  );
}
