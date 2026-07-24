// src/data/help-articles.ts
//
// Fuente de datos del Centro de Ayuda (/centro-de-ayuda), el cluster de
// contenido informativo (no comercial) de DocYa: preguntas concretas que la
// gente busca en Google antes o en vez de buscar la marca ("cuando llamar un
// medico a domicilio", "que hacer si tengo fiebre", etc.).
//
// Arquitectura hub & spoke pensada para escalar a cientos de articulos sin
// tocar codigo: /centro-de-ayuda (hub) -> /centro-de-ayuda/[categoria]
// (listado) -> /centro-de-ayuda/[categoria]/[slug] (articulo). Para sumar un
// articulo nuevo alcanza con un objeto mas en HELP_ARTICLES.
//
// Reglas para mantener, en linea con las paginas de barrio y teleconsulta:
// - Contenido propio por articulo, nunca un template con una palabra
//   cambiada: cada uno responde una intencion de busqueda especifica.
// - No prometer diagnostico ni indicar medicacion/dosis puntuales: la
//   orientacion es general, y la decision clinica (que recetar, si
//   corresponde certificado, etc.) siempre queda del lado del medico que
//   atiende la consulta real.
// - No duplicar paginas comerciales que ya existen (ej. certificado laboral
//   y escolar tienen su propia pagina en /certificado-medico-laboral y
//   /certificado-medico-escolar): la categoria "certificados" linkea a esas
//   paginas en vez de repetir el contenido en un articulo nuevo.
// - Interlinkear siempre hacia el hub, la categoria y al menos un servicio
//   comercial (/pedir, /medico-a-domicilio-caba, /teleconsulta, etc.).

export type HelpCategorySlug =
  | "medico-a-domicilio"
  | "teleconsulta"
  | "sintomas"
  | "certificados"
  | "sobre-docya";

export interface HelpCategory {
  slug: HelpCategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "medico-a-domicilio",
    name: "Médico a domicilio",
    shortName: "Médico a domicilio",
    description:
      "Cuándo pedirlo, qué puede resolver en tu casa y qué esperar de la visita de un médico matriculado.",
  },
  {
    slug: "teleconsulta",
    name: "Teleconsulta",
    shortName: "Teleconsulta",
    description:
      "Cuándo alcanza una videollamada, cómo funciona y en qué se diferencia de una visita presencial.",
  },
  {
    slug: "sintomas",
    name: "Síntomas y primeros pasos",
    shortName: "Síntomas",
    description:
      "Orientación general sobre síntomas frecuentes: qué hacer mientras decidís si necesitás un médico.",
  },
  {
    slug: "certificados",
    name: "Certificados médicos",
    shortName: "Certificados",
    description:
      "Certificado laboral, escolar y de reposo: para qué sirve cada uno y cómo se emite.",
  },
  {
    slug: "sobre-docya",
    name: "Sobre DocYa",
    shortName: "Sobre DocYa",
    description: "Cómo funciona la plataforma, más allá de un servicio puntual.",
  },
];

export function getCategoryBySlug(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((category) => category.slug === slug);
}

export interface HelpFaq {
  question: string;
  answer: string;
}

export interface HelpRelatedService {
  label: string;
  href: string;
  description?: string;
}

export interface HelpArticle {
  slug: string;
  category: HelpCategorySlug;
  /** Título de listados/tarjetas, sin el signo final de pregunta si conviene acortar */
  title: string;
  /** H1 de la página, puede ser igual a title */
  heroTitle: string;
  heroTitleHighlight?: string;
  badge: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  intro: string[];
  /** Puntos cortos, ej. señales de alarma o datos clave, se muestran como chips */
  highlightsLabel?: string;
  highlights?: string[];
  faqs: HelpFaq[];
  relatedArticles: string[];
  relatedServices: HelpRelatedService[];
  ctaHeading: string;
  ctaSubtitle: string;
  ctaLabel: string;
  ctaHref?: string;
}

const EMERGENCIA_PARRAFO =
  "Importante: DocYa no reemplaza una guardia ni una emergencia médica. Si hay signos de gravedad -dificultad para respirar, dolor de pecho, pérdida de conciencia, sangrado importante o cualquier situación que sientas que no puede esperar- comunicate con el 911 o acudí a una guardia, no pidas una consulta programada.";

