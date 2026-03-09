import { redirect } from "next/navigation";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

const SHOPIFY_ACCOUNT_URL =
  process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL ||
  (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/account`
    : null);

export const metadata = buildPageMetadata({
  title: "Mi cuenta",
  description: "Accede a tu cuenta PureTea para ver pedidos y datos.",
  path: "/account",
});

export default function AccountPage() {
  if (SHOPIFY_ACCOUNT_URL && SHOPIFY_ACCOUNT_URL.startsWith("http")) {
    redirect(SHOPIFY_ACCOUNT_URL);
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <h1 className="font-canela text-3xl text-puretea-dark mb-4">
        Mi cuenta
      </h1>
      <p className="text-puretea-dark/80 mb-8">
        La cuenta y el registro se gestionan con Shopify. Configura{" "}
        <code className="text-sm bg-puretea-sand/50 px-1 rounded">
          NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
        </code>{" "}
        o{" "}
        <code className="text-sm bg-puretea-sand/50 px-1 rounded">
          NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL
        </code>{" "}
        para redirigir a la tienda.
      </p>
      <Link
        href="/shop"
        className="inline-flex justify-center rounded-full bg-puretea-dark text-puretea-cream px-6 py-3 font-semibold hover:bg-puretea-organic transition-colors"
      >
        Ir a la tienda
      </Link>
    </div>
  );
}
