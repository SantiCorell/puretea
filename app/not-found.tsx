import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="font-canela text-4xl text-puretea-dark">404</h1>
      <p className="mt-2 text-puretea-dark/80">Página no encontrada.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 font-semibold hover:bg-puretea-organic transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
