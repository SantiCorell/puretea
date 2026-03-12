"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
}

interface ProductDetailActionsProps {
  variants: ProductVariant[];
}

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency || "EUR",
  }).format(parseFloat(amount));
}

export function ProductDetailActions({ variants }: ProductDetailActionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const variant = variants[selectedIndex];
  const hasMultipleVariants = variants.length > 1;
  const availableForSale = variant?.availableForSale ?? false;

  if (!variant) {
    return (
      <div className="rounded-xl bg-puretea-sand/50 border border-puretea-sand p-4">
        <p className="font-semibold text-puretea-dark">Producto no disponible</p>
      </div>
    );
  }

  if (!availableForSale) {
    return (
      <div className="rounded-xl bg-puretea-sand/50 border border-puretea-sand p-4">
        <p className="font-semibold text-puretea-dark">Producto agotado</p>
        <p className="mt-1 text-sm text-puretea-dark/70">
          Renovaremos pronto stock. ¿Quieres que te avisemos?
        </p>
      </div>
    );
  }

  const handleDecrease = () => setQty((p) => (p > 1 ? p - 1 : 1));
  const handleIncrease = () => setQty((p) => (p < 20 ? p + 1 : 20));

  return (
    <div className="space-y-4">
      {hasMultipleVariants && (
        <div>
          <span className="block text-[11px] uppercase tracking-widest text-puretea-dark/60 font-semibold mb-2">
            Formato / Peso
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedIndex(i)}
                disabled={!v.availableForSale}
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                  i === selectedIndex
                    ? "border-puretea-dark bg-puretea-dark text-puretea-cream"
                    : "border-puretea-sand/60 bg-white text-puretea-dark hover:border-puretea-sand disabled:opacity-50"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
          <p className="mt-2 text-lg font-semibold text-puretea-dark">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
            {variant.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount) && (
              <span className="ml-2 text-sm text-puretea-dark/60 line-through font-normal">
                {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
              </span>
            )}
          </p>
        </div>
      )}

      <div className="flex items-center justify-start gap-3">
        <span className="text-[11px] uppercase tracking-widest text-puretea-dark/60 font-semibold">
          Cantidad
        </span>
        <div className="inline-flex items-center gap-2 rounded-full border border-puretea-sand/60 bg-puretea-cream/40 px-3 py-1">
          <button
            type="button"
            onClick={handleDecrease}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold text-puretea-dark/70 hover:bg-puretea-sand/60 hover:text-puretea-dark transition-colors"
            aria-label="Disminuir cantidad"
          >
            -
          </button>
          <span className="min-w-[1.75rem] text-center text-sm font-semibold text-puretea-dark">
            {qty}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            className="w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold text-puretea-dark/70 hover:bg-puretea-sand/60 hover:text-puretea-dark transition-colors"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <AddToCartButton
        variantId={variant.id}
        quantity={qty}
        className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-organic transition-colors min-h-[52px] w-full sm:w-auto disabled:opacity-50"
      />
      <p className="text-sm text-puretea-dark/70">
        El pago se completa de forma segura en el checkout de Shopify.
      </p>
    </div>
  );
}

