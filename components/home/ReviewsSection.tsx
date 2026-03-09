"use client";

import { useEffect, useState } from "react";

const REVIEWS = [
  { quote: "El mejor matcha que he probado. Ritual de mañana imprescindible.", author: "María G.", rating: 5 },
  { quote: "Calidad premium y envío rápido. Repetiré sin dudarlo.", author: "Carlos R.", rating: 5 },
  { quote: "Los blends de wellness son perfectos para concentrarme en el trabajo.", author: "Laura M.", rating: 5 },
  { quote: "Envío impecable, packaging cuidado. El té llega como recién cosechado.", author: "Pablo S.", rating: 5 },
  { quote: "Llevo tres meses con el ceremonial y no cambio. Pure tea, pure ritual de verdad.", author: "Ana L.", rating: 5 },
  { quote: "La relación calidad-precio es excelente. Ya soy cliente recurrente.", author: "Miguel T.", rating: 5 },
  { quote: "El Earl Grey es mi favorito. Aromático y suave, ideal por las tardes.", author: "Elena V.", rating: 5 },
  { quote: "El Relax Blend me ayuda a desconectar por la noche. Muy recomendable.", author: "Jorge D.", rating: 5 },
  { quote: "Primera compra y encantada. La web es clara y el pedido llegó en 2 días.", author: "Sara C.", rating: 5 },
  { quote: "Matcha de otro nivel. Se nota que es grado ceremonial de verdad.", author: "David F.", rating: 5 },
  { quote: "Regalé una caja a mi madre y ahora me pide que le repita. Éxito total.", author: "Claudia P.", rating: 5 },
  { quote: "Atención al cliente de 10. Resolvieron una duda en menos de una hora.", author: "Roberto N.", rating: 5 },
];

const INTERVAL_MS = 4500;

export function ReviewsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const r = REVIEWS[index];

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="reviews-heading">
      <div className="max-w-4xl mx-auto">
        <h2 id="reviews-heading" className="font-canela text-3xl sm:text-4xl text-puretea-dark text-center mb-12">
          Lo que dicen de nosotros
        </h2>

        <div className="relative min-h-[180px] sm:min-h-[200px]">
          <blockquote
            key={index}
            className="animate-review-fade rounded-2xl bg-white border border-puretea-sand p-6 sm:p-8"
          >
            <div className="flex gap-1 mb-3" aria-hidden>
              {Array.from({ length: r.rating }).map((_, j) => (
                <span key={j} className="text-puretea-gold">★</span>
              ))}
            </div>
            <p className="text-puretea-dark text-lg sm:text-xl">&ldquo;{r.quote}&rdquo;</p>
            <cite className="mt-4 block text-sm text-puretea-dark/70 not-italic">— {r.author}</cite>
          </blockquote>
        </div>

        <div className="flex justify-center gap-2 mt-8 flex-wrap" role="tablist" aria-label="Reseñas">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Reseña ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-puretea-organic" : "w-2 bg-puretea-sand hover:bg-puretea-organic/70"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
