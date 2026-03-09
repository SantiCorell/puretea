export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Preguntas frecuentes" }: FAQProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-heading" className="font-canela text-2xl sm:text-3xl text-puretea-dark mb-8">
          {title}
        </h2>
        <dl className="space-y-6">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="font-semibold text-puretea-dark">{item.question}</dt>
              <dd className="mt-2 text-puretea-dark/80">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
