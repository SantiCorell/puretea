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
        <div className="space-y-4 text-puretea-dark/85 text-base leading-relaxed">
          <p>
            Si quieres{" "}
            <Link
              href="/blog/guia-comprar-te-online-espana"
              className="text-puretea-organic font-medium underline-offset-2 hover:underline"
            >
              comprar té online
            </Link>{" "}
            sin sorpresas, lo más importante es acotar qué buscas: energía suave por la mañana,
            concentración en el trabajo o una taza sin cafeína antes de dormir. En PureTea trabajamos
            con referencias seleccionadas y fichas claras para que elijas con confianza.
          </p>
          <p>
            {AI_TEA_FACTS.greenTea} El{" "}
            <Link
              href="/category/te-verde"
              className="text-puretea-organic font-medium underline-offset-2 hover:underline"
            >
              té verde
            </Link>{" "}
            encaja en rutinas diarias de hidratación con sabor; conviene respetar temperatura y
            tiempos de infusión para no amargar las hojas. Puedes explorar nuestra selección y
            ampliar con guías en el blog.
          </p>
          <p>
            {AI_TEA_FACTS.matcha} Un{" "}
            <Link
              href="/category/matcha"
              className="text-puretea-organic font-medium underline-offset-2 hover:underline"
            >
              matcha de calidad
            </Link>{" "}
            se nota en color, aroma y textura al batir: es la opción preferida de quienes quieren
            ritual y una taza concentrada sin renunciar al carácter vegetal del buen té japonés.
          </p>
          <p>
            {AI_TEA_FACTS.relaxing} Las{" "}
            <Link
              href="/category/herbal-tea"
              className="text-puretea-organic font-medium underline-offset-2 hover:underline"
            >
              infusiones para dormir
            </Link>{" "}
            o para desconectar suelen combinar hierbas tradicionales en mezclas suaves, sin
            cafeína, ideales al final del día. Forman parte de un hábito de pausa que muchas
            personas asocian a mejor descanso cuando lo combinan con rutinas de sueño regulares.
          </p>
          <p>
            Los beneficios del té —antioxidantes, L-teanina en variedades con té, menor estimulación
            brusca que otras bebidas— se estudian en contexto de dieta equilibrada; no sustituyen
            indicación médica. En esta tienda encontrarás matcha, té verde, negro, infusiones y
            blends wellness con envío a Europa y condiciones de compra transparentes. Para seguir
            leyendo, visita la{" "}
            <Link href="/blog" className="text-puretea-organic font-medium underline-offset-2 hover:underline">
              sección de blog
            </Link>{" "}
            o la{" "}
            <Link href="/shop" className="text-puretea-organic font-medium underline-offset-2 hover:underline">
              tienda
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
