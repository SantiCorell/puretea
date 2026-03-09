export default function ProductDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="h-5 w-64 bg-puretea-sand/30 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="aspect-square rounded-2xl bg-puretea-sand/30 animate-pulse" />
        <div className="space-y-4">
          <div className="h-3 w-20 bg-puretea-sand/40 rounded animate-pulse" />
          <div className="h-9 w-3/4 bg-puretea-sand/40 rounded animate-pulse" />
          <div className="h-8 w-24 bg-puretea-sand/40 rounded animate-pulse" />
          <div className="h-4 w-full bg-puretea-sand/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-puretea-sand/30 rounded animate-pulse" />
          <div className="h-12 w-full max-w-sm bg-puretea-sand/40 rounded-full animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}
