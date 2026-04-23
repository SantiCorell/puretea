import type { SeoLanding } from "./seo-landing-types";

const shopCta = { ctaHref: "/shop" as const, ctaLabel: "Ir a la tienda" as const };

/** Landings transaccionales e informacionales alineadas con el informe SERP / SEO gap */
export const SEO_LANDINGS_DATA: SeoLanding[] = [
  {
    slug: "comprar-te",
    title: "Comprar té online | Tés premium, matcha y envío gratis +50€ | PureTea",
    description:
      "Comprar té online con envío gratis desde 50€. Matcha japonés, té verde, negro, infusiones y wellness. Pago seguro, tés seleccionados en origen. ¡Compra ahora en PureTea!",
    priority: 0.96,
    changeFrequency: "daily",
    h1: "Comprar té online",
    intro:
      "En PureTea puedes comprar té online con la tranquilidad de un catálogo premium: matcha ceremonial, tés verdes y negros, infusiones herbales y blends wellness. Envío gratis a partir de 50€ a Europa, pago seguro y devoluciones claras.",
    sections: [
      {
        h2: "Té premium con intención de compra clara",
        html: `<p>Si buscas <strong>comprar té</strong> con calidad comprobable, aquí tienes precios visibles, fichas detalladas y categorías listas para filtrar. No somos un blog disfrazado: somos una tienda especializada en té y bienestar.</p><p>Nuestra propuesta une ritual consciente y compra sencilla: añade al carrito, revisa el checkout de Shopify y recibe tu pedido con seguimiento.</p>`,
      },
      {
        h2: "Variedades para cada momento del día",
        html: `<p><a href="/category/matcha">Matcha japonés</a> para energía calmada, <a href="/category/green-tea">té verde</a> antioxidante, <a href="/category/black-tea">té negro</a> intenso, <a href="/category/herbal-tea">infusiones</a> sin cafeína y <a href="/category/wellness-blends">wellness blends</a> para foco o relax.</p>`,
      },
      {
        h2: "Envíos, confianza y atención",
        html: `<p><strong>Envío gratis desde 50€</strong> en pedidos que lo cumplan. Plazos orientativos 3–5 días laborables en península y 5–10 en resto de Europa. Reseñas reales de clientes y preguntas frecuentes en la home.</p><p>¿Dudas? <a href="/contact">Contacto</a> y te ayudamos a elegir té según tu ritmo y gustos.</p>`,
      },
      {
        h2: "Guías para decidir antes de comprar",
        html: `<p>Amplía contexto en nuestro <a href="/blog">blog</a>, la guía <a href="/how-to-brew">Cómo preparar</a> o la página de <a href="/benefits">beneficios del té</a>. Así conviertes una búsqueda de «comprar té online» en una compra informada.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Puedo comprar té online con envío gratis?",
        answer: "Sí. El envío es gratuito a partir de 50€ en los pedidos que cumplan la condición. El importe exacto se confirma en el checkout antes de pagar.",
      },
      {
        question: "¿Vendéis matcha de calidad ceremonial?",
        answer: "Sí. Trabajamos con matcha japonés de grado ceremonial y premium, seleccionado para beber a diario. Ver la categoría Matcha en la tienda.",
      },
      {
        question: "¿Es seguro pagar en PureTea?",
        answer: "El pago se procesa con el checkout seguro de Shopify, con métodos habituales y cifrado estándar del sector.",
      },
    ],
    relatedLinks: [
      { href: "/envio-rapido-te", label: "Envío rápido" },
      { href: "/regalos-te-originales", label: "Regalos de té" },
      { href: "/te-ecologico-a-granel", label: "Té ecológico" },
    ],
    ...shopCta,
  },
  {
    slug: "mejor-te-matcha-calidad-precio",
    title: "Mejor té matcha calidad precio | Guía de compra 2026 | PureTea",
    description:
      "Cómo elegir el mejor té matcha calidad precio: grado, origen, sabor y señales reales para comprar sin fallar. PureTea.",
    priority: 0.92,
    changeFrequency: "weekly",
    h1: "Mejor té matcha calidad precio",
    intro:
      "Si buscas el mejor matcha calidad precio, no te fijes solo en el coste por lata: importa el grado, el origen y cómo se comporta en taza. Aquí tienes una guía directa para comprar matcha online sin sorpresas.",
    sections: [
      {
        h2: "Respuesta rápida: qué mirar primero",
        html: `<p><strong>1)</strong> Origen Japón confirmado. <strong>2)</strong> Grado ceremonial o premium para beber. <strong>3)</strong> Color verde vivo, sin tonos apagados. <strong>4)</strong> Precio coherente (ni sospechosamente bajo ni inflado sin trazabilidad).</p>`,
      },
      {
        h2: "Cómo comparar calidad/precio de verdad",
        html: `<p>Dos botes pueden costar parecido y rendir distinto. Compara gramos por ración, capacidad de espumar y amargor. Un matcha barato que obliga a endulzar siempre suele salir más caro en experiencia y en consumo.</p><p>En PureTea priorizamos perfiles aptos para taza diaria: umami limpio, textura fina y consistencia entre lotes.</p>`,
      },
      {
        h2: "Compra recomendada según uso",
        html: `<p>Para ritual diario: <a href="/category/matcha">matcha ceremonial/premium</a>. Para recetas: puedes usar un grado más culinario, pero si también lo vas a beber, mejor premium.</p><p>Amplía con <a href="/como-preparar-te-matcha-correctamente">cómo preparar matcha correctamente</a> para no perder calidad por técnica.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Cuál es el mejor matcha calidad precio para empezar?",
        answer: "Uno de grado ceremonial o premium, de origen japonés y en formato pequeño para validar sabor y tolerancia antes de subir de formato.",
      },
      {
        question: "¿El matcha muy barato merece la pena?",
        answer: "Para beber a diario suele decepcionar: más amargor y menos textura. En recetas puede servir, pero no como matcha de taza.",
      },
    ],
    relatedLinks: [
      { href: "/category/matcha", label: "Comprar matcha" },
      { href: "/te-matcha-japones-premium", label: "Matcha japonés premium" },
      { href: "/blog/comprar-matcha-online-calidad", label: "Comprar matcha online" },
    ],
    ...shopCta,
  },
  {
    slug: "que-te-tomar-por-la-noche-sin-teina",
    title: "Qué té tomar por la noche (sin teína) | Guía práctica | PureTea",
    description:
      "Descubre qué té o infusión tomar por la noche sin teína para descansar mejor. Opciones suaves y cómo elegir según tu rutina.",
    priority: 0.9,
    changeFrequency: "weekly",
    h1: "Qué té tomar por la noche (sin teína)",
    intro:
      "Por la noche conviene evitar estimulantes. Lo más efectivo suele ser una infusión sin teína con sabor suave y rutina estable de consumo.",
    sections: [
      {
        h2: "Respuesta rápida: las mejores opciones nocturnas",
        html: `<p>Manzanilla, lavanda, melisa, rooibos y blends de relax sin cafeína. Si eres sensible, evita verde, negro y matcha al final del día.</p>`,
      },
      {
        h2: "Cómo elegir según tu objetivo",
        html: `<p>Si buscas desconexión mental: lavanda/melisa. Si quieres digestión ligera tras cena: hinojo/menta suave. Si quieres ritual diario con sabor redondo: rooibos o blends wellness.</p>`,
      },
      {
        h2: "Qué comprar y cómo prepararlo",
        html: `<p>Empieza con <a href="/category/herbal-tea">infusiones sin cafeína</a> y usa agua caliente sin hervir en exceso para no volverlas ásperas. Puedes ampliar en <a href="/te-para-dormir-relajacion">té para dormir y relajación</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿El rooibos tiene teína?",
        answer: "No. El rooibos es una infusión sin teína y suele ser una opción cómoda para la noche.",
      },
      {
        question: "¿Puedo tomar té verde de noche?",
        answer: "Depende de tu sensibilidad, pero en general no es lo ideal porque contiene cafeína.",
      },
    ],
    relatedLinks: [
      { href: "/category/herbal-tea", label: "Infusiones sin teína" },
      { href: "/te-para-dormir-relajacion", label: "Té para dormir" },
      { href: "/blog/herbal-teas-for-sleep", label: "Guía de infusiones nocturnas" },
    ],
    ...shopCta,
  },
  {
    slug: "beneficios-te-verde-reales",
    title: "Beneficios del té verde (reales) | Qué dice la evidencia | PureTea",
    description:
      "Beneficios reales del té verde: antioxidantes, hábitos y expectativas honestas. Guía clara para decidir qué comprar.",
    priority: 0.9,
    changeFrequency: "monthly",
    h1: "Beneficios del té verde (reales)",
    intro:
      "El té verde sí tiene beneficios potenciales, pero conviene separar evidencia sólida de promesas exageradas. Esta guía resume lo útil y accionable.",
    sections: [
      {
        h2: "Respuesta rápida: qué aporta el té verde",
        html: `<p>Polifenoles (como catequinas), hidratación con sabor y una estimulación más suave que otras bebidas si se prepara bien.</p>`,
      },
      {
        h2: "Qué no esperar",
        html: `<p>No es una cura ni un atajo mágico. Funciona mejor como hábito constante dentro de una dieta equilibrada, descanso y actividad física.</p>`,
      },
      {
        h2: "Cómo elegir uno de calidad",
        html: `<p>Busca origen claro y hojas limpias. Entra en <a href="/category/green-tea">té verde</a> para comparar opciones. Si quieres más intensidad antioxidante, revisa <a href="/category/matcha">matcha</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Cuántas tazas de té verde al día?",
        answer: "En población general, 1 a 3 tazas suele ser un rango común, ajustando según tolerancia a cafeína.",
      },
      {
        question: "¿Tomarlo en ayunas es buena idea?",
        answer: "Depende de cada persona. Si notas molestias, mejor acompañarlo con algo ligero.",
      },
    ],
    relatedLinks: [
      { href: "/category/green-tea", label: "Comprar té verde" },
      { href: "/beneficios-te-verde-salud", label: "Guía completa salud" },
      { href: "/blog/antioxidants-in-tea-science", label: "Antioxidantes y ciencia" },
    ],
    ...shopCta,
  },
  {
    slug: "como-preparar-te-matcha-correctamente",
    title: "Cómo preparar té matcha correctamente (paso a paso) | PureTea",
    description:
      "Guía paso a paso para preparar matcha correctamente: temperatura, proporciones y errores típicos. Resultado suave y sin grumos.",
    priority: 0.89,
    changeFrequency: "monthly",
    h1: "Cómo preparar té matcha correctamente",
    intro:
      "Preparar matcha bien no es complicado: necesitas buena materia prima y técnica básica. Aquí tienes el método corto para una taza limpia y cremosa.",
    sections: [
      {
        h2: "Respuesta rápida: método en 60 segundos",
        html: `<p>1) Tamiza 1–2 g de matcha. 2) Añade un poco de agua a 75–80°C y forma pasta. 3) Completa con agua y bate en W o M con chasen hasta espumar.</p>`,
      },
      {
        h2: "Errores que arruinan el matcha",
        html: `<p>Agua hirviendo, no tamizar, proporciones excesivas y batido corto. Cualquiera de esos puntos aumenta amargor y grumos.</p>`,
      },
      {
        h2: "Qué matcha usar para que salga bien",
        html: `<p>Usa matcha ceremonial/premium para beber. Puedes verlo en <a href="/category/matcha">la categoría matcha</a> y ampliar en la guía de <a href="/te-matcha-japones-premium">matcha japonés premium</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Qué temperatura exacta uso para matcha?",
        answer: "Entre 75°C y 80°C. Más caliente suele aumentar amargor.",
      },
      {
        question: "¿Necesito chasen sí o sí?",
        answer: "No obligatorio, pero mejora mucho el resultado. Si no tienes, usa batidor pequeño y tamiza bien.",
      },
    ],
    relatedLinks: [
      { href: "/category/matcha", label: "Comprar matcha" },
      { href: "/como-preparar-te-matcha", label: "Otra guía de preparación" },
      { href: "/blog/how-to-prepare-matcha-properly", label: "Tutorial blog" },
    ],
    ...shopCta,
  },
  {
    slug: "que-es-te-premium",
    title: "Qué es el té premium y por qué es diferente | PureTea",
    description:
      "Qué significa realmente té premium: origen, cosecha, procesado y trazabilidad. Cómo identificar calidad al comprar.",
    priority: 0.88,
    changeFrequency: "monthly",
    h1: "Qué es el té premium y por qué es diferente",
    intro:
      "Té premium no es solo marketing: se nota en origen, selección de hoja, consistencia de lote y experiencia real en taza.",
    sections: [
      {
        h2: "Respuesta rápida: claves del té premium",
        html: `<p>Origen verificable, hojas bien seleccionadas, procesado cuidado, frescura y ficha transparente. Si no puedes rastrear calidad, no es premium.</p>`,
      },
      {
        h2: "Qué cambia en la experiencia",
        html: `<p>Mejor aroma, menor aspereza, más estabilidad de sabor entre preparaciones y más margen de error en la técnica.</p>`,
      },
      {
        h2: "Cómo comprar sin caer en etiquetas vacías",
        html: `<p>Lee ficha, origen y recomendaciones de uso. Explora <a href="/shop">la tienda</a> y compara categorías: <a href="/category/matcha">matcha</a>, <a href="/category/green-tea">verde</a> e <a href="/category/herbal-tea">infusiones</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Té premium significa siempre más caro?",
        answer: "No siempre, pero raramente será el más barato. El precio debe tener coherencia con origen y calidad de hoja.",
      },
      {
        question: "¿Cómo noto diferencia en casa?",
        answer: "Con buena preparación, notarás más limpieza de sabor, menos amargor sucio y mejor persistencia aromática.",
      },
    ],
    relatedLinks: [
      { href: "/comprar-te", label: "Comprar té online" },
      { href: "/te-importacion-directa", label: "Importación y trazabilidad" },
      { href: "/regalos-te-originales", label: "Selección premium para regalo" },
    ],
    ...shopCta,
  },
  {
    slug: "te-matcha-japones-premium",
    title: "Té matcha japonés premium | Comprar matcha ceremonial online | PureTea",
    description:
      "Comprar té matcha japonés premium y ceremonial online. Origen Japón, L-teanina y energía calmada. Envío gratis +50€. PureTea.",
    priority: 0.9,
    changeFrequency: "weekly",
    h1: "Té matcha japonés premium",
    intro:
      "El matcha japonés premium concentra sabor umami, color intenso y los beneficios de consumir la hoja entera. En PureTea seleccionamos matcha ceremonial para quien quiere comprar matcha online sin renunciar a la trazabilidad.",
    sections: [
      {
        h2: "Por qué el origen japonés importa",
        html: `<p>Regiones como Uji o Kagoshima llevan siglos perfeccionando el cultivo a la sombra. Eso se traduce en más clorofila, mejor textura y un perfil menos áspero que imitaciones baratas.</p>`,
      },
      {
        h2: "Matcha ceremonial para beber a diario",
        html: `<p>Para <strong>comprar matcha</strong> y disfrutarlo en taza, apuesta por grado ceremonial: se disuelve fino, espuma bien y no necesita azúcar para «tapar» defectos. En cocina puedes usar otros grados; para ritual diario, calidad de taza.</p>`,
      },
      {
        h2: "Cómo prepararlo y qué comprar",
        html: `<p>Guía práctica en <a href="/como-preparar-te-matcha">cómo preparar té matcha</a> y en el blog <a href="/blog/how-to-prepare-matcha-properly">paso a paso</a>. <a href="/category/matcha">Ver matcha en la tienda</a>.</p>`,
      },
    ],
    faqs: [
      {
        question: "¿Cuánta cafeína tiene el matcha?",
        answer: "Similar a una taza de café por ración típica, pero la L-teanina modula el efecto para una sensación más estable.",
      },
    ],
    ...shopCta,
  },
  {
    slug: "como-preparar-te-matcha",
    title: "Cómo preparar té matcha correctamente | Guía PureTea",
    description:
      "Aprende a preparar té matcha en casa: temperatura del agua, batido con chasen, errores frecuentes y material. PureTea.",
    priority: 0.88,
    changeFrequency: "monthly",
    h1: "Cómo preparar té matcha correctamente",
    intro:
      "Preparar matcha bien es cuestión de temperatura, cantidad y técnica de batido. Esta guía resume lo esencial para una taza sin grumos y con espuma fina.",
    sections: [
      {
        h2: "Materiales básicos",
        html: `<p>Cuenco (chawan), batidor de bambú (chasen), cucharilla medidora y agua filtrada. El chasen airea el té y evita grumos mejor que una cuchara.</p>`,
      },
      {
        h2: "Temperatura y proporciones",
        html: `<p>Agua entre 75 °C y 80 °C: nunca hirviendo sobre el polvo. Aproximadamente 1–2 g de matcha (media cucharadita rasa) por 60–80 ml para té tradicional.</p>`,
      },
      {
        h2: "Técnica de batido",
        html: `<p>Vierte un chorrito de agua, mezcla a pasta y añade el resto. Bate en M o W hasta espuma uniforme. Consumir en pocos minutos para no perder sabor.</p><p>Más detalle en <a href="/blog/how-to-prepare-matcha-properly">nuestro artículo del blog</a>.</p>`,
      },
    ],
    relatedLinks: [{ href: "/te-matcha-japones-premium", label: "Matcha premium" }],
    ...shopCta,
  },
  {
    slug: "te-para-dormir-relajacion",
    title: "Té para dormir y relajación | Infusiones sin cafeína | PureTea",
    description:
      "Tés e infusiones para dormir y relajar: sin cafeína, manzanilla, lavanda y blends wellness. Compra online con envío gratis +50€.",
    priority: 0.86,
    changeFrequency: "weekly",
    h1: "Té para dormir y relajación",
    intro:
      "Las mejores opciones nocturnas son infusiones herbales sin cafeína: ayudan a cerrar el día sin estimular el sistema nervioso. En PureTea encontrarás blends pensados para el relax.",
    sections: [
      {
        h2: "Qué evitar por la noche",
        html: `<p>Té verde, negro y matcha aportan cafeína. Si eres sensible, evítalos a partir de media tarde. Mejor manzanilla, melisa, pasiflora o mezclas específicas.</p>`,
      },
      {
        h2: "Ritual de 10 minutos",
        html: `<p>Misma hora, misma taza, entorno sin pantallas. La repetición refuerza la asociación mente-cuerpo con el descanso.</p>`,
      },
      {
        h2: "Dónde comprar",
        html: `<p>Explora <a href="/category/herbal-tea">infusiones</a> y <a href="/category/wellness-blends">wellness</a>. Lee también <a href="/blog/herbal-teas-for-sleep">infusiones para dormir</a>.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-ecologico-a-granel",
    title: "Té ecológico a granel online | Orgánico | Comprar té | PureTea",
    description:
      "Comprar té ecológico a granel online. Selección premium, trazabilidad y envío gratis desde 50€. PureTea España.",
    priority: 0.87,
    changeFrequency: "weekly",
    h1: "Té ecológico a granel online",
    intro:
      "Comprar té ecológico a granel te permite reducir envases y elegir cantidad según consumo. Trabajamos con tés de calidad y origen claro.",
    sections: [
      {
        h2: "Ventajas del granel",
        html: `<p>Menos residuos, mejor relación calidad-precio en consumo habitual y frescura si almacenas bien el té.</p>`,
      },
      {
        h2: "Conservación",
        html: `<p>Recipiente opaco, hermético, lejos de luz y olores. Ver <a href="/conservar-te-granel">cómo conservar té a granel</a>.</p>`,
      },
      {
        h2: "Catálogo",
        html: `<p>Entra en <a href="/shop">tienda</a> y filtra por categorías: verde, negro, matcha e infusiones.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "diferencia-te-negro-te-rojo",
    title: "Diferencia entre té negro y té rojo (rooibos) | Guía PureTea",
    description:
      "Té negro vs té rojo: oxidación, cafeína, sabor y cuándo elegir cada uno. Guía clara para comprar té online.",
    priority: 0.82,
    changeFrequency: "monthly",
    h1: "Diferencia entre té negro y té rojo",
    intro:
      "El té negro es té de la planta Camellia sinensis, oxidado al máximo. El «té rojo» del desayuno suele ser rooibos: otra planta, sin cafeína. No compiten: son bebidas distintas.",
    sections: [
      {
        h2: "Té negro: carácter y cafeína",
        html: `<p>Sabor intenso, cuerpo y cafeína moderada. Ideal mañanas y meriendas. Ver <a href="/category/black-tea">tés negros</a>.</p>`,
      },
      {
        h2: "Rooibos «té rojo»",
        html: `<p>Suave, dulzura natural, sin cafeína. Apto niños y noches. A menudo se aromatiza con frutas o especias.</p>`,
      },
      {
        h2: "Qué comprar según tu objetivo",
        html: `<p>Energía y ritual clásico → negro. Relajación sin estimulantes → rooibos o infusiones. <a href="/comprar-te">Comprar té online</a>.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-wellness",
    title: "Tienda de té wellness | Blends bienestar | Comprar online | PureTea",
    description:
      "Tés y blends wellness para energía calmada, foco y relax. Comprar té especializado en bienestar online. Envío gratis +50€.",
    priority: 0.86,
    changeFrequency: "weekly",
    h1: "Tienda de té especializada en wellness",
    intro:
      "Los blends wellness combinan té de calidad con hierbas y especias orientadas a foco, digestión o relax. PureTea une propósito funcional y placer en taza.",
    sections: [
      {
        h2: "Enfoque premium",
        html: `<p>No es marketing vacío: partimos de té real (verde, matcha) y añadimos ingredientes con tradición de uso. Cada ficha explica para qué momento del día encaja mejor.</p>`,
      },
      {
        h2: "Ver colección",
        html: `<p><a href="/category/wellness-blends">Wellness blends</a> · <a href="/benefits">Beneficios del té</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-deportistas",
    title: "Té para deportistas | Energía e hidratación | Comprar | PureTea",
    description:
      "Té y matcha para deportistas: hidratación, antioxidantes y energía sin picos bruscos. Compra online PureTea.",
    priority: 0.84,
    changeFrequency: "monthly",
    h1: "Té para deportistas",
    intro:
      "El té puede integrarse en la hidratación diaria y aportar polifenoles. El matcha y el té verde son opciones populares pre-entreno por la cafeína moderada y la L-teanina.",
    sections: [
      {
        h2: "Antes y después de entrenar",
        html: `<p>Hidratación base con agua; té como complemento. Evita dosis muy altas de cafeína si no toleras bien.</p>`,
      },
      {
        h2: "Productos recomendados",
        html: `<p><a href="/category/matcha">Matcha</a> · <a href="/category/green-tea">Té verde</a> · artículo <a href="/blog/tea-hydration-athletes">té e hidratación</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-digestion",
    title: "Qué té es mejor para la digestión | Guía e infusiones | PureTea",
    description:
      "Mejores tés e infusiones para la digestión: hierbas suaves, hábitos y qué comprar online en PureTea.",
    priority: 0.85,
    changeFrequency: "monthly",
    h1: "Qué té es mejor para la digestión",
    intro:
      "Tras comidas copiosas, muchas personas eligen infusiones digestivas (hinojo, anís, menta suave). El té verde ligero también encaja en rutinas equilibradas. Consulta a un profesional si tienes patologías.",
    sections: [
      {
        h2: "Infusiones clásicas",
        html: `<p>Hierbas tradicionalmente asociadas al confort digestivo. Evita mezclas desconocidas si estás medicado: pregunta a tu médico.</p>`,
      },
      {
        h2: "Comprar online",
        html: `<p><a href="/category/herbal-tea">Infusiones</a> · <a href="/shop">Tienda</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-ansiedad",
    title: "Té de hierbas para ansiedad | Calma sin cafeína | PureTea",
    description:
      "Infusiones y tés sin cafeína para momentos de tensión. Compra online con envío gratis +50€. PureTea.",
    priority: 0.83,
    changeFrequency: "monthly",
    h1: "Té de hierbas para ansiedad",
    intro:
      "Las infusiones sin cafeína (manzanilla, lavanda, pasiflora) encajan en rutinas de calma. No sustituyen ayuda profesional; son un ritual de autocuidado.",
    sections: [
      {
        h2: "Por qué evitar cafeína en esos momentos",
        html: `<p>La cafeína puede aumentar la inquietud en personas sensibles. Mejor rooibos o hierbas.</p>`,
      },
      {
        h2: "Blends PureTea",
        html: `<p><a href="/blog/tea-for-stress-relief">Té para estrés</a> · <a href="/category/herbal-tea">Infusiones</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "envio-rapido-te",
    title: "Comprar té online con envío rápido | Europa | PureTea",
    description:
      "Comprar té online con envío rápido a España y Europa. Envío gratis desde 50€. Pago seguro Shopify. PureTea.",
    priority: 0.9,
    changeFrequency: "weekly",
    h1: "Comprar té online con envío rápido",
    intro:
      "Procesamos pedidos con agilidad y te enviamos el tracking por email. Plazos habituales 3–5 días laborables en península; el coste exacto y opciones se ven en checkout.",
    sections: [
      {
        h2: "Envío gratis desde 50€",
        html: `<p>Condición aplicable según carrito y destino; siempre verás el total antes de pagar.</p>`,
      },
      {
        h2: "Seguimiento",
        html: `<p>Recibirás enlace de seguimiento cuando el pedido salga. Dudas en <a href="/contact">contacto</a>.</p>`,
      },
    ],
    relatedLinks: [{ href: "/comprar-te", label: "Comprar té" }],
    ...shopCta,
  },
  {
    slug: "regalos-te-originales",
    title: "Regalos de té originales | Cajas premium | Comprar online | PureTea",
    description:
      "Ideas de regalos de té originales: matcha, cajas premium y blends wellness. Envío gratis +50€. PureTea.",
    priority: 0.88,
    changeFrequency: "weekly",
    h1: "Regalos de té originales",
    intro:
      "Un té premium es un regalo con historia: origen, ritual y sabor. Combina matcha ceremonial con accesorios o elige blends aromáticos para quien empieza.",
    sections: [
      {
        h2: "Combinaciones que funcionan",
        html: `<p>Matcha + batidor · selección de negros y verdes · infusiones para relax. Añade nota personal en el pedido.</p>`,
      },
      {
        h2: "Comprar",
        html: `<p><a href="/shop">Ver tienda</a> · <a href="/category/matcha">Matcha</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "beneficios-te-verde-salud",
    title: "Beneficios del té verde para la salud | Guía 2026 | PureTea",
    description:
      "Beneficios del té verde para la salud: antioxidantes EGCG, metabolismo y hábitos. Información general; no sustituye consejo médico. PureTea.",
    priority: 0.87,
    changeFrequency: "monthly",
    h1: "Beneficios del té verde para la salud",
    intro:
      "El té verde es rico en polifenoles, entre ellos catequinas como el EGCG. La literatura científica lo asocia a efectos antioxidantes dentro de una dieta equilibrada. Consulta siempre a un profesional de salud para casos concretos.",
    sections: [
      {
        h2: "Antioxidantes y hábito",
        html: `<p>Lo más potente es la constancia: unas pocas tazas a la semana de té de calidad, preparado sin agua hirviendo que queme las hojas.</p>`,
      },
      {
        h2: "Más lectura",
        html: `<p><a href="/benefits">Beneficios del té</a> · <a href="/blog/antioxidants-in-tea-science">Antioxidantes en el té</a> · <a href="/category/green-tea">Comprar té verde</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "tienda-te-barcelona",
    title: "Comprar té online con envío a Barcelona | PureTea",
    description:
      "Tienda online de té con envío a Barcelona y Cataluña. Matcha, infusiones y wellness. Envío gratis +50€. PureTea.",
    priority: 0.8,
    changeFrequency: "weekly",
    h1: "Comprar té online con envío a Barcelona",
    intro:
      "Desde PureTea enviamos a Barcelona y resto de España. No necesitas tienda física: el catálogo completo está online con checkout seguro.",
    sections: [
      {
        h2: "Plazos orientativos",
        html: `<p>Península habitualmente 3–5 días laborables según destino y mensajería. Confirma en checkout.</p>`,
      },
      {
        h2: "Catálogo",
        html: `<p><a href="/comprar-te">Comprar té</a> · <a href="/envio-rapido-te">Envío rápido</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-embarazadas",
    title: "Tés permitidos en el embarazo | Precauciones | PureTea",
    description:
      "Guía orientativa sobre té e infusiones en el embarazo: cafeína, hierbas a evitar y consulta médica. PureTea.",
    priority: 0.78,
    changeFrequency: "monthly",
    h1: "Tés permitidos en el embarazo",
    intro:
      "Durante el embarazo, limita la cafeína total y evita hierbas no avaladas por tu matrona o médico. Esta página es informativa; no es consejo médico.",
    sections: [
      {
        h2: "Precaución con cafeína",
        html: `<p>Té verde, negro y matcha contienen cafeína. Sigue las pautas de tu equipo sanitario sobre límites diarios.</p>`,
      },
      {
        h2: "Infusiones",
        html: `<p>Muchas embarazadas priorizan infusiones suaves; confirma cada mezcla con profesional. <a href="/category/herbal-tea">Ver infusiones</a>.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-manana",
    title: "Mejor té para tomar por la mañana | Energía calmada | PureTea",
    description:
      "Mejor té por la mañana: matcha, té verde y blends para arrancar el día. Comprar online. PureTea.",
    priority: 0.84,
    changeFrequency: "monthly",
    h1: "Mejor té para tomar por la mañana",
    intro:
      "Por la mañana encajan matcha y té verde: cafeína + L-teanina para energía sin nerviosismo. Alterna con negro si buscas más cuerpo.",
    sections: [
      {
        h2: "Rutina express",
        html: `<p>5 minutos, agua a temperatura correcta, sin pantallas. El ritual marca el inicio del día.</p>`,
      },
      {
        h2: "Productos",
        html: `<p><a href="/category/matcha">Matcha</a> · <a href="/blog/best-time-to-drink-green-tea">Mejor hora té verde</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "conservar-te-granel",
    title: "Cómo conservar té a granel | Almacenamiento | PureTea",
    description:
      "Cómo conservar té a granel: luz, humedad, olores y duración. Guía práctica PureTea.",
    priority: 0.8,
    changeFrequency: "monthly",
    h1: "Cómo conservar té a granel",
    intro:
      "El té absorbe olores y se degrada con luz y humedad. Usa bote opaco hermético, lugar fresco y lejos de especias.",
    sections: [
      {
        h2: "Checklist",
        html: `<p>Opaco · hermético · sin humedad · no nevera salvo que sea té muy delicado y empaquetado bien</p>`,
      },
      {
        h2: "Comprar té fresco",
        html: `<p><a href="/te-ecologico-a-granel">Té ecológico a granel</a> · <a href="/shop">Tienda</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-ninos",
    title: "Té para niños sin cafeína | Infusiones suaves | PureTea",
    description:
      "Opciones de infusiones sin cafeína para niños: sabores suaves y sin téine. Compra online PureTea.",
    priority: 0.76,
    changeFrequency: "monthly",
    h1: "Té para niños sin cafeína",
    intro:
      "Para niños lo razonable son infusiones de fruta, rooibos o hierbas suaves, sin cafeína. Evita mezclas con estimulantes o hierbas medicinales sin pediatra.",
    sections: [
      {
        h2: "Seguridad",
        html: `<p>Temperatura templada, poca cantidad y supervisión adulta. Ante dudas, pediatra.</p>`,
      },
      {
        h2: "Tienda",
        html: `<p><a href="/category/herbal-tea">Infusiones</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "suscripcion-te-mensual",
    title: "Suscripción de té mensual | Cajas y novedades | PureTea",
    description:
      "Descubre suscripción de té: novedades cada mes, ritual fácil. Consulta disponibilidad en tienda PureTea.",
    priority: 0.75,
    changeFrequency: "weekly",
    h1: "Suscripción de té mensual",
    intro:
      "Las suscripciones de té ayudan a descubrir variedades sin pensar cada pedido. En PureTea puedes armar cestas recurrentes según disponibilidad del catálogo; contacta si quieres un plan a medida.",
    sections: [
      {
        h2: "Ventajas",
        html: `<p>Ahorro de tiempo, descubrimiento guiado y regalo recurrente para uno mismo.</p>`,
      },
      {
        h2: "Contacto B2C",
        html: `<p><a href="/contact">Escríbenos</a> para opciones de repetición o packs.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-importacion-directa",
    title: "Té de importación directa | Origen y trazabilidad | PureTea",
    description:
      "Té con origen directo: Japón, China, Ceilán. Trazabilidad y calidad. Comprar té premium online PureTea.",
    priority: 0.82,
    changeFrequency: "monthly",
    h1: "Té de importación directa",
    intro:
      "Seleccionamos proveedores en origen y priorizamos trazabilidad. Eso se nota en taza: frescura de sabor y coherencia de grado.",
    sections: [
      {
        h2: "Por qué importa el origen",
        html: `<p>Clima, suelo y procesado definen el perfil. El matcha japonés y los negros de Ceilán no son intercambiables con genéricos sin procedencia.</p>`,
      },
      {
        h2: "Comprar",
        html: `<p><a href="/about">Nosotros</a> · <a href="/shop">Tienda</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-blanco-premium",
    title: "Té blanco premium | Comprar té blanco online | PureTea",
    description:
      "Té blanco de calidad: suavidad y notas florales. Comprar té blanco premium online. PureTea.",
    priority: 0.8,
    changeFrequency: "monthly",
    h1: "Té blanco premium",
    intro:
      "El té blanco se elabora con brotes jóvenes y se seca suavemente. Es delicado: agua no demasiado caliente y tiempos cortos.",
    sections: [
      {
        h2: "Perfil sensorial",
        html: `<p>Suave, a veces melonal o floral. Menos cafeína que muchos negros.</p>`,
      },
      {
        h2: "Tienda",
        html: `<p><a href="/shop">Ver té disponible</a> · categorías relacionadas en verde y blanco según stock.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-oficina",
    title: "Té para oficina | Packs y comodidad | PureTea",
    description:
      "Té para oficina y equipos: packs, infusiones en bolsa o granel según disponibilidad. Consulta PureTea.",
    priority: 0.74,
    changeFrequency: "monthly",
    h1: "Té para oficina",
    intro:
      "Equipos que quieren menos café y más variedad eligen té en sobres o botes para compartir. Podemos orientarte en volumen vía contacto.",
    sections: [
      {
        h2: "Ventajas",
        html: `<p>Menos nerviosismo que el café excesivo, más hidratación y ritual pausado.</p>`,
      },
      {
        h2: "Contacto",
        html: `<p><a href="/contact">Pedir información</a> para oficinas.</p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-con-postres",
    title: "Té para acompañar postres | Maridaje | PureTea",
    description:
      "Qué té servir con postres: maridajes dulces con negro, earl grey o infusiones. Guía PureTea.",
    priority: 0.73,
    changeFrequency: "monthly",
    h1: "Té para acompañar postres",
    intro:
      "Los tés negros aromatizados y algunos oolong encajan con chocolate y repostería. Las infusiones frutales funcionan con tartas de fruta.",
    sections: [
      {
        h2: "Ideas rápidas",
        html: `<p>Chocolate → negro intenso o Earl Grey · fruta → infusión frutal · queso → té menos amargo</p>`,
      },
      {
        h2: "Productos",
        html: `<p><a href="/blog/earl-grey-history-and-benefits">Earl Grey</a> · <a href="/category/black-tea">Té negro</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-para-piel-belleza",
    title: "Té para la piel y belleza | Antioxidantes | Guía PureTea",
    description:
      "Relación entre té, antioxidantes e hidratación para la piel. Visión general wellness, no cosmética médica. PureTea.",
    priority: 0.72,
    changeFrequency: "monthly",
    h1: "Té para la piel y belleza",
    intro:
      "Los polifenoles del té se estudian por su papel antioxidante en el organismo. Una hidratación adecuada y dieta equilibrada apoyan la piel; el té puede ser parte del hábito.",
    sections: [
      {
        h2: "Hábitos",
        html: `<p>Dormir bien, protección solar y té como bebida baja en calorías si no añades azúcares.</p>`,
      },
      {
        h2: "Tés ricos en polifenoles",
        html: `<p><a href="/category/green-tea">Verde</a> · <a href="/category/matcha">Matcha</a></p>`,
      },
    ],
    ...shopCta,
  },
  {
    slug: "te-detox-limpieza-organismo",
    title: "Tés detox y hábitos de hidratación | Guía | PureTea",
    description:
      "Perspectiva sensata sobre «té detox»: hidratación, fibra, sueño y té como hábito. Sin promesas mágicas. PureTea.",
    priority: 0.78,
    changeFrequency: "monthly",
    h1: "Tés detox para limpiar el organismo",
    intro:
      "Ningún té «limpia» el cuerpo milagrosamente: hígado y riñones ya lo hacen. Sí puedes usar infusiones ligeras como parte de una rutina con agua, verdura y descanso.",
    sections: [
      {
        h2: "Expectativas realistas",
        html: `<p>Evita productos que prometan curas. Mejor té verde, infusiones y movimiento.</p>`,
      },
      {
        h2: "Comprar",
        html: `<p><a href="/category/herbal-tea">Infusiones</a> · <a href="/category/green-tea">Té verde</a></p>`,
      },
    ],
    ...shopCta,
  },
];
