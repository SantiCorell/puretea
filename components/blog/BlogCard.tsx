import Link from "next/link";
import Image from "next/image";

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  category?: string;
}

interface BlogCardProps {
  post: BlogPostSummary;
}

export function BlogCard({ post }: BlogCardProps) {
  const image = post.image ?? "/images/blog/placeholder.svg";

  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-puretea-sand/50">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4">
          {post.category && (
            <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
              {post.category}
            </p>
          )}
          <h2 className="mt-1 font-canela text-xl font-semibold text-puretea-dark group-hover:text-puretea-organic line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-2 text-puretea-dark/80 line-clamp-2 text-sm">
            {post.excerpt}
          </p>
          <time dateTime={post.date} className="mt-2 block text-sm text-puretea-dark/60">
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
      </Link>
    </article>
  );
}
