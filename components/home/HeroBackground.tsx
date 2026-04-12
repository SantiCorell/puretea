import Image from "next/image";

const HERO_IMAGES = [
  "/images/hero/tea-landscape.png",
  // Añade más rutas para transiciones entre fondos: "/images/hero/hero-2.png", etc.
];

/**
 * Fondo del hero: paisaje de té con efecto Ken Burns (zoom + pan suave).
 * Carga rápido (solo imagen) y da sensación de video.
 * Para usar video real: añade hero-video.mp4 en public/images/hero/ y usa HeroVideoBackground.
 */
export function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0" aria-hidden>
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 animate-hero-kenburns"
            style={{ animationDelay: `${i * 12}s` }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Overlay para legibilidad del texto */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-puretea-dark/80 via-puretea-dark/65 to-puretea-dark/85"
        aria-hidden
      />
    </>
  );
}
