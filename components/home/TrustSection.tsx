const TRUST = [
  "Envíos a toda Europa",
  "Pago seguro",
  "Devoluciones fáciles",
  "Atención al cliente",
];

export function TrustSection() {
  return (
    <section className="py-8 border-y border-puretea-sand bg-puretea-cream" aria-label="Garantías">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center gap-8 lg:gap-12 text-sm font-medium text-puretea-dark/80">
          {TRUST.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
