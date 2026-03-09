/**
 * Schema.org structured data for SEO and AI/LLM discovery.
 * Product, Article, FAQ, Organization.
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://puretea.com";

export function productSchema(product: {
  name: string;
  description: string;
  image: string | null;
  sku?: string;
  offers: { price: string; currency: string; availability: string };
  brand?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? (product.image.startsWith("http") ? product.image : `${siteUrl}${product.image}`) : undefined,
    sku: product.sku,
    brand: product.brand
      ? { "@type": "Brand", name: product.brand }
      : { "@type": "Brand", name: "PureTea" },
    offers: {
      "@type": "Offer",
      price: product.offers.price,
      priceCurrency: product.offers.currency,
      availability: `https://schema.org/${product.offers.availability === "IN_STOCK" ? "InStock" : "OutOfStock"}`,
      url: siteUrl,
    },
  };
}

export function articleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image ? (article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`) : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: article.author ? { "@type": "Person", name: article.author } : { "@type": "Organization", name: "PureTea" },
    publisher: { "@type": "Organization", name: "PureTea", logo: { "@type": "ImageObject", url: `${siteUrl}/logos/logo.svg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": article.url.startsWith("http") ? article.url : `${siteUrl}${article.url}` },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PureTea",
    url: siteUrl,
    logo: `${siteUrl}/logos/logo.svg`,
    description: "Premium tea brand. Japanese matcha, green tea, black tea, herbal infusions and wellness blends.",
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PureTea",
    url: siteUrl,
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/shop?q={search_term_string}` }, "query-input": "required name=search_term_string" },
  };
}

/** Benefits page: Article + FAQ en un solo @graph para Google y asistentes IA */
export function benefitsPageSchema(faqs: { question: string; answer: string }[]) {
  const url = `${siteUrl}/benefits`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Beneficios del té: matcha, té verde, té negro e infusiones para tu bienestar",
        description: "Guía completa de los beneficios del matcha, té verde, té negro e infusiones herbales. Antioxidantes, L-teanina, energía calmada, concentración y relax. Por PureTea.",
        url,
        image: `${siteUrl}/images/benefits/benefits-hero.png`,
        author: { "@type": "Organization", name: "PureTea" },
        publisher: { "@type": "Organization", name: "PureTea", logo: { "@type": "ImageObject", url: `${siteUrl}/logos/logo.svg` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        articleSection: "Beneficios del té",
        keywords: "beneficios del matcha, beneficios del té verde, té para concentración, té para relajación, L-teanina, antioxidantes té, té negro beneficios, infusiones sin cafeína",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}

/** About page: ayuda a buscadores y LLMs a entender la historia y valores de la marca */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Nosotros | PureTea — Nuestra historia y compromiso con el té premium",
    description: "Hemos viajado a Japón, China y Ceylán para seleccionar a los mejores proveedores de té. Conoce cómo nace PureTea y nuestro compromiso con la calidad y el bienestar.",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "PureTea",
      description: "Marca de té premium. Seleccionamos en origen a los mejores proveedores de matcha, té verde, té negro e infusiones para ofrecer trazabilidad y calidad en cada taza.",
      url: siteUrl,
      logo: `${siteUrl}/logos/logo.svg`,
      foundingLocation: "Europe",
      areaServed: "Europe",
      knowsAbout: ["Matcha", "Té verde", "Té negro", "Infusiones", "Wellness", "Proveedores en Japón", "Proveedores en China", "Proveedores en Ceylán"],
    },
  };
}
