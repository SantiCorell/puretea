import Link from "next/link";

const PILLARS = [
  {
    title: "Calidad seleccionada en origen",
    text: "Matcha japonés, tés verdes y negros elegidos por trazabilidad, frescura y perfil de sabor.",
    icon: "leaf",
  },
  {
    title: "Compra rápida y segura",
    text: "Checkout con Shopify, precios claros y envío gratis desde 50€ para pedidos que cumplan la condición.",
    icon: "shield",
  },
  {
    title: "Ritual para cada objetivo",
    text: "Energía calmada, foco, digestión o descanso: encuentra tu té según momento del día.",
    icon: "spark",
  },
];

const STATS = [
  { value: "4.9/5", label: "Valoración media" },
  { value: "24-48h", label: "Preparación pedido" },
  { value: "50€+", label: "Envío gratis" },
  { value: "100%", label: "Enfoque premium" },
];

function Icon({ kind }: { kind: "leaf" | "shield" | "spark" }) {
  if (kind === "leaf") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 15c0-7 8-11 16-11-1 8-5 16-12 16-2 0-4-2-4-5Z" />
        <path d="M9 14c2 0 5-2 8-5" />
      </svg>
    );
  }
  if (kind === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3 5 6v6c0 5 3 8 7 9 4-1 7-4 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 3 1.8 4.5L18 9.3l-3.5 2.9.9 4.5L12 14.8 8.6 16.7l.9-4.5L6 9.3l4.2-1.8L12 3Z" />
    </svg>
  );
}

export function WhyPureTea() {
  return (
    <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-puretea-sand/60">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-puretea-organic mb-3">
            Por qué PureTea
          </p>
          <h2 className="font-canela text-3xl sm:text-4xl text-puretea-dark">
            Una tienda de té pensada para comprar bien, repetir y disfrutar
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.title} className="rounded-2xl border border-puretea-sand/60 bg-puretea-cream/40 p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-puretea-organic/10 text-puretea-organic">
                <Icon kind={p.icon as "leaf" | "shield" | "spark"} />
              </div>
              <h3 className="mt-4 font-canela text-2xl text-puretea-dark">{p.title}</h3>
              <p className="mt-2 text-puretea-dark/75 leading-relaxed">{p.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-puretea-sand/70 bg-puretea-dark text-puretea-cream p-6 lg:p-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-canela text-3xl text-puretea-gold">{s.value}</p>
                <p className="text-sm text-puretea-sand mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/comprar-te"
              className="inline-flex justify-center rounded-full bg-puretea-gold px-6 py-3 text-sm font-bold text-puretea-dark hover:bg-puretea-cream transition-colors"
            >
              Empezar a comprar té
            </Link>
            <Link
              href="/blog"
              className="inline-flex justify-center rounded-full border border-puretea-sand/50 px-6 py-3 text-sm font-semibold text-puretea-cream hover:bg-white/10 transition-colors"
            >
              Leer guías de compra
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
