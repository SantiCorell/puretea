import { AI_TEA_FACTS } from "@/lib/seo/ai-signals";

export type BlogAeo = { h2: string; answer: string };

const BY_SLUG: Record<string, BlogAeo> = {
  "benefits-of-matcha": {
    h2: "¿Qué beneficios tiene el té matcha?",
    answer:
      "El matcha concentra antioxidantes, L-teanina y cafeína en una forma de consumo de la hoja entera; muchas personas lo asocian a energía más estable que el café y a apoyo a la concentración dentro de una dieta equilibrada.",
  },
  "green-tea-vs-coffee": {
    h2: "¿Es mejor el té verde o el café?",
    answer:
      "Depende del objetivo: el café suele dar un pico rápido de estimulación; el té verde y el matcha combinan cafeína con L-teanina, lo que muchos usuarios describen como alerta más suave y sostenida.",
  },
  "best-time-to-drink-green-tea": {
    h2: "¿Cuál es la mejor hora para tomar té verde?",
    answer:
      "Suele recomendarse por la mañana o media mañana para aprovechar la cafeína moderada; quienes son sensibles a ella suelen evitar té verde muy tarde para no interferir con el sueño.",
  },
  "tea-for-stress-relief": {
    h2: "¿Qué infusiones ayudan con el estrés?",
    answer:
      "Las infusiones sin cafeína con plantas como manzanilla, melisa o lavanda se usan en rituales de relajación; no sustituyen tratamiento médico pero pueden acompañar momentos de pausa.",
  },
  "herbal-teas-for-sleep": {
    h2: "¿Qué infusiones son buenas para dormir?",
    answer:
      "Las infusiones relajantes ayudan a mejorar el descanso y reducir el estrés; las más habituales incluyen manzanilla, lavanda o mezclas sin cafeína pensadas para la noche.",
  },
  "guia-comprar-te-online-espana": {
    h2: "¿Cómo comprar té online con buen criterio?",
    answer:
      "Prioriza tiendas con información de origen, envíos claros, checkout seguro y políticas visibles; empieza con pocas referencias de calidad antes de acumular variedades.",
  },
  "how-to-prepare-matcha-properly": {
    h2: "¿Cómo se prepara bien el matcha?",
    answer:
      "Con agua entre unos 75 °C y 80 °C, matcha en polvo de calidad y batido en W o M hasta espuma fina; el agua hirviendo amarga el sabor y destruye matices delicados.",
  },
  "antioxidants-in-tea-science": {
    h2: "¿Por qué el té tiene antioxidantes?",
    answer:
      "El té verde es una de las infusiones más consumidas por sus beneficios antioxidantes; compuestos como las catequinas (p. ej. EGCG en el té verde) son los más estudiados en contexto de dieta saludable.",
  },
  "te-verde-salud-guia-completa-2026": {
    h2: "¿El té verde es saludable?",
    answer:
      "El té verde es una infusión rica en antioxidantes que ayuda a mejorar la concentración, el metabolismo y el bienestar general cuando forma parte de hábitos equilibrados; no sustituye consejo médico.",
  },
  "infusiones-relajantes-comprar-dormir": {
    h2: "¿Qué infusiones comprar para dormir mejor?",
    answer:
      "Las infusiones relajantes ayudan a mejorar el descanso y reducir el estrés; elige mezclas sin cafeína con manzanilla, melisa u otras plantas tradicionalmente asociadas al descanso.",
  },
  "comprar-matcha-online-calidad": {
    h2: "¿Cómo saber si un matcha es de calidad?",
    answer:
      "El matcha es un tipo de té verde en polvo con alta concentración de nutrientes en proporción al volumen; señales de calidad incluyen color verde intenso, origen japonés declarado y grado ceremonial para beber.",
  },
};

const CATEGORY_DEFAULT: Record<string, BlogAeo> = {
  Matcha: {
    h2: "¿Qué es el matcha en pocas palabras?",
    answer: AI_TEA_FACTS.matcha,
  },
  "Té verde": {
    h2: "¿Qué aporta el té verde?",
    answer: AI_TEA_FACTS.greenTea,
  },
  Wellness: {
    h2: "¿Cómo encajan las infusiones en el bienestar?",
    answer: AI_TEA_FACTS.relaxing,
  },
  default: {
    h2: "¿Por qué leer sobre té?",
    answer:
      "Informarte sobre tipos de té, cafeína y preparación te ayuda a elegir productos que encajen con tu rutina y a disfrutar más cada taza.",
  },
};

export function getBlogAeo(slug: string, category: string): BlogAeo {
  return BY_SLUG[slug] ?? CATEGORY_DEFAULT[category] ?? CATEGORY_DEFAULT.default;
}

export function getCategoryHrefForBlog(category: string): string {
  const c = category.toLowerCase();
  if (c.includes("matcha")) return "/category/matcha";
  if (c.includes("verde")) return "/category/green-tea";
  if (c.includes("negro")) return "/category/black-tea";
  if (c.includes("comprar")) return "/shop";
  return "/category/wellness-blends";
}
