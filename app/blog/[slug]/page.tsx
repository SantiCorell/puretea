import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMockBlogPostBySlug } from "@/lib/mock/blog";
import { getProductByHandle } from "@/lib/data";
import { FAQ } from "@/components/ui/FAQ";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_EXPANSION: Record<string, { title: string; points: string[]; extraHtml: string }> = {
  Matcha: {
    title: "Claves rápidas para elegir buen matcha",
    points: [
      "Busca origen japonés y grado ceremonial si lo quieres para beber.",
      "Color verde vivo y aroma fresco: señales de frescura real.",
      "Evita agua hirviendo para no amargar y perder matices.",
    ],
    extraHtml:
      "<p>Si estás comparando productos, revisa origen, grado y fecha de consumo preferente. Un matcha barato puede parecer atractivo, pero suele penalizar sabor y experiencia. Para decidir mejor, visita también <a href='/te-matcha-japones-premium'>nuestra landing de matcha premium</a> y cruza con la guía <a href='/como-preparar-te-matcha'>cómo preparar matcha</a>.</p>",
  },
  Wellness: {
    title: "Cómo convertir teoría en rutina diaria",
    points: [
      "Define un objetivo por franja (foco mañana, relax noche).",
      "Mantén horarios consistentes para notar cambios reales.",
      "Combina té con hidratación y descanso para mejores resultados.",
    ],
    extraHtml:
      "<p>El bienestar no depende de una sola taza: funciona cuando lo integras en hábitos estables. Si quieres recomendaciones por objetivo, revisa <a href='/te-wellness'>tienda wellness</a> y <a href='/te-para-dormir-relajacion'>tés para dormir y relajación</a>.</p>",
  },
  Salud: {
    title: "Lectura responsable de contenido de salud",
    points: [
      "El té apoya hábitos saludables, no sustituye diagnóstico médico.",
      "Ajusta cafeína según tolerancia personal y horario.",
      "Consulta profesionales en embarazo, medicación o patologías.",
    ],
    extraHtml:
      "<p>Nuestra recomendación: usa estas guías para orientarte y luego personaliza con ayuda profesional cuando haga falta. Para ampliar, visita <a href='/beneficios-te-verde-salud'>beneficios del té verde</a> y <a href='/te-para-embarazadas'>tés permitidos en embarazo</a>.</p>",
  },
  "Comprar té": {
    title: "Checklist de compra online (sin errores)",
    points: [
      "Comprueba políticas de envío y devoluciones antes de pagar.",
      "Empieza con una selección corta de categorías para testear.",
      "Prioriza fichas con información clara de origen y preparación.",
    ],
    extraHtml:
      "<p>En PureTea hemos creado una ruta práctica para acelerar decisiones: <a href='/comprar-te'>comprar té online</a>, <a href='/envio-rapido-te'>envío rápido</a> y <a href='/regalos-te-originales'>regalos de té</a>. Te ayudará a convertir mejor y evitar compras impulsivas de baja calidad.</p>",
  },
};

export async function generateStaticParams() {
  const { BLOG_POSTS } = await import("@/lib/mock/blog");
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getMockBlogPostBySlug(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMockBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedProducts = post.relatedProducts
    ? await Promise.all(
        post.relatedProducts.map((handle) => getProductByHandle(handle))
      )
    : [];
  const products = relatedProducts.filter(Boolean);

  const articleJson = articleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: `/blog/${post.slug}`,
    author: post.author,
  });
  const expansion =
    CATEGORY_EXPANSION[post.category] ??
    CATEGORY_EXPANSION.Wellness;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(post.faqs)),
          }}
        />
      )}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav className="mb-8 text-sm text-puretea-dark/70" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/blog" className="hover:text-puretea-organic">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="text-puretea-dark">{post.title}</li>
          </ol>
        </nav>
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-8 bg-puretea-sand/30">
          <Image
            src={post.image ?? "/images/blog/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
        <header>
          <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
            {post.category}
          </p>
          <h1 className="mt-2 font-canela text-3xl sm:text-4xl text-puretea-dark">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="mt-2 block text-puretea-dark/70"
          >
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>
        <section className="mt-8 rounded-2xl border border-puretea-sand/70 bg-puretea-cream/40 p-5 sm:p-6">
          <h2 className="font-canela text-2xl text-puretea-dark">{expansion.title}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-3">
            {expansion.points.map((point) => (
              <li key={point} className="rounded-xl bg-white px-3 py-2 text-sm text-puretea-dark/80 border border-puretea-sand/60">
                {point}
              </li>
            ))}
          </ul>
        </section>
        <div
          className="mt-8 prose prose-neutral prose-lg max-w-none text-puretea-dark/90 prose-headings:font-canela prose-headings:text-puretea-dark prose-a:text-puretea-organic prose-a:no-underline hover:prose-a:underline prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <section
          className="mt-10 rounded-2xl border border-puretea-sand/70 bg-white p-5 sm:p-6"
          aria-labelledby="deep-dive-title"
        >
          <h2 id="deep-dive-title" className="font-canela text-2xl text-puretea-dark">
            Guía ampliada para decidir mejor
          </h2>
          <div
            className="mt-4 prose prose-neutral max-w-none text-puretea-dark/85 prose-a:text-puretea-organic prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: expansion.extraHtml }}
          />
        </section>
        {post.faqs && post.faqs.length > 0 && (
          <FAQ items={post.faqs} title="Preguntas frecuentes" />
        )}
        {products.length > 0 && (
          <section className="mt-12 pt-12 border-t border-puretea-sand" aria-labelledby="related-products-heading">
            <h2 id="related-products-heading" className="font-canela text-xl text-puretea-dark mb-4">
              Productos relacionados
            </h2>
            <ul className="flex flex-wrap gap-4">
              {products.map((p) =>
                p ? (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.handle}`}
                      className="text-puretea-organic font-medium hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
