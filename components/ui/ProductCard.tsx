import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  /** Base path for product link (default: /product) e.g. /products for /products/[handle] */
  productPageBase?: string;
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

export function ProductCard({ product, productPageBase = "/product" }: ProductCardProps) {
  const variant = product.variants[0];
  const price = variant?.price;
  const compareAtPrice = variant?.compareAtPrice;
  const soldOut = !variant?.availableForSale;
  const image = product.featuredImage?.url ?? "/images/products/placeholder.svg";

  return (
    <Link
      href={`${productPageBase}/${product.handle}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-puretea-sand hover:border-puretea-organic hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square relative bg-puretea-cream overflow-hidden">
        <Image
          src={image}
          alt={product.featuredImage?.altText ?? product.title}
          fill
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${soldOut ? "opacity-75" : ""}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {soldOut && (
          <span className="absolute top-3 left-3 rounded-full bg-puretea-dark/90 text-puretea-cream text-xs font-semibold px-2.5 py-1">
            Agotado
          </span>
        )}
        {!soldOut && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? "0") && (
          <span className="absolute top-3 left-3 rounded-full bg-puretea-organic text-puretea-cream text-xs font-semibold px-2.5 py-1">
            Oferta
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
          {product.productType}
        </p>
        <h3 className="mt-1 font-canela text-lg font-semibold text-puretea-dark group-hover:text-puretea-organic line-clamp-2">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className={`font-semibold ${soldOut ? "text-puretea-dark/60" : "text-puretea-dark"}`}>
            {price ? formatPrice(price.amount, price.currencyCode) : "—"}
          </span>
          {!soldOut && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? "0") && (
            <span className="text-sm text-puretea-dark/60 line-through">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
        {soldOut && (
          <p className="mt-2 text-sm text-puretea-organic font-medium">
            Renovaremos pronto stock
          </p>
        )}
      </div>
    </Link>
  );
}
