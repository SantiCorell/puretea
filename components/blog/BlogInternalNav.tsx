import Link from "next/link";

interface BlogInternalNavProps {
  categoryHref: string;
  categoryLabel: string;
}

export function BlogInternalNav({ categoryHref, categoryLabel }: BlogInternalNavProps) {
  return (
    <nav
      className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-puretea-sand pt-8"
      aria-label="Enlaces relacionados"
    >
      <Link href="/" className="text-puretea-organic font-medium hover:underline">
        Inicio PureTea
      </Link>
      <Link href={categoryHref} className="text-puretea-organic font-medium hover:underline">
        {categoryLabel}
      </Link>
      <Link href="/blog/guia-comprar-te-online-espana" className="text-puretea-organic font-medium hover:underline">
        Guía comprar té online
      </Link>
      <Link href="/shop" className="text-puretea-organic font-medium hover:underline">
        Ver tienda
      </Link>
    </nav>
  );
}
