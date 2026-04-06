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
        <h1
          id="hero-heading"
          className="font-canela text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-puretea-cream drop-shadow-sm"
        >
          <span className="block">Comprar té online premium</span>
          <span className="mt-2 block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-puretea-gold/95">
            Matcha · Ritual · Bienestar
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-puretea-sand max-w-2xl mx-auto leading-relaxed">
          Matcha japonés, té verde, negro e infusiones seleccionadas en origen. Envío gratis desde 50€ — compra fácil y segura.
        </p>
        <p className="mt-3 text-sm text-puretea-gold/90 font-medium tracking-wide uppercase">
          Envío gratis +50€ · Miles de tazas enviadas · Pago seguro
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/comprar-te"
            className="inline-flex items-center justify-center rounded-full bg-puretea-gold text-puretea-dark px-8 py-4 text-base font-semibold hover:bg-puretea-cream transition-colors min-h-[52px] shadow-lg shadow-black/20"
          >
            Comprar té online
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
