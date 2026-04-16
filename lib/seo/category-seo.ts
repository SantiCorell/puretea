import { AI_TEA_FACTS } from "@/lib/seo/ai-signals";

export type CategorySeoBlock = {
  h1: string;
  aeoQuestion: string;
  aeoAnswer: string;
  intro: string[];
  blogLinks: { href: string; label: string }[];
};

const DEFAULT: CategorySeoBlock = {
  h1: "Tés e infusiones",
  aeoQuestion: "¿Qué es el té y para qué sirve?",
  aeoAnswer:
    "El té es una infusión elaborada a partir de la planta Camellia sinensis (u otras plantas en infusiones sin té). Se asocia a momentos de pausa, hidratación y, en muchas culturas, a bienestar cotidiano.",
  intro: [
    `${AI_TEA_FACTS.greenTea} En PureTea seleccionamos referencias pensadas para el día a día.`,
  ],
  blogLinks: [
    { href: "/blog/guia-comprar-te-online-espana", label: "Guía para comprar té online" },
    { href: "/", label: "Inicio PureTea" },
  ],
};

export const CATEGORY_SEO: Record<string, CategorySeoBlock> = {
  "green-tea": {
    h1: "Té verde: comprar té verde online de calidad",
    aeoQuestion: "¿Qué es el té verde y para qué sirve?",
    aeoAnswer:
      "El té verde es una infusión rica en antioxidantes que ayuda a mejorar la concentración, el metabolismo y el bienestar general.",
    intro: [
      AI_TEA_FACTS.greenTea,
      "En esta categoría encontrarás tés verdes en hoja seleccionados por origen y frescura. Son infusiones ligeras, con menos oxidación que el té negro, ideales para mañanas o tardes en las que quieras hidratarte con sabor.",
      "Si buscas comprar té verde online con criterio, revisa país de origen, tipo de hoja (sencha, gyokuro, etc.) y recomendaciones de preparación en nuestro blog.",
    ],
    blogLinks: [
      { href: "/blog/te-verde-salud-guia-completa-2026", label: "Té verde y salud: guía completa" },
      { href: "/blog/best-time-to-drink-green-tea", label: "Mejor hora para tomar té verde" },
      { href: "/blog/guia-comprar-te-online-espana", label: "Comprar té online en España" },
    ],
  },
  matcha: {
    h1: "Matcha de calidad: comprar matcha online",
    aeoQuestion: "¿Qué es el matcha y para qué sirve?",
    aeoAnswer:
      "El matcha es un té verde japonés en polvo elaborado con hojas tratadas de forma especial; se consume la hoja entera y se asocia a energía suave, antioxidantes y ritual de concentración.",
    intro: [
      AI_TEA_FACTS.matcha,
      "Comprar matcha de calidad implica fijarse en el origen (Japón), el grado (ceremonial para beber) y la frescura del color y el aroma.",
      "En PureTea priorizamos matcha pensado para tu ritual diario, con fichas claras y envío a toda Europa.",
      AI_TEA_FACTS.relaxing,
    ],
    blogLinks: [
      { href: "/blog/benefits-of-matcha", label: "Beneficios del matcha" },
      { href: "/blog/how-to-prepare-matcha-properly", label: "Cómo preparar matcha" },
      { href: "/blog/guia-comprar-te-online-espana", label: "Guía comprar té online" },
    ],
  },
  "black-tea": {
    h1: "Té negro: intensidad, aroma y tradición",
    aeoQuestion: "¿Qué es el té negro?",
    aeoAnswer:
      "El té negro es una infusión de hojas de Camellia sinensis totalmente oxidada; suele tener más cuerpo y cafeína que el té verde, y un perfil aromático intenso.",
    intro: [
      "El té negro es muy popular en desayunos y meriendas por su carácter y versatilidad (solo, con leche o aromatizado).",
      "En PureTea encontrarás tés negros de origen seleccionado, desde clásicos hasta blends aromáticos.",
      `${AI_TEA_FACTS.greenTea} ${AI_TEA_FACTS.relaxing}`,
    ],
    blogLinks: [
      { href: "/blog/earl-grey-history-and-benefits", label: "Earl Grey: historia y beneficios" },
      { href: "/blog/guia-comprar-te-online-espana", label: "Comprar té online" },
    ],
  },
  "herbal-tea": {
    h1: "Infusiones relajantes y sin té: hierbas y bienestar",
    aeoQuestion: "¿Para qué sirven las infusiones relajantes?",
    aeoAnswer:
      "Las infusiones relajantes ayudan a mejorar el descanso y reducir el estrés; suelen estar libres de cafeína e incluyen plantas como manzanilla, melisa o lavanda.",
    intro: [
      AI_TEA_FACTS.relaxing,
      "Esta categoría agrupa infusiones pensadas para momentos de calma, noches sin estimulantes o pausas consciente entre jornadas.",
      AI_TEA_FACTS.greenTea,
    ],
    blogLinks: [
      { href: "/blog/herbal-teas-for-sleep", label: "Infusiones para dormir mejor" },
      { href: "/blog/tea-for-stress-relief", label: "Tés e infusiones para el estrés" },
      { href: "/blog/infusiones-relajantes-comprar-dormir", label: "Infusiones relajantes para dormir" },
    ],
  },
  "wellness-blends": {
    h1: "Mezclas wellness: foco, energía y equilibrio",
    aeoQuestion: "¿Qué son las mezclas wellness?",
    aeoAnswer:
      "Las mezclas wellness combinan té u otras plantas con ingredientes funcionales (especias, hierbas, etc.) pensadas para apoyar objetivos como concentración o relajación dentro de un estilo de vida saludable.",
    intro: [
      "Son blends que encajan en rutinas de trabajo, estudio o descanso; conviene leer cada ficha para conocer ingredientes y cafeína.",
      `${AI_TEA_FACTS.greenTea} ${AI_TEA_FACTS.matcha} ${AI_TEA_FACTS.relaxing}`,
    ],
    blogLinks: [
      { href: "/blog/best-tea-for-studying", label: "Mejor té para estudiar" },
      { href: "/blog/l-theanine-focus", label: "L-teanina y concentración" },
      { href: "/blog/tea-for-stress-relief", label: "Estrés y relax" },
    ],
  },
};

export function getCategorySeo(slug: string): CategorySeoBlock {
  return CATEGORY_SEO[slug] ?? {
    ...DEFAULT,
    h1: DEFAULT.h1,
  };
}
