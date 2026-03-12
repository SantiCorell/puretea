"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

interface ShopToolbarProps {
  collections: { handle: string; title: string }[];
  currentCollection: string | null;
  currentQuery: string;
}

export function ShopToolbar({
  collections,
  currentCollection,
  currentQuery,
}: ShopToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(currentQuery);

  const buildUrl = useCallback(
    (updates: { q?: string; collection?: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (updates.q !== undefined) {
        if (updates.q.trim()) params.set("q", updates.q.trim());
        else params.delete("q");
      }
      if (updates.collection !== undefined) {
        if (updates.collection) params.set("collection", updates.collection);
        else params.delete("collection");
      }
      const s = params.toString();
      return s ? `/shop?${s}` : "/shop";
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildUrl({ q: query, collection: currentCollection }));
  };

  return (
    <div className="mb-10 space-y-6">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="relative max-w-xl">
        <label htmlFor="shop-search" className="sr-only">
          Buscar productos
        </label>
        <input
          id="shop-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, tipo..."
          className="w-full rounded-xl border border-puretea-sand/60 bg-white py-3 pl-4 pr-12 text-puretea-dark placeholder:text-puretea-dark/40 focus:outline-none focus:ring-2 focus:ring-puretea-organic/50 focus:border-puretea-organic"
          aria-label="Buscar productos"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-puretea-dark/60 hover:bg-puretea-sand/30 hover:text-puretea-dark transition-colors"
          aria-label="Buscar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {/* Filtros por colección */}
      <div>
        <span className="block text-xs font-semibold uppercase tracking-widest text-puretea-dark/60 mb-3">
          Categorías
        </span>
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 -mx-1 sm:mx-0 sm:overflow-visible">
          <button
            type="button"
            onClick={() => router.push(buildUrl({ collection: null, q: query || undefined }))}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              !currentCollection
                ? "bg-puretea-dark text-puretea-cream"
                : "bg-puretea-sand/30 text-puretea-dark hover:bg-puretea-sand/50"
            }`}
          >
            Todos
          </button>
          {collections.map((col) => (
            <button
              key={col.handle}
              type="button"
              onClick={() =>
                router.push(
                  buildUrl({
                    collection: currentCollection === col.handle ? null : col.handle,
                    q: query || undefined,
                  })
                )
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                currentCollection === col.handle
                  ? "bg-puretea-dark text-puretea-cream"
                  : "bg-puretea-sand/30 text-puretea-dark hover:bg-puretea-sand/50"
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
