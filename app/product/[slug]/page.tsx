import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Toda la ficha de producto vive en /products/[handle]. Redirigir para una sola fuente de verdad. */
export default async function ProductSlugPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/products/${slug}`);
}
