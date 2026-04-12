import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  shop: [
    { href: "/comprar-te", label: "Comprar té online" },
    { href: "/envio-rapido-te", label: "Envío rápido" },
    { href: "/regalos-te-originales", label: "Regalos de té" },
    { href: "/shop", label: "Tienda" },
    { href: "/category/matcha", label: "Matcha" },
    { href: "/category/green-tea", label: "Té Verde" },
    { href: "/category/black-tea", label: "Té Negro" },
    { href: "/category/herbal-tea", label: "Infusiones" },
    { href: "/category/wellness-blends", label: "Wellness" },
  ],
  company: [
    { href: "/about", label: "Nosotros" },
    { href: "/benefits", label: "Beneficios" },
    { href: "/blog", label: "Blog" },
    { href: "/how-to-brew", label: "Cómo preparar" },
    { href: "/contact", label: "Contacto" },
  ],
  legal: [
    { href: "/legal/privacy", label: "Privacidad" },
    { href: "/legal/terms", label: "Términos" },
    { href: "/legal/returns", label: "Devoluciones" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-puretea-dark text-puretea-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* Cabecera / branding */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <Link href="/" className="inline-block" aria-label="PureTea inicio">
              <Image
                src="/logos/logo-dark.svg"
                alt=""
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-puretea-sand text-sm max-w-xs">
              Premium tea & wellness. Pure tea, pure ritual.
            </p>
          </div>

          {/* Newsletter siempre visible */}
          <div className="w-full sm:max-w-md">
            <h3 className="font-canela text-lg font-semibold text-puretea-cream mb-3">
              Newsletter
            </h3>
            <p className="text-puretea-sand text-sm mb-3">
              Recibe novedades y ofertas.
            </p>
            <form action="#" method="post" className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 min-w-0 rounded-lg border border-puretea-organic bg-transparent px-4 py-2.5 text-puretea-cream placeholder:text-puretea-sand focus:outline-none focus:ring-2 focus:ring-puretea-gold"
                aria-label="Email para newsletter"
              />
              <button
                type="submit"
                className="rounded-lg bg-puretea-gold text-puretea-dark px-4 py-2.5 font-semibold hover:bg-puretea-cream transition-colors"
              >
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Enlaces: acordeón en móvil, columnas en desktop */}
        <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Tienda */}
          <details className="sm:hidden border-t border-puretea-organic/30 py-3">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-canela text-base font-semibold">Tienda</span>
              <span className="text-puretea-sand text-xs">+</span>
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              {FOOTER_LINKS.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-puretea-sand hover:text-puretea-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          {/* Empresa */}
          <details className="sm:hidden border-t border-puretea-organic/30 py-3">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-canela text-base font-semibold">Empresa</span>
              <span className="text-puretea-sand text-xs">+</span>
            </summary>
            <ul className="mt-3 space-y-2 text-sm">
              {FOOTER_LINKS.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-puretea-sand hover:text-puretea-cream transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          {/* Versión desktop / tablet: columnas abiertas */}
          <div className="hidden sm:block">
            <h3 className="font-canela text-lg font-semibold text-puretea-cream mb-4">
              Tienda
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.shop.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-puretea-sand hover:text-puretea-cream text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <h3 className="font-canela text-lg font-semibold text-puretea-cream mb-4">
              Empresa
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-puretea-sand hover:text-puretea-cream text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal + copy */}
        <div className="mt-10 pt-6 border-t border-puretea-organic/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <ul className="flex gap-6">
            {FOOTER_LINKS.legal.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-puretea-sand hover:text-puretea-cream text-sm"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-puretea-sand text-sm">
            © {new Date().getFullYear()} PureTea. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
