"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const REDIRECT_SECONDS = 10;

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cleared, setCleared] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

  const orderId = searchParams.get("order_id") ?? searchParams.get("checkout_id") ?? null;
  const orderNumber = searchParams.get("order_number") ?? null;

  useEffect(() => {
    if (cleared) return;
    // Clearing local cart state if needed
    fetch("/api/cart", { method: "DELETE" }).catch(() => {}).finally(() => setCleared(true));
  }, [cleared]);

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(t);
          router.replace("/");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [router]);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <div className="mb-8 text-6xl" aria-hidden>
        🎉
      </div>
      <h1 className="font-canela text-3xl sm:text-4xl text-puretea-dark mb-4">
        ¡Pedido completado!
      </h1>
      <p className="text-puretea-dark/80 mb-8">
        Gracias por tu compra. Recibirás un email de confirmación en breve con los detalles y el seguimiento del envío.
      </p>

      {(orderNumber || orderId) && (
        <div className="rounded-xl bg-puretea-sand/30 border border-puretea-sand p-6 mb-8 text-left">
          <h2 className="font-canela text-lg font-semibold text-puretea-dark mb-2">
            Resumen del pedido
          </h2>
          {orderNumber && (
            <p className="text-puretea-dark/80">
              <span className="font-medium">Número de pedido:</span> {orderNumber}
            </p>
          )}
          {orderId && !orderNumber && (
            <p className="text-puretea-dark/80">
              <span className="font-medium">ID:</span> {orderId}
            </p>
          )}
        </div>
      )}

      <p className="text-sm text-puretea-dark/60 mb-6">
        Redirigiendo al inicio en {countdown} segundos…
      </p>

      <Link
        href="/"
        className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-8 py-4 font-semibold hover:bg-puretea-organic transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    // Suspense prevents the build from failing due to useSearchParams()
    <Suspense fallback={
      <div className="max-w-xl mx-auto py-24 text-center">
        <p className="text-puretea-dark/60 animate-pulse">Cargando detalles de tu ritual...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}