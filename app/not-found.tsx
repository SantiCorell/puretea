import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-canela text-6xl text-puretea-dark">404</h1>
      <h2 className="mt-4 font-canela text-2xl text-puretea-dark">Página no encontrada</h2>
      <p className="mt-2 text-puretea-dark/80 max-w-md">
        Parece que el ritual que buscas no está aquí.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-3 font-semibold hover:bg-puretea-organic transition-colors"
        >
          Volver al inicio
        </Link>
        <Link
          href="/cart"
          className="inline-flex items-center justify-center rounded-full border border-puretea-dark text-puretea-dark px-8 py-3 font-semibold hover:bg-puretea-cream transition-colors"
        >
          Ver mi carrito
        </Link>
      </div>
    </div>
  );
}