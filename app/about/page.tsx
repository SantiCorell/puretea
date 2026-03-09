import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { aboutPageSchema } from "@/lib/seo/schema";
import { faqSchema } from "@/lib/seo/schema";

const ABOUT_IMAGES = {
  hero: "/images/about/hero-journey.png",
  origins: "/images/about/origins-suppliers.png",
  selection: "/images/about/selection-process.png",
  ritual: "/images/about/ritual-quality.png",
};

const ABOUT_FAQS = [
  {
    question: "¿De dónde viene el té PureTea?",
    answer: "Trabajamos con proveedores seleccionados en Japón (matcha y tés verdes), China (tés verdes y oolong) y Ceylán (tés negros). Cada origen nos permite ofrecer trazabilidad y la mejor relación calidad-precio.",
  },
  {
    question: "¿Por qué elegir PureTea?",
    answer: "Porque hemos viajado a los orígenes para conocer a los productores, ver las plantaciones y seleccionar solo los lotes que cumplen nuestros estándares. No compramos a granel sin criterio: cada referencia tiene una historia y un origen que podemos contarte.",
  },
  {
    question: "¿Qué significa «pure tea, pure ritual»?",
    answer: "Para nosotros cada taza es un momento de pausa y bienestar. El té que ofrecemos es puro en origen e ingredientes; el ritual es el momento que te regalas al prepararlo y disfrutarlo.",
  },
];

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Nosotros — Nuestra historia y compromiso con el té premium",
    description:
      "Hemos viajado a Japón, China y Ceylán para seleccionar a los mejores proveedores de té. Conoce la historia de PureTea, nuestro proceso de selección y por qué cada taza cuenta.",
    path: "/about",
    image: ABOUT_IMAGES.hero,
  });
}

export default function AboutPage() {
  const schemaAbout = aboutPageSchema();
  const schemaFaq = faqSchema(ABOUT_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaAbout) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      <article className="about-page">
        {/* Hero: imagen inspiradora de viaje / orígenes */}
        <header className="relative h-[50vh] min-h-[320px] flex items-end pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={ABOUT_IMAGES.hero}
              alt="Equipo PureTea en plantación de té en Asia — selección de proveedores en origen"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-puretea-dark/90 via-puretea-dark/40 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <h1 className="font-canela text-4xl sm:text-5xl lg:text-6xl text-puretea-cream font-semibold tracking-tight">
              Hemos viajado para traerte el mejor té
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-puretea-sand max-w-2xl">
              Japón, China, Ceylán. Donde nace el té, seleccionamos a los mejores proveedores para ti.
            </p>
          </div>
        </header>

        {/* Introducción: conexión emocional */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="sr-only">
            La historia de PureTea
          </h2>
          <p className="font-canela text-2xl sm:text-3xl text-puretea-dark leading-relaxed">
            PureTea nace de una obsesión: que cada taza que tomes sea digna de un ritual. No queríamos vender «cualquier té»: queríamos conocer a las personas que lo cultivan, pisar las tierras donde crece y elegir solo lo que nosotros mismos tomaríamos cada día.
          </p>
          <p className="mt-8 text-puretea-dark/85 text-lg leading-relaxed">
            Por eso hemos viajado a los orígenes. En Japón, en las regiones de Uji y Kagoshima, seleccionamos matcha y tés verdes de productores que mantienen métodos tradicionales. En China, exploramos jardines de té verde y oolong con décadas de experiencia. En Ceylán, trabajamos con fincas que nos permiten trazabilidad total. El resultado no es un catálogo genérico: es una selección consciente, con nombres y lugares que podemos contarte.
          </p>
        </section>

        {/* Imagen: orígenes / plantaciones */}
        <section className="w-full" aria-hidden>
          <div className="relative aspect-[21/9] sm:aspect-[3/1] max-h-[400px]">
            <Image
              src={ABOUT_IMAGES.origins}
              alt="Plantaciones de té en Asia — orígenes de los tés PureTea"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-puretea-dark/20" />
          </div>
        </section>

        {/* Proceso de selección */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="selection-heading">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-puretea-sand/30">
              <Image
                src={ABOUT_IMAGES.selection}
                alt="Proceso de selección de proveedores PureTea — catación y calidad"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 id="selection-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark">
                No elegimos proveedores por catálogo
              </h2>
              <p className="mt-6 text-puretea-dark/85 text-lg leading-relaxed">
                Cada referencia que ves en PureTea ha pasado por catación, revisión de trazabilidad y, cuando es posible, visita in situ. Nos interesa la historia del producto: cómo se cultiva, cómo se procesa y quién está detrás. Solo así podemos ofrecerte té con el que nos sentimos cómodos recomendando a nuestra propia familia.
              </p>
              <p className="mt-4 text-puretea-dark/85 text-lg leading-relaxed">
                Trabajamos con productores que comparten nuestra visión: calidad sin atajos, respeto por el medio ambiente y condiciones justas. El resultado son tés e infusiones que inspiran un ritual diario — pure tea, pure ritual.
              </p>
            </div>
          </div>
        </section>

        {/* Valores / compromiso */}
        <section className="bg-puretea-organic/10 py-16 lg:py-24" aria-labelledby="values-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="values-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center">
              Lo que nos guía
            </h2>
            <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 list-none">
              <li>
                <h3 className="font-canela text-xl font-semibold text-puretea-dark">Origen real</h3>
                <p className="mt-2 text-puretea-dark/80">Proveedores visitados y seleccionados en Japón, China y Ceylán.</p>
              </li>
              <li>
                <h3 className="font-canela text-xl font-semibold text-puretea-dark">Trazabilidad</h3>
                <p className="mt-2 text-puretea-dark/80">Sabemos de qué finca o región viene cada té que vendemos.</p>
              </li>
              <li>
                <h3 className="font-canela text-xl font-semibold text-puretea-dark">Calidad sin atajos</h3>
                <p className="mt-2 text-puretea-dark/80">Catación y estándares claros antes de sumar cualquier referencia.</p>
              </li>
              <li>
                <h3 className="font-canela text-xl font-semibold text-puretea-dark">Ritual y bienestar</h3>
                <p className="mt-2 text-puretea-dark/80">Cada taza como un momento para ti: pure tea, pure ritual.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Imagen ritual / calidad */}
        <section className="w-full" aria-hidden>
          <div className="relative aspect-[21/9] sm:aspect-[3/1] max-h-[360px]">
            <Image
              src={ABOUT_IMAGES.ritual}
              alt="Ritual del té — calidad y momento de bienestar PureTea"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-puretea-dark/30" />
          </div>
        </section>

        {/* CTA + FAQ para SEO */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-10">
            Preguntas frecuentes sobre nosotros
          </h2>
          <dl className="space-y-8">
            {ABOUT_FAQS.map((faq, i) => (
              <div key={i}>
                <dt className="font-semibold text-puretea-dark text-lg">{faq.question}</dt>
                <dd className="mt-2 text-puretea-dark/85 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-organic transition-colors"
            >
              Descubre nuestros tés
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
