import Image from "next/image";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { BrewSteps } from "@/components/brew/BrewSteps";

const BREW_GUIDES = [
  {
    id: "matcha",
    title: "Matcha",
    intro: "El matcha se prepara batiendo el polvo con agua. Sin infusión: consumes la hoja entera.",
    image: "/images/blog/how-to-matcha.png",
    steps: [
      "Calienta el agua a 75–80 °C (no hirviendo). Si hierve, deja enfriar 1–2 min.",
      "Pon 1–2 g de matcha (½ cucharadita) en un cuenco (chawan).",
      "Añade 60–80 ml de agua y mezcla con el batidor (chasen) en movimiento suave W o M.",
      "Bate hasta que salga espuma fina y no queden grumos. Sirve al momento.",
    ],
    cta: "/category/matcha",
    ctaLabel: "Ver matcha PureTea",
  },
  {
    id: "green",
    title: "Té verde (hojas)",
    intro: "El té verde pide agua por debajo del punto de ebullición para no amargar.",
    image: "/images/blog/best-time-green-tea.png",
    steps: [
      "Calienta el agua a 75–85 °C. Si usas hervidor, deja reposar 1–2 min tras hervir.",
      "Usa 1 cucharadita de hojas por taza (aprox. 2 g).",
      "Vierte el agua sobre las hojas y tapa. Deja infusionar 2–3 min.",
      "Retira las hojas y disfruta. Puedes reutilizar las hojas 1–2 veces más.",
    ],
    cta: "/category/green-tea",
    ctaLabel: "Ver té verde",
  },
  {
    id: "black",
    title: "Té negro",
    intro: "El té negro aguanta agua recién hervida y tiempos más largos.",
    image: "/images/blog/earl-grey.png",
    steps: [
      "Lleva el agua a ebullición (100 °C).",
      "Usa 1 cucharadita de té negro por taza (aprox. 2 g).",
      "Vierte el agua sobre las hojas. Tapa y deja 3–5 min según intensidad.",
      "Retira las hojas. Puedes añadir un poco de leche o limón si te gusta.",
    ],
    cta: "/category/black-tea",
    ctaLabel: "Ver té negro",
  },
  {
    id: "herbal",
    title: "Infusiones herbales",
    intro: "Sin cafeína: agua hirviendo y reposo largo para sacar todo el sabor.",
    image: "/images/blog/herbal-sleep.png",
    steps: [
      "Hierve el agua y viértela sobre las hierbas (1 cucharadita por taza).",
      "Tapa la taza o la tetera para que no se escapen los aceites esenciales.",
      "Deja reposar 5–7 min (o más si quieres más intensidad).",
      "Retira las hierbas y disfruta. Ideales por la noche o para relajarte.",
    ],
    cta: "/category/herbal-tea",
    ctaLabel: "Ver infusiones",
  },
];

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Cómo preparar el té — Matcha, verde, negro e infusiones",
    description:
      "Guía paso a paso para preparar matcha, té verde, té negro e infusiones. Temperatura y tiempo. PureTea.",
    path: "/how-to-brew",
  });
}

export default function HowToBrewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <header className="text-center mb-16">
        <h1 className="font-canela text-4xl sm:text-5xl text-puretea-dark">
          Cómo preparar el té
        </h1>
        <p className="mt-4 text-lg text-puretea-dark/80 max-w-2xl mx-auto">
          Proceso transparente, paso a paso. Temperatura y tiempo para un resultado perfecto.
        </p>
      </header>

      <div className="space-y-20">
        {BREW_GUIDES.map((guide) => (
          <section
            key={guide.id}
            id={guide.id}
            className="scroll-mt-24"
            aria-labelledby={`${guide.id}-heading`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
              <div className="lg:w-48 shrink-0">
                <div className="relative aspect-square max-w-[200px] mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-puretea-sand/60 shadow-md">
                  <Image
                    src={guide.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <p className="sr-only">Imagen inspiradora: {guide.title}</p>
              </div>
              <div className="flex-1 min-w-0">
                <h2 id={`${guide.id}-heading`} className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-2">
                  {guide.title}
                </h2>
                <p className="text-puretea-dark/80 mb-8">{guide.intro}</p>

                <BrewSteps steps={guide.steps} alternate />

                <p className="mt-8">
                  <Link
                    href={guide.cta}
                    className="inline-flex items-center gap-2 text-puretea-organic font-semibold hover:underline"
                  >
                    {guide.ctaLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-20 pt-12 border-t border-puretea-sand text-center">
        <p className="text-puretea-dark/70 mb-6">
          ¿Quieres más guías? Visita nuestro <Link href="/blog" className="text-puretea-organic hover:underline">blog</Link>.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 text-sm font-semibold hover:bg-puretea-organic transition-colors"
        >
          Ir a la tienda
        </Link>
      </footer>
    </div>
  );
}
