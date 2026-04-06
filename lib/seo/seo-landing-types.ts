export type SeoLandingSection = {
  h2: string;
  html: string;
};

export type SeoLanding = {
  slug: string;
  /** <title> y Open Graph */
  title: string;
  description: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  h1: string;
  intro: string;
  sections: SeoLandingSection[];
  faqs?: { question: string; answer: string }[];
  ctaHref?: string;
  ctaLabel?: string;
  relatedLinks?: { href: string; label: string }[];
};
