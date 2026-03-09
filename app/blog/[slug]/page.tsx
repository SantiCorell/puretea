import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMockBlogPostBySlug } from "@/lib/mock/blog";
import { getProductByHandle } from "@/lib/data";
import { FAQ } from "@/components/ui/FAQ";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { BLOG_POSTS } = await import("@/lib/mock/blog");
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getMockBlogPostBySlug(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMockBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedProducts = post.relatedProducts
    ? await Promise.all(
        post.relatedProducts.map((handle) => getProductByHandle(handle))
      )
    : [];
  const products = relatedProducts.filter(Boolean);

  const articleJson = articleSchema({
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: `/blog/${post.slug}`,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema(post.faqs)),
          }}
        />
      )}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <nav className="mb-8 text-sm text-puretea-dark/70" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/blog" className="hover:text-puretea-organic">Blog</Link></li>
            <li aria-hidden>/</li>
            <li className="text-puretea-dark">{post.title}</li>
          </ol>
        </nav>
        <div className="aspect-[16/9] relative rounded-2xl overflow-hidden mb-8 bg-puretea-sand/30">
          <Image
            src={post.image ?? "/images/blog/placeholder.svg"}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
        </div>
        <header>
          <p className="text-xs uppercase tracking-wide text-puretea-organic font-medium">
            {post.category}
          </p>
          <h1 className="mt-2 font-canela text-3xl sm:text-4xl text-puretea-dark">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="mt-2 block text-puretea-dark/70"
          >
            {new Date(post.date).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>
        <div
          className="mt-8 prose prose-neutral prose-lg max-w-none text-puretea-dark/90 prose-headings:font-canela prose-headings:text-puretea-dark prose-a:text-puretea-organic prose-a:no-underline hover:prose-a:underline prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.faqs && post.faqs.length > 0 && (
          <FAQ items={post.faqs} title="Preguntas frecuentes" />
        )}
        {products.length > 0 && (
          <section className="mt-12 pt-12 border-t border-puretea-sand" aria-labelledby="related-products-heading">
            <h2 id="related-products-heading" className="font-canela text-xl text-puretea-dark mb-4">
              Productos relacionados
            </h2>
            <ul className="flex flex-wrap gap-4">
              {products.map((p) =>
                p ? (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.handle}`}
                      className="text-puretea-organic font-medium hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
