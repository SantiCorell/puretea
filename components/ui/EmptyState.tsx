interface EmptyStateProps {
  title?: string;
  message?: string;
  /** Optional emoji or icon for friendly empty state */
  icon?: string;
}

export function EmptyState({
  title = "No hay datos por el momento",
  message = "Estamos preparando nuevos productos. Vuelve pronto.",
  icon = "🍵",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-4 text-center">
      <span className="text-5xl lg:text-6xl mb-4" aria-hidden>
        {icon}
      </span>
      <h2 className="font-canela text-2xl sm:text-3xl text-puretea-dark">
        {title}
      </h2>
      <p className="mt-2 text-puretea-dark/70 max-w-md">
        {message}
      </p>
    </div>
  );
}
