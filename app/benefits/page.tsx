import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { benefitsPageSchema } from "@/lib/seo/schema";

const BENEFITS_FAQ = [
  {
    question: "¿Cuáles son los beneficios del matcha?",
    answer: "El matcha aporta antioxidantes (EGCG), L-teanina para concentración sin nerviosismo y energía sostenida. Al consumir la hoja entera en polvo, concentras más nutrientes que en una infusión de té verde. Es ideal para un ritual matutino o para mantener el foco sin el pico de cafeína del café.",
  },
  {
    question: "¿El té verde tiene cafeína?",
    answer: "Sí, el té verde contiene cafeína en menor cantidad que el café. La L-teanina del té modula su efecto, dando una sensación de alerta tranquila en lugar de nerviosismo. Una taza de té verde suele tener entre 25 y 45 mg de cafeína, frente a unos 80–100 mg en un café.",
  },
  {
    question: "¿Qué té es mejor para relajarse?",
    answer: "Las infusiones sin cafeína como manzanilla, lavanda, pasiflora o valeriana son ideales para relajarse. Nuestros blends de wellness para relax combinan estas plantas. El té verde y el matcha también pueden ayudar por la L-teanina, que favorece un estado de calma concentrada.",
  },
  {
    question: "¿Qué té ayuda a concentrarse?",
    answer: "El matcha y el té verde son excelentes para la concentración gracias a la combinación de cafeína y L-teanina. Nuestro Focus Blend suma té verde con ginkgo y romero, pensado para sesiones de estudio o trabajo que requieren foco sostenido.",
  },
];

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Beneficios del té — Matcha, verde, negro e infusiones para tu bienestar",
    description:
      "Guía de los beneficios del matcha, té verde, té negro e infusiones. Antioxidantes, L-teanina, energía calmada, concentración y relax. Por qué el té mejora tu día.",
    path: "/benefits",
    image: "/images/benefits/benefits-hero.png",
  });
}

