"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

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
  shopifyDomain,
}: ProductCardProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const variant = product.variants[selectedVariantIndex] ?? product.variants[0];
  const price = variant?.price;
  const compareAtPrice = variant?.compareAtPrice;
  const soldOut = !variant?.availableForSale;
  const hasMultipleVariants = product.variants.length > 1;
  const image = product.featuredImage?.url ?? "/images/products/placeholder.svg";

  const handleDecrease = () => setQty((p) => (p > 1 ? p - 1 : 1));
  const handleIncrease = () => setQty((p) => (p < 20 ? p + 1 : 20));

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-puretea-sand hover:shadow-lg transition-all duration-300 h-full">
      {/* 1. Image and Badges Section */}
      <Link href={`${productPageBase}/${product.handle}`} className="relative block">
        <div className="aspect-[3/4] sm:aspect-square relative overflow-hidden bg-puretea-cream">
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
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <Link href={`${productPageBase}/${product.handle}`} className="flex-1">
          {/* REFINED: Star Rating */}
          <div className="flex items-center gap-1 mb-1">
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
          <h3 className="font-canela text-base sm:text-lg font-semibold text-puretea-dark group-hover:text-puretea-organic transition-colors leading-tight line-clamp-2">
            {product.title}
          </h3>
          
          <div className="mt-2 sm:mt-3 flex items-baseline gap-2">
            <span className={`text-base sm:text-lg font-bold ${soldOut ? "text-puretea-dark/40" : "text-puretea-dark"}`}>
              {price ? formatPrice(price.amount, price.currencyCode) : "—"}
            </span>
            {!soldOut && compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price?.amount ?? "0") && (
              <span className="text-xs text-puretea-dark/40 line-through font-medium">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
        </Link>

        {/* 3. CTA + trust badges */}
        <div className="mt-4 sm:mt-5">
          {!soldOut && variant?.id ? (
            <>
              {hasMultipleVariants && (
                <div className="mb-3">
                  <span className="block text-[10px] uppercase tracking-widest text-puretea-dark/60 font-semibold mb-1.5">
                    Formato
                  </span>
                  <select
                    value={selectedVariantIndex}
                    onChange={(e) => setSelectedVariantIndex(Number(e.target.value))}
                    className="w-full text-xs font-medium text-puretea-dark border border-puretea-sand/60 rounded-lg bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-puretea-organic/50"
                    aria-label="Elegir formato o peso"
                  >
                    {product.variants.map((v, i) => (
                      <option key={v.id} value={i} disabled={!v.availableForSale}>
                        {v.title} — {formatPrice(v.price.amount, v.price.currencyCode)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-puretea-dark/60 font-semibold">
                  Cantidad
                </span>
                <div className="inline-flex items-center gap-2 rounded-full border border-puretea-sand/60 bg-puretea-cream/40 px-2.5 py-0.5">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-puretea-dark/70 hover:bg-puretea-sand/60 hover:text-puretea-dark transition-colors"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="min-w-[1.4rem] text-center text-xs font-semibold text-puretea-dark">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-puretea-dark/70 hover:bg-puretea-sand/60 hover:text-puretea-dark transition-colors"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <AddToCartButton
                variantId={variant.id}
                quantity={qty}
                className="w-full text-puretea-cream text-[11px] uppercase tracking-widest font-bold py-2.5 sm:py-3 rounded-full transition-all text-center shadow-md active:scale-95 bg-puretea-dark hover:bg-puretea-organic"
              />
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
          ) : soldOut ? (
            <div className="h-10 flex items-center justify-center text-xs text-puretea-dark/40 italic bg-puretea-sand/20 rounded-lg">
              Próximamente
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}