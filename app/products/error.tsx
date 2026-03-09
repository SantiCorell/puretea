"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products error:", error);
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="font-canela text-2xl text-puretea-dark mb-2">
        Error al cargar productos
      </h2>
      <p className="text-puretea-dark/70 mb-6 max-w-md mx-auto">
        {error.message || "Comprueba que SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN estén configurados."
        }
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-puretea-dark text-puretea-cream px-6 py-2.5 font-semibold hover:bg-puretea-organic transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-puretea-dark text-puretea-dark px-6 py-2.5 font-semibold hover:bg-puretea-sand/30 transition-colors"
        >
          Inicio
        </Link>
      </div>
    </div>
  );
}
