"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/** URLs Shopify: cuenta y carrito. En headless, cuenta = Shopify account; carrito = tu página /cart o Shopify cart */
const SHOPIFY_ACCOUNT_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL ||
  (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`
    : "/account");
const CART_URL = "/cart";

const NOSOTROS_LINKS = [
  { href: "/about", label: "Nosotros" },
  { href: "/benefits", label: "Beneficios" },
  { href: "/contact", label: "Contacto" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

/** Colecciones desde Shopify (layout las obtiene con getCollections()). */
export interface NavbarCollections {
  handle: string;
  title: string;
}

const DEFAULT_COMPRAR_LINKS = [
  { href: "/shop", label: "Ver todo" },
  { href: "/category/matcha", label: "Matcha" },
  { href: "/category/green-tea", label: "Té verde" },
  { href: "/category/black-tea", label: "Té negro" },
  { href: "/category/herbal-tea", label: "Infusiones" },
  { href: "/category/wellness-blends", label: "Wellness" },
];

function buildComprarLinks(collections: NavbarCollections[] | undefined) {
  if (!collections?.length) return DEFAULT_COMPRAR_LINKS;
  return [
    { href: "/shop", label: "Ver todo" },
    ...collections.map((c) => ({ href: `/category/${c.handle}`, label: c.title })),
  ];
}

export function Navbar({ collections }: { collections?: NavbarCollections[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileComprar, setMobileComprar] = useState(false);
  const [mobileNosotros, setMobileNosotros] = useState(false);

  const comprarLinks = buildComprarLinks(collections);

  return (
    <header className="sticky top-0 z-50 bg-puretea-cream/98 backdrop-blur-md border-b border-puretea-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="PureTea inicio">
            <Image
              src="/logos/logo.svg"
              alt=""
              width={120}
              height={36}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop: nav central */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Comprar
                <ChevronDown className="text-puretea-dark/70 group-hover:text-puretea-organic" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150">
                <ul className="min-w-[180px] rounded-xl border border-puretea-sand bg-white py-2 shadow-lg">
                  {comprarLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-4 py-2.5 text-sm text-puretea-dark hover:bg-puretea-organic/10 hover:text-puretea-organic"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Nosotros
                <ChevronDown className="text-puretea-dark/70 group-hover:text-puretea-organic" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-150">
                <ul className="min-w-[160px] rounded-xl border border-puretea-sand bg-white py-2 shadow-lg">
                  {NOSOTROS_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-4 py-2.5 text-sm text-puretea-dark hover:bg-puretea-organic/10 hover:text-puretea-organic"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/blog"
              className="px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/how-to-brew"
              className="px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors"
            >
              Cómo preparar
            </Link>
          </nav>

          {/* Desktop: promo + iconos */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-puretea-organic/20 text-puretea-dark px-4 py-2 text-sm font-semibold hover:bg-puretea-organic/30 transition-colors whitespace-nowrap"
            >
              Envíos gratis 50€
            </Link>
            <Link
              href="/#home-faq-heading"
              className="p-2 text-puretea-dark hover:text-puretea-organic rounded-lg hover:bg-puretea-sand/30 transition-colors"
              aria-label="Preguntas frecuentes"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </Link>
            <Link
              href={SHOPIFY_ACCOUNT_URL}
              className="p-2 text-puretea-dark hover:text-puretea-organic rounded-lg hover:bg-puretea-sand/30 transition-colors"
              aria-label="Mi cuenta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link
              href={CART_URL}
              className="p-2 text-puretea-dark hover:text-puretea-organic rounded-lg hover:bg-puretea-sand/30 transition-colors relative"
              aria-label="Carrito"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="rounded-full bg-puretea-dark text-puretea-cream px-5 py-2.5 text-sm font-semibold hover:bg-puretea-organic transition-colors"
            >
              Comprar
            </Link>
          </div>

          {/* Móvil: hamburger + carrito */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href={CART_URL} className="p-2 text-puretea-dark" aria-label="Carrito">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>
            <button
              type="button"
              className="p-2 text-puretea-dark"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-label="Menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-puretea-sand/50" aria-label="Menú móvil">
            <div className="flex flex-col gap-1">
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-puretea-dark font-medium"
                  onClick={() => setMobileComprar((o) => !o)}
                >
                  Comprar
                  <ChevronDown className={`transition-transform ${mobileComprar ? "rotate-180" : ""}`} />
                </button>
                {mobileComprar && (
                  <ul className="pl-4 pb-2 space-y-1">
                    {comprarLinks.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="block py-2 text-sm text-puretea-dark/90" onClick={() => setMobileOpen(false)}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-puretea-dark font-medium"
                  onClick={() => setMobileNosotros((o) => !o)}
                >
                  Nosotros
                  <ChevronDown className={`transition-transform ${mobileNosotros ? "rotate-180" : ""}`} />
                </button>
                {mobileNosotros && (
                  <ul className="pl-4 pb-2 space-y-1">
                    {NOSOTROS_LINKS.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="block py-2 text-sm text-puretea-dark/90" onClick={() => setMobileOpen(false)}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <Link href="/blog" className="py-3 text-puretea-dark font-medium" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
              <Link href="/how-to-brew" className="py-3 text-puretea-dark font-medium" onClick={() => setMobileOpen(false)}>
                Cómo preparar
              </Link>
              <Link href="/#home-faq-heading" className="py-3 text-puretea-dark font-medium" onClick={() => setMobileOpen(false)}>
                Preguntas frecuentes
              </Link>
              <Link href={SHOPIFY_ACCOUNT_URL} className="py-3 text-puretea-dark font-medium" onClick={() => setMobileOpen(false)}>
                Mi cuenta
              </Link>
              <Link
                href="/shop"
                className="mt-4 inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream py-3 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Comprar
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
