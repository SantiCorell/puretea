import { getMockBlogPosts } from "@/lib/mock/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { buildPageMetadata } from "@/lib/seo/metadata";

const POSTS_PER_PAGE = 9;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);
  const isFirst = page <= 1;
  return buildPageMetadata({
    title: isFirst ? "Blog" : `Blog — Página ${page}`,
    description:
      "Artículos sobre matcha, té verde, bienestar y cómo preparar tu té. Guías y recetas.",
    path: isFirst ? "/blog" : `/blog?page=${page}`,
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params?.page ?? "1", 10) || 1);
  const allPosts = getMockBlogPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages) || 1;
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <header className="mb-14 text-center max-w-2xl mx-auto">
        <h1 className="font-canela text-4xl sm:text-5xl text-puretea-dark">
          Blog PureTea
        </h1>
        <p className="mt-4 text-lg text-puretea-dark/80">
          Guías expertas sobre matcha, té verde, bienestar y ritual. Somos referentes en té premium.
        </p>
      </header>
      {/* Mobile: carrusel horizontal de posts */}
      <div className="-mx-4 px-4 sm:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {posts.map((post) => (
            <div key={post.slug} className="min-w-[75%] max-w-[80%] snap-start">
              <BlogCard
                post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  image: post.image,
                  date: post.date,
                  category: post.category,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Tablet / Desktop: grid clásica */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={{
              slug: post.slug,
              title: post.title,
              excerpt: post.excerpt,
              image: post.image,
              date: post.date,
              category: post.category,
            }}
          />
        ))}
      </div>
      <BlogPagination
        currentPage={safePage}
        totalPages={totalPages}
        basePath="/blog"
      />
    </div>
  );
}
