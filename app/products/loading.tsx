export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-12">
        <div className="h-9 w-48 bg-puretea-sand/50 rounded animate-pulse" />
        <div className="mt-2 h-5 w-96 max-w-full bg-puretea-sand/30 rounded animate-pulse" />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-puretea-sand/50">
            <div className="aspect-square bg-puretea-sand/30 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-3 w-16 bg-puretea-sand/40 rounded animate-pulse" />
              <div className="h-5 w-full bg-puretea-sand/40 rounded animate-pulse" />
              <div className="h-5 w-20 bg-puretea-sand/40 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
