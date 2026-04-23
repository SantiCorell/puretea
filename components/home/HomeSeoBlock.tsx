import Link from "next/link";

/**
 * Guía editorial para ayudar a descubrir productos desde la home.
 */
export function HomeSeoBlock() {
  return (
    <section
      className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-puretea-sand/50"
      aria-labelledby="home-seo-editorial-heading"
    >
      <div className="max-w-3xl mx-auto">
        <h2 id="home-seo-editorial-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-6">
          Elige tu té ideal en 2 minutos
        </h2>
        <p className="text-puretea-dark/80 leading-relaxed mb-5">
          Si no sabes por dónde empezar, aquí tienes 5 guías claras para elegir mejor según tu momento del día
          y tus gustos.
        </p>

        <details className="group rounded-2xl border border-puretea-sand/70 bg-puretea-cream/40 p-5">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3 marker:content-none">
            <span className="font-semibold text-puretea-dark">
              Ver guías recomendadas
            </span>
            <span className="text-puretea-dark/60 group-open:rotate-180 transition-transform">⌄</span>
          </summary>

          <div className="mt-4 space-y-4 text-puretea-dark/85 text-base leading-relaxed">
            <p>
              <strong className="text-puretea-dark">Empieza por estas 5 lecturas:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Link href="/blog/mejor-te-matcha-calidad-precio" className="text-puretea-organic hover:underline">
                  Mejor té matcha calidad precio
                </Link>
              </li>
              <li>
                <Link href="/blog/que-te-tomar-por-la-noche-sin-teina" className="text-puretea-organic hover:underline">
                  Qué té tomar por la noche (sin teína)
                </Link>
              </li>
              <li>
                <Link href="/blog/beneficios-te-verde-reales" className="text-puretea-organic hover:underline">
                  Beneficios del té verde (reales)
                </Link>
              </li>
              <li>
                <Link href="/blog/como-preparar-te-matcha-correctamente" className="text-puretea-organic hover:underline">
                  Cómo preparar té matcha correctamente
                </Link>
              </li>
              <li>
                <Link href="/blog/que-es-te-premium-y-por-que-es-diferente" className="text-puretea-organic hover:underline">
                  Qué es el té premium y por qué es diferente
                </Link>
              </li>
            </ul>

            <p>
              Si buscas equilibrio entre sabor y bienestar, el té verde suele ser un gran punto de partida:
              suave, versátil y fácil de integrar en tu rutina diaria.
            </p>
            <p>
              El matcha es ideal si quieres un ritual más intenso y una energía más sostenida. La diferencia real
              está en la calidad del origen y en prepararlo bien.
            </p>
            <p>
              Para la noche, las infusiones relajantes sin teína son la opción más cómoda para desconectar sin
              renunciar al placer de una taza caliente.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
