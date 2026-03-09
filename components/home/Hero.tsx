import Link from "next/link";
import { HeroBackground } from "./HeroBackground";

export function Hero() {
  return (
    <section
      className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-puretea-dark text-puretea-cream overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <HeroBackground />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 id="hero-heading" className="font-canela text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-puretea-cream drop-shadow-sm">
          Pure tea.
          <br />
          Pure ritual.
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-puretea-sand max-w-2xl mx-auto leading-relaxed">
          Té premium para tu día. Matcha, tés verdes, negros e infusiones de bienestar.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-puretea-gold text-puretea-dark px-8 py-4 text-base font-semibold hover:bg-puretea-cream transition-colors min-h-[52px]"
          >
            Ver tienda
          </Link>
          <Link
            href="/category/matcha"
            className="inline-flex items-center justify-center rounded-full border-2 border-puretea-cream text-puretea-cream px-8 py-4 text-base font-semibold hover:bg-puretea-cream hover:text-puretea-dark transition-colors min-h-[52px]"
          >
            Descubrir matcha
          </Link>
        </div>
      </div>
    </section>
  );
}
