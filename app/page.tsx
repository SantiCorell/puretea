import dynamic from "next/dynamic";
import { getCollections, getProducts } from "@/lib/data";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/ui/CTASection";
import { ConversionStrip } from "@/components/home/ConversionStrip";
import { WhyPureTea } from "@/components/home/WhyPureTea";
import { HomeSeoBlock } from "@/components/home/HomeSeoBlock";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema, faqSchema } from "@/lib/seo/schema";

const ReviewsSection = dynamic(
  () =>
    import("@/components/home/ReviewsSection").then((m) => ({
      default: m.ReviewsSection,
    })),
  {
    loading: () => (
      <div className="min-h-[280px] py-16 lg:py-24 px-4" aria-hidden />
    ),
  }
);

const HomeFAQ = dynamic(
  () =>
    import("@/components/home/HomeFAQ").then((m) => ({
      default: m.HomeFAQ,
    })),
  {
    loading: () => (
      <div className="min-h-[320px] py-16 lg:py-24 px-4 bg-white" aria-hidden />
    ),
  }
);

export const revalidate = 120;

const HOME_FAQ = [
  {
    question: "¿Cuál es la política de devoluciones?",
    answer: "Puedes devolver tu pedido en un plazo de 30 días si no está abierto o usado. El reembolso se procesa en un plazo de 5-7 días laborables. Contáctanos y te indicamos los pasos. Tu satisfacción es nuestra prioridad.",
  },
  {
    question: "¿Alguna compra es final y no tiene devolución?",
    answer: "Los productos sellados y sin abrir pueden devolverse. Si el envase está abierto por higiene no aceptamos devolución, pero si hay un defecto o error en tu pedido, lo resolvemos sin coste para ti.",
  },
  {
    question: "¿Cuándo recibiré mi pedido?",
    answer: "Enviamos a toda Europa. Los plazos habituales son 3-5 días laborables en la península y 5-10 días en el resto de Europa. Recibirás un email con el seguimiento en cuanto despachemos tu pedido.",
  },
  {
    question: "¿Dónde se fabrican vuestros productos?",
    answer: "Nuestros tés y matcha provienen de proveedores seleccionados en Japón, China y Ceylán. Hemos visitado orígenes y trabajamos solo con productores que cumplen nuestros estándares de calidad y trazabilidad.",
  },
  {
    question: "¿Cuánto cuesta el envío?",
    answer: "Envío gratis a partir de 50€. Por pedidos inferiores, el coste se calcula en el checkout según destino y peso. Siempre puedes ver el coste antes de pagar.",
  },
];

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Comprar té online | Tés premium, matcha y envío gratis +50€ | PureTea",
    description:
      "Comprar té online con envío gratis desde 50€. Matcha ceremonial, té verde, negro, infusiones y wellness. Valoración excelente · Pago seguro · Compra ahora.",
    path: "/",
    image: "/images/hero/og-default.jpg",
  });
}

export default async function HomePage() {
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  const [collections, { products }] = await Promise.all([
    getCollections(),
    getProducts({ first: 8 }),
  ]);

  const categories = collections.map((c) => ({
    handle: c.handle,
    title: c.title,
    description: c.description,
    image: c.image?.url ?? "/images/categories/placeholder.svg",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema(),
      websiteSchema(),
      faqSchema(HOME_FAQ),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero />
      <ConversionStrip />
      <WhyPureTea />
      <StatsSection />
      <HomeSeoBlock />
      <CategoryGrid categories={categories} />
      <section
        className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-puretea-cream"
        aria-labelledby="featured-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            id="featured-heading"
            className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center mb-12"
          >
            Tés destacados — compra online
          </h2>
          <ProductGrid products={products} shopifyDomain={shopifyDomain} />
        </div>
      </section>
      <BenefitsSection />
      <ReviewsSection />
      <HomeFAQ items={HOME_FAQ} title="Preguntas frecuentes" />
      <CTASection
        title="Únete al ritual de miles de personas"
        description="El mejor té no es un capricho: es tu pausa consciente. Envío gratis desde 50€ y devoluciones claras."
        buttonLabel="Ir a la tienda"
        buttonHref="/shop"
      />
    </>
  );
}