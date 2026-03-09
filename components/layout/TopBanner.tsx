"use client";

const BANNER_ITEMS = [
  "Envíos gratis a partir de 50€",
  "Envíos a toda Europa",
  "Pago seguro",
  "Devoluciones fáciles",
  "Atención al cliente",
];

export function TopBanner() {
  const repeated = [...BANNER_ITEMS, ...BANNER_ITEMS];

  return (
    <div
      className="relative overflow-hidden bg-puretea-dark text-puretea-cream py-2.5 text-sm font-medium border-b border-puretea-organic/30"
      role="marquee"
      aria-label="Ofertas y servicios: envíos gratis, pago seguro, devoluciones"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
