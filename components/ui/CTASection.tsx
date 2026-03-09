import Link from "next/link";

interface CTASectionProps {
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CTASection({
  title,
  description,
  buttonLabel = "Ver tienda",
  buttonHref = "/shop",
}: CTASectionProps) {
  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-puretea-dark text-puretea-cream" aria-labelledby="cta-heading">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="font-canela text-3xl sm:text-4xl font-semibold">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-puretea-sand">{description}</p>
        )}
        <Link
          href={buttonHref}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-puretea-gold text-puretea-dark px-8 py-4 text-base font-semibold hover:bg-puretea-cream transition-colors min-h-[52px]"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
