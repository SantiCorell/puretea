import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandle, getProducts } from "@/lib/data";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { productSchema } from "@/lib/seo/schema";
import AddToCartSection from "@/components/product/AddToCartSection";

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
          <ol className="flex flex-wrap gap-2 font-medium">
            <li><Link href="/shop" className="hover:text-puretea-organic transition-colors">Tienda</Link></li>
            <li aria-hidden className="opacity-40">/</li>
            <li className="text-puretea-dark">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-puretea-cream border border-puretea-sand shadow-sm">
            <Image
              src={mainImage}
              alt={product.featuredImage?.altText ?? product.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-puretea-organic font-bold">
              {product.productType || "Wellness"}
            </p>
            <h1 className="mt-2 font-canela text-4xl sm:text-5xl text-puretea-dark leading-tight">
              {product.title}
            </h1>
            
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-medium text-puretea-dark">
                {price ? formatPrice(price.amount, price.currencyCode) : "—"}
              </span>
              {variant?.compareAtPrice && (
                <span className="text-xl text-puretea-dark/40 line-through decoration-puretea-organic/30">
                  {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
                </span>
              )}
            </div>

            <div
              className="mt-8 text-puretea-dark/80 prose prose-neutral max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml ?? product.description }}
            />

            <div className="mt-10 pt-8 border-t border-puretea-sand">
              <AddToCartSection 
                variantId={variant?.id || ""} 
                basePrice={parseFloat(price?.amount || "0")}
                currencyCode={price?.currencyCode || "EUR"}
                shopifyDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || ""} 
              />
              
              <div className="mt-6 flex items-center gap-3 text-xs text-puretea-dark/60 bg-puretea-sand/20 p-3 rounded-lg">
                <svg className="w-5 h-5 text-puretea-organic" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Transacción encriptada y pago seguro gestionado por Shopify</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <FAQ items={faqItems} title="Ritual de preparación" />
        </div>

        {related.length > 0 && (
          <section className="mt-20 pt-16 border-t border-puretea-sand" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-canela text-3xl text-puretea-dark mb-10 text-center lg:text-left">
              Completa tu ritual
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.handle}`}
                  className="group block rounded-2xl overflow-hidden border border-puretea-sand bg-white hover:border-puretea-organic transition-all duration-300 hover:shadow-md"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={p.featuredImage?.url ?? "/images/products/placeholder.svg"}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-canela font-semibold text-puretea-dark group-hover:text-puretea-organic transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-base font-bold text-puretea-dark">
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