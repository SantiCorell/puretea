import Link from "next/link";
import { cookies } from "next/headers";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isCustomerAccountOAuthConfigured } from "@/lib/shopify/customer-account-auth";

export const metadata = buildPageMetadata({
  title: "Mi cuenta",
  description: "Inicia sesión o gestiona tu cuenta PureTea. Pedidos, datos y ritual de té.",
  path: "/account",
});

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string; error?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const hasSession = Boolean(jar.get("puretea_customer_access_token")?.value);
  const oauthReady = isCustomerAccountOAuthConfigured();

  const shopifyDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "puretea-5910.myshopify.com";
  const classicAccountUrl = `https://${shopifyDomain}/account`;

  return (
    <div className="min-h-[70vh] bg-[#fdfcf9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-puretea-organic mb-3">
          PureTea
        </p>
        <h1 className="font-canela text-4xl sm:text-5xl text-puretea-dark mb-4">
          Tu cuenta
        </h1>
        <p className="text-lg text-puretea-dark/75 max-w-xl mb-10">
          Gestiona pedidos y datos en un solo lugar. Envío gratis desde 50€ y pago seguro.
        </p>

        {params.error === "oauth_https_required" &&
          process.env.NODE_ENV === "development" && (
          <div
            className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950"
            role="alert"
          >
            <p className="font-semibold">Desarrollo: inicio de sesión</p>
            <p className="mt-2 opacity-95">
              El inicio de sesión seguro requiere HTTPS y un dominio público. En desarrollo usa la
              URL de producción o un túnel y revisa la URL de retorno en el admin de la tienda.
            </p>
          </div>
        )}

        {params.error === "oauth_https_required" &&
          process.env.NODE_ENV !== "development" && (
          <div
            className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-950"
            role="alert"
          >
            <p className="font-semibold">No pudimos iniciar sesión</p>
            <p className="mt-2 opacity-95">
              Vuelve a intentarlo en unos minutos. Si el problema continúa, escríbenos desde{" "}
              <Link href="/contact" className="underline font-medium text-puretea-organic">
                contacto
              </Link>
              .
            </p>
          </div>
        )}

        {params.error &&
          params.error !== "oauth_https_required" &&
          params.error !== "oauth_bad_redirect_uri" && (
            <div
              className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-900"
              role="alert"
            >
              <p className="font-semibold">No se pudo completar el inicio de sesión</p>
              <p className="mt-1 opacity-90">
                Vuelve a intentarlo. Si sigue fallando, prueba más tarde o contáctanos.
              </p>
            </div>
          )}

        {params.error === "oauth_bad_redirect_uri" && (
          <div
            className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-900"
            role="alert"
          >
            <p className="font-semibold">No se pudo completar el inicio de sesión</p>
            <p className="mt-1 opacity-90">
              Vuelve a intentarlo en unos minutos. Si el problema continúa, escríbenos desde{" "}
              <Link href="/contact" className="underline font-medium text-puretea-organic">
                contacto
              </Link>
              .
            </p>
          </div>
        )}

        {params.welcome && hasSession && (
          <div className="mb-8 rounded-2xl border border-puretea-organic/40 bg-puretea-organic/10 px-5 py-4 text-puretea-dark">
            <p className="font-semibold">¡Hola de nuevo!</p>
            <p className="mt-1 text-sm opacity-90">
              Ya estás dentro. Puedes seguir comprando o revisar tu cuenta con los enlaces de abajo.
            </p>
          </div>
        )}

        {hasSession ? (
          <div className="space-y-6">
            <div className="rounded-2xl border border-puretea-sand/60 bg-white p-8 shadow-sm">
              <h2 className="font-canela text-2xl text-puretea-dark mb-2">
                Estás conectado
              </h2>
              <p className="text-puretea-dark/70 text-sm mb-6">
                Cierra sesión aquí o sigue comprando. Para ver pedidos y detalles puedes usar el
                enlace a tu área de cliente.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/shop"
                  className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 text-sm font-semibold hover:bg-puretea-organic transition-colors"
                >
                  Seguir comprando
                </Link>
                <a
                  href="/api/auth/customer/logout"
                  className="inline-flex justify-center rounded-full border-2 border-puretea-sand px-6 py-3 text-sm font-semibold text-puretea-dark hover:border-puretea-dark transition-colors"
                >
                  Cerrar sesión
                </a>
                <a
                  href={classicAccountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center rounded-full border-2 border-puretea-organic/40 px-6 py-3 text-sm font-semibold text-puretea-organic hover:bg-puretea-organic/10 transition-colors"
                >
                  Ver pedidos y datos
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {oauthReady ? (
              <div className="rounded-2xl border border-puretea-sand/60 bg-white p-8 shadow-sm flex flex-col">
                <h2 className="font-canela text-2xl text-puretea-dark mb-2">
                  Entrar o registrarse
                </h2>
                <p className="text-sm text-puretea-dark/70 flex-1 mb-6">
                  Inicio de sesión seguro: tus datos van cifrados y solo tú accedes a tu cuenta.
                </p>
                <a
                  href="/api/auth/customer/login"
                  className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-4 text-sm font-bold uppercase tracking-wide hover:bg-puretea-organic transition-colors"
                >
                  Continuar con PureTea
                </a>
                <p className="mt-4 text-[11px] text-puretea-dark/50 leading-relaxed">
                  Te llevamos a una pantalla segura para entrar o registrarte; después volverás a
                  PureTea.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-puretea-sand/60 bg-white p-8 shadow-sm">
                <h2 className="font-canela text-2xl text-puretea-dark mb-2">
                  Tu cuenta
                </h2>
                <p className="text-sm text-puretea-dark/70 mb-6">
                  Accede con el enlace de abajo para ver pedidos y datos asociados a tu correo.
                </p>
                <a
                  href={classicAccountUrl}
                  className="inline-flex w-full justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-4 text-sm font-bold uppercase tracking-wide hover:bg-puretea-organic transition-colors"
                >
                  Entrar a mi cuenta
                </a>
              </div>
            )}

            <div className="rounded-2xl border border-puretea-organic/25 bg-puretea-cream/50 p-8 flex flex-col">
              <h2 className="font-canela text-2xl text-puretea-dark mb-2">¿Primera compra?</h2>
              <p className="text-sm text-puretea-dark/70 flex-1 mb-6">
                Explora matcha, tés e infusiones premium. Envíos a toda Europa y ritual de
                calidad en cada pedido.
              </p>
              <Link
                href="/shop"
                className="inline-flex justify-center rounded-full bg-puretea-gold text-puretea-dark px-6 py-4 text-sm font-bold uppercase tracking-wide hover:bg-puretea-cream transition-colors border border-puretea-dark/10"
              >
                Ver tienda
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
