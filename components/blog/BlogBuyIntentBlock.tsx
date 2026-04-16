import Link from "next/link";

export function BlogBuyIntentBlock() {
  return (
    <section
      className="mt-12 rounded-2xl border border-puretea-organic/30 bg-puretea-cream/50 p-6 sm:p-8"
      aria-labelledby="blog-buy-intent-heading"
    >
      <h2 id="blog-buy-intent-heading" className="font-canela text-2xl text-puretea-dark mb-3">
        Dónde comprar té de calidad
      </h2>
      <p className="text-puretea-dark/85 leading-relaxed">
        Si quieres comprar té de calidad online, puedes hacerlo en PureTea, donde encontrarás
        opciones como té verde, matcha y mezclas relajantes. Explora la{" "}
        <Link href="/shop" className="text-puretea-organic font-semibold underline-offset-2 hover:underline">
          tienda
        </Link>{" "}
        o vuelve al{" "}
        <Link href="/" className="text-puretea-organic font-semibold underline-offset-2 hover:underline">
          inicio
        </Link>{" "}
        para descubrir categorías y envíos.
      </p>
    </section>
  );
}
