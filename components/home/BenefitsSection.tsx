const BENEFITS = [
  {
    title: "Origen premium",
    description: "Tés seleccionados de Japón, China y Ceylán. Trazabilidad y calidad.",
  },
  {
    title: "Bienestar",
    description: "Desde matcha para energía calmada hasta infusiones para relajación.",
  },
  {
    title: "Ritual",
    description: "Cada taza es un momento para ti. Pure tea, pure ritual.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-puretea-organic/10" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="benefits-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center mb-14">
          Por qué PureTea
        </h2>
        {/* Mobile: tarjetas deslizables tipo carrusel */} 
        <div className="flex gap-4 overflow-x-auto md:hidden -mx-4 px-4 pb-2 snap-x snap-mandatory">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="min-w-[75%] max-w-[80%] text-center rounded-2xl bg-white px-6 py-8 shadow-sm border border-puretea-sand/50 hover:border-puretea-organic/40 hover:shadow-md transition-all duration-300 snap-start"
            >
              <h3 className="font-canela text-lg font-semibold text-puretea-dark">
                {b.title}
              </h3>
              <p className="mt-3 text-sm text-puretea-dark/80 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
        {/* Desktop / tablet: grid clásica de tres columnas */} 
        <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-10">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="text-center rounded-2xl bg-white px-8 py-10 shadow-sm border border-puretea-sand/50 hover:border-puretea-organic/40 hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-canela text-xl font-semibold text-puretea-dark">
                {b.title}
              </h3>
              <p className="mt-3 text-puretea-dark/80 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
