"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: { url: string; altText: string | null }[];
  productTitle: string;
  /** URL de la imagen principal si no está en images (featured) */
  featuredImageUrl?: string | null;
}

export function ProductImageGallery({
  images,
  productTitle,
  featuredImageUrl,
}: ProductImageGalleryProps) {
  const allUrls = featuredImageUrl
    ? [featuredImageUrl, ...images.map((i) => i.url).filter((u) => u !== featuredImageUrl)]
    : images.map((i) => i.url);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainUrl = allUrls[selectedIndex] ?? featuredImageUrl ?? images[0]?.url ?? "/images/products/placeholder.svg";
  const alt = productTitle;

  if (!allUrls.length) {
    return (
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-puretea-cream border border-puretea-sand/40 min-h-[280px] sm:min-h-[320px]">
        <Image
          src={mainUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square relative rounded-2xl overflow-hidden bg-puretea-cream border border-puretea-sand/40 min-h-[280px] sm:min-h-[320px]">
        <Image
          key={selectedIndex}
          src={mainUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={selectedIndex === 0}
        />
      </div>
      {allUrls.length > 1 && (
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start" role="tablist" aria-label="Seleccionar imagen del producto">
          {allUrls.map((url, i) => (
            <button
              key={url}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                i === selectedIndex
                  ? "border-puretea-organic ring-2 ring-puretea-organic/30"
                  : "border-puretea-sand/40 hover:border-puretea-sand"
              }`}
            >
              <Image src={url} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
