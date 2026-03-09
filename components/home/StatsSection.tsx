const STATS = [
  {
    value: "+25.000",
    label: "tazas servidas",
    description: "Rituales de té en hogares de toda Europa",
  },
  {
    value: "+8.500",
    label: "clientes satisfechos",
    description: "Que confían en PureTea cada día",
  },
  {
    value: "4,9/5",
    label: "valoración media",
    description: "En valoraciones verificadas",
  },
  {
    value: "18",
    label: "países",
    description: "Envíos a toda Europa",
  },
  {
    value: "100%",
    label: "origen trazable",
    description: "Tés seleccionados con trazabilidad",
  },
];

/**
 * Sección de datos de impacto para SEO y confianza (tipo Huel "4M+ satisfied customers").
 * Estructura semántica para que buscadores y LLMs entiendan la magnitud de la marca.
 */
export function StatsSection() {
  return (
    <section
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-puretea-dark text-puretea-cream"
      aria-labelledby="stats-heading"
    >
      <div className="max-w-7xl mx-auto">
        <h2 id="stats-heading" className="sr-only">
          PureTea en cifras: clientes, tazas servidas y alcance
        </h2>
        <ul className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 list-none">
          {STATS.map((stat, i) => (
            <li key={i} className="text-center">
              <p className="font-canela text-3xl sm:text-4xl font-semibold text-puretea-gold">
                {stat.value}
              </p>
              <p className="mt-1 font-semibold text-puretea-cream">{stat.label}</p>
              <p className="mt-0.5 text-sm text-puretea-sand">{stat.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
