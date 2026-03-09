import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandle, getProducts } from "@/lib/data";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { products } = await getProducts({ first: 100 });
  return products.map((p) => ({ slug: p.handle }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return {};
  return buildPageMetadata({
    title: product.seo?.title ?? product.title,
    description: product.seo?.description ?? product.description,
    path: `/product/${slug}`,
    image: product.featuredImage?.url ?? undefined,
  });
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) notFound();

  const { products: allProducts } = await getProducts({ first: 8 });
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const variant = product.variants[0];
  const price = variant?.price;
  const mainImage = product.featuredImage?.url ?? "/images/products/placeholder.svg";

  const faqItems: FAQItem[] = [
    {
      question: "¿Cómo se prepara?",
      answer: "Consulta la sección «Cómo preparar» en cada producto o nuestra guía en /how-to-brew.",
    },
    {
      question: "¿Envían a mi país?",
      answer: "Enviamos a toda Europa. El envío se calcula en el checkout.",
    },
  ];

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
            <li><Link href="/shop" className="hover:text-puretea-organic">Tienda</Link></li>
            <li aria-hidden>/</li>
            <li className="text-puretea-dark">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-puretea-cream">
            <Image
              src={mainImage}
              alt={product.featuredImage?.altText ?? product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
              {product.productType}
            </p>
            <h1 className="mt-2 font-canela text-3xl sm:text-4xl text-puretea-dark">
              {product.title}
            </h1>
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

            <div
              className="mt-6 text-puretea-dark/80 prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? product.description }}
            />

            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-organic transition-colors min-h-[52px] w-full sm:w-auto"
              >
                Comprar en la tienda
              </Link>
              <p className="mt-3 text-sm text-puretea-dark/70">
                El checkout y el pago se realizan de forma segura en Shopify.
              </p>
            </div>
          </div>
        </div>

        <FAQ items={faqItems} title="Preguntas frecuentes" />

        {related.length > 0 && (
          <section className="mt-16 pt-16 border-t border-puretea-sand" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-canela text-2xl text-puretea-dark mb-8">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.handle}`}
                  className="group block rounded-2xl overflow-hidden border border-puretea-sand hover:border-puretea-organic"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={p.featuredImage?.url ?? "/images/products/placeholder.svg"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-canela font-semibold text-puretea-dark group-hover:text-puretea-organic">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-puretea-dark">
                      {p.variants[0]?.price
                        ? formatPrice(p.variants[0].price.amount, p.variants[0].price.currencyCode)
                        : "—"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
