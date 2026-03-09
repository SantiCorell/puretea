import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByHandle } from "@/lib/shopify";
import { productSchema } from "@/lib/seo/schema";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

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

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const variant = product.variants[0];
  const price = variant?.price;
  const mainImage = product.featuredImage?.url ?? "/images/products/placeholder.svg";

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

          {product.description && (
            <div
              className="mt-6 text-puretea-dark/80 prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.descriptionHtml ?? product.description.replace(/\n/g, "<br />"),
              }}
            />
          )}

          <div className="mt-8">
            {variant?.availableForSale ? (
              <>
                <AddToCartButton
                  variantId={variant.id}
                  quantity={1}
                  className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-organic transition-colors min-h-[52px] w-full sm:w-auto disabled:opacity-50"
                />
                <p className="mt-3 text-sm text-puretea-dark/70">
                  El pago se completa de forma segura en el checkout de Shopify.
                </p>
              </>
            ) : (
              <div className="rounded-xl bg-puretea-sand/50 border border-puretea-sand p-4">
                <p className="font-semibold text-puretea-dark">
                  Producto agotado
                </p>
                <p className="mt-1 text-sm text-puretea-dark/70">
                  Renovaremos pronto stock. ¿Quieres que te avisemos?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