export default function BenefitsPage() {
  const schema = benefitsPageSchema(BENEFITS_FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <article className="benefits-page">
        {/* Hero con imagen inspiradora */}
        <header className="relative h-[45vh] min-h-[280px] flex items-end pb-10 lg:pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/benefits/benefits-hero.png"
              alt="Variedad de tés premium PureTea: matcha, té verde, té negro e infusiones para tu bienestar"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-puretea-dark/85 via-puretea-dark/30 to-transparent" />
          </div>
          <div className="relative z-10 max-w-4xl">
            <h1 className="font-canela text-4xl sm:text-5xl lg:text-6xl text-puretea-cream font-semibold tracking-tight">
              Beneficios del té que cambian tu día
            </h1>
            <p className="mt-3 text-lg text-puretea-sand max-w-2xl">
              Matcha, verde, negro e infusiones: cada uno tiene algo que ofrecerte. Energía calmada, foco, relax o un momento solo para ti.
            </p>
          </div>
        </header>

        {/* Introducción: por qué esta página importa para el usuario */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16" aria-labelledby="intro-heading">
          <h2 id="intro-heading" className="sr-only">
            Por qué el té mejora tu bienestar
          </h2>
          <p className="font-canela text-xl sm:text-2xl text-puretea-dark leading-relaxed">
            El té no es solo una bebida: es uno de los rituales de bienestar más antiguos del mundo. En PureTea hemos elegido cada referencia pensando en lo que tú necesitas — concentrarte por la mañana, relajarte por la noche o simplemente regalarte un momento de calma. Aquí tienes una guía clara de los beneficios del matcha, del té verde, del té negro y de las infusiones, para que elijas con criterio.
          </p>
        </section>

        {/* Matcha y té verde */}
        <section className="bg-puretea-organic/10 py-12 lg:py-16" aria-labelledby="matcha-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="matcha-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark">
              Beneficios del matcha y del té verde
            </h2>
            <p className="mt-4 text-puretea-dark/85 text-lg leading-relaxed">
              El <strong>matcha</strong> es té verde en polvo: consumes la hoja entera, por lo que concentras más antioxidantes (como el EGCG), vitaminas y minerales que en una infusión. La <strong>L-teanina</strong>, un aminoácido presente en el té verde y sobre todo en el matcha, trabaja junto con la cafeína para darte <strong>energía sostenida sin nerviosismo</strong> — ideal para arrancar el día o para mantener la concentración en el trabajo o al estudiar.
            </p>
            <ul className="mt-6 space-y-2 text-puretea-dark/85">
              <li><strong className="text-puretea-dark">Antioxidantes:</strong> ayudan a proteger las células del estrés oxidativo.</li>
              <li><strong className="text-puretea-dark">Energía calmada:</strong> cafeína + L-teanina = alerta sin picos ni bajones.</li>
              <li><strong className="text-puretea-dark">Ritual:</strong> preparar matcha o té verde te obliga a una pausa — bienestar mental.</li>
            </ul>
            <p className="mt-6">
              <Link href="/category/matcha" className="text-puretea-organic font-semibold hover:underline">
                Ver matcha y té verde →
              </Link>
            </p>
          </div>
        </section>

        {/* Té negro */}
        <section className="py-12 lg:py-16" aria-labelledby="black-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="black-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark">
              Beneficios del té negro
            </h2>
            <p className="mt-4 text-puretea-dark/85 text-lg leading-relaxed">
              El <strong>té negro</strong> tiene más cafeína que el verde y un sabor más intenso. Es el compañero clásico del desayuno o de la tarde: te despierta y acompaña sin necesidad de mucho más. Earl Grey, Assam, Ceylán… cada origen aporta carácter. Los beneficios del té negro incluyen aporte de antioxidantes y una dosis moderada de cafeína para mantenerte despierto y concentrado cuando lo necesitas.
            </p>
            <ul className="mt-6 space-y-2 text-puretea-dark/85">
              <li><strong className="text-puretea-dark">Cafeína moderada:</strong> ideal para mañanas o tardes sin pasarte.</li>
              <li><strong className="text-puretea-dark">Sabor intenso:</strong> perfecto con un poco de leche o solo.</li>
              <li><strong className="text-puretea-dark">Variedad:</strong> desde clásicos británicos hasta tés de origen único.</li>
            </ul>
            <p className="mt-6">
              <Link href="/category/black-tea" className="text-puretea-organic font-semibold hover:underline">
                Ver té negro →
              </Link>
            </p>
          </div>
        </section>

        {/* Infusiones herbales */}
        <section className="bg-puretea-sand/40 py-12 lg:py-16" aria-labelledby="herbal-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="herbal-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark">
              Beneficios de las infusiones herbales
            </h2>
            <p className="mt-4 text-puretea-dark/85 text-lg leading-relaxed">
              Las <strong>infusiones sin cafeína</strong> — manzanilla, lavanda, rooibos, menta, jengibre… — son ideales para la noche, para momentos de relax o para quien quiere reducir la cafeína. No son «té» en sentido estricto (no vienen de la planta del té), pero forman parte del mismo ritual: una taza caliente, un respiro, un momento para ti. Sus beneficios dependen de la planta: digestión, calma, sueño o simplemente hidratación con sabor.
            </p>
            <ul className="mt-6 space-y-2 text-puretea-dark/85">
              <li><strong className="text-puretea-dark">Sin cafeína:</strong> aptas a cualquier hora, sobre todo antes de dormir.</li>
              <li><strong className="text-puretea-dark">Relajación:</strong> manzanilla, lavanda y pasiflora favorecen la calma.</li>
              <li><strong className="text-puretea-dark">Ritual igual de valioso:</strong> la pausa y el calor importan tanto como la planta.</li>
            </ul>
            <p className="mt-6">
              <Link href="/category/herbal-tea" className="text-puretea-organic font-semibold hover:underline">
                Ver infusiones herbales →
              </Link>
            </p>
          </div>
        </section>

        {/* Wellness blends */}
        <section className="py-12 lg:py-16" aria-labelledby="wellness-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="wellness-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark">
              Beneficios de los wellness blends
            </h2>
            <p className="mt-4 text-puretea-dark/85 text-lg leading-relaxed">
              Nuestros <strong>blends de bienestar</strong> están pensados para un objetivo concreto: <strong>focus</strong> (concentración), <strong>energía</strong> o <strong>relax</strong>. Combinamos té verde, plantas y a veces especias para que cada taza te acerque a lo que necesitas — sin ingredientes raros, con trazabilidad y con el mismo nivel de calidad que el resto de PureTea. Si buscas «té para estudiar», «té para relajarse» o «té para la concentración», aquí encontrarás opciones claras.
            </p>
            <ul className="mt-6 space-y-2 text-puretea-dark/85">
              <li><strong className="text-puretea-dark">Focus:</strong> té verde + ginkgo + romero para sesiones de trabajo o estudio.</li>
              <li><strong className="text-puretea-dark">Relax:</strong> pasiflora, valeriana, manzanilla — sin cafeína, para desconectar.</li>
              <li><strong className="text-puretea-dark">Ingredientes reales:</strong> mezclas cuidadas, no «sabor a» artificial.</li>
            </ul>
            <p className="mt-6">
              <Link href="/category/wellness-blends" className="text-puretea-organic font-semibold hover:underline">
                Ver wellness blends →
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ para SEO y rich results */}
        <section className="bg-puretea-organic/10 py-12 lg:py-16" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="faq-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-10">
              Preguntas frecuentes sobre los beneficios del té
            </h2>
            <dl className="space-y-8">
              {BENEFITS_FAQ.map((faq, i) => (
                <div key={i}>
                  <dt className="font-semibold text-puretea-dark text-lg">{faq.question}</dt>
                  <dd className="mt-2 text-puretea-dark/85 leading-relaxed">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="sr-only">
            Descubre nuestros tés
          </h2>
          <p className="text-puretea-dark/85 text-lg">
            Elige el té que mejor se adapte a tu momento.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-organic transition-colors"
          >
            Ver toda la tienda
          </Link>
        </section>
      </article>
    </>
  );
}
