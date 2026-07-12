// src/data/caba-neighborhoods.ts
//
// Fuente de datos para las paginas de SEO programatico por barrio de CABA
// (/medico-a-domicilio-[barrio]). Cada entrada tiene texto propio -no una
// plantilla con el nombre del barrio insertado- para evitar contenido
// duplicado entre paginas.
//
// Para agregar un barrio nuevo: sumar un objeto a CABA_NEIGHBORHOODS con
// contenido genuino (no copiar/pegar de otro barrio) y, si corresponde,
// agregar su slug al array `nearby` de los barrios linderos.

export interface NeighborhoodFaq {
  question: string;
  answer: string;
}

export interface CabaNeighborhood {
  slug: string;
  name: string;
  zone: string;
  seoDescription: string;
  intro: string[];
  landmarks: string[];
  faqs: NeighborhoodFaq[];
  nearby: string[];
}

export const CABA_NEIGHBORHOODS: CabaNeighborhood[] = [
  {
    slug: "palermo",
    name: "Palermo",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Palermo las 24 horas. Profesionales matriculados, sin turno previo, con pago particular o reembolso de tu obra social.",
    intro: [
      "Palermo es el barrio más extenso de la Ciudad y también uno de los más densos en departamentos y oficinas, desde Palermo Chico hasta Palermo Soho y Las Cañitas. Esa mezcla de edificios altos, PHs y torres corporativas hace que buena parte de las consultas que recibimos en la zona sean por accesos con porteros, coworkings o edificios sin cochera visible desde la calle, algo que nuestros médicos ya conocen y resuelven coordinando el ingreso por WhatsApp antes de llegar.",
      "Por la cantidad de bares, restaurantes y vida nocturna en Palermo Hollywood y Soho, también es uno de los barrios con más consultas fuera de horario habitual: golpes, indigestiones, alergias o cuadros febriles que aparecen un viernes a la noche o un domingo feriado. DocYa tiene profesionales de guardia en la zona todos los días del año, así no dependés de la guardia de un hospital para algo que se resuelve en tu casa.",
    ],
    landmarks: [
      "Plaza Serrano",
      "Jardín Botánico",
      "Campo Argentino de Polo",
      "Palermo Soho y Palermo Hollywood",
    ],
    faqs: [
      {
        question: "¿DocYa atiende de noche en Palermo Soho y Hollywood?",
        answer:
          "Sí. Tenemos profesionales disponibles todos los días, incluidos fines de semana y madrugadas, algo especialmente pedido en esta zona por la vida nocturna del barrio.",
      },
      {
        question: "¿Puedo pedir el médico a un edificio con portero eléctrico o coworking?",
        answer:
          "Sí, es habitual en Palermo. Al confirmar el pedido coordinamos por WhatsApp con el médico el acceso al edificio u oficina antes de que llegue.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Palermo?",
        answer:
          "Por la densidad de profesionales que tenemos en la zona norte de la Ciudad, el tiempo de espera habitual en Palermo es de entre 30 y 60 minutos según el horario y la demanda del momento.",
      },
    ],
    nearby: ["belgrano", "recoleta"],
  },
  {
    slug: "belgrano",
    name: "Belgrano",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Belgrano para toda la familia. Consultas rápidas, control de niños y adultos mayores, con o sin obra social.",
    intro: [
      "Belgrano combina zonas muy residenciales -Belgrano R, Bajo Belgrano- con avenidas comerciales como Cabildo y Juramento, y una población con muchas familias con chicos y adultos mayores que viven en el barrio desde hace décadas. Por eso una parte importante de los pedidos que recibimos acá son controles pediátricos, seguimiento de enfermedades crónicas y consultas para personas mayores que prefieren no salir de su casa para un chequeo simple.",
      "También es un barrio con mucha oferta educativa (varios colegios y la Facultad de Derecho de la UBA cerca, en el límite con Recoleta), lo que genera consultas puntuales por golpes, fiebre o certificados escolares durante el horario de clases. Nuestros médicos en Belgrano están acostumbrados a coordinar la visita con horarios de colegio o de trabajo de los padres.",
    ],
    landmarks: [
      "Barrancas de Belgrano",
      "Avenida Cabildo",
      "Belgrano R",
      "Museo Larreta",
    ],
    faqs: [
      {
        question: "¿Hacen controles para adultos mayores en Belgrano?",
        answer:
          "Sí, es una de las consultas más frecuentes en la zona: control de presión, medicación crónica y seguimiento general para que la persona mayor no tenga que trasladarse.",
      },
      {
        question: "¿Puedo pedir un médico para mi hijo en horario escolar en Belgrano?",
        answer:
          "Sí. Coordinamos el horario de la visita con la salida del colegio o con quien esté a cargo del chico en ese momento, y si corresponde el médico puede emitir un certificado escolar.",
      },
      {
        question: "¿Atienden en Bajo Belgrano y Belgrano R?",
        answer:
          "Sí, cubrimos todo el barrio, incluyendo las zonas más residenciales de Bajo Belgrano y Belgrano R, no solo el eje comercial de Cabildo.",
      },
    ],
    nearby: ["nunez", "palermo"],
  },
  {
    slug: "caballito",
    name: "Caballito",
    zone: "Centro",
    seoDescription:
      "Médico a domicilio en Caballito, atención rápida en todo el barrio. Sin obra social o con reembolso, consultá en minutos desde la app.",
    intro: [
      "Caballito es uno de los barrios geográficamente más céntricos de la Ciudad, lo que en la práctica significa que un médico puede llegar desde varias direcciones sin depender de una sola avenida. Es un barrio de edificios de altura media y muchas casas antiguas reformadas, con una población estable que suele tener médico de cabecera pero necesita una alternativa rápida cuando ese profesional no está disponible o el cuadro aparece fuera de horario.",
      "Al estar rodeado del Parque Rivadavia y con buena conexión de subte (líneas A y E) y colectivos, también recibimos consultas de gente que vive en barrios linderos como Almagro o Flores y busca un médico a domicilio en la zona centro de la Ciudad sin encontrar disponibilidad inmediata cerca de su casa.",
    ],
    landmarks: [
      "Parque Rivadavia",
      "Plaza Primera Junta",
      "Parque Centenario (límite)",
      "Mercado de Pulgas de Caballito",
    ],
    faqs: [
      {
        question: "¿Atienden en Caballito fuera del horario de mi médico de cabecera?",
        answer:
          "Sí, muchos pacientes de Caballito nos piden justamente para eso: cuando el médico de siempre no está disponible o el cuadro aparece un fin de semana o feriado.",
      },
      {
        question: "¿Cubren también zonas límite como Parque Centenario o Almagro?",
        answer:
          "Sí, si estás cerca del límite del barrio no hay problema, el pedido se asigna al médico disponible más cercano a tu domicilio.",
      },
      {
        question: "¿Puedo pagar la consulta en Caballito sin obra social?",
        answer:
          "Sí, podés pagar de forma particular y, si tu obra social o prepaga reintegra consultas a domicilio, te damos el comprobante para que gestiones el reembolso.",
      },
    ],
    nearby: [],
  },
  {
    slug: "recoleta",
    name: "Recoleta",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Recoleta con profesionales matriculados. Atención discreta y puntual en departamentos, oficinas y hoteles.",
    intro: [
      "Recoleta concentra muchos edificios de categoría, embajadas, oficinas corporativas y una población con alto porcentaje de adultos mayores que viven solos o con cuidador. Es habitual que las consultas en la zona pidan un trato particularmente cuidadoso con la privacidad -por ejemplo, coordinar el ingreso con seguridad del edificio o con el conserje de un hotel- y nuestros médicos están acostumbrados a ese tipo de coordinación antes de llegar.",
      "También es una zona de paso de mucha gente que trabaja en oficinas sobre Avenida Callao, Avenida Las Heras o cerca de los hospitales de la zona (Fernández, Rivadavia), que a veces prefiere una consulta rápida a domicilio en lugar de perder medio día en una guardia. Cubrimos consultas puntuales de este tipo además de los controles habituales de pacientes que ya viven en el barrio.",
    ],
    landmarks: [
      "Cementerio de la Recoleta",
      "Avenida Alvear",
      "Buenos Aires Design",
      "Facultad de Derecho (UBA)",
    ],
    faqs: [
      {
        question: "¿Pueden coordinar el ingreso con la seguridad del edificio en Recoleta?",
        answer:
          "Sí, es algo que pedimos habitualmente en la zona. Antes de que el médico llegue, coordinamos por WhatsApp el acceso con portería o seguridad si el edificio lo requiere.",
      },
      {
        question: "¿Atienden en hoteles de Recoleta?",
        answer:
          "Sí, atendemos huéspedes de hoteles de la zona; solo necesitamos el número de habitación y un contacto para coordinar el ingreso con la recepción.",
      },
      {
        question: "¿Hacen consultas para adultos mayores que viven solos en Recoleta?",
        answer:
          "Sí, es una de las consultas más frecuentes del barrio. Si hay un cuidador o familiar a cargo, coordinamos directamente con esa persona el horario de la visita.",
      },
    ],
    nearby: ["palermo"],
  },
  {
    slug: "nunez",
    name: "Núñez",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Núñez, atención el mismo día. Ideal para familias, controles pediátricos y consultas de urgencia menor.",
    intro: [
      "Núñez es un barrio mayormente residencial, con muchas casas y edificios bajos, familias con chicos y un movimiento particular los días de partido en el estadio de River, que puede afectar el tránsito y los tiempos de llegada en ciertas franjas horarias. Nuestros médicos conocen esa dinámica y, si hay un evento en la zona, lo tienen en cuenta al estimar el tiempo de arribo.",
      "Al estar pegado a la General Paz y con buena conexión hacia zona norte del Gran Buenos Aires, también recibimos consultas de la franja límite entre Núñez y las localidades vecinas. Si estás en esa zona, el pedido se asigna igual al médico disponible más cercano a tu domicilio dentro de CABA.",
    ],
    landmarks: [
      "Estadio Monumental de River Plate",
      "Ciudad Universitaria (UBA)",
      "Parque de la Ciudad",
      "Costanera Norte",
    ],
    faqs: [
      {
        question: "¿Los días de partido en el Monumental afecta el tiempo de llegada en Núñez?",
        answer:
          "Puede sumar unos minutos si el domicilio está muy cerca del estadio en horario de evento. Te avisamos por WhatsApp si el médico necesita más tiempo por el tránsito de la zona.",
      },
      {
        question: "¿Hacen controles pediátricos a domicilio en Núñez?",
        answer:
          "Sí, es una de las consultas más pedidas en el barrio dado el perfil familiar de la zona: fiebre, dolor de garganta, controles generales y certificados escolares.",
      },
      {
        question: "¿Atienden cerca del límite con la General Paz?",
        answer:
          "Sí, cubrimos todo Núñez incluyendo la franja más cercana a la General Paz, dentro de los límites de la Ciudad de Buenos Aires.",
      },
    ],
    nearby: ["belgrano"],
  },
];

export function getNeighborhoodBySlug(slug: string): CabaNeighborhood | undefined {
  return CABA_NEIGHBORHOODS.find((neighborhood) => neighborhood.slug === slug);
}

export function getAllNeighborhoodSlugs(): string[] {
  return CABA_NEIGHBORHOODS.map((neighborhood) => neighborhood.slug);
}

export function getNearbyNeighborhoods(neighborhood: CabaNeighborhood): CabaNeighborhood[] {
  return neighborhood.nearby
    .map((slug) => getNeighborhoodBySlug(slug))
    .filter((item): item is CabaNeighborhood => Boolean(item));
}
