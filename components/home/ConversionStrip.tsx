export function ConversionStrip() {
  const items = [
    { label: "Envío gratis", sub: "en pedidos +50€" },
    { label: "Pago seguro", sub: "Shopify Payments" },
    { label: "Europa", sub: "enviamos a toda la UE" },
    { label: "Ritual real", sub: "té y matcha premium" },
  ];

  return (
    <section
      className="border-y border-puretea-sand/50 bg-white"
      aria-label="Ventajas de comprar en PureTea"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {items.map((item) => (
            <div key={item.label} className="px-2">
              <p className="text-sm font-bold text-puretea-dark uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-xs text-puretea-dark/65 mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
