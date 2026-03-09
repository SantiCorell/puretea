"use client";

import Link from "next/link";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "ellipsis", total];
  if (current >= total - 2) return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export function BlogPagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const pageHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      className="mt-14 pt-10 border-t border-puretea-sand"
      aria-label="Paginación del blog"
    >
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {prevPage ? (
            <Link
              href={pageHref(prevPage)}
              className="inline-flex items-center gap-1 rounded-lg border border-puretea-sand bg-white px-4 py-2 text-sm font-medium text-puretea-dark hover:border-puretea-organic hover:bg-puretea-cream transition-colors"
            >
              ← Anterior
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-lg border border-puretea-sand/50 bg-puretea-sand/20 px-4 py-2 text-sm font-medium text-puretea-dark/50 cursor-not-allowed"
              aria-disabled="true"
            >
              ← Anterior
            </span>
          )}
        </li>

        <li className="flex items-center gap-1 mx-2">
          {pages.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ell-${i}`} className="px-2 text-puretea-dark/50">
                …
              </span>
            ) : p === currentPage ? (
              <span
                key={p}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-puretea-organic text-puretea-cream text-sm font-semibold"
                aria-current="page"
              >
                {p}
              </span>
            ) : (
              <Link
                key={p}
                href={pageHref(p)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-puretea-sand bg-white text-sm font-medium text-puretea-dark hover:border-puretea-organic hover:bg-puretea-cream transition-colors"
              >
                {p}
              </Link>
            )
          )}
        </li>

        <li>
          {nextPage ? (
            <Link
              href={pageHref(nextPage)}
              className="inline-flex items-center gap-1 rounded-lg border border-puretea-sand bg-white px-4 py-2 text-sm font-medium text-puretea-dark hover:border-puretea-organic hover:bg-puretea-cream transition-colors"
            >
              Siguiente →
            </Link>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-lg border border-puretea-sand/50 bg-puretea-sand/20 px-4 py-2 text-sm font-medium text-puretea-dark/50 cursor-not-allowed"
              aria-disabled="true"
            >
              Siguiente →
            </span>
          )}
        </li>
      </ul>
      <p className="mt-3 text-center text-sm text-puretea-dark/60">
        Página {currentPage} de {totalPages}
      </p>
    </nav>
  );
}
