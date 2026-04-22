export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  updated?: string;
  category: string;
  author?: string;
  faqs?: { question: string; answer: string }[];
  relatedProducts?: string[];
}

/** Párrafos largos de contenido experto para SEO y posicionamiento */
const LONG = {
  benefitsMatcha: `
<h2>Qué es el matcha y por qué es distinto</h2>
<p>El matcha es té verde en polvo obtenido de hojas cultivadas a la sombra (gyokuro-style) en regiones como Uji o Kagoshima, en Japón. A diferencia del té en hoja, aquí consumes la hoja entera disuelta en agua, lo que multiplica la concentración de antioxidantes, clorofila y L-teanina. En PureTea seleccionamos solo matcha de grado ceremonial o premium para que cada taza sea una experiencia de sabor y bienestar.</p>
<h2>Beneficios respaldados por la ciencia</h2>
<p>Los estudios destacan el alto contenido en EGCG (epigalocatequina galato), un antioxidante potente, y en L-teanina, un aminoácido que favorece un estado de alerta tranquila. La combinación de L-teanina y cafeína en el matcha produce un efecto de <strong>energía sostenida sin picos de nerviosismo</strong>, ideal para mañanas productivas o sesiones de trabajo. Además, el matcha puede apoyar la función cognitiva y el metabolismo dentro de una dieta equilibrada.</p>
<h2>Cómo incorporar el matcha a tu rutina</h2>
<p>Recomendamos empezar con 1–2 g al día (una cucharadita rasa) en forma de matcha tradicional batido con agua, o como base de un latte. El mejor momento suele ser por la mañana o a media mañana para aprovechar la energía y la concentración. Evita tomarlo muy tarde si eres sensible a la cafeína. En PureTea encontrarás matcha ceremonial listo para tu ritual diario.</p>
`,
  greenVsCoffee: `
<h2>Cafeína: dos formas de liberación</h2>
<p>El café ofrece un pico rápido de cafeína que muchas personas notan en minutos; el té verde y sobre todo el matcha liberan cafeína de forma más gradual. La clave está en la <strong>L-teanina</strong>, presente en el té y casi ausente en el café: modula la cafeína y reduce la sensación de nerviosismo, manteniendo la alerta durante más tiempo y con menos bajón posterior.</p>
<h2>Antioxidantes y salud a largo plazo</h2>
<p>El té verde y el matcha son ricos en polifenoles y EGCG; el café también tiene antioxidantes pero de otro tipo. Si buscas un perfil antioxidante asociado a la tradición del té y a la calma, el té verde gana. Si prefieres el sabor y el golpe inmediato del café, puedes alternar: té o matcha por la mañana y café solo cuando necesites un subidón puntual.</p>
<h2>Cuándo elegir cada uno</h2>
<p>Elige té verde o matcha cuando quieras energía sostenida, concentración sin nerviosismo o un ritual de pausa. Elige café cuando busques un efecto muy rápido o un sabor intenso. Muchos de nuestros clientes combinan ambos según el día. En PureTea te ayudamos a encontrar el té que mejor se adapta a tu ritmo.</p>
`,
  howToMatcha: `
<h2>Herramientas que necesitas</h2>
<p>Para un matcha perfecto en casa hace falta muy poco: un cuenco (chawan), un batidor de bambú (chasen), matcha ceremonial o premium y agua de buena calidad. El chasen rompe los grumos y crea la espuma fina característica; sin él puedes usar una pequeña batidora de mano, pero el resultado no será igual. En nuestra tienda puedes encontrar todo lo necesario para empezar.</p>
<h2>Temperatura y cantidades exactas</h2>
<p>El agua debe estar entre 75 °C y 80 °C. Si hierve, deja enfriar 1–2 minutos. Usa 1–2 g de matcha (media cucharadita bien rasa) por 60–80 ml de agua. Vierte el agua sobre el matcha y bate en movimiento de W o M, con suavidad pero de forma continua, hasta que aparezca una capa de espuma fina y no queden grumos. Un matcha de calidad como el nuestro se disuelve bien y no amarga.</p>
<h2>Errores que debes evitar</h2>
<p>El error más común es usar agua hirviendo: quema el matcha y amarga. Otro es usar demasiado polvo o demasiada agua, lo que diluye el sabor o lo hace pastoso. Por último, no batir lo suficiente deja grumos. Con práctica, en menos de un minuto tendrás un matcha listo. Si quieres profundizar, en nuestra sección <a href="/how-to-brew">Cómo preparar</a> tienes guías y vídeos.</p>
`,
  teaStudying: `
<h2>Por qué el té ayuda a concentrarse</h2>
<p>La combinación de cafeína y L-teanina en el té verde y el matcha favorece un estado de <strong>alerta relajada</strong>: te mantiene despierto y enfocado sin el nerviosismo del café. Por eso muchos estudiantes y profesionales eligen té para sesiones largas de estudio o trabajo. La clave está en la calidad del té y en la regularidad: un ritual de té a la misma hora puede señalar al cerebro que es momento de concentrarse.</p>
<h2>Los mejores tés para estudiar</h2>
<p>El matcha es ideal por su concentración de L-teanina y su efecto prolongado. El té verde en hoja (sencha, por ejemplo) es otra opción excelente y algo más ligera. Nuestro <strong>Focus Blend</strong> está diseñado específicamente para la concentración: combina té verde con ginkgo y romero, ingredientes asociados a la función cognitiva. Puedes alternar entre matcha por la mañana y Focus Blend por la tarde.</p>
<h2>Cómo usarlo en tu rutina de estudio</h2>
<p>Tomar una taza al empezar la sesión y otra a la mitad ayuda a mantener el foco. Evita tomar demasiado por la tarde si luego necesitas dormir bien. En PureTea somos expertos en blends para el rendimiento mental; si nos escribes, te recomendamos la opción que mejor encaje con tu horario y tu sensibilidad a la cafeína.</p>
`,
  teaStress: `
<h2>Por qué las infusiones relajan</h2>
<p>Las infusiones sin cafeína (manzanilla, lavanda, pasiflora, valeriana, melisa) se han usado durante siglos para calmar y preparar el sueño. No sustituyen un tratamiento médico, pero pueden formar parte de un ritual de desconexión: la temperatura, el sabor y el momento de la taza envían una señal de seguridad al cuerpo. En PureTea hemos creado un <strong>Relax Blend</strong> que combina estas plantas para que una sola taza te ayude a bajar el ritmo.</p>
<h2>Cuándo y cómo tomarlas</h2>
<p>Lo ideal es tomarlas 30–60 minutos antes de acostarte, en un entorno tranquilo, sin pantallas. La rutina repetida refuerza el efecto: tu cuerpo asocia esa infusión con el momento de descanso. Evita tés con cafeína después de las 16h si eres sensible; si te apetece algo caliente por la noche, las infusiones herbales son la mejor opción.</p>
<h2>Nuestra recomendación experta</h2>
<p>Prueba nuestro Relax Blend o nuestra Manzanilla y Lavanda. Son las más pedidas por clientes que buscan desconectar. Si prefieres algo más aromático, nuestras otras infusiones sin cafeína también son una buena opción. En el blog seguimos publicando guías sobre bienestar y té; somos referentes en rituales de relax con infusiones de calidad.</p>
`,
  japaneseMatcha: `
<h2>Por qué Japón marca la diferencia</h2>
<p>El mejor matcha del mundo se produce en Japón, sobre todo en regiones como Uji (Kioto), Nishio (Aichi) y Kagoshima. El clima, el suelo y siglos de tradición en el cultivo a la sombra dan un perfil de sabor umami, color verde intenso y textura sedosa que no se consigue en otras regiones. En PureTea trabajamos con proveedores japoneses que cumplen estándares de trazabilidad y calidad; no vendemos «matcha genérico» sin origen.</p>
<h2>Grado ceremonial vs otros grados</h2>
<p>El matcha de grado ceremonial se elabora con las hojas más jóvenes y tiernas, sin tallos. Es el que se usa en la ceremonia del té y el que ofrecemos para tu ritual diario. Otros grados (culinario, etc.) pueden tener más amargor y color menos vivo; son útiles para repostería, pero para beber recomendamos siempre ceremonial o premium. Así te aseguras la experiencia que buscas.</p>
<h2>Qué buscar al comprar matcha japonés</h2>
<p>Comprueba que el envase indique origen (Japón, y si es posible la región). El color debe ser verde brillante, no amarillento ni apagado. Un matcha fresco huele a hierba y algas suaves; si huele rancio o muy amargo, desconfía. En PureTea solo vendemos matcha que nosotros mismos catamos y que cumple estos criterios. Somos expertos en matcha japonés y te asesoramos si tienes dudas.</p>
`,
  bestTimeGreenTea: `
<h2>Mañana: el mejor momento para la mayoría</h2>
<p>Para la mayoría de personas, la mañana o la media mañana es el mejor momento para tomar té verde o matcha. Aportas hidratación, antioxidantes y una dosis moderada de cafeína con L-teanina que te ayuda a arrancar el día sin nervios. Evita tomarlo en ayunas si notas molestias; acompañarlo de un desayuno ligero suele ser la mejor opción.</p>
<h2>Tarde y sensibilidad a la cafeína</h2>
<p>Si eres sensible a la cafeína, limita el té verde o matcha a antes de las 14–16h para no afectar el sueño. Si no eres sensible, una taza a media tarde puede ser un buen puente hasta la cena. Escucha a tu cuerpo: si te cuesta dormir, adelanta la última taza con cafeína.</p>
<h2>Noche: mejor infusiones sin cafeína</h2>
<p>Por la noche lo ideal son las infusiones herbales (manzanilla, lavanda, Relax Blend). Así mantienes el ritual de la taza caliente sin estimulantes. En PureTea tenemos una sección entera de infusiones para la noche; somos referentes en bienestar y horarios de consumo de té.</p>
`,
  earlGrey: `
<h2>Qué es el Earl Grey y de dónde viene</h2>
<p>El Earl Grey es un té negro aromatizado con aceite de bergamota, un cítrico mediterráneo. La leyenda atribuye su nombre a un noble británico; hoy es uno de los tés más reconocidos del mundo. La calidad depende del té base (en PureTea usamos Ceylán o mezclas de origen) y del tipo de bergamota: natural, no «sabor a» artificial.</p>
<h2>Beneficios del té negro con bergamota</h2>
<p>El té negro aporta antioxidantes y una dosis moderada de cafeína; la bergamota añade un aroma que muchas personas asocian con la calma y la concentración. Es ideal para desayunos y meriendas. Nuestro Earl Grey Premium está pensado para quienes buscan intensidad y carácter sin renunciar a la elegancia.</p>
<h2>Cómo prepararlo y disfrutarlo</h2>
<p>Usa agua recién hervida, 1 cucharadita por taza, y deja infusionar 3–5 minutos. Puedes tomarlo solo o con un poco de leche. En PureTea te explicamos las mejores temperaturas y tiempos en nuestra guía <a href="/how-to-brew">Cómo preparar</a>. Somos expertos en tés negros y te ayudamos a elegir el que más te guste.</p>
`,
  herbalSleep: `
<h2>Plantas que favorecen el descanso</h2>
<p>La manzanilla, la lavanda, la pasiflora, la valeriana y la melisa están asociadas tradicionalmente al relax y al sueño. No son somníferos, pero forman parte de rituales de «bajar el ritmo» que ayudan a conciliar el sueño. En PureTea las seleccionamos por calidad y trazabilidad; nuestro Relax Blend combina varias de ellas para una infusión nocturna reconfortante.</p>
<h2>Cómo crear un ritual de noche</h2>
<p>Tomar la misma infusión cada noche, a la misma hora, en un entorno tranquilo (sin pantallas), refuerza la asociación mental entre la taza y el descanso. No hace falta que sea mucho volumen: 150–200 ml es suficiente. La temperatura caliente y el sabor suave contribuyen a la sensación de bienestar.</p>
<h2>Nuestra selección para dormir mejor</h2>
<p>Además del Relax Blend, nuestra Manzanilla y Lavanda es una de las más pedidas para la noche. Si prefieres algo más especiado, podemos recomendarte otras opciones sin cafeína. En PureTea somos expertos en infusiones para el sueño y el bienestar; contáctanos si quieres una recomendación personalizada.</p>
`,
  lTheanineFocus: `
<h2>Qué es la L-teanina y por qué importa</h2>
<p>La L-teanina es un aminoácido presente sobre todo en el té (verde y matcha). Favorece un estado de alerta tranquila y puede mejorar la concentración y la resistencia al estrés cuando se combina con cafeína. Por eso el té y el matcha se describen como «energía sin nervios»: la L-teanina modula el efecto de la cafeína.</p>
<h2>Matcha y té verde: las mejores fuentes</h2>
<p>El matcha concentra más L-teanina que el té verde en hoja porque consumes la hoja entera. Un matcha ceremonial de calidad como el de PureTea te da la dosis óptima para sesiones de trabajo o estudio. El té verde en hoja (sencha, etc.) también aporta L-teanina; alternar ambos es una estrategia que muchos de nuestros clientes usan para mantener el foco todo el día.</p>
<h2>Blends diseñados para la concentración</h2>
<p>Nuestro Focus Blend suma té verde (y por tanto L-teanina) con ginkgo y romero, ingredientes asociados a la función cognitiva. Es ideal para tardes de trabajo o estudio cuando quieres mantener la concentración sin pasarte de cafeína. En PureTea somos expertos en té y rendimiento mental; este blend es uno de nuestros más vendidos.</p>
`,
  ceremonialVsCulinary: `
<h2>Qué significa cada grado</h2>
<p>El <strong>matcha ceremonial</strong> se elabora con las mejores hojas, sin tallos, y está pensado para beber batido con agua. Sabor umami, color verde vivo, sin amargor. El <strong>matcha culinario</strong> usa hojas de menor grado y puede incluir tallos; es más amargo y menos fino, adecuado para repostería, batidos o recetas donde el matcha no es el protagonista.</p>
<h2>Cuándo elegir uno u otro</h2>
<p>Para tu ritual diario (taza de matcha, matcha latte), elige siempre ceremonial o premium. Para postres, smoothies o cocina en los que el matcha es un ingrediente más, el culinario puede ser suficiente y más económico. En PureTea nos especializamos en matcha para beber; nuestro catálogo es de grado ceremonial o premium para que no tengas que conformarte con menos.</p>
<h2>Cómo distinguirlos al comprar</h2>
<p>El ceremonial suele indicarlo en el envase y tiene un precio mayor. El color es verde brillante; el olor, fresco y vegetal. Si el producto no indica grado o origen, desconfía. Nosotros en PureTea solo vendemos matcha que cumple estándares de grado y trazabilidad; así te garantizamos la mejor experiencia.</p>
`,
  teaHydration: `
<h2>El té hidrata como el agua</h2>
<p>Contrario al mito, el té (incluso con cafeína) contribuye a la hidratación diaria. La cantidad de cafeína en una taza de té no invalida el aporte de agua. Por eso deportistas y personas activas pueden incluir té en su rutina de hidratación sin problema. Lo importante es no sustituir todo el agua por té; combinar ambas es lo ideal.</p>
<h2>Té antes y después del ejercicio</h2>
<p>El matcha o el té verde antes del entrenamiento pueden aportar energía suave y antioxidantes; después, una infusión sin cafeína o un té suave ayudan a recuperar sin sobreestimular. Evita grandes cantidades de té muy concentrado justo antes de esfuerzos intensos si eres sensible a la cafeína. En PureTea asesoramos a clientes que entrenan y quieren integrar el té en su rutina.</p>
<h2>Nuestra recomendación para deportistas</h2>
<p>Matcha por la mañana o pre-entreno, té verde o Focus Blend para el día, e infusiones herbales para la noche. Así mantienes hidratación, antioxidantes y energía sin pasarte. Somos expertos en té y rendimiento; si nos cuentas tu rutina, te recomendamos los productos que mejor encajen.</p>
`,
  antioxidantsScience: `
<h2>Qué son los antioxidantes del té</h2>
<p>El té (verde, negro, matcha) es rico en polifenoles, especialmente en catequinas. La más estudiada es el EGCG (epigalocatequina galato), abundante en el té verde y el matcha. Los antioxidantes ayudan a proteger las células del estrés oxidativo; por eso el consumo regular de té se asocia en la literatura científica a diversos beneficios dentro de una dieta y un estilo de vida saludables.</p>
<h2>Matcha: máxima concentración</h2>
<p>Al consumir la hoja entera en polvo, el matcha concentra más antioxidantes por taza que el té verde en infusión. Por eso se considera una de las fuentes más potentes de EGCG en la dieta. En PureTea seleccionamos matcha de alta calidad para que cada taza aporte el máximo beneficio; el origen y el grado importan.</p>
<h2>Cómo aprovecharlos al máximo</h2>
<p>La temperatura del agua (75–85 °C para verde y matcha) y el tiempo de preparación influyen en la extracción. No hace falta obsesionarse: un ritual constante con té de calidad es mejor que buscar la «dosis perfecta» una sola vez. En nuestro blog y en la sección de beneficios tienes más información; somos referentes en ciencia y té.</p>
`,
  morningRitual: `
<h2>Por qué un ritual matutino funciona</h2>
<p>Un ritual de té por la mañana marca el inicio del día: te da un momento de pausa, hidratación y energía suave. La repetición (mismo horario, mismo gesto) refuerza el hábito y la sensación de control. Muchos de nuestros clientes nos cuentan que preparar su matcha o su té verde es el momento en que «despiertan de verdad» sin el golpe del café.</p>
<h2>Cómo montar tu ritual en 5 minutos</h2>
<p>Elige un tipo de té (matcha, verde o el que prefieras), calienta el agua a la temperatura correcta, prepara la taza o el cuenco y tómalo sin pantallas. No hace falta que sea largo: 5 minutos bastan. Puedes acompañarlo de un respiro o de una ventana abierta. La clave es la regularidad, no la duración.</p>
<h2>Productos que te ayudan</h2>
<p>En PureTea tenemos todo lo que necesitas: matcha ceremonial, tés verdes, Focus Blend para los días de más demanda y guías en <a href="/how-to-brew">Cómo preparar</a>. Somos expertos en rituales de té y en bienestar; empieza por una sola referencia y construye desde ahí. Pure tea, pure ritual.</p>
`,
  buyTeaOnlineGuide: `
<h2>Qué debe tener una tienda de té online fiable</h2>
<p>Origen claro (Japón para matcha, regiones conocidas para negros y verdes), fecha de tueste o empaquetado cuando aplique, política de envíos transparente y checkout seguro. Evita sitios sin datos de contacto o con precios irreales.</p>
<h2>Cómo aprovechar el envío gratis</h2>
<p>Agrupa pedidos para superar el umbral — en PureTea el envío es gratis a partir de 50€ en pedidos que cumplan la condición. Revisa el carrito antes de pagar: el checkout de Shopify muestra el coste final.</p>
<h2>Primer pedido: por dónde empezar</h2>
<p>Si buscas <strong>comprar té online</strong> con intención clara, combina un té de ritual (matcha o verde) con una infusión nocturna y un negro para meriendas. Así cubres momentos del día. Nuestra <a href="/comprar-te">guía para comprar té</a> resume categorías y envíos.</p>
`,
  teaGiftIdeas: `
<h2>Regalos de té que sí se usan</h2>
<p>Mejor una referencia premium que una caja genérica enorme. El matcha ceremonial con batidor, un duo verde+negro o un Relax Blend para quien necesita desconectar suelen funcionar mejor que surtidos anónimos.</p>
<h2>Empaque y mensaje</h2>
<p>Añade nota en el pedido si regalas directo: en PureTea cuidamos el packaging. Para Navidad o cumpleaños, los <a href="/regalos-te-originales">kits de regalo de té</a> son un buen punto de partida.</p>
<h2>Presupuestos</h2>
<p>Entre 25€ y 60€ puedes montar regalos muy vistosos: matcha + accesorio mínimo, o selección de tres tés 50g. Escala según cercanía y ocasión.</p>
`,
  buyMatchaOnline: `
<h2>Señales de matcha de verdad</h2>
<p>Color verde intenso (no amarillento), origen Japón en etiqueta, olor fresco vegetal. El precio muy bajo suele indicar grado culinario o mezclas diluidas. Para beber, apuesta por ceremonial.</p>
<h2>Errores al comprar matcha online</h2>
<p>Comprar sin mirar grado, usar agua hirviendo al prepararlo o guardarlo con luz. Corrige esos tres puntos y el matcha «cambia de categoría» en taza.</p>
<h2>Dónde comprar matcha de calidad</h2>
<p>En PureTea trabajamos matcha japonés seleccionado. Lee <a href="/te-matcha-japones-premium">matcha japonés premium</a> y la guía <a href="/como-preparar-te-matcha">cómo preparar matcha</a> antes de elegir.</p>
`,
  greenTeaHealthDeep: `
<h2>EGCG y hábito: qué sabemos</h2>
<p>El té verde aporta catequinas; la más citada en estudios es el EGCG. Los efectos se observan en contextos de dieta equilibrada, no como «medicamento» en una taza. Para patologías, consulta siempre a profesionales.</p>
<h2>Cuántas tazas y cuándo</h2>
<p>2–3 tazas al día es un rango habitual en población sana. Si eres sensible a la cafeína, adelanta las últimas tomas. El agua no debe hervir sobre hojas delicadas.</p>
<h2>Comprar té verde online</h2>
<p>Prioriza hojas enteras y origen. En nuestra <a href="/category/green-tea">categoría té verde</a> encontrarás opciones listas para infusionar. Amplía con <a href="/beneficios-te-verde-salud">beneficios del té verde</a>.</p>
`,
  herbalRelaxBuy: `
<h2>Infusiones para comprar si no duermes bien</h2>
<p>Manzanilla, melisa, lavanda, pasiflora en mezclas suaves. Evita té verde/negro/matcha en la noche si notas que te estimulan.</p>
<h2>Cómo montar rutina</h2>
<p>Misma hora, misma taza, sin pantallas 30 minutos antes de dormir. El efecto es acumulativo: no esperes magia la primera noche.</p>
<h2>Catálogo PureTea</h2>
<p><a href="/te-para-dormir-relajacion">Té para dormir</a> · <a href="/category/herbal-tea">Infusiones</a> · <a href="/blog/herbal-teas-for-sleep">Artículo infusiones para dormir</a></p>
`,
  matchaRecipesTrend: `
<h2>Las recetas de matcha virales que sí merecen la pena</h2>
<p>En 2026, TikTok e Instagram han llenado el feed de recetas de matcha: strawberry matcha, coconut matcha cloud y versiones "protein matcha". No todo lo viral es bueno, pero hay una tendencia clara: bebidas más limpias, con menos azúcar y mejor calidad de té. Si usas matcha ceremonial japonés, incluso una receta simple queda por encima de cualquier mezcla artificial.</p>
<h2>Top 3 recetas para casa (rápidas y rentables)</h2>
<p><strong>1) Strawberry Matcha limpio:</strong> puré de fresa natural + hielo + leche + matcha batido aparte.<br/>
<strong>2) Coconut Matcha:</strong> agua de coco fría + matcha + lima suave.<br/>
<strong>3) Protein Matcha Latte:</strong> matcha + bebida vegetal + proteína neutra de calidad.<br/>
El truco en todas: batir el matcha con poca agua primero y no usar agua hirviendo.</p>
<h2>Cómo vender mejor estas recetas en tienda online</h2>
<p>Si compras té online para estas recetas, prioriza matcha de origen Japón, frescura y un perfil de sabor suave. En PureTea recomendamos empezar por matcha ceremonial y luego experimentar. Puedes ampliar con nuestra guía de <a href="/blog/how-to-prepare-matcha-properly">preparación de matcha</a> para evitar el sabor amargo típico de recetas mal ejecutadas.</p>
`,
  teaMocktailsTrend: `
<h2>Tea Mocktails: la gran tendencia sin alcohol</h2>
<p>Los <strong>tea mocktails</strong> son una de las búsquedas más fuertes de bienestar: cócteles sin alcohol con base de té, botánicos y cítricos. Funcionan porque combinan ritual social con menos calorías y sin resaca. El té aporta estructura de sabor y permite crear combinaciones premium para brunch, tardeo o cenas.</p>
<h2>Combinaciones top de 2026</h2>
<p><strong>Mocktail 1:</strong> Earl Grey + piel de naranja + tónica seca.<br/>
<strong>Mocktail 2:</strong> té verde frío + pepino + lima + menta.<br/>
<strong>Mocktail 3:</strong> hibisco/infusión herbal + frutos rojos + agua con gas.<br/>
Para un resultado elegante, enfría la infusión en frío y evita endulzar en exceso.</p>
<h2>Qué comprar para montar un bar de té en casa</h2>
<p>Con tres bases bien elegidas (té negro aromático, té verde y una infusión herbal) cubres casi cualquier mocktail. En PureTea puedes combinar un Earl Grey premium, un sencha limpio y una infusión relajante para crear carta sin alcohol en casa. Si quieres ideas de regalo, enlaza con nuestra guía de <a href="/blog/regalos-te-original-pareja-amigo">regalos de té</a>.</p>
`,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "benefits-of-matcha",
    title: "Beneficios del matcha: por qué incorporarlo a tu rutina",
    excerpt: "El matcha es mucho más que un té: energía calmada, antioxidantes y ritual. Guía experta con ciencia y consejos para el día a día.",
    content: "<p>El matcha es un té verde japonés en polvo que se obtiene de hojas cultivadas a la sombra. Contiene toda la hoja, por lo que concentra más antioxidantes y L-teanina que el té verde clásico. En PureTea llevamos años seleccionando el mejor matcha para que tu ritual diario sea también una apuesta por tu bienestar.</p>" + LONG.benefitsMatcha,
    image: "/images/blog/benefits-matcha.png",
    date: "2025-01-15",
    category: "Matcha",
    faqs: [
      { question: "¿Cuánta cafeína tiene el matcha?", answer: "Una taza de matcha tiene aproximadamente 70 mg de cafeína, similar al café, pero la L-teanina modula el efecto para que sea más suave y sostenido." },
      { question: "¿Cómo se prepara el matcha correctamente?", answer: "Usa 1-2 g de matcha, agua a 80°C y un batidor (chasen). Vierte el agua, bate en W hasta que espume y no queden grumos." },
    ],
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "green-tea-vs-coffee",
    title: "Té verde vs café: qué elegir según tu objetivo",
    excerpt: "Comparativa experta entre té verde y café: energía, antioxidantes, sueño y cuándo tomar cada uno. Por PureTea.",
    content: "<p>¿Té verde o café? Depende de lo que busques: subidón rápido o energía sostenida, antioxidantes del té o el sabor del café. En PureTea te explicamos las diferencias con rigor para que elijas con criterio.</p>" + LONG.greenVsCoffee,
    image: "/images/blog/green-vs-coffee.png",
    date: "2025-01-10",
    category: "Bienestar",
    relatedProducts: ["ceremonial-matcha", "sencha-organic"],
  },
  {
    slug: "how-to-prepare-matcha-properly",
    title: "Cómo preparar matcha correctamente en casa",
    excerpt: "Guía paso a paso para preparar matcha ceremonial: herramientas, temperatura y técnica del batidor. Por expertos PureTea.",
    content: "<p>Preparar matcha en casa es sencillo si sigues unos pasos claros. En PureTea te guiamos con la misma precisión que usamos en nuestra selección de productos.</p>" + LONG.howToMatcha,
    image: "/images/blog/how-to-matcha.png",
    date: "2025-01-05",
    category: "Matcha",
    faqs: [
      { question: "¿Qué temperatura debe tener el agua para el matcha?", answer: "Entre 75°C y 80°C. El agua hirviendo puede amargar el matcha." },
      { question: "¿Se puede hacer matcha con leche?", answer: "Sí. El matcha latte se hace batiendo el matcha con un poco de agua y luego añadiendo leche caliente o vegetal." },
    ],
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "best-tea-for-studying",
    title: "Mejor té para estudiar y concentrarse",
    excerpt: "Los tés y blends que favorecen la concentración: matcha, té verde y mezclas con ginkgo. Guía experta PureTea.",
    content: "<p>Para estudiar o trabajar con foco, el té puede ser tu mejor aliado. Te explicamos por qué y qué productos elegir.</p>" + LONG.teaStudying,
    image: "/images/blog/tea-studying.png",
    date: "2024-12-20",
    category: "Wellness",
    relatedProducts: ["focus-blend", "ceremonial-matcha"],
  },
  {
    slug: "tea-for-stress-relief",
    title: "Tés e infusiones para aliviar el estrés",
    excerpt: "Infusiones sin cafeína y blends de bienestar para relajarte. Guía experta por PureTea.",
    content: "<p>Las infusiones herbales y los blends de relax pueden formar parte de tu rutina de desconexión. Te contamos cuáles y cómo.</p>" + LONG.teaStress,
    image: "/images/blog/tea-stress.png",
    date: "2024-12-15",
    category: "Wellness",
    relatedProducts: ["relax-blend", "chamomile-lavender"],
  },
  {
    slug: "why-japanese-matcha-is-best",
    title: "Por qué el matcha japonés es el mejor del mundo",
    excerpt: "Uji, Nishio, Kagoshima: qué hace del matcha japonés el estándar de calidad. Por PureTea.",
    content: "<p>El mejor matcha del mundo se produce en Japón. Te explicamos por qué y cómo elegirlo.</p>" + LONG.japaneseMatcha,
    image: "/images/blog/japanese-matcha.png",
    date: "2024-12-10",
    category: "Matcha",
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "best-time-to-drink-green-tea",
    title: "Mejor hora para tomar té verde",
    excerpt: "Cuándo tomar té verde y matcha para energía y sueño. Recomendaciones expertas PureTea.",
    content: "<p>La hora a la que tomas el té influye en el efecto y en tu descanso. Te damos pautas claras.</p>" + LONG.bestTimeGreenTea,
    image: "/images/blog/best-time-green-tea.png",
    date: "2024-12-05",
    category: "Té verde",
    relatedProducts: ["sencha-organic", "ceremonial-matcha"],
  },
  {
    slug: "earl-grey-history-and-benefits",
    title: "Earl Grey: historia y beneficios del té con bergamota",
    excerpt: "Origen, beneficios y cómo preparar el Earl Grey. Por PureTea.",
    content: "<p>El Earl Grey es uno de los tés más reconocidos. Te contamos su historia y cómo sacarle el máximo partido.</p>" + LONG.earlGrey,
    image: "/images/blog/earl-grey.png",
    date: "2024-11-28",
    category: "Té negro",
    relatedProducts: ["earl-grey-premium"],
  },
  {
    slug: "herbal-teas-for-sleep",
    title: "Infusiones para dormir mejor",
    excerpt: "Manzanilla, lavanda, pasiflora: las mejores infusiones para la noche. Guía PureTea.",
    content: "<p>Las infusiones sin cafeína pueden ayudarte a crear un ritual de descanso. Te explicamos cuáles y cómo.</p>" + LONG.herbalSleep,
    image: "/images/blog/herbal-sleep.png",
    date: "2024-11-20",
    category: "Wellness",
    relatedProducts: ["relax-blend", "chamomile-lavender"],
  },
  {
    slug: "l-theanine-focus",
    title: "L-teanina y concentración: por qué el té te enfoca",
    excerpt: "Qué es la L-teanina, cómo actúa con la cafeína y qué tés la aportan. Por PureTea.",
    content: "<p>La L-teanina es la clave de la «energía calmada» del té. Te lo explicamos con rigor.</p>" + LONG.lTheanineFocus,
    image: "/images/blog/l-theanine.png",
    date: "2024-11-15",
    category: "Bienestar",
    relatedProducts: ["ceremonial-matcha", "focus-blend"],
  },
  {
    slug: "ceremonial-vs-culinary-matcha",
    title: "Matcha ceremonial vs culinario: diferencias y cuándo usar cada uno",
    excerpt: "Guía para elegir el grado de matcha adecuado. Por expertos PureTea.",
    content: "<p>No todo el matcha es igual. Te ayudamos a distinguir grados y a elegir bien.</p>" + LONG.ceremonialVsCulinary,
    image: "/images/blog/ceremonial-vs-culinary.png",
    date: "2024-11-10",
    category: "Matcha",
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "tea-hydration-athletes",
    title: "Té e hidratación: guía para deportistas",
    excerpt: "¿El té hidrata? Cuándo tomarlo antes y después del ejercicio. Por PureTea.",
    content: "<p>El té puede formar parte de la hidratación de quien entrena. Te damos pautas prácticas.</p>" + LONG.teaHydration,
    image: "/images/blog/tea-hydration.png",
    date: "2024-11-05",
    category: "Bienestar",
    relatedProducts: ["ceremonial-matcha", "sencha-organic"],
  },
  {
    slug: "antioxidants-in-tea-science",
    title: "Antioxidantes en el té: qué dice la ciencia",
    excerpt: "EGCG, polifenoles y beneficios del té. Guía con base científica por PureTea.",
    content: "<p>El té es una de las fuentes más ricas de antioxidantes de la dieta. Te lo explicamos con claridad.</p>" + LONG.antioxidantsScience,
    image: "/images/blog/antioxidants-tea.png",
    date: "2024-10-28",
    category: "Ciencia",
    relatedProducts: ["ceremonial-matcha", "sencha-organic"],
  },
  {
    slug: "morning-tea-ritual",
    title: "Cómo crear un ritual matutino con té",
    excerpt: "Despierta con calma y energía: guía para tu ritual de té por la mañana. Por PureTea.",
    content: "<p>Un ritual de té por la mañana puede cambiar cómo empiezas el día. Te contamos cómo montarlo.</p>" + LONG.morningRitual,
    image: "/images/blog/morning-ritual.png",
    date: "2024-10-20",
    category: "Bienestar",
    relatedProducts: ["ceremonial-matcha", "sencha-organic"],
  },
  {
    slug: "recetas-matcha-virales-2026",
    title: "Recetas de matcha virales (2026): las 3 que sí funcionan",
    excerpt:
      "Strawberry matcha, coconut matcha y protein matcha latte: versiones limpias y fáciles para casa. Tendencias reales y cómo hacerlas bien.",
    content:
      "<p>El matcha viral está en todas partes, pero la mayoría de recetas fallan por una base pobre o mala técnica. Aquí tienes las 3 que mejor convierten sabor, salud y estética.</p>" +
      LONG.matchaRecipesTrend,
    image: "/images/blog/how-to-matcha.png",
    date: "2026-04-22",
    category: "Tendencias",
    faqs: [
      {
        question: "¿Qué matcha usar para recetas virales?",
        answer: "Para beber (lattes, bebidas frías) usa matcha ceremonial o premium de Japón; el culinario suele amargar más.",
      },
      {
        question: "¿Se puede hacer matcha viral sin azúcar?",
        answer: "Sí. Usa fruta natural, leche vegetal sin azúcar y ajusta dulzor con muy poca cantidad de miel o stevia si lo necesitas.",
      },
    ],
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "tea-mocktails-sin-alcohol-tendencia",
    title: "Tea Mocktails sin alcohol: tendencia top para eventos en casa",
    excerpt:
      "Cómo preparar mocktails con té (sin alcohol) con perfil premium: combinaciones, técnica y selección de tés.",
    content:
      "<p>Si quieres una alternativa elegante al alcohol, los tea mocktails son la tendencia más fuerte de bienestar social. Aquí tienes guía práctica para montarlo en casa.</p>" +
      LONG.teaMocktailsTrend,
    image: "/images/blog/earl-grey.png",
    date: "2026-04-21",
    category: "Tendencias",
    relatedProducts: ["earl-grey-premium", "sencha-organic", "chamomile-lavender"],
  },
  {
    slug: "guia-comprar-te-online-espana",
    title: "Guía para comprar té online en España (2026)",
    excerpt:
      "Cómo elegir tienda, envíos, primer pedido y señales de calidad. Comprar té online con criterio — PureTea.",
    content:
      "<p>Si buscas <strong>comprar té online</strong> y no acabar con cajas que no vas a terminar, necesitas origen claro, buen servicio y un catálogo honesto. Esta guía resume lo que aplicamos en PureTea.</p>" +
      LONG.buyTeaOnlineGuide,
    image: "/images/blog/green-vs-coffee.png",
    date: "2026-04-01",
    category: "Comprar té",
    faqs: [
      {
        question: "¿Es seguro comprar té online?",
        answer: "Sí, si la tienda usa checkout reconocido (Shopify, etc.), muestra políticas claras y datos de contacto. Evita sitios sin HTTPS o sin información de empresa.",
      },
      {
        question: "¿Cuánto tarda el envío del té?",
        answer: "Depende del destino. En PureTea, orientativamente 3–5 días laborables en península y 5–10 en el resto de Europa; el plazo exacto se confirma en checkout.",
      },
    ],
    relatedProducts: ["ceremonial-matcha", "sencha-organic"],
  },
  {
    slug: "regalos-te-original-pareja-amigo",
    title: "Regalos de té originales: ideas que aciertan",
    excerpt: "Kits de matcha, packs verde+negro y blends para relax. Regalar té con sentido — PureTea.",
    content:
      "<p>Regalar té es regalar ritual: pausa, aroma y cuidado. Te proponemos combinaciones que funcionan en la vida real, no solo en fotos.</p>" +
      LONG.teaGiftIdeas,
    image: "/images/blog/benefits-matcha.png",
    date: "2026-03-28",
    category: "Regalos",
    relatedProducts: ["ceremonial-matcha", "relax-blend"],
  },
  {
    slug: "comprar-matcha-online-calidad",
    title: "Comprar matcha online: señales de calidad y errores típicos",
    excerpt: "Grado ceremonial, origen Japón y conservación. Guía para no fallar al comprar matcha — PureTea.",
    content:
      "<p>El matcha es el producto más copiado del mundo del té. Así evitas polvo barato disfrazado de «premium».</p>" +
      LONG.buyMatchaOnline,
    image: "/images/blog/japanese-matcha.png",
    date: "2026-03-22",
    category: "Matcha",
    faqs: [
      {
        question: "¿Qué matcha comprar si soy principiante?",
        answer: "Un matcha ceremonial de origen japonés, en cantidad pequeña para practicar. Evita bolsas grandes baratas al inicio.",
      },
    ],
    relatedProducts: ["ceremonial-matcha"],
  },
  {
    slug: "te-verde-salud-guia-completa-2026",
    title: "Té verde y salud: guía completa sin mitos",
    excerpt: "EGCG, hábitos y cuántas tazas. Perspectiva equilibrada para comprar té verde con criterio — PureTea.",
    content:
      "<p>El té verde es tendencia por motivos científicos y por marketing. Separamos ambas cosas.</p>" +
      LONG.greenTeaHealthDeep,
    image: "/images/blog/best-time-green-tea.png",
    date: "2026-03-18",
    category: "Salud",
    relatedProducts: ["sencha-organic", "ceremonial-matcha"],
  },
  {
    slug: "infusiones-relajantes-comprar-dormir",
    title: "Infusiones relajantes: qué comprar para dormir mejor",
    excerpt: "Sin cafeína, rutina nocturna y productos PureTea. Compra online con envío gratis +50€.",
    content:
      "<p>Si tu objetivo es descansar, el té con cafeína es tu rival. Aquí va la estrategia de compra.</p>" +
      LONG.herbalRelaxBuy,
    image: "/images/blog/herbal-sleep.png",
    date: "2026-03-12",
    category: "Wellness",
    relatedProducts: ["relax-blend", "chamomile-lavender"],
  },
];

export function getMockBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getMockBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
