export function Newsletter() {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-puretea-organic/15" aria-labelledby="newsletter-heading">
      <div className="max-w-xl mx-auto text-center">
        <h2 id="newsletter-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark">
          Newsletter
        </h2>
        <p className="mt-2 text-puretea-dark/80">
          Novedades, recetas y ofertas. Sin spam.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3" action="#">
          <input
            type="email"
            placeholder="tu@email.com"
            className="flex-1 min-w-0 rounded-full border border-puretea-sand bg-white px-5 py-3 text-puretea-dark placeholder:text-puretea-dark/50 focus:outline-none focus:ring-2 focus:ring-puretea-organic"
            aria-label="Email"
          />
          <button
            type="submit"
            className="rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 font-semibold hover:bg-puretea-organic transition-colors"
          >
            Suscribir
          </button>
        </form>
      </div>
    </section>
  );
}
