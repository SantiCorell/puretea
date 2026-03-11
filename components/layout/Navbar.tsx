"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartButton } from "./CartButton";

/** * LEVEL 1: Absolute Shopify Account URL
 * We add a trailing slash and force it to be a string to ensure no relative pathing.
 */
const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'puretea-5911.myshopify.com';
const SHOPIFY_ACCOUNT_URL = `https://${shopifyDomain}/account/`;

const NOSOTROS_LINKS = [
  { href: "/about", label: "Nosotros" },
  { href: "/benefits", label: "Beneficios" },
  { href: "/contact", label: "Contacto" },
];

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

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
  const comprarLinks = buildComprarLinks(collections);

  return (
    <header className="sticky top-0 z-50 bg-puretea-cream/98 backdrop-blur-md border-b border-puretea-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="PureTea inicio">
            <Image
              src="/logos/logo.svg"
              alt="PureTea"
              width={120}
              height={36}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors">
                Comprar
                <ChevronDown className="text-puretea-dark/70 group-hover:text-puretea-organic" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <ul className="min-w-[180px] rounded-xl border border-puretea-sand bg-white py-2 shadow-lg">
                  {comprarLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="block px-4 py-2.5 text-sm text-puretea-dark hover:bg-puretea-organic/10 hover:text-puretea-organic">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1.5 px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors">
                Nosotros
                <ChevronDown className="text-puretea-dark/70 group-hover:text-puretea-organic" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <ul className="min-w-[160px] rounded-xl border border-puretea-sand bg-white py-2 shadow-lg">
                  {NOSOTROS_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className="block px-4 py-2.5 text-sm text-puretea-dark hover:bg-puretea-organic/10 hover:text-puretea-organic">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/blog" className="px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors">Blog</Link>
            <Link href="/how-to-brew" className="px-3 py-2 text-puretea-dark font-medium hover:text-puretea-organic text-sm uppercase tracking-wide rounded-lg hover:bg-puretea-sand/30 transition-colors">Cómo preparar</Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs font-bold text-puretea-organic bg-puretea-organic/10 px-3 py-1 rounded-full">Envíos gratis 50€</span>
            
            {/* LEVEL 1: Shopify Account Link with prefetch disabled to prevent 404s */}
            <Link 
              href={SHOPIFY_ACCOUNT_URL} 
              prefetch={false}
              className="p-2 text-puretea-dark hover:text-puretea-organic rounded-lg hover:bg-puretea-sand/30 transition-colors" 
              aria-label="Mi cuenta"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            <CartButton />

            <Link href="/shop" className="rounded-full bg-puretea-dark text-puretea-cream px-5 py-2.5 text-sm font-semibold hover:bg-puretea-organic transition-colors">Comprar</Link>
          </div>

          {/* Mobile Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <CartButton />

            <button
              type="button"
              className="p-2 text-puretea-dark"
              onClick={() => setMobileOpen((o) => !o)}
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

        {/* Mobile Menu Content */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-puretea-sand/50 px-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              <Link href="/shop" className="py-3 text-puretea-dark font-medium border-b border-puretea-sand/20 text-sm" onClick={() => setMobileOpen(false)}>Comprar</Link>
              <Link href="/about" className="py-3 text-puretea-dark font-medium border-b border-puretea-sand/20 text-sm" onClick={() => setMobileOpen(false)}>Nosotros</Link>
              <Link href="/blog" className="py-3 text-puretea-dark font-medium border-b border-puretea-sand/20 text-sm" onClick={() => setMobileOpen(false)}>Blog</Link>
              
              {/* LEVEL 1: Forced Absolute Shopify Link */}
              <a 
                href={SHOPIFY_ACCOUNT_URL} 
                className="py-3 block text-puretea-dark font-medium border-b border-puretea-sand/20 text-sm" 
                onClick={() => setMobileOpen(false)}
              >
                Mi cuenta (Shopify)
              </a>
              
              <Link href="/shop" className="mt-6 inline-flex w-full justify-center rounded-full bg-puretea-dark text-puretea-cream py-4 font-bold text-base uppercase tracking-wider" onClick={() => setMobileOpen(false)}>
                Ver Catálogo
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}