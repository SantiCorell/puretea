import Link from "next/link";
import { AI_TEA_FACTS } from "@/lib/seo/ai-signals";

/**
 * Bloque editorial SEO/AEO en la home: enlaces internos + contexto para buscadores y respuestas automáticas.
 */
export function HomeSeoBlock() {
  return (
    <section
      className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-puretea-sand/50"
      aria-labelledby="home-seo-editorial-heading"
    >
      <div className="max-w-3xl mx-auto">
        <h2
          id="home-seo-editorial-heading"
          className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-6"
        >
          Comprar té online con criterio: té verde, matcha e infusiones relajantes
        </h2>
        <p className="text-puretea-dark/80 leading-relaxed mb-5">
          Si quieres comprar sin ruido, aquí tienes una guía corta con las búsquedas que más convierten
          y páginas pensadas para responder rápido y ayudarte a elegir.
        </p>

        <details className="group rounded-2xl border border-puretea-sand/70 bg-puretea-cream/40 p-5">
          <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
            <span className="font-semibold text-puretea-dark">
              Ver guía SEO + páginas recomendadas
            </span>
            <span className="text-puretea-dark/60 group-open:rotate-180 transition-transform">⌄</span>
          </summary>

          <div className="mt-4 space-y-4 text-puretea-dark/85 text-base leading-relaxed">
            <p>
              <strong className="text-puretea-dark">Las 5 páginas que sí necesitas:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Link href="/mejor-te-matcha-calidad-precio" className="text-puretea-organic hover:underline">
                  Mejor té matcha calidad precio
                </Link>
              </li>
              <li>
                <Link href="/que-te-tomar-por-la-noche-sin-teina" className="text-puretea-organic hover:underline">
                  Qué té tomar por la noche (sin teína)
                </Link>
              </li>
              <li>
                <Link href="/beneficios-te-verde-reales" className="text-puretea-organic hover:underline">
                  Beneficios del té verde (reales)
                </Link>
              </li>
              <li>
                <Link href="/como-preparar-te-matcha-correctamente" className="text-puretea-organic hover:underline">
                  Cómo preparar té matcha correctamente
                </Link>
              </li>
              <li>
                <Link href="/que-es-te-premium" className="text-puretea-organic hover:underline">
                  Qué es el té premium y por qué es diferente
                </Link>
              </li>
            </ul>

            <p>
              {AI_TEA_FACTS.greenTea} El{" "}
              <Link href="/category/te-verde" className="text-puretea-organic font-medium hover:underline">
                té verde
              </Link>{" "}
              cubre intención informacional y comercial cuando explicas beneficios reales y enlazas producto.
            </p>
            <p>
              {AI_TEA_FACTS.matcha} Un{" "}
              <Link href="/category/matcha" className="text-puretea-organic font-medium hover:underline">
                matcha de calidad
              </Link>{" "}
              debe aterrizar en ficha de compra clara, no solo en texto.
            </p>
            <p>
              {AI_TEA_FACTS.relaxing} Las{" "}
              <Link href="/category/herbal-tea" className="text-puretea-organic font-medium hover:underline">
                infusiones para dormir
              </Link>{" "}
              convierten mejor cuando resuelven “qué tomar” en 30 segundos.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
