import Link from "next/link";
import type { SeoLanding } from "@/lib/seo/seo-landing-types";
import { FAQ } from "@/components/ui/FAQ";

export function SeoLandingView({ landing }: { landing: SeoLanding }) {
  const ctaHref = landing.ctaHref ?? "/shop";
  const ctaLabel = landing.ctaLabel ?? "Ver tienda";
  const quickPoints = [
    "Compra segura con checkout Shopify",
    "Envío gratis desde 50€",
    "Selección premium de matcha, té e infusiones",
  ];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <nav className="mb-8 text-sm text-puretea-dark/70" aria-label="Migas de pan">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-puretea-organic">
              Inicio
            </Link>
          </li>
          <li aria-hidden className="text-puretea-dark/40">
            /
          </li>
          <li className="text-puretea-dark font-medium truncate">{landing.h1}</li>
        </ol>
      </nav>

      <header className="mb-10 rounded-3xl border border-puretea-sand/60 bg-gradient-to-br from-white to-puretea-cream/70 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-puretea-organic mb-2">
          PureTea · Comprar té online
        </p>
        <h1 className="font-canela text-3xl sm:text-4xl lg:text-5xl text-puretea-dark leading-tight">
          {landing.h1}
        </h1>
        <p className="mt-6 text-lg text-puretea-dark/80 leading-relaxed">{landing.intro}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
          <Link
            href={ctaHref}
            className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-puretea-organic transition-colors"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/comprar-te"
            className="inline-flex justify-center rounded-full border-2 border-puretea-dark text-puretea-dark px-8 py-3.5 text-sm font-semibold hover:bg-puretea-sand/40 transition-colors"
          >
            Guía comprar té
          </Link>
        </div>
        <ul className="mt-6 grid gap-2 sm:grid-cols-3">
          {quickPoints.map((point) => (
            <li
              key={point}
              className="rounded-xl border border-puretea-sand/70 bg-white/80 px-3.5 py-2 text-sm text-puretea-dark/80"
            >
              {point}
            </li>
          ))}
        </ul>
      </header>

      <div className="space-y-12">
        {landing.sections.map((section, i) => (
          <section key={`${section.h2}-${i}`} aria-labelledby={`seo-h2-${i}`}>
            <h2
              id={`seo-h2-${i}`}
              className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-4"
            >
              {section.h2}
            </h2>
            <div
              className="prose prose-neutral prose-lg max-w-none text-puretea-dark/90 prose-a:text-puretea-organic prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          </section>
        ))}
      </div>

      {landing.relatedLinks && landing.relatedLinks.length > 0 && (
        <section className="mt-14 pt-10 border-t border-puretea-sand" aria-labelledby="related-seo">
          <h2 id="related-seo" className="font-canela text-xl text-puretea-dark mb-4">
            También te interesa
          </h2>
          <ul className="flex flex-wrap gap-3">
            {landing.relatedLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex rounded-full border border-puretea-organic/40 px-4 py-2 text-sm font-medium text-puretea-organic hover:bg-puretea-organic/10"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {landing.faqs && landing.faqs.length > 0 && (
        <div className="mt-14">
          <FAQ items={landing.faqs} title="Preguntas frecuentes" />
        </div>
      )}
    </article>
  );
}
