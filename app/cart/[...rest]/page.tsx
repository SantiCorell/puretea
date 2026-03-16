import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ rest: string[] }>;
}

/**
 * Shopify a veces genera URLs de carrito como /cart/c/... en el dominio principal.
 * Nuestra app headless solo usa /cart, así que cualquier ruta anidada se redirige
 * limpiamente al carrito principal.
 */
export default async function LegacyCartRedirect(_props: PageProps) {
  // Ignoramos los segmentos extra y llevamos siempre a /cart
  redirect("/cart");
}

