import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle } from "@/lib/data";
import { productSchema } from "@/lib/seo/schema";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.description,
    openGraph: {
      title: product.seo?.title ?? product.title,
      description: product.seo?.description ?? product.description,
      images: product.featuredImage?.url ? [product.featuredImage.url] : undefined,
    },
  };
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

/** En Shopify la descripción viene en HTML; el separador entre secciones es <p>---</p>. No se muestra en la UI. */
const DESCRIPTION_SEPARATOR = /\s*<p>\s*---\s*<\/p>\s*/gi;

/** También aceptar separador en texto plano por si acaso. */
const DESCRIPTION_SEPARATOR_PLAIN = /\s*---\s*/;

/** Quita etiquetas HTML para obtener solo texto. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/**
 * Parsea un bloque HTML como viene de Shopify:
 * - Primer <p>...</p> = título de la sección.
 * - El resto = contenido (se deja tal cual, con <p>, <br>, etc.).
 */
function parseSection(section: string): { title: string; contentHtml: string } {
  const trimmed = section.trim();
  if (!trimmed) return { title: "", contentHtml: "" };

  const isHtml = trimmed.includes("<") && trimmed.includes(">");

  if (isHtml) {
    const resumenMatch = trimmed.match(/^\s*<p>\s*RESUMEN\s*<\/p>\s*/i);
    if (resumenMatch) {
      const content = trimmed.slice(resumenMatch[0].length).trim();
      return { title: "RESUMEN", contentHtml: content || "" };
    }
    const firstP = trimmed.match(/<p>([\s\S]*?)<\/p>/i);
    if (firstP && firstP.index !== undefined) {
      const title = stripHtml(firstP[1]);
      const content = trimmed.slice(firstP.index + firstP[0].length).trim();
      return { title, contentHtml: content };
    }
    return { title: "", contentHtml: trimmed };
  }

  const lines = trimmed.split(/\r?\n/);
  const firstLine = (lines[0] ?? "").trim();
  const title = stripHtml(firstLine);
  const content = lines.slice(1).join("\n").trim();
  if (!content) return { title, contentHtml: "" };
  const contentHtml = content.replace(/\n/g, "<br />");
  return { title, contentHtml };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const variant = product.variants[0];
  const price = variant?.price;
  const hasMultipleVariants = product.variants.length > 1;

  // Priorizar descriptionHtml para respetar el formato de Shopify (<p>---</p> entre secciones)
  const rawDescription = (product.descriptionHtml || product.description || "").trim();
  const isHtmlDescription = rawDescription.includes("<p>") && rawDescription.includes("</p>");
  const sections = (
    isHtmlDescription
      ? rawDescription.split(new RegExp(DESCRIPTION_SEPARATOR.source, "gi"))
      : rawDescription.split(DESCRIPTION_SEPARATOR_PLAIN)
  )
    .map((s) => s.trim())
    .filter(Boolean);

  const summarySection = sections.length > 0 ? parseSection(sections[0]) : { title: "", contentHtml: "" };
  const contentSections = sections.slice(1).map(parseSection).filter((s) => s.title || s.contentHtml);

  const schema = productSchema({
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url ?? null,
    brand: "PureTea",
    offers: {
      price: price?.amount ?? "0",
      currency: price?.currencyCode ?? "EUR",
      availability: variant?.availableForSale ? "IN_STOCK" : "OUT_OF_STOCK",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav className="mb-8 text-sm text-puretea-dark/70" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/products" className="hover:text-puretea-organic">
                Productos
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-puretea-dark">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Columna izquierda: galería de imágenes (varias fotos con miniaturas) */}
          <ProductImageGallery
            images={product.images ?? []}
            productTitle={product.title}
            featuredImageUrl={product.featuredImage?.url}
          />

          {/* Columna derecha: título, precio (si una variante), resumen y compra */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
              {product.productType}
            </p>
            <h1 className="mt-2 font-canela text-3xl sm:text-4xl text-puretea-dark leading-tight">
              {product.title}
            </h1>
            {!hasMultipleVariants && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-2xl font-semibold text-puretea-dark">
                  {price ? formatPrice(price.amount, price.currencyCode) : "—"}
                </span>
                {variant?.compareAtPrice && (
                  <span className="text-lg text-puretea-dark/60 line-through">
                    {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
                  </span>
                )}
              </div>
            )}
            {hasMultipleVariants && (
              <p className="mt-2 text-sm text-puretea-dark/70">Elige formato y cantidad</p>
            )}

            {/* Resumen: contenido del primer bloque (sin mostrar la palabra "RESUMEN") */}
            <div className="mt-6 w-full">
              {summarySection.contentHtml ? (
                <div
                  className="prose prose-neutral max-w-none text-puretea-dark/90 prose-p:leading-relaxed prose-p:my-2 prose-ul:my-3 prose-li:my-0.5 [&_br]:block [&_br]:my-0.5"
                  dangerouslySetInnerHTML={{ __html: summarySection.contentHtml }}
                />
              ) : null}
            </div>

            {/* Bloque de compra: variante (peso/formato), cantidad y añadir al carrito */}
            <div className="mt-8 pt-6 border-t border-puretea-sand/50">
              <ProductDetailActions variants={product.variants} />
            </div>
          </div>
        </div>

        {/* Secciones de contenido: títulos en negrita, contenido bien estructurado (estilo NaturaleBio) */}
        {contentSections.length > 0 && (
          <div className="mt-16 pt-10 border-t border-puretea-sand/50">
            <div className="max-w-3xl mx-auto lg:mx-0 space-y-10">
              {contentSections.map((section, index) => (
                <section key={index} className="scroll-mt-6">
                  {section.title && (
                    <h2 className="text-xl sm:text-2xl font-bold text-puretea-dark mb-4 font-canela">
                      {section.title}
                    </h2>
                  )}
                  {section.contentHtml ? (
                    <div
                      className="prose prose-neutral max-w-none text-puretea-dark/90 prose-p:leading-relaxed prose-p:my-2 prose-ul:my-3 prose-li:my-0.5 [&_br]:block [&_br]:my-0.5"
                      dangerouslySetInnerHTML={{ __html: section.contentHtml }}
                    />
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
