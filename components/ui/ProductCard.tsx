import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { QuickAdd } from "./QuickAdd"; 

interface ProductCardProps {
  product: Product;
  /** Base path for product link (default: /product) */
  productPageBase?: string;
  shopifyDomain?: string;
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

export function ProductCard({ 
  product, 
  productPageBase = "/product", 
  shopifyDomain 
}: ProductCardProps) {
  const variant = product.variants[0];
  const price = variant?.price;
  const compareAtPrice = variant?.compareAtPrice;
  const soldOut = !variant?.availableForSale;
  const image = product.featuredImage?.url ?? "/images/products/placeholder.svg";

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-puretea-sand hover:shadow-lg transition-all duration-300 h-full">
      {/* 1. Image and Badges Section */}
      <Link href={`${productPageBase}/${product.handle}`} className="relative block">
        <div className="aspect-square relative overflow-hidden bg-puretea-cream">
          <Image
            src={image}
            alt={product.featuredImage?.altText ?? product.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${soldOut ? "opacity-75" : ""}`}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {soldOut && (
            <span className="absolute top-3 left-3 rounded-full bg-puretea-dark/90 text-puretea-cream text-[10px] uppercase font-bold tracking-wider px-3 py-1 z-10">
              Agotado
            </span>
          )}
          {!soldOut && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? "0") && (
            <span className="absolute top-3 left-3 rounded-full bg-puretea-organic text-puretea-cream text-[10px] uppercase font-bold tracking-wider px-3 py-1 z-10">
              Oferta
            </span>
          )}
        </div>
      </Link>
        
      {/* 2. Content Section */}
      <div className="p-4 flex-1 flex flex-col">
        <Link href={`${productPageBase}/${product.handle}`} className="flex-1">
          {/* REFINED: Star Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3 h-3 ${i < 4 ? "text-yellow-400" : "text-puretea-sand"} fill-current`} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-puretea-dark/40 font-bold uppercase tracking-tighter">4.8 / 5</span>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-puretea-organic font-bold mb-1">
            {product.productType || "Premium Tea"}
          </p>
          <h3 className="font-canela text-lg font-semibold text-puretea-dark group-hover:text-puretea-organic transition-colors leading-tight line-clamp-2">
            {product.title}
          </h3>
          
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-lg font-bold ${soldOut ? "text-puretea-dark/40" : "text-puretea-dark"}`}>
              {price ? formatPrice(price.amount, price.currencyCode) : "—"}
            </span>
            {!soldOut && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? "0") && (
              <span className="text-xs text-puretea-dark/40 line-through font-medium">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
        </Link>

        {/* 3. Interactive Section & Trust Badges */}
        <div className="mt-5">
          {!soldOut && variant?.id ? (
            <>
              <QuickAdd variantId={variant.id} product={product} />
              
              {/* Trust Badges */}
              <div className="mt-4 flex items-center justify-between px-2 pt-3 border-t border-puretea-sand/40">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-puretea-organic/10 rounded-full">
                    <svg className="w-3 h-3 text-puretea-organic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[9px] text-puretea-dark/60 font-bold uppercase tracking-tight">Eco-Cert</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-puretea-organic/10 rounded-full">
                    <svg className="w-3 h-3 text-puretea-organic" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-[9px] text-puretea-dark/60 font-bold uppercase tracking-tight">SSL Secure</span>
                </div>
              </div>
            </>
          ) : !soldOut ? (
            <div className="h-10 flex items-center justify-center text-[10px] text-red-400 font-bold uppercase tracking-wider bg-red-50 rounded-lg">
              Check .env Config
            </div>
          ) : (
            <div className="h-10 flex items-center justify-center text-xs text-puretea-dark/40 italic bg-puretea-sand/20 rounded-lg">
              Próximamente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}