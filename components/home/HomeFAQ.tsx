"use client";

import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface HomeFAQProps {
  items: FAQItem[];
  title?: string;
}

export function HomeFAQ({ items, title = "Preguntas frecuentes" }: HomeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-puretea-sand/50"
      aria-labelledby="home-faq-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="home-faq-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center lg:text-left mb-10 lg:mb-12">
          {title}
        </h2>

        {/* Desktop: preguntas a la izquierda, respuesta a la derecha */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <ul className="space-y-0" role="list">
            {items.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  className={`w-full text-left py-4 px-4 rounded-xl transition-all duration-200 flex items-center justify-between gap-4 border-l-4 ${
                    openIndex === i
                      ? "border-puretea-organic bg-puretea-organic/5 text-puretea-dark font-semibold"
                      : "border-transparent hover:bg-puretea-sand/30 text-puretea-dark/80 hover:text-puretea-dark"
                  }`}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="pr-2">{item.question}</span>
                  <span
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                      openIndex === i ? "bg-puretea-organic text-white scale-110" : "bg-puretea-sand/50 text-puretea-dark"
                    }`}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={openIndex === i ? "rotate-180" : ""}>
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="sticky top-28 min-h-[200px] rounded-2xl bg-puretea-cream/80 border border-puretea-sand/60 p-6 lg:p-8">
            {openIndex !== null ? (
              <div
                id={`faq-answer-${openIndex}`}
                role="region"
                aria-labelledby={`faq-question-${openIndex}`}
                className="animate-faq-in text-puretea-dark/90 leading-relaxed"
              >
                <p>{items[openIndex].answer}</p>
              </div>
            ) : (
              <p className="text-puretea-dark/60">Selecciona una pregunta</p>
            )}
          </div>
        </div>

        {/* Móvil: acordeón clásico */}
        <dl className="lg:hidden space-y-0">
          {items.map((item, i) => (
            <div
              key={i}
              className="border-b border-puretea-sand/60 last:border-b-0"
            >
              <dt>
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-4 pr-12 flex items-center justify-between gap-2 text-left font-medium text-puretea-dark relative"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-mobile-${i}`}
                >
                  {item.question}
                  <span
                    className={`absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 ${
                      openIndex === i ? "bg-puretea-organic text-white rotate-180" : "bg-puretea-sand/50 text-puretea-dark"
                    }`}
                    aria-hidden
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </span>
                </button>
              </dt>
              <dd
                id={`faq-mobile-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="pb-4 pr-12 text-puretea-dark/80 leading-relaxed">
                  {item.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