export const HELP_ARTICLES: HelpArticle[] = [
  // ───────────────────────── Médico a domicilio ─────────────────────────
  {
    slug: "cuando-llamar-medico-a-domicilio",
    category: "medico-a-domicilio",
    title: "¿Cuándo llamar a un médico a domicilio?",
    heroTitle: "¿Cuándo llamar a un",
    heroTitleHighlight: "médico a domicilio?",
    badge: "Médico a domicilio",
    metaTitle: "¿Cuándo llamar a un médico a domicilio? | DocYa",
    metaDescription:
      "Casos frecuentes en los que conviene pedir un médico a domicilio en vez de ir a una guardia o esperar un turno: fiebre, dolor, chequeos y más.",
    heroDescription:
      "Guía práctica para decidir si tu situación se resuelve con una visita a domicilio, sin perder horas en una guardia ni forzar una urgencia que no es tal.",
    intro: [
      "La razón más común para pedir un médico a domicilio es un cuadro que necesita una evaluación real -fiebre que no baja, dolor persistente, un chequeo para alguien que no puede trasladarse- pero que no es una emergencia. En esos casos, ir a una guardia implica horas de espera rodeado de otros pacientes, y muchas veces el motivo de consulta se resuelve igual de bien en tu casa, con el médico examinándote con tranquilidad.",
      "También tiene sentido cuando trasladarse es en sí mismo el problema: un adulto mayor con movilidad reducida, un chico con fiebre alta al que no querés sacar de upa a las tres de la mañana, o una persona con dolor que hace que subir a un auto sea peor que quedarse. En esos casos, que el médico vaya a tu domicilio evita un traslado innecesario.",
      "Si en cambio tu consulta no requiere que el médico te revise físicamente -una duda, una renovación de receta, un seguimiento- una teleconsulta suele resolverlo más rápido. Y si hay señales de gravedad, no corresponde ni la visita a domicilio ni la teleconsulta: corresponde una guardia o el 911.",
    ],
    highlightsLabel: "Motivos frecuentes para pedir la visita",
    highlights: [
      "Fiebre persistente en adultos o niños",
      "Dolor que no cede y dificulta moverse",
      "Chequeo para adultos mayores o personas con movilidad reducida",
      "Síntomas que preferís que un médico evalúe en persona",
    ],
    faqs: [
      {
        question: "¿Puedo pedir un médico a domicilio para un niño?",
        answer:
          "Sí, es uno de los motivos de consulta más frecuentes: fiebre, malestar general o cualquier cuadro que un padre prefiera que evalúe un médico en persona antes de decidir los pasos siguientes.",
      },
      {
        question: "¿Y si no estoy seguro de si es grave?",
        answer:
          "Ante la duda, la visita a domicilio te da una evaluación clínica real para salir de esa incertidumbre. Si mientras esperás notás signos de gravedad, no esperes: llamá al 911 o acudí a una guardia.",
      },
      {
        question: "¿Sirve para adultos mayores que no pueden trasladarse?",
        answer:
          "Sí, es uno de los usos más habituales: evita el traslado de una persona con movilidad reducida y permite que el médico haga la evaluación clínica en un entorno conocido para el paciente.",
      },
      {
        question: "¿Qué pasa si mi caso en realidad necesita una teleconsulta?",
        answer:
          "Podés elegir directamente teleconsulta desde la app si tu consulta no requiere examen físico -es más rápida-, o el médico te lo puede orientar durante el pedido según lo que describas.",
      },
    ],
    relatedArticles: [
      "que-enfermedades-atiende-medico-a-domicilio",
      "cuanto-tarda-medico-a-domicilio",
      "cuando-alcanza-teleconsulta",
    ],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Pedilo ahora en tu barrio" },
      { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Atención prioritaria para cuadros agudos" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Si no necesitás examen físico" },
    ],
    ctaHeading: "¿Tu situación necesita un médico ahora?",
    ctaSubtitle: "Pedilo desde la app y un profesional matriculado te evalúa en tu casa, sin turno previo.",
    ctaLabel: "Pedir médico a domicilio",
  },
  {
    slug: "que-enfermedades-atiende-medico-a-domicilio",
    category: "medico-a-domicilio",
    title: "¿Qué enfermedades puede atender un médico a domicilio?",
    heroTitle: "¿Qué puede atender un",
    heroTitleHighlight: "médico a domicilio?",
    badge: "Médico a domicilio",
    metaTitle: "¿Qué enfermedades atiende un médico a domicilio? | DocYa",
    metaDescription:
      "Qué tipo de consultas resuelve un médico clínico a domicilio: cuadros febriles, dolores, infecciones comunes y seguimiento de tratamientos.",
    heroDescription:
      "El médico que va a tu domicilio es un clínico matriculado, pensado para el mismo tipo de consultas que resolverías en un consultorio de guardia o de cabecera.",
    intro: [
      "Un médico a domicilio es, en la práctica, un clínico general: atiende el mismo abanico de motivos de consulta que verías en un consultorio de guardia o con tu médico de cabecera, solo que se traslada a tu casa. Eso incluye cuadros febriles de origen viral o bacteriano, dolores (de garganta, de oído, abdominales, musculares), infecciones respiratorias o urinarias, alergias, cuadros gastrointestinales como vómitos o diarrea, y controles generales.",
      "Lo que el médico decide en cada caso -si alcanza con indicaciones generales, si corresponde una receta, si hace falta un estudio complementario o derivar a un especialista o a una guardia con mayor complejidad- depende de lo que encuentre en el examen físico, no de una lista cerrada de antemano. La visita a domicilio no reemplaza una guardia con capacidad de estudios de urgencia (análisis, imágenes) ni una internación: para esos casos, el mismo médico te va a orientar a trasladarte.",
    ],
    highlightsLabel: "Motivos de consulta habituales",
    highlights: [
      "Cuadros febriles",
      "Dolor de garganta, oído o abdominal",
      "Infecciones urinarias y respiratorias",
      "Vómitos, diarrea y deshidratación leve",
      "Controles y seguimiento de tratamientos",
    ],
    faqs: [
      {
        question: "¿Atiende lo mismo que un médico de guardia?",
        answer:
          "En líneas generales sí, para los motivos de consulta clínica más habituales. La diferencia es que no tiene en el momento los estudios complementarios (análisis, imágenes) que sí tiene una guardia hospitalaria.",
      },
      {
        question: "¿Puede evaluar a un bebé o un niño pequeño?",
        answer:
          "El médico a domicilio de DocYa es clínico general, orientado a evaluar el estado general del paciente. Si tu caso requiere específicamente un pediatra, te lo indica en la consulta.",
      },
      {
        question: "¿Qué pasa si necesito un estudio o una derivación?",
        answer:
          "El médico te lo indica en el momento: si tu cuadro requiere un análisis, una imagen o una atención de mayor complejidad, te orienta sobre dónde y cómo hacerlo.",
      },
      {
        question: "¿Atiende cuadros crónicos, no solo agudos?",
        answer:
          "Sí, muchas consultas son seguimientos: control de un tratamiento en curso, ajuste de medicación habitual o una duda puntual sobre una condición ya diagnosticada.",
      },
    ],
    relatedArticles: [
      "cuando-llamar-medico-a-domicilio",
      "medico-a-domicilio-receta-antibioticos",
      "medico-a-domicilio-emite-certificado",
    ],
    relatedServices: [
      { label: "Médico clínico a domicilio", href: "/medico-clinico-a-domicilio", description: "Evaluación clínica general" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Cobertura por barrio" },
    ],
    ctaHeading: "¿Necesitás que un clínico evalúe tu caso?",
    ctaSubtitle: "Pedí la visita desde la app y contanos el motivo: un médico matriculado te atiende en tu casa.",
    ctaLabel: "Pedir médico a domicilio",
  },
  {
    slug: "medico-a-domicilio-emite-certificado",
    category: "medico-a-domicilio",
    title: "¿Un médico a domicilio puede emitir un certificado médico?",
    heroTitle: "¿Puede emitir un",
    heroTitleHighlight: "certificado médico?",
    badge: "Médico a domicilio",
    metaTitle: "¿Un médico a domicilio puede dar certificado médico? | DocYa",
    metaDescription:
      "Sí: un médico a domicilio puede emitir certificado laboral, escolar o de reposo después de evaluarte. Te contamos cómo funciona y cuándo corresponde.",
    heroDescription:
      "Respuesta corta: sí, si la consulta lo justifica. Te contamos qué tipo de certificados puede emitir y qué necesitás para tenerlo el mismo día.",
    intro: [
      "Sí, un médico a domicilio puede emitir un certificado médico -laboral, escolar o de reposo- pero siempre después de haberte evaluado en la consulta. No es un trámite que se pida de forma aislada: el certificado es la consecuencia de que el médico revisó tu situación y considera que corresponde justificar una ausencia o indicar reposo.",
      "Con DocYa, si el médico determina que corresponde, el certificado queda disponible en la app con firma digital apenas termina la visita, listo para presentar en tu trabajo, en la escuela o donde lo necesites. La cantidad de días de reposo, si aplica, la define el profesional según tu cuadro en ese momento, no un valor fijo.",
    ],
    faqs: [
      {
        question: "¿El certificado a domicilio tiene la misma validez que uno de un consultorio?",
        answer:
          "Sí, lo emite un médico matriculado con firma digital y los datos habituales para justificar una ausencia laboral o escolar.",
      },
      {
        question: "¿Puedo pedir la visita solo para conseguir el certificado?",
        answer:
          "El certificado siempre es resultado de una consulta real: el médico te evalúa primero y, si tu cuadro lo justifica, lo emite. No es un documento que se entregue sin evaluación.",
      },
      {
        question: "¿Puede ser certificado laboral y escolar a la vez, por ejemplo para uno mismo y un hijo?",
        answer:
          "Cada certificado corresponde a la persona atendida en esa consulta. Si necesitás uno laboral para vos y uno escolar para tu hijo, cada uno requiere su propia evaluación médica.",
      },
      {
        question: "¿Cuánto tarda en estar disponible?",
        answer:
          "Si corresponde, el médico lo genera en la app apenas termina la consulta, así que lo tenés disponible para descargar el mismo día.",
      },
    ],
    relatedArticles: ["que-enfermedades-atiende-medico-a-domicilio", "cuando-llamar-medico-a-domicilio"],
    relatedServices: [
      { label: "Certificado médico laboral", href: "/certificado-medico-laboral", description: "Para justificar una ausencia al trabajo" },
      { label: "Certificado médico escolar", href: "/certificado-medico-escolar", description: "Para justificar la inasistencia a clase" },
      { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
    ],
    ctaHeading: "¿Necesitás un certificado médico hoy?",
    ctaSubtitle: "Pedí la consulta a domicilio o por teleconsulta y, si corresponde, el médico te lo emite al finalizar.",
    ctaLabel: "Solicitar consulta",
  },
  {
    slug: "medico-a-domicilio-receta-antibioticos",
    category: "medico-a-domicilio",
    title: "¿Puede recetar medicamentos o antibióticos?",
    heroTitle: "¿Puede recetar",
    heroTitleHighlight: "medicamentos o antibióticos?",
    badge: "Médico a domicilio y teleconsulta",
    metaTitle: "¿El médico puede recetar antibióticos a domicilio u online? | DocYa",
    metaDescription:
      "El médico puede recetar medicamentos, incluidos antibióticos, si tu cuadro lo justifica después de evaluarte. Nunca se receta sin consulta previa.",
    heroDescription:
      "El médico puede indicar la medicación que tu cuadro necesite -incluidos antibióticos si corresponde- pero siempre como resultado de haberte evaluado, nunca antes.",
    intro: [
      "Sí, tanto en una visita a domicilio como en una teleconsulta el médico puede recetar la medicación que tu cuadro requiera, incluidos antibióticos cuando hay un diagnóstico que lo justifica. Lo que no existe -ni acá ni en ningún sistema de salud serio- es la posibilidad de pedir un antibiótico puntual sin que un médico evalúe antes tu situación: es el profesional quien decide, después de la consulta, si corresponde y cuál.",
      "Esa evaluación puede ser presencial (el médico te examina en tu casa) o por videollamada, según lo que el cuadro permita: hay infecciones que se diagnostican bien por teleconsulta con una buena descripción de síntomas, y otras que requieren examen físico presencial para decidir con más certeza. En cualquier caso, si el médico indica una receta, queda disponible en la app con firma digital, válida en farmacias.",
    ],
    faqs: [
      {
        question: "¿Puedo pedir directamente un antibiótico sin consulta?",
        answer:
          "No. Siempre hace falta que un médico evalúe tu cuadro primero, ya sea a domicilio o por teleconsulta, y decida si corresponde y cuál es el adecuado para tu situación.",
      },
      {
        question: "¿Es igual de confiable recetar por teleconsulta que a domicilio?",
        answer:
          "Depende del cuadro: para muchas infecciones comunes, la descripción de síntomas por videollamada alcanza para que el médico decida. Si tu caso necesita examen físico, el mismo médico te lo va a indicar.",
      },
      {
        question: "¿La receta que me dan sirve en cualquier farmacia?",
        answer:
          "Sí, es una receta digital con firma de un médico matriculado, con los mismos datos que una receta en papel.",
      },
      {
        question: "¿Qué pasa si el médico considera que no corresponde un antibiótico?",
        answer:
          "Te lo explica en la consulta: muchos cuadros (por ejemplo, la mayoría de los resfríos) son virales y no mejoran con antibióticos, así que el médico te va a indicar el manejo adecuado para tu caso en lugar de medicarte sin necesidad.",
      },
    ],
    relatedArticles: [
      "que-enfermedades-atiende-medico-a-domicilio",
      "como-funciona-teleconsulta",
      "que-hacer-si-tengo-dolor-de-garganta",
    ],
    relatedServices: [
      { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Necesitás que un médico evalúe si hace falta medicación?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio y, si corresponde, salís con la receta digital.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "cuanto-tarda-medico-a-domicilio",
    category: "medico-a-domicilio",
    title: "¿Cuánto tarda en llegar un médico a domicilio?",
    heroTitle: "¿Cuánto tarda en llegar un",
    heroTitleHighlight: "médico a domicilio?",
    badge: "Médico a domicilio en CABA",
    metaTitle: "¿Cuánto tarda un médico a domicilio en CABA? | DocYa",
    metaDescription:
      "El tiempo promedio de llegada de un médico a domicilio en CABA con DocYa es de 30 a 60 minutos, según zona, horario y demanda.",
    heroDescription:
      "En la Ciudad de Buenos Aires, el tiempo promedio de llegada es de 30 a 60 minutos. Te contamos de qué depende y cómo hacer el seguimiento.",
    intro: [
      "En toda la Ciudad Autónoma de Buenos Aires, el tiempo promedio entre pedir el médico desde la app y que llegue a tu domicilio es de 30 a 60 minutos. Ese rango varía según tu zona, el horario (las noches y madrugadas suelen tener menos profesionales activos) y la demanda del momento: si hay muchos pedidos simultáneos en tu área, puede tardar un poco más.",
      "Apenas pedís la consulta, el sistema la asigna al médico matriculado disponible más cercano a tu domicilio, y podés seguir el estado del pedido en tiempo real desde la app: cuándo un profesional lo acepta, cuándo está en camino y una estimación de llegada. Si tu situación es tal que cualquier minuto de espera es un problema, esa no es una consulta programada: corresponde una guardia o el 911.",
    ],
    faqs: [
      {
        question: "¿El tiempo de espera es el mismo en toda CABA?",
        answer:
          "Es un promedio general de 30 a 60 minutos; puede variar un poco según el barrio y la disponibilidad de médicos activos en esa zona en ese momento.",
      },
      {
        question: "¿Tarda más de noche o los fines de semana?",
        answer:
          "Puede tardar algo más, ya que hay menos profesionales activos en esos horarios, aunque hay disponibilidad todos los días de la semana, incluidas noches y feriados, sujeta a la demanda del momento.",
      },
      {
        question: "¿Puedo ver en tiempo real cuánto falta?",
        answer:
          "Sí, la app muestra el estado del pedido: cuándo un médico lo acepta y cuándo está en camino a tu domicilio.",
      },
      {
        question: "¿Qué hago si mi situación no puede esperar ni 30 minutos?",
        answer:
          "Si hay signos de gravedad, no pidas la consulta a domicilio: comunicate con el 911 o andá directamente a una guardia.",
      },
    ],
    relatedArticles: ["cuando-llamar-medico-a-domicilio", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Pedilo ahora en tu barrio" },
      { label: "Médico a domicilio urgente", href: "/medico-a-domicilio-urgente", description: "Atención prioritaria" },
      { label: "Médico a domicilio las 24 horas", href: "/medico-a-domicilio-24-horas", description: "Noche, madrugada y feriados" },
    ],
    ctaHeading: "¿Pedimos el médico a tu domicilio?",
    ctaSubtitle: "Indicá tu dirección y el motivo de consulta: te asignamos al profesional disponible más cercano.",
    ctaLabel: "Pedir médico a domicilio",
  },

  // ───────────────────────── Teleconsulta ─────────────────────────
  {
    slug: "cuando-alcanza-teleconsulta",
    category: "teleconsulta",
    title: "¿Cuándo alcanza una teleconsulta y cuándo conviene una visita presencial?",
    heroTitle: "¿Teleconsulta o",
    heroTitleHighlight: "visita presencial?",
    badge: "Teleconsulta",
    metaTitle: "¿Cuándo alcanza una teleconsulta y cuándo no? | DocYa",
    metaDescription:
      "Cómo decidir entre teleconsulta y médico a domicilio: qué casos se resuelven bien por videollamada y cuándo conviene un examen físico presencial.",
    heroDescription:
      "La diferencia clave es si tu cuadro necesita examen físico. Te ayudamos a decidir antes de pedir la consulta.",
    intro: [
      "Una teleconsulta alcanza cuando el médico puede evaluar tu situación con lo que le contás y lo que ve por cámara: dudas puntuales, seguimiento de un tratamiento, renovación de medicación habitual, síntomas leves de un cuadro que ya conocés, o una primera orientación para decidir los pasos siguientes. En estos casos suele ser la opción más rápida, porque no dependés de que un médico se traslade.",
      "Conviene una visita presencial cuando el diagnóstico depende de algo que solo se detecta tocando o auscultando al paciente -palpar el abdomen, revisar un oído, escuchar los pulmones con estetoscopio, evaluar una herida o una lesión de cerca- o cuando se trata de alguien que no puede describir bien sus síntomas (un bebé, una persona con confusión). Si tenés dudas, el médico que te atiende por teleconsulta también te puede indicar, durante la misma consulta, que conviene una evaluación presencial.",
    ],
    highlightsLabel: "Cuándo elegir teleconsulta",
    highlights: [
      "Dudas y orientación general",
      "Seguimiento de un tratamiento en curso",
      "Renovación de medicación habitual",
      "Síntomas leves de un cuadro conocido",
    ],
    faqs: [
      {
        question: "¿El médico puede decirme en la teleconsulta que necesito una visita presencial?",
        answer:
          "Sí, si durante la videollamada considera que tu caso necesita examen físico, te lo indica en el momento para que pidas la visita a domicilio.",
      },
      {
        question: "¿La teleconsulta sirve para una primera consulta o solo para seguimiento?",
        answer:
          "Sirve para ambas, siempre que el cuadro no requiera examen físico para decidir. Muchas primeras consultas de síntomas leves se resuelven bien por videollamada.",
      },
      {
        question: "¿Qué pasa si no estoy seguro de cuál elegir?",
        answer:
          "Podés empezar por teleconsulta: si el médico determina que hace falta una evaluación presencial, te lo indica ahí mismo, sin que hayas perdido tiempo.",
      },
      {
        question: "¿Alguna vez conviene ir directo a una guardia en lugar de elegir cualquiera de las dos?",
        answer:
          "Sí, si hay signos de gravedad. Ni la teleconsulta ni la visita a domicilio reemplazan una guardia con estudios de urgencia ante una emergencia real.",
      },
    ],
    relatedArticles: ["como-funciona-teleconsulta", "cuando-llamar-medico-a-domicilio", "cuanto-tarda-medico-a-domicilio"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Pedila desde cualquier provincia" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Si preferís examen presencial" },
    ],
    ctaHeading: "¿Todavía no sabés cuál elegir?",
    ctaSubtitle: "Empezá por teleconsulta: si tu caso necesita examen presencial, el médico te lo indica en la misma consulta.",
    ctaLabel: "Pedir teleconsulta",
  },
  {
    slug: "como-funciona-teleconsulta",
    category: "teleconsulta",
    title: "¿Cómo funciona una teleconsulta?",
    heroTitle: "¿Cómo funciona una",
    heroTitleHighlight: "teleconsulta?",
    badge: "Teleconsulta paso a paso",
    metaTitle: "¿Cómo funciona una teleconsulta médica? Paso a paso | DocYa",
    metaDescription:
      "Los pasos concretos de una teleconsulta con DocYa: pedido desde la app, videollamada con un médico matriculado y receta o certificado si corresponde.",
    heroDescription:
      "De principio a fin: así es el recorrido de una teleconsulta, desde que la pedís hasta que termina la videollamada.",
    intro: [
      "El primer paso es pedir la teleconsulta desde la app, indicando el motivo de consulta. El sistema busca un médico matriculado disponible y, apenas lo asigna, te contacta por videollamada; no hace falta turno previo ni estar en una ciudad en particular, funciona igual en cualquier provincia de Argentina.",
      "Durante la videollamada, el médico te hace las mismas preguntas que haría en un consultorio: motivo de consulta, síntomas, antecedentes relevantes, y observa lo que la cámara permite ver. Con esa información evalúa tu situación y te indica los pasos siguientes: puede ser una orientación general, una receta si corresponde, un certificado si el cuadro lo justifica, o la recomendación de una visita presencial si tu caso necesita examen físico. Todo eso queda disponible en la app apenas termina la consulta.",
    ],
    faqs: [
      {
        question: "¿Qué necesito para hacer la teleconsulta?",
        answer:
          "Un celular o computadora con cámara y conexión a internet. No hace falta instalar nada más que la app de DocYa.",
      },
      {
        question: "¿Cuánto dura la videollamada?",
        answer:
          "Depende del motivo de consulta, pero el médico se toma el tiempo necesario para evaluar tu situación como lo haría en un consultorio presencial.",
      },
      {
        question: "¿Puedo elegir el horario?",
        answer:
          "La teleconsulta se pide en el momento: un médico disponible te contacta poco después de confirmar el pedido, sin necesidad de reservar un turno con anticipación.",
      },
      {
        question: "¿Qué pasa si se corta la videollamada?",
        answer:
          "Podés volver a conectarte desde la app para retomar la consulta con el mismo médico.",
      },
      {
        question: "¿El precio se sabe antes de empezar?",
        answer:
          "Sí, la app te muestra el costo de la teleconsulta antes de confirmar el pedido, así sabés exactamente cuánto vas a pagar.",
      },
    ],
    relatedArticles: ["cuando-alcanza-teleconsulta", "medico-a-domicilio-receta-antibioticos", "como-funciona-docya"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Ver el servicio completo" },
      { label: "Receta médica online", href: "/receta-medica-online", description: "Recetas digitales válidas" },
      { label: "Certificado médico online", href: "/certificado-medico-online", description: "Laboral, escolar o de reposo" },
    ],
    ctaHeading: "¿Hablamos con un médico ahora?",
    ctaSubtitle: "Pedí tu teleconsulta desde la app y un médico matriculado te contacta por videollamada en minutos.",
    ctaLabel: "Pedir teleconsulta",
  },

  // ───────────────────────── Síntomas ─────────────────────────
  {
    slug: "que-hacer-si-tengo-fiebre",
    category: "sintomas",
    title: "Tengo fiebre: qué hacer y cuándo preocuparse",
    heroTitle: "Tengo fiebre,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: fiebre",
    metaTitle: "Tengo fiebre, ¿qué hago? Cuándo consultar a un médico | DocYa",
    metaDescription:
      "Orientación general sobre qué hacer si tenés fiebre, señales de alarma que ameritan consulta urgente y cuándo pedir un médico a domicilio o teleconsulta.",
    heroDescription:
      "La fiebre es un síntoma, no una enfermedad en sí misma: acá te contamos cómo manejarla mientras decidís si necesitás que te vea un médico.",
    intro: [
      "La fiebre es la forma en que el cuerpo reacciona frente a una infección u otro proceso, y en la mayoría de los casos en adultos no es peligrosa por sí sola: lo relevante es cómo te sentís en general y si hay otros síntomas acompañantes. Mientras decidís los pasos siguientes, lo habitual es mantenerte hidratado, descansar y usar ropa liviana; evitá abrigarte de más pensando que 'hay que sudarla'.",
      "Un médico tiene que evaluarte para determinar la causa y si corresponde algún tratamiento puntual -eso no se decide sin una consulta real-. Si la fiebre se sostiene más de dos o tres días, es muy alta, o viene acompañada de otros síntomas que te preocupan, pedí una consulta: por teleconsulta si te sentís en condiciones de esperar y describir bien lo que sentís, o a domicilio si preferís que te revisen en persona.",
    ],
    highlightsLabel: "Consultá de inmediato (guardia o 911) si aparece",
    highlights: [
      "Fiebre muy alta que no cede",
      "Dificultad para respirar",
      "Confusión, somnolencia excesiva o rigidez de cuello",
      "Fiebre en bebés menores de 3 meses",
    ],
    faqs: [
      {
        question: "¿Cuándo la fiebre amerita una consulta y no solo esperar?",
        answer:
          "Cuando se sostiene varios días, es muy alta, reaparece después de haber bajado, o se acompaña de otros síntomas (dolor intenso, dificultad para respirar, erupciones). Un médico tiene que evaluar la causa.",
      },
      {
        question: "¿Sirve una teleconsulta para un cuadro febril?",
        answer:
          "Sí, muchas veces alcanza con describir bien los síntomas por videollamada. Si el médico considera que hace falta examinarte en persona, te lo indica en la misma consulta.",
      },
      {
        question: "¿Es mejor pedir un médico a domicilio si es un niño con fiebre?",
        answer:
          "Es una decisión válida si preferís que lo evalúen en persona; también podés empezar por teleconsulta y el médico te orienta según lo que describas.",
      },
      {
        question: "¿Puedo pedir directamente una receta para bajar la fiebre sin consulta?",
        answer:
          "No, cualquier indicación de medicación requiere que un médico evalúe antes tu situación, ya sea por teleconsulta o a domicilio.",
      },
    ],
    relatedArticles: [
      "gripe",
      "sintomas-de-covid",
      "que-hacer-si-tengo-dolor-de-garganta",
    ],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
    ],
    ctaHeading: "¿Querés que un médico evalúe tu cuadro febril?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio y recibí orientación de un médico matriculado.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-dolor-de-garganta",
    category: "sintomas",
    title: "Dolor de garganta: qué hacer y cuándo consultar a un médico",
    heroTitle: "Dolor de garganta,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: dolor de garganta",
    metaTitle: "Dolor de garganta: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Qué hacer si tenés dolor de garganta, señales que ameritan consulta médica y cuándo conviene teleconsulta o médico a domicilio.",
    heroDescription:
      "La mayoría de los dolores de garganta son virales y mejoran solos, pero hay señales que sí ameritan que te vea un médico.",
    intro: [
      "El dolor de garganta suele deberse a una infección viral -parte de un resfrío común- y en esos casos mejora en pocos días con medidas generales: buena hidratación, líquidos tibios y descanso. No toda irritación de garganta necesita antibiótico; de hecho, la mayoría no lo necesita, y esa es justamente una decisión que tiene que tomar un médico después de examinarte, no algo para autoindicarse.",
      "Conviene una consulta cuando el dolor es muy intenso, te cuesta tragar líquidos, aparece fiebre alta sostenida, notás placas o pus visible, o el cuadro no mejora pasados varios días. El médico puede evaluarlo por teleconsulta en la mayoría de los casos, y si considera que hace falta revisarte la garganta de cerca o tomar una muestra, te lo indica en la consulta.",
    ],
    highlightsLabel: "Cuándo consultar",
    highlights: [
      "Dolor muy intenso o dificultad para tragar",
      "Fiebre alta sostenida",
      "Placas o pus visibles",
      "No mejora después de varios días",
    ],
    faqs: [
      {
        question: "¿Todo dolor de garganta necesita antibiótico?",
        answer:
          "No, la mayoría son virales y no lo necesitan. Es el médico quien, después de evaluarte, determina si tu caso es de origen bacteriano y si corresponde un antibiótico.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "En la mayoría de los casos sí, describiendo bien los síntomas. Si el médico necesita revisarte la garganta de cerca, te va a indicar una visita presencial.",
      },
      {
        question: "¿Qué hago mientras tanto para aliviarlo?",
        answer:
          "Medidas generales como hidratarte bien y descansar suelen ayudar; para cualquier indicación puntual de medicación, consultá con un médico primero.",
      },
      {
        question: "¿Cuándo es urgente y no puede esperar una consulta programada?",
        answer:
          "Si tenés dificultad real para respirar o tragar tu propia saliva, no esperes: es una situación para guardia o 911, no para teleconsulta ni visita a domicilio.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-fiebre", "medico-a-domicilio-receta-antibioticos", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Seguís con dolor de garganta?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para que evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-vomitos-y-diarrea",
    category: "sintomas",
    title: "Vómitos y diarrea: qué hacer y cuándo pedir un médico",
    heroTitle: "Vómitos y diarrea,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: vómitos y diarrea",
    metaTitle: "Vómitos y diarrea: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Qué hacer ante un cuadro de vómitos y diarrea, riesgo de deshidratación y cuándo conviene pedir un médico a domicilio o teleconsulta.",
    heroDescription:
      "El mayor riesgo de estos cuadros es la deshidratación. Te contamos cómo cuidarte mientras decidís si necesitás consulta médica.",
    intro: [
      "Los cuadros de vómitos y diarrea suelen deberse a una gastroenteritis viral o a algo que comiste, y en general mejoran en uno o dos días. Mientras tanto, lo más importante es reponer líquidos de a poco y con frecuencia -aunque cueste, es preferible tomar sorbos seguidos que cantidades grandes de una vez- y evitar comidas pesadas hasta que el cuadro ceda.",
      "El punto de atención real es la deshidratación, sobre todo en niños pequeños y adultos mayores: si notás boca muy seca, orina escasa u oscura, mareos al pararte, o el cuadro se sostiene más de dos días sin mejorar, conviene una consulta médica. Un médico puede evaluarte por teleconsulta en la mayoría de los casos, y si el cuadro es más severo o afecta a un paciente de riesgo, te va a orientar hacia una visita presencial o una guardia.",
    ],
    highlightsLabel: "Consultá si aparece",
    highlights: [
      "Signos de deshidratación (boca seca, poca orina, mareos)",
      "Sangre en el vómito o la materia fecal",
      "Fiebre alta acompañando el cuadro",
      "Más de dos días sin mejorar",
    ],
    faqs: [
      {
        question: "¿Qué puedo tomar para reponer líquidos?",
        answer:
          "Agua y líquidos en sorbos frecuentes suelen ser un buen primer paso; para indicaciones más específicas según tu caso, consultá con un médico.",
      },
      {
        question: "¿Es peligroso en niños pequeños?",
        answer:
          "El riesgo de deshidratación es mayor en niños pequeños, así que si el cuadro se sostiene o ves signos de deshidratación, conviene una consulta médica sin demorar.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "En muchos casos sí. El médico evalúa tu situación por videollamada y, si considera que necesitás una evaluación presencial o hidratación asistida, te lo indica en la consulta.",
      },
      {
        question: "¿Cuándo es una urgencia?",
        answer:
          "Si hay signos claros de deshidratación severa, sangre visible, o el paciente es un bebé, un adulto mayor o alguien con una condición de base, no esperes: acudí a una guardia.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-fiebre", "que-hacer-si-tengo-infeccion-urinaria", "cuando-llamar-medico-a-domicilio"],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
    ],
    ctaHeading: "¿El cuadro no mejora?",
    ctaSubtitle: "Pedí una consulta y un médico evalúa si necesitás algo más que hidratación y reposo.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-infeccion-urinaria",
    category: "sintomas",
    title: "Síntomas de infección urinaria: qué hacer",
    heroTitle: "Síntomas de infección urinaria,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: infección urinaria",
    metaTitle: "Síntomas de infección urinaria: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Ardor al orinar, ganas frecuentes o dolor bajo abdomen: qué hacer ante posibles síntomas de infección urinaria y cuándo consultar a un médico.",
    heroDescription:
      "Ardor al orinar, ganas frecuentes o dolor bajo el abdomen son motivo de consulta habitual. Te contamos cómo proceder.",
    intro: [
      "Ardor o dolor al orinar, necesidad de ir al baño con mucha frecuencia, orina turbia o con olor fuerte, y dolor o pesadez en la parte baja del abdomen son los síntomas más habituales de una infección urinaria. Es uno de los motivos de consulta más frecuentes, tanto a domicilio como por teleconsulta, y en general el médico puede orientar el diagnóstico con la descripción de síntomas, aunque en algunos casos puede pedir un análisis de orina para confirmarlo.",
      "El tratamiento -si corresponde antibiótico y cuál- lo define el médico después de evaluarte, nunca antes. Mientras conseguís la consulta, mantenerte bien hidratado suele ayudar a sentirte mejor, pero no reemplaza la necesidad de que un profesional confirme el diagnóstico y determine el tratamiento adecuado.",
    ],
    highlightsLabel: "Consultá pronto si notás",
    highlights: [
      "Ardor o dolor al orinar",
      "Ganas frecuentes de orinar",
      "Dolor en la parte baja del abdomen",
      "Fiebre o dolor lumbar (puede indicar que la infección subió a los riñones)",
    ],
    faqs: [
      {
        question: "¿Puedo resolver una infección urinaria por teleconsulta?",
        answer:
          "En muchos casos sí, si la descripción de síntomas es clara. El médico decide si alcanza con eso o si conviene un análisis de orina antes de indicar tratamiento.",
      },
      {
        question: "¿Es lo mismo en hombres que en mujeres?",
        answer:
          "Los síntomas pueden ser similares, pero el médico evalúa cada caso en particular; en hombres, una infección urinaria a veces amerita una evaluación más detallada.",
      },
      {
        question: "¿Cuándo es urgente?",
        answer:
          "Si aparece fiebre alta, dolor lumbar intenso o mucho malestar general, podría indicar que la infección afectó los riñones: en ese caso no esperes, buscá atención médica sin demorar.",
      },
      {
        question: "¿Puedo pedir antibiótico directamente si ya tuve infecciones urinarias antes?",
        answer:
          "No, cada episodio requiere que un médico lo evalúe: aunque hayas tenido cuadros similares, el tratamiento se indica después de la consulta, no antes.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-fiebre", "medico-a-domicilio-receta-antibioticos", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Tenés síntomas de infección urinaria?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para confirmar el diagnóstico y el tratamiento.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-tos-persistente",
    category: "sintomas",
    title: "Tos persistente: cuándo consultar a un médico",
    heroTitle: "Tos persistente,",
    heroTitleHighlight: "¿cuándo consultar?",
    badge: "Síntomas: tos persistente",
    metaTitle: "Tos persistente: cuándo consultar a un médico | DocYa",
    metaDescription:
      "Qué hacer si tenés tos que no cede, señales de alarma y cuándo pedir una teleconsulta o un médico a domicilio para evaluarla.",
    heroDescription:
      "Una tos que se extiende más de lo esperado o cambia de característica merece que un médico la evalúe.",
    intro: [
      "La tos es un mecanismo de defensa del cuerpo y, cuando acompaña a un resfrío común, suele ceder en una o dos semanas. Se vuelve motivo de consulta cuando se prolonga más de ese tiempo, cambia de característica (por ejemplo, empieza seca y pasa a tener flema, o al revés), interrumpe el sueño de forma constante, o se acompaña de otros síntomas como fiebre, falta de aire o dolor de pecho.",
      "El médico puede evaluar buena parte de estos cuadros por teleconsulta, escuchando tu descripción y, si hace falta, pidiéndote que describas el sonido o la frecuencia de la tos. Si considera que necesita auscultarte los pulmones con estetoscopio para descartar algo más específico, te va a indicar una visita presencial.",
    ],
    highlightsLabel: "Consultá si la tos viene con",
    highlights: [
      "Falta de aire o dificultad para respirar",
      "Dolor de pecho",
      "Flema con sangre",
      "Más de dos semanas sin mejorar",
    ],
    faqs: [
      {
        question: "¿Cuánto tiene que durar la tos para preocuparme?",
        answer:
          "Como referencia general, una tos que se extiende más de dos semanas o que cambia de característica amerita que un médico la evalúe.",
      },
      {
        question: "¿Sirve una teleconsulta para evaluar la tos?",
        answer:
          "Sí, en muchos casos el médico puede orientar el diagnóstico con tu descripción. Si necesita auscultarte, te va a indicar una visita presencial.",
      },
      {
        question: "¿La tos con flema siempre necesita antibiótico?",
        answer:
          "No necesariamente; muchas causas de tos con flema son virales. Es el médico quien, tras evaluarte, decide si corresponde algún tratamiento puntual.",
      },
      {
        question: "¿Cuándo es una urgencia?",
        answer:
          "Si aparece dificultad real para respirar o dolor de pecho intenso, no esperes una consulta programada: se trata de una situación para guardia o 911.",
      },
    ],
    relatedArticles: ["gripe", "sintomas-de-covid", "que-hacer-si-tengo-fiebre"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿La tos no cede?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio para que un médico evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-dolor-de-oido",
    category: "sintomas",
    title: "Dolor de oído: qué hacer y cuándo consultar a un médico",
    heroTitle: "Dolor de oído,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: dolor de oído",
    metaTitle: "Dolor de oído: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Qué hacer si tenés dolor de oído, causas más frecuentes y cuándo conviene que lo evalúe un médico a domicilio o por teleconsulta.",
    heroDescription:
      "El dolor de oído es un motivo de consulta muy frecuente, sobre todo en niños. Te contamos qué hacer y cuándo conviene una evaluación.",
    intro: [
      "El dolor de oído suele deberse a una infección (otitis), a un tapón de cerumen o a la congestión de un resfrío que afecta la trompa que conecta el oído con la garganta -algo habitual también después de volar en avión-. Mientras conseguís la consulta, evitá introducir objetos (hisopos, algodón) en el oído y no uses gotas óticas sin que un médico las indique, porque algunas están contraindicadas si hay perforación del tímpano.",
      "Es un motivo de consulta muy frecuente en niños pequeños, que muchas veces no pueden explicar bien qué les duele y solo se muestran irritables o se tocan la oreja. El médico puede orientar el diagnóstico por teleconsulta según la descripción de síntomas, aunque si necesita mirar el oído con otoscopio para confirmar una otitis, te va a indicar una visita presencial.",
    ],
    highlightsLabel: "Consultá si aparece",
    highlights: [
      "Fiebre junto con el dolor",
      "Secreción o sangrado del oído",
      "Dolor muy intenso o que empeora de noche",
      "Pérdida de audición repentina",
    ],
    faqs: [
      {
        question: "¿Toda otitis necesita antibiótico?",
        answer:
          "No siempre; muchas mejoran solas en unos días. Es el médico quien, tras evaluarte, decide si corresponde un antibiótico según el tipo de otitis.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "En muchos casos el médico puede orientar el diagnóstico con tu descripción. Si necesita revisar el oído con otoscopio, te va a indicar una visita presencial.",
      },
      {
        question: "¿Es distinto en niños pequeños?",
        answer:
          "Es uno de los motivos de consulta más frecuentes en la infancia. Si tu hijo se toca la oreja, está irritable y tiene fiebre, conviene que un médico lo evalúe.",
      },
      {
        question: "¿Puedo ponerle gotas para el oído por mi cuenta?",
        answer:
          "No es recomendable sin indicación médica: algunas gotas están contraindicadas si hay perforación del tímpano, algo que solo se confirma con un examen.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-fiebre", "que-hacer-si-tengo-tos-persistente", "cuando-llamar-medico-a-domicilio"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Seguís con dolor de oído?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para que evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-dolor-abdominal",
    category: "sintomas",
    title: "Dolor abdominal: qué hacer y cuándo consultar a un médico",
    heroTitle: "Dolor abdominal,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: dolor abdominal",
    metaTitle: "Dolor abdominal: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Causas frecuentes de dolor abdominal, señales de alarma que ameritan guardia y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "El dolor abdominal tiene causas muy variadas, desde algo digestivo leve hasta cuadros que necesitan atención urgente.",
    intro: [
      "El dolor abdominal es uno de los motivos de consulta más frecuentes y sus causas van desde algo tan simple como una indigestión o gases hasta cuadros que requieren atención más urgente. Mientras evaluás qué hacer, evitá comidas pesadas o irritantes y prestá atención a dónde se localiza el dolor, si es fijo o viene en cólicos, y si se acompaña de otros síntomas.",
      "El médico puede orientar el diagnóstico por teleconsulta en muchos casos, pero un dolor abdominal que se localiza en un punto fijo, que empeora progresivamente, o que se acompaña de fiebre o vómitos persistentes, suele requerir examen físico -palpar el abdomen es una parte clave del diagnóstico- y a veces un estudio complementario.",
    ],
    highlightsLabel: "Consultá de inmediato (guardia o 911) si aparece",
    highlights: [
      "Dolor muy intenso y localizado, sobre todo del lado derecho abajo",
      "Abdomen rígido o muy sensible al tacto",
      "Vómitos con sangre o de aspecto oscuro",
      "Fiebre alta junto con el dolor",
    ],
    faqs: [
      {
        question: "¿Cuándo un dolor abdominal amerita ir a una guardia y no esperar una consulta programada?",
        answer:
          "Cuando es muy intenso, está localizado en un punto fijo (en particular del lado derecho abajo), o se acompaña de fiebre, vómitos persistentes o rigidez del abdomen. Esas señales requieren evaluación urgente.",
      },
      {
        question: "¿Puedo resolver un dolor abdominal leve por teleconsulta?",
        answer:
          "Sí, si es leve y sin señales de alarma, el médico puede orientarte por videollamada. Si considera que necesita palparte el abdomen, te va a indicar una visita presencial o una guardia según la urgencia.",
      },
      {
        question: "¿Es distinto si estoy embarazada?",
        answer:
          "El dolor abdominal en el embarazo siempre amerita una evaluación médica sin demorar, ya que las causas posibles y la urgencia con la que hay que actuar pueden ser distintas.",
      },
      {
        question: "¿Qué puedo hacer mientras consigo la consulta?",
        answer:
          "Evitar comidas pesadas y prestar atención a cómo evoluciona el dolor. Si empeora o aparece alguna señal de alarma, no esperes: buscá atención médica de inmediato.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-vomitos-y-diarrea", "que-hacer-si-tengo-fiebre", "cuando-llamar-medico-a-domicilio"],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
    ],
    ctaHeading: "¿Tenés dolor abdominal?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para que evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "presion-alta",
    category: "sintomas",
    title: "Presión alta: qué hacer y cuándo consultar a un médico",
    heroTitle: "Presión alta,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: presión alta",
    metaTitle: "Presión alta: qué hacer y cuándo consultar a un médico | DocYa",
    metaDescription:
      "Qué hacer si te da la presión alta, cuándo es una emergencia hipertensiva y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "La presión alta muchas veces no da síntomas claros. Te contamos cuándo un valor elevado amerita consulta y cuándo es una emergencia.",
    intro: [
      "La hipertensión arterial suele no dar síntomas evidentes, por eso muchas veces se detecta en un control de rutina o al medirla por otro motivo. Como referencia general, se suele considerar elevada una presión de 140/90 mmHg o más, aunque el diagnóstico de hipertensión y su tratamiento los define un médico con varias mediciones, no un valor aislado. Si te diste una medición alta y te sentís bien, lo razonable es descansar unos minutos y volver a medir.",
      "Es distinto cuando una presión muy elevada se acompaña de síntomas como dolor de cabeza intenso, dolor de pecho, falta de aire, alteraciones en la visión o confusión: eso puede indicar una emergencia hipertensiva y requiere atención inmediata, no una consulta programada. Si ya tenés diagnóstico de hipertensión y tomás medicación, una teleconsulta puede servir para ajustar el tratamiento junto con tu médico.",
    ],
    highlightsLabel: "Es una emergencia (guardia o 911) si la presión alta viene con",
    highlights: [
      "Dolor de cabeza muy intenso y repentino",
      "Dolor de pecho o falta de aire",
      "Alteraciones en la visión",
      "Confusión o dificultad para hablar",
    ],
    faqs: [
      {
        question: "¿Qué valor de presión se considera alto?",
        answer:
          "Como referencia general se suele hablar de 140/90 mmHg o más, pero el diagnóstico de hipertensión lo confirma un médico con varias mediciones en distintos momentos, no un solo valor.",
      },
      {
        question: "¿Qué hago si me mido la presión alta pero me siento bien?",
        answer:
          "Descansá unos minutos y volvé a medir. Si se mantiene elevada de forma repetida, conviene una consulta médica para evaluar tu situación, aunque no sea una urgencia.",
      },
      {
        question: "¿Cuándo es una emergencia?",
        answer:
          "Cuando una presión muy alta se acompaña de dolor de cabeza intenso, dolor de pecho, falta de aire, alteraciones visuales o confusión. Ahí corresponde atención inmediata, no una consulta programada.",
      },
      {
        question: "¿Puedo ajustar mi medicación para la presión por teleconsulta?",
        answer:
          "Sí, si ya tenés diagnóstico de hipertensión, una teleconsulta puede servir para revisar cómo estás respondiendo al tratamiento junto con un médico.",
      },
    ],
    relatedArticles: ["presion-baja", "que-hacer-si-tengo-dolor-de-pecho", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Necesitás que un médico evalúe tu presión?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio para revisar tu situación.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "presion-baja",
    category: "sintomas",
    title: "Presión baja: qué hacer y cuándo consultar a un médico",
    heroTitle: "Presión baja,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: presión baja",
    metaTitle: "Presión baja: qué hacer y cuándo consultar a un médico | DocYa",
    metaDescription:
      "Qué hacer si tenés presión baja o mareos al pararte, señales de alarma y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "Mareos, visión nublada o debilidad al levantarte pueden ser presión baja. Te contamos qué hacer y cuándo consultar.",
    intro: [
      "La presión baja (hipotensión) suele manifestarse con mareos, visión nublada o debilidad, sobre todo al pararte rápido después de estar sentado o acostado. Puede deberse a deshidratación, a estar mucho tiempo de pie, a algunas medicaciones o simplemente a la constitución de cada persona. Si te pasa, sentate o acostate, levantá las piernas y tomá líquido de a poco; levantate despacio la próxima vez.",
      "Conviene una consulta médica si los episodios son frecuentes, si llegás a desmayarte, o si la hipotensión aparece junto con otros síntomas como dolor de pecho, palpitaciones o falta de aire. El médico puede orientar buena parte de estos casos por teleconsulta, y si considera necesario revisarte o pedir un estudio, te lo va a indicar.",
    ],
    highlightsLabel: "Consultá si aparece",
    highlights: [
      "Desmayo o pérdida de conciencia",
      "Episodios frecuentes de mareo al pararte",
      "Palpitaciones o dolor de pecho junto con el mareo",
      "Falta de aire",
    ],
    faqs: [
      {
        question: "¿Qué hago en el momento si me mareo por presión baja?",
        answer:
          "Sentate o acostate, levantá las piernas si podés y tomá líquido de a poco. Levantarte despacio después de estar sentado o acostado ayuda a evitar el mareo.",
      },
      {
        question: "¿Cuándo la presión baja amerita una consulta?",
        answer:
          "Si los episodios son frecuentes, si llegaste a desmayarte, o si se acompañan de palpitaciones, dolor de pecho o falta de aire, conviene que un médico evalúe tu situación.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "En muchos casos sí, describiendo bien los episodios. Si el médico considera que necesita examinarte o pedir un estudio, te lo va a indicar en la consulta.",
      },
      {
        question: "¿Es peligrosa la presión baja?",
        answer:
          "En general es menos riesgosa que la presión alta, salvo que provoque desmayos o se combine con otros síntomas. Ante esas señales, no esperes para consultar.",
      },
    ],
    relatedArticles: ["presion-alta", "que-hacer-si-tengo-vomitos-y-diarrea", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Los mareos no mejoran?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio para que un médico evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-una-reaccion-alergica",
    category: "sintomas",
    title: "Reacción alérgica: qué hacer y cuándo es una emergencia",
    heroTitle: "Reacción alérgica,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: reacción alérgica",
    metaTitle: "Reacción alérgica: qué hacer y cuándo es una emergencia | DocYa",
    metaDescription:
      "Cómo distinguir una reacción alérgica leve de una emergencia (anafilaxia), y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "La mayoría de las reacciones alérgicas son leves, pero algunas son una emergencia real. Te ayudamos a distinguirlas.",
    intro: [
      "Una reacción alérgica leve -a un alimento, una picadura, una planta, un producto de contacto- suele mostrarse como picazón, ronchas o enrojecimiento localizado, y en general mejora con el tiempo o con la indicación de un médico. Si ya sabés que sos alérgico a algo puntual y la reacción es la de siempre y localizada, una teleconsulta puede alcanzar para que el médico te oriente.",
      "Es completamente distinto cuando la reacción es generalizada o compromete la respiración: eso se llama anafilaxia, es una emergencia real y puede evolucionar en minutos. Si tenés dudas sobre qué tan grave es tu reacción, priorizá la seguridad: ante cualquier signo de los que mencionamos abajo, no esperes una consulta programada.",
    ],
    highlightsLabel: "Es una emergencia (911) si aparece",
    highlights: [
      "Dificultad para respirar o tragar",
      "Hinchazón de labios, lengua o garganta",
      "Mareos intensos o pérdida de conciencia",
      "Erupción que se extiende rápido por todo el cuerpo",
    ],
    faqs: [
      {
        question: "¿Toda reacción alérgica es una emergencia?",
        answer:
          "No, la mayoría son leves y localizadas. La emergencia (anafilaxia) es cuando compromete la respiración, provoca hinchazón en cara o garganta, o baja mucho la presión.",
      },
      {
        question: "¿Puedo consultar por teleconsulta si tengo una reacción alérgica leve?",
        answer:
          "Sí, si es leve y localizada -por ejemplo, la reacción habitual a algo que ya sabés que te genera alergia-, el médico puede orientarte por videollamada.",
      },
      {
        question: "¿Qué hago si no sé si mi reacción es grave?",
        answer:
          "Ante la duda, priorizá la seguridad: si notás cualquier señal de las mencionadas arriba, no esperes una consulta programada, buscá atención de emergencia de inmediato.",
      },
      {
        question: "¿Puede un médico a domicilio o de teleconsulta recetarme algo para la alergia?",
        answer:
          "Sí, si tras evaluar tu caso corresponde una medicación, el médico te la puede indicar. Eso no aplica si hay signos de anafilaxia, que requiere atención de emergencia inmediata.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-conjuntivitis", "que-hacer-si-tengo-dolor-de-pecho", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Tenés una reacción alérgica leve?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para que evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-conjuntivitis",
    category: "sintomas",
    title: "Conjuntivitis: qué hacer y cuándo consultar a un médico",
    heroTitle: "Conjuntivitis,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: conjuntivitis",
    metaTitle: "Conjuntivitis: qué hacer y cuándo consultar a un médico | DocYa",
    metaDescription:
      "Ojos rojos, picazón o lagrimeo: qué hacer ante posibles síntomas de conjuntivitis y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "Ojos rojos, picazón y lagrimeo son los síntomas típicos de conjuntivitis. Te contamos qué hacer y cuándo consultar.",
    intro: [
      "La conjuntivitis se nota por enrojecimiento, picazón, lagrimeo y a veces secreción en uno o ambos ojos, y puede tener origen viral, bacteriano o alérgico. Mientras conseguís la consulta, evitá frotarte los ojos, lavate las manos con frecuencia y no compartas toallas ni almohadas, porque las formas virales y bacterianas son bastante contagiosas.",
      "El médico puede orientar el diagnóstico por teleconsulta en la mayoría de los casos con una buena descripción y, si es posible, mostrando el ojo por cámara. Si la secreción es muy abundante, hay mucho dolor o la visión se ve afectada, puede indicarte una visita presencial para revisarlo de cerca.",
    ],
    highlightsLabel: "Consultá si aparece",
    highlights: [
      "Dolor ocular intenso",
      "Visión borrosa o afectada",
      "Mucha sensibilidad a la luz",
      "Síntomas en un recién nacido",
    ],
    faqs: [
      {
        question: "¿La conjuntivitis siempre necesita gotas con antibiótico?",
        answer:
          "No, depende del origen: las conjuntivitis virales no mejoran con antibiótico. Es el médico quien, tras evaluarte, indica el tratamiento adecuado según el tipo.",
      },
      {
        question: "¿Es muy contagiosa?",
        answer:
          "Las conjuntivitis virales y bacterianas sí lo son. Lavarte las manos seguido y no compartir toallas o almohadas ayuda a evitar contagiar a otras personas en tu casa.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "En la mayoría de los casos sí, mostrando el ojo por cámara y describiendo los síntomas. Si el médico necesita revisarlo de cerca, te va a indicar una visita presencial.",
      },
      {
        question: "¿Qué hago si le pasa a un bebé recién nacido?",
        answer:
          "En recién nacidos conviene que un médico lo evalúe sin demorar, ya que en ese grupo de edad se prefiere descartar causas que requieren atención específica.",
      },
    ],
    relatedArticles: ["que-hacer-si-tengo-una-reaccion-alergica", "que-hacer-si-tengo-fiebre", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿Tenés síntomas de conjuntivitis?",
    ctaSubtitle: "Consultá por teleconsulta o pedí un médico a domicilio para que evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "sintomas-de-covid",
    category: "sintomas",
    title: "Síntomas de covid: qué hacer",
    heroTitle: "Tengo síntomas de covid,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: covid",
    metaTitle: "Síntomas de covid: qué hacer y cuándo consultar | DocYa",
    metaDescription:
      "Qué hacer si tenés síntomas compatibles con covid, cuándo aislarte, cuándo consultar y cuándo es una emergencia.",
    heroDescription:
      "Fiebre, tos, dolor de garganta o pérdida del olfato pueden ser covid. Te contamos qué hacer mientras confirmás el diagnóstico.",
    intro: [
      "Los síntomas de covid se parecen a los de otros cuadros respiratorios: fiebre, tos, dolor de garganta, congestión, dolor muscular, cansancio y, en algunos casos, pérdida del olfato o del gusto. Mientras tenés síntomas, lo razonable es aislarte de otras personas en la medida de lo posible, descansar e hidratarte bien, sobre todo si convivís con personas mayores o con condiciones de riesgo.",
      "Una teleconsulta es una buena opción para un cuadro compatible con covid, justamente porque evita el traslado y el contacto con otras personas en una sala de espera. El médico te puede orientar sobre el manejo del cuadro y, si tu situación lo justifica, indicarte estudios o una evaluación presencial -por ejemplo, si tenés factores de riesgo o los síntomas empeoran.",
    ],
    highlightsLabel: "Consultá de inmediato (guardia o 911) si aparece",
    highlights: [
      "Dificultad para respirar",
      "Dolor de pecho persistente",
      "Confusión o mucha dificultad para mantenerte despierto",
      "Coloración azulada en labios o cara",
    ],
    faqs: [
      {
        question: "¿Puedo resolver un cuadro de covid por teleconsulta?",
        answer:
          "Sí, es una de las situaciones donde la teleconsulta tiene más sentido: evitás el traslado y el contacto con otras personas mientras un médico evalúa tu cuadro.",
      },
      {
        question: "¿Cuánto tiempo tengo que aislarme?",
        answer:
          "Depende de cómo evolucionen tus síntomas; un médico te puede orientar sobre el aislamiento según tu situación puntual y la de las personas con las que convivís.",
      },
      {
        question: "¿Necesito un test para confirmar covid?",
        answer:
          "El médico te puede orientar sobre si conviene testearte según tus síntomas y tu situación, aunque el manejo general de los síntomas leves no siempre depende de tener la confirmación.",
      },
      {
        question: "¿Cuándo un cuadro de covid deja de ser leve?",
        answer:
          "Si aparece dificultad para respirar, dolor de pecho persistente, confusión o coloración azulada en labios o cara, es una emergencia: no esperes una consulta programada.",
      },
    ],
    relatedArticles: ["gripe", "que-hacer-si-tengo-fiebre", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá sin salir de tu casa" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Si preferís examen presencial" },
    ],
    ctaHeading: "¿Tenés síntomas compatibles con covid?",
    ctaSubtitle: "Pedí una teleconsulta y consultá sin exponer a otras personas.",
    ctaLabel: "Pedir teleconsulta",
  },
  {
    slug: "gripe",
    category: "sintomas",
    title: "Gripe: qué hacer y cuándo consultar a un médico",
    heroTitle: "Tengo gripe,",
    heroTitleHighlight: "¿qué hago?",
    badge: "Síntomas: gripe",
    metaTitle: "Gripe: qué hacer y cuándo consultar a un médico | DocYa",
    metaDescription:
      "Diferencia entre gripe y resfrío, qué hacer mientras te recuperás y cuándo conviene un médico a domicilio o teleconsulta.",
    heroDescription:
      "La gripe suele empezar de golpe y con más intensidad que un resfrío común. Te contamos qué hacer y cuándo consultar.",
    intro: [
      "La gripe suele aparecer de forma más brusca que un resfrío común, con fiebre más alta, dolor muscular marcado, dolor de cabeza y cansancio intenso, además de los síntomas respiratorios (tos, dolor de garganta, congestión). Mientras dura el cuadro, lo habitual es guardar reposo, hidratarte bien y evitar el contacto cercano con personas de mayor riesgo (adultos mayores, embarazadas, personas con enfermedades crónicas).",
      "La mayoría de las gripes se resuelven solas en unos días con estas medidas generales. Conviene una consulta si el cuadro no mejora pasada una semana, si empeora después de haber empezado a mejorar (puede indicar una complicación, como una neumonía), o si pertenecés a un grupo de riesgo. El médico puede evaluar buena parte de esto por teleconsulta.",
    ],
    highlightsLabel: "Consultá si aparece",
    highlights: [
      "Dificultad para respirar",
      "Fiebre que reaparece después de haber bajado",
      "Empeoramiento tras una mejoría inicial",
      "Pertenecés a un grupo de riesgo (embarazo, enfermedad crónica, adulto mayor)",
    ],
    faqs: [
      {
        question: "¿Cómo distingo la gripe de un resfrío común?",
        answer:
          "La gripe suele empezar más de golpe y con síntomas más intensos: fiebre más alta, dolor muscular marcado y mucho cansancio. El resfrío común suele ser más gradual y leve.",
      },
      {
        question: "¿La gripe necesita antibiótico?",
        answer:
          "No, la gripe es viral y los antibióticos no actúan sobre virus. Un médico puede indicar un tratamiento si aparece una complicación bacteriana, pero eso requiere evaluación.",
      },
      {
        question: "¿Puedo resolverlo por teleconsulta?",
        answer:
          "Sí, en la mayoría de los casos el médico puede orientarte por videollamada. Si el cuadro empeora o no mejora, te va a indicar los pasos siguientes.",
      },
      {
        question: "¿Cuándo la gripe deja de ser un cuadro leve?",
        answer:
          "Si aparece dificultad para respirar, la fiebre reaparece después de haber bajado, o el cuadro empeora después de una mejoría inicial, conviene una consulta sin demorar.",
      },
    ],
    relatedArticles: ["sintomas-de-covid", "que-hacer-si-tengo-fiebre", "que-hacer-si-tengo-tos-persistente"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Consultá por videollamada" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Consulta presencial" },
    ],
    ctaHeading: "¿La gripe no mejora?",
    ctaSubtitle: "Pedí una teleconsulta o una visita a domicilio para que un médico evalúe tu caso.",
    ctaLabel: "Pedir consulta",
  },
  {
    slug: "que-hacer-si-tengo-dolor-de-pecho",
    category: "sintomas",
    title: "Dolor de pecho: cuándo es una emergencia",
    heroTitle: "Dolor de pecho:",
    heroTitleHighlight: "¿cuándo es una emergencia?",
    badge: "Síntomas: dolor de pecho",
    metaTitle: "Dolor de pecho: cuándo es una emergencia | DocYa",
    metaDescription:
      "El dolor de pecho puede ser un signo de emergencia cardíaca. Señales de alarma y por qué, ante la duda, siempre es guardia o 911.",
    heroDescription:
      "El dolor de pecho puede ser un signo de emergencia cardíaca. Ante la duda, la prioridad siempre es una guardia o el 911, no una consulta programada.",
    intro: [
      "El dolor de pecho es uno de los síntomas que hay que tomar más en serio, porque puede ser la forma en que se manifiesta una emergencia cardíaca. Un dolor opresivo o de presión en el pecho, que se irradia al brazo, la mandíbula, la espalda o el cuello, que se acompaña de falta de aire, sudoración fría, náuseas o mareos, es una urgencia: hay que llamar al 911 o ir a una guardia de inmediato, no esperar ni pedir una consulta programada.",
      "Existen causas de dolor de pecho que no son cardíacas -musculares, digestivas, de ansiedad-, pero distinguir eso de una causa cardíaca no es algo que se pueda hacer con seguridad uno mismo: requiere evaluación médica con estudios (como un electrocardiograma). Por eso DocYa no ofrece teleconsulta ni visita a domicilio como primera respuesta ante un dolor de pecho actual: si ya tuviste una evaluación médica que descartó una causa cardíaca y necesitás seguimiento de un dolor ya diagnosticado, ahí sí una consulta con nosotros puede ayudarte.",
    ],
    highlightsLabel: "Llamá al 911 o andá a una guardia ya si el dolor de pecho viene con",
    highlights: [
      "Falta de aire",
      "Dolor que se irradia al brazo, mandíbula, espalda o cuello",
      "Sudoración fría, náuseas o mareos",
      "Sensación de opresión o peso en el pecho",
    ],
    faqs: [
      {
        question: "¿Puedo pedir una teleconsulta si tengo dolor de pecho ahora mismo?",
        answer:
          "No como primera respuesta. Si tenés un dolor de pecho actual y no sabés su causa, la prioridad es descartar un origen cardíaco con evaluación médica presencial y estudios: llamá al 911 o andá a una guardia.",
      },
      {
        question: "¿Todo dolor de pecho es un infarto?",
        answer:
          "No, hay causas musculares, digestivas o de ansiedad que también duelen en el pecho. Pero esa diferenciación la hace un médico con examen y estudios, no es algo para autoevaluarse en el momento.",
      },
      {
        question: "¿Cuándo sí puedo consultar con DocYa por un dolor de pecho?",
        answer:
          "Si ya te evaluaron en una guardia, se descartó una causa cardíaca y tenés un diagnóstico (por ejemplo, un dolor muscular), podés pedir una teleconsulta o una visita a domicilio para el seguimiento de ese cuadro ya diagnosticado.",
      },
      {
        question: "¿Qué hago si no estoy seguro de qué tan grave es?",
        answer:
          "Ante la duda con un síntoma como este, priorizá la seguridad: andá a una guardia o llamá al 911. Es preferible una consulta de urgencia de más que quedarte esperando en tu casa.",
      },
    ],
    relatedArticles: ["presion-alta", "cuando-llamar-medico-a-domicilio", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Solo para seguimiento ya diagnosticado" },
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Solo para seguimiento ya diagnosticado" },
    ],
    ctaHeading: "¿Ya te evaluaron y necesitás seguimiento?",
    ctaSubtitle: "Si un médico ya descartó una causa cardíaca y tu dolor tiene diagnóstico, pedí una teleconsulta o una visita a domicilio para el seguimiento.",
    ctaLabel: "Pedir consulta de seguimiento",
  },

  // ───────────────────────── Sobre DocYa ─────────────────────────
  {
    slug: "como-funciona-docya",
    category: "sobre-docya",
    title: "¿Cómo funciona DocYa?",
    heroTitle: "¿Cómo funciona",
    heroTitleHighlight: "DocYa?",
    badge: "Sobre DocYa",
    metaTitle: "¿Cómo funciona DocYa? Médico a domicilio y teleconsulta | DocYa",
    metaDescription:
      "DocYa conecta pacientes con médicos matriculados para atención a domicilio en CABA o teleconsulta en toda Argentina, sin obra social ni turno previo.",
    heroDescription:
      "Una guía general de la plataforma: qué servicios ofrece, cómo se pide una consulta y qué obtenés al finalizar.",
    intro: [
      "DocYa es una plataforma que conecta pacientes con médicos matriculados para dos tipos de atención: visita a domicilio (hoy disponible en toda la Ciudad Autónoma de Buenos Aires) y teleconsulta por videollamada (disponible en cualquier provincia del país). No hace falta ser afiliado a una obra social o prepaga: pagás la consulta de forma particular con tarjeta desde la app, y si tu cobertura reintegra este tipo de consultas, te damos el comprobante correspondiente.",
      "El uso es el mismo en ambos casos: abrís la app, indicás el motivo de consulta y, según el servicio elegido, o bien un médico se traslada a tu domicilio (con un tiempo promedio de 30 a 60 minutos en CABA) o te contacta por videollamada en minutos. Al finalizar la consulta, si el médico lo considera necesario, recibís receta digital o certificado médico con firma digital, disponibles al instante en la app.",
    ],
    highlightsLabel: "Lo que incluye la plataforma",
    highlights: [
      "Médico a domicilio en CABA",
      "Teleconsulta en toda Argentina",
      "Receta digital cuando corresponde",
      "Certificado médico cuando corresponde",
    ],
    faqs: [
      {
        question: "¿Necesito obra social o prepaga para usar DocYa?",
        answer:
          "No. Pagás la consulta de forma particular con tarjeta desde la app. Si tu cobertura reintegra este tipo de consultas, te damos el comprobante para que gestiones el reembolso.",
      },
      {
        question: "¿Cómo sé si me conviene médico a domicilio o teleconsulta?",
        answer:
          "Si tu cuadro necesita examen físico, conviene la visita a domicilio; si se puede resolver con una buena descripción de síntomas por videollamada, la teleconsulta suele ser más rápida.",
      },
      {
        question: "¿En qué zonas funciona el médico a domicilio?",
        answer:
          "Hoy cubre toda la Ciudad Autónoma de Buenos Aires. La teleconsulta, en cambio, está disponible para pacientes de cualquier provincia de Argentina.",
      },
      {
        question: "¿Qué recibo al finalizar la consulta?",
        answer:
          "Depende de lo que el médico determine según tu caso: puede ser solo orientación general, una receta digital, un certificado médico, o la indicación de que necesitás una evaluación adicional.",
      },
      {
        question: "¿DocYa reemplaza una guardia o una emergencia?",
        answer:
          "No. Está pensado para consultas médicas que no son una emergencia. Ante signos de gravedad, comunicate con el 911 o acudí a una guardia.",
      },
    ],
    relatedArticles: ["cuando-llamar-medico-a-domicilio", "como-funciona-teleconsulta", "cuando-alcanza-teleconsulta"],
    relatedServices: [
      { label: "Médico a domicilio en CABA", href: "/medico-a-domicilio-caba", description: "Ver el servicio completo" },
      { label: "Teleconsulta médica online", href: "/teleconsulta", description: "Ver el servicio completo" },
      { label: "Preguntas frecuentes", href: "/faqs", description: "Más preguntas sobre DocYa" },
    ],
    ctaHeading: "¿Listo para pedir tu consulta?",
    ctaSubtitle: "Elegí médico a domicilio o teleconsulta desde la app y un profesional matriculado te atiende.",
    ctaLabel: "Empezar ahora",
  },
];

export function getArticleBySlug(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: HelpCategorySlug): HelpArticle[] {
  return HELP_ARTICLES.filter((article) => article.category === category);
}

export function getRelatedArticleObjects(article: HelpArticle): HelpArticle[] {
  return article.relatedArticles
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is HelpArticle => Boolean(item));
}

export function helpArticlePath(article: Pick<HelpArticle, "category" | "slug">): string {
  return `/centro-de-ayuda/${article.category}/${article.slug}`;
}

export const EMERGENCY_NOTE = EMERGENCIA_PARRAFO;
