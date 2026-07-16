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
    nearby: ["belgrano", "recoleta", "villa-crespo", "colegiales", "chacarita"],
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
    nearby: ["nunez", "palermo", "colegiales", "villa-urquiza"],
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
    nearby: ["almagro", "flores", "villa-crespo"],
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
    nearby: ["palermo", "almagro"],
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
  {
    slug: "almagro",
    name: "Almagro",
    zone: "Centro",
    seoDescription:
      "Médico a domicilio en Almagro las 24 horas. Profesionales matriculados, sin turno previo, con pago particular o reembolso de tu obra social.",
    intro: [
      "Almagro es un barrio de identidad muy marcada por el tango -acá nació y vivió Carlos Gardel- y hoy combina edificios de departamentos de varias décadas con la vida comercial de las avenidas Corrientes y Rivadavia. Buena parte de la población son familias que viven hace años en el barrio junto con estudiantes universitarios que alquilan cerca del Hospital de Clínicas y la Facultad de Medicina, dos perfiles con necesidades de consulta bastante distintas que nuestros médicos atienden todos los días.",
      "Al ser un barrio de paso entre el centro y el sur de la Ciudad, también recibimos pedidos de gente que trabaja en Almagro pero vive en otro barrio, y de vecinos de edificios antiguos sin ascensor donde una consulta a domicilio evita subir varios pisos con fiebre o dolor. La cercanía con el Abasto suma además consultas puntuales de gente que está de paso por la zona comercial.",
    ],
    landmarks: ["Abasto Shopping", "Museo Casa Carlos Gardel", "Parque Centenario (límite)", "Avenida Corrientes"],
    faqs: [
      {
        question: "¿Atienden a estudiantes que viven solos en Almagro?",
        answer:
          "Sí, es una consulta habitual en la zona por la cercanía con el Hospital de Clínicas y la Facultad de Medicina. Coordinamos la visita al domicilio del estudiante sin que necesite salir a buscar atención.",
      },
      {
        question: "¿Suben a edificios antiguos sin ascensor?",
        answer:
          "Sí, es común en Almagro y no es un problema para nuestros médicos, que están acostumbrados a este tipo de edificios en el barrio.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Almagro?",
        answer:
          "El tiempo habitual es de 30 a 60 minutos, gracias a la buena cantidad de profesionales que cubren la zona centro de la Ciudad.",
      },
    ],
    nearby: ["caballito", "boedo", "villa-crespo"],
  },
  {
    slug: "boedo",
    name: "Boedo",
    zone: "Sur",
    seoDescription:
      "Médico a domicilio en Boedo, atención el mismo día para toda la familia. Sin obra social ni prepaga, pagás solo cuando lo necesitás.",
    intro: [
      "Boedo tiene una identidad barrial muy fuerte, ligada también al tango y a una vida de café de esquina que todavía se respira en lugares como el histórico Café Homero Manzi. Es un barrio de casas bajas y PHs con una población que en muchos casos vive ahí desde hace generaciones, con un porcentaje importante de adultos mayores que prefieren resolver un control o una consulta simple sin salir de su casa.",
      "La avenida Boedo concentra el comercio de cercanía del barrio, y buena parte de los pedidos que recibimos vienen de las calles residenciales que la rodean, donde el acceso en auto es simple y los tiempos de llegada suelen ser de los más cortos de la zona sur de la Ciudad.",
    ],
    landmarks: ["Café Homero Manzi", "Avenida Boedo", "Biblioteca Popular Alberdi", "Límite con Parque Patricios"],
    faqs: [
      {
        question: "¿Hacen controles para adultos mayores en Boedo?",
        answer:
          "Sí, es una de las consultas más pedidas en el barrio: control de presión, medicación crónica y chequeos generales sin que la persona mayor tenga que trasladarse.",
      },
      {
        question: "¿Atienden en las calles residenciales alejadas de la avenida Boedo?",
        answer:
          "Sí, cubrimos todo el barrio, tanto sobre la avenida como en las calles internas más tranquilas.",
      },
      {
        question: "¿Puedo pagar la consulta en Boedo sin obra social?",
        answer:
          "Sí, podés pagar de forma particular y, si tu obra social o prepaga reintegra consultas a domicilio, te damos el comprobante para que gestiones el reembolso.",
      },
    ],
    nearby: ["almagro", "parque-patricios"],
  },
  {
    slug: "villa-crespo",
    name: "Villa Crespo",
    zone: "Centro",
    seoDescription:
      "Médico a domicilio en Villa Crespo, atención rápida sin turno previo. Ideal para familias y para quienes trabajan en el barrio.",
    intro: [
      "Villa Crespo es histórico centro textil y de indumentaria de la Ciudad, con la avenida Avellaneda llena de locales de venta al público y por mayor, y un movimiento comercial que se extiende de lunes a sábado. Conviven en el barrio familias que viven ahí desde hace décadas con comerciantes y empleados que pasan buena parte del día en sus locales, dos perfiles que generan pedidos distintos: consultas familiares en las calles residenciales y consultas puntuales para alguien que se descompone mientras trabaja.",
      "Villa Crespo también está creciendo como zona de oficinas y locales gastronómicos cerca del límite con Palermo, lo que suma consultas de gente que trabaja en la zona pero vive en otro barrio. Nuestros médicos conocen bien la dinámica de horario comercial extendido del barrio.",
    ],
    landmarks: ["Avenida Avellaneda", "Parque Centenario (límite)"],
    faqs: [
      {
        question: "¿Atienden comercios y locales sobre Avellaneda?",
        answer:
          "Sí, es frecuente que nos llamen desde un local de venta cuando alguien se descompone en horario comercial; coordinamos la visita al negocio o al domicilio, según corresponda.",
      },
      {
        question: "¿Cubren tanto las calles residenciales como la zona comercial de Villa Crespo?",
        answer:
          "Sí, atendemos todo el barrio, desde las cuadras más tranquilas hasta el eje comercial de Avellaneda.",
      },
      {
        question: "¿Cuánto tarda en llegar el médico a Villa Crespo?",
        answer:
          "El tiempo habitual es de 30 a 60 minutos, dada la buena cobertura de profesionales en la zona centro-norte de la Ciudad.",
      },
    ],
    nearby: ["palermo", "chacarita", "almagro"],
  },
  {
    slug: "villa-urquiza",
    name: "Villa Urquiza",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Villa Urquiza, atención el mismo día. Consultas familiares, controles pediátricos y de adultos mayores.",
    intro: [
      "Villa Urquiza es un barrio marcadamente residencial, con casas bajas y edificios de pocos pisos en calles arboladas, y una población de muchas familias que vive ahí desde hace años. Es habitual que nos pidan controles pediátricos, seguimiento de tratamientos crónicos en adultos mayores y consultas simples que no ameritan trasladarse hasta una guardia.",
      "Al estar alejado de los ejes de mayor congestión de tránsito de la Ciudad, en general los tiempos de llegada en Villa Urquiza son buenos, y nuestros médicos suelen cubrir también las zonas límite con barrios vecinos cuando el pedido está cerca del borde del barrio.",
    ],
    landmarks: ["Avenida Triunvirato", "Estación Villa Urquiza (línea Mitre)", "Plaza Arenales"],
    faqs: [
      {
        question: "¿Hacen controles pediátricos en Villa Urquiza?",
        answer:
          "Sí, es una de las consultas más pedidas en el barrio: fiebre, dolor de garganta, controles generales y certificados escolares.",
      },
      {
        question: "¿Atienden a adultos mayores con tratamientos crónicos?",
        answer:
          "Sí, coordinamos el seguimiento de medicación y control de presión para que la persona mayor no tenga que trasladarse.",
      },
      {
        question: "¿Cubren el límite con Belgrano R y Coghlan?",
        answer:
          "Sí, cubrimos todo Villa Urquiza incluyendo las zonas limítrofes con los barrios vecinos.",
      },
    ],
    nearby: ["belgrano", "villa-del-parque"],
  },
  {
    slug: "colegiales",
    name: "Colegiales",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Colegiales, atención rápida en un barrio en pleno crecimiento. Sin obra social ni prepaga.",
    intro: [
      "Colegiales es un barrio chico y en transformación: a las casas y edificios bajos tradicionales se les sumaron en los últimos años oficinas y estudios instalados en antiguos galpones, sobre todo cerca del límite con Palermo Hollywood y Chacarita. Esa mezcla genera tanto consultas familiares en las calles más tranquilas como pedidos puntuales de gente que trabaja en alguno de esos espacios reconvertidos.",
      "Por su tamaño y ubicación, Colegiales también recibe consultas de zonas limítrofes con Belgrano y Palermo, y nuestros médicos están acostumbrados a moverse entre estos barrios vecinos sin que eso implique demoras adicionales.",
    ],
    landmarks: ["Estación Colegiales (línea Mitre)", "Avenida Federico Lacroze", "Límite con Palermo Hollywood"],
    faqs: [
      {
        question: "¿Atienden oficinas y estudios instalados en galpones de Colegiales?",
        answer:
          "Sí, es cada vez más frecuente en la zona. Coordinamos el acceso igual que en cualquier domicilio particular.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Colegiales?",
        answer:
          "Entre 30 y 60 minutos en general, por la buena cobertura de profesionales en la zona norte de la Ciudad.",
      },
      {
        question: "¿Cubren las calles límite con Chacarita y Palermo?",
        answer:
          "Sí, al ser un barrio chico cubrimos sin problema las zonas limítrofes con Chacarita, Palermo y Belgrano.",
      },
    ],
    nearby: ["palermo", "belgrano", "chacarita"],
  },
  {
    slug: "san-telmo",
    name: "San Telmo",
    zone: "Sur",
    seoDescription:
      "Médico a domicilio en San Telmo, atención para vecinos y visitantes. Coordinamos el ingreso en edificios antiguos y alojamientos turísticos.",
    intro: [
      "San Telmo es uno de los barrios más antiguos de la Ciudad, con calles empedradas y edificios de gran valor histórico que en muchos casos no tienen ascensor ni las comodidades de una construcción moderna. Buena parte de las consultas que recibimos en la zona implican subir varios pisos en un PH o casa antigua, algo que nuestros médicos ya conocen y tienen en cuenta al coordinar la visita.",
      "Al ser también un barrio muy turístico, con la feria de antigüedades de los domingos sobre la calle Defensa y una alta proporción de alojamientos temporarios, recibimos consultas frecuentes de visitantes alojados en el barrio que no tienen médico de referencia en la Ciudad y necesitan atención rápida sin perder el día de paseo.",
    ],
    landmarks: ["Feria de San Telmo (calle Defensa)", "Plaza Dorrego", "Parque Lezama (límite)"],
    faqs: [
      {
        question: "¿Atienden turistas alojados en San Telmo?",
        answer:
          "Sí, es una consulta frecuente en la zona. Solo necesitamos la dirección del alojamiento y un contacto para coordinar el ingreso.",
      },
      {
        question: "¿Suben a PHs y casas antiguas sin ascensor?",
        answer:
          "Sí, es habitual en San Telmo y no representa un problema para nuestros médicos.",
      },
      {
        question: "¿Atienden los domingos durante la feria de la calle Defensa?",
        answer:
          "Sí, atendemos todos los días de la semana incluidos los domingos, coordinando el acceso si la feria dificulta el tránsito en la cuadra.",
      },
    ],
    nearby: ["monserrat", "puerto-madero"],
  },
  {
    slug: "puerto-madero",
    name: "Puerto Madero",
    zone: "Centro",
    seoDescription:
      "Médico a domicilio en Puerto Madero para torres, oficinas y hoteles. Atención discreta con coordinación de acceso e ingreso.",
    intro: [
      "Puerto Madero es el barrio más nuevo de la Ciudad y concentra torres de departamentos de categoría, oficinas corporativas y varios hoteles sobre los diques. La mayoría de los edificios tiene seguridad propia y sistemas de acceso estrictos, por lo que buena parte de la coordinación de cada visita pasa por avisar con anticipación a la recepción o portería del edificio antes de que el médico llegue.",
      "También recibimos consultas de gente que trabaja en alguna de las oficinas de la zona y de huéspedes de los hoteles del barrio, además de los controles habituales de los vecinos que viven en las torres residenciales. Nuestros médicos están acostumbrados al protocolo de acceso de estos edificios.",
    ],
    landmarks: ["Puente de la Mujer", "Reserva Ecológica Costanera Sur (límite)", "Diques de Puerto Madero"],
    faqs: [
      {
        question: "¿Coordinan el ingreso con la seguridad de las torres en Puerto Madero?",
        answer:
          "Sí, es parte habitual del proceso en la zona. Avisamos con anticipación a la recepción o portería para que autoricen el ingreso del médico.",
      },
      {
        question: "¿Atienden hoteles en Puerto Madero?",
        answer:
          "Sí, atendemos huéspedes de los hoteles de la zona; solo necesitamos el número de habitación y un contacto para coordinar con la recepción.",
      },
      {
        question: "¿Atienden en oficinas de Puerto Madero durante el horario laboral?",
        answer:
          "Sí, si alguien se descompone en su oficina podemos coordinar la visita al edificio corporativo durante el horario de trabajo.",
      },
    ],
    nearby: ["san-telmo", "monserrat"],
  },
  {
    slug: "monserrat",
    name: "Monserrat",
    zone: "Centro",
    seoDescription:
      "Médico a domicilio en Monserrat, atención rápida en el centro histórico de la Ciudad. Ideal para oficinas, hoteles y vecinos del barrio.",
    intro: [
      "Monserrat concentra buena parte de los edificios públicos y oficinas administrativas del centro porteño, además de zonas residenciales con edificios antiguos y una población de vecinos de larga data mezclada con empleados que trabajan en la zona durante el día. Es habitual que recibamos pedidos tanto de un domicilio particular como de alguien que se descompuso en su lugar de trabajo cerca de Plaza de Mayo.",
      "Al ser un barrio de mucho movimiento diurno y menos habitado de noche que otras zonas de la Ciudad, nuestros médicos ajustan la coordinación según el horario: durante el día suelen ser consultas de oficina, y de noche o fines de semana, consultas de los vecinos que sí viven en el barrio.",
    ],
    landmarks: ["Plaza de Mayo (límite)", "Manzana de las Luces", "Avenida de Mayo"],
    faqs: [
      {
        question: "¿Atienden oficinas públicas o privadas en Monserrat?",
        answer:
          "Sí, si alguien se descompone en su lugar de trabajo cerca del centro, coordinamos la visita al edificio durante el horario laboral.",
      },
      {
        question: "¿Cubren los edificios antiguos sin ascensor del barrio?",
        answer:
          "Sí, es común en Monserrat y nuestros médicos están acostumbrados a este tipo de construcciones.",
      },
      {
        question: "¿Atienden de noche o fines de semana en Monserrat?",
        answer:
          "Sí, tenemos profesionales disponibles todos los días para los vecinos que viven en el barrio, no solo en horario de oficina.",
      },
    ],
    nearby: ["san-telmo", "puerto-madero"],
  },
  {
    slug: "flores",
    name: "Flores",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Flores para toda la familia. Atención rápida, sin turno previo, en uno de los barrios más poblados de la Ciudad.",
    intro: [
      "Flores es uno de los barrios más poblados y diversos de la Ciudad, con un fuerte eje comercial sobre la avenida Rivadavia y una población que combina familias que viven ahí desde hace generaciones con comunidades de inmigrantes bolivianos, peruanos y coreanos, sobre todo hacia el sur del barrio. Esa diversidad se refleja también en el tipo de consultas que recibimos, desde controles familiares hasta pedidos puntuales de comercios de la zona.",
      "Al ser un barrio tan extenso, cubrimos tanto las cuadras cercanas a la Plaza Flores y la iglesia de San José de Flores como las zonas más al sur, hacia el Bajo Flores, siempre asignando el pedido al médico disponible más cercano al domicilio.",
    ],
    landmarks: ["Plaza Flores", "Iglesia San José de Flores", "Avenida Rivadavia"],
    faqs: [
      {
        question: "¿Atienden en todo Flores, incluido el Bajo Flores?",
        answer:
          "Sí, cubrimos todo el barrio; el pedido se asigna al médico disponible más cercano a tu domicilio.",
      },
      {
        question: "¿Hacen consultas para comercios sobre la avenida Rivadavia?",
        answer:
          "Sí, atendemos tanto domicilios particulares como locales comerciales de la zona.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Flores?",
        answer:
          "El tiempo habitual es de 30 a 60 minutos, según la zona puntual del barrio y la demanda del momento.",
      },
    ],
    nearby: ["floresta", "caballito"],
  },
  {
    slug: "floresta",
    name: "Floresta",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Floresta, atención el mismo día en un barrio tranquilo y residencial del oeste de la Ciudad.",
    intro: [
      "Floresta es un barrio chico y mayormente residencial, con casas bajas y edificios de pocos pisos, bastante más tranquilo que otras zonas comerciales cercanas como Flores. La mayoría de los pedidos que recibimos son consultas familiares simples: fiebre, dolores, controles generales de personas que prefieren no trasladarse hasta un centro de salud.",
      "Por su ubicación, también cubrimos consultas de las zonas límite con Flores, Vélez Sarsfield y Monte Castro, asignando siempre el pedido al médico disponible más cercano al domicilio indicado.",
    ],
    landmarks: ["Avenida Rivadavia", "Avenida Gaona", "Límite con Flores"],
    faqs: [
      {
        question: "¿Floresta tiene un médico a domicilio disponible todos los días?",
        answer:
          "Sí, tenemos profesionales disponibles todos los días de la semana, incluidos fines de semana.",
      },
      {
        question: "¿Cubren las zonas límite con Vélez Sarsfield y Monte Castro?",
        answer:
          "Sí, al ser un barrio chico, cubrimos sin problema las cuadras limítrofes con los barrios vecinos.",
      },
      {
        question: "¿Puedo pagar sin obra social en Floresta?",
        answer:
          "Sí, podés pagar de forma particular y, si tu cobertura reintegra consultas a domicilio, te damos el comprobante correspondiente.",
      },
    ],
    nearby: ["flores", "villa-del-parque"],
  },
  {
    slug: "liniers",
    name: "Liniers",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Liniers, atención rápida en un barrio de mucho movimiento y buena conexión de transporte.",
    intro: [
      "Liniers es un nudo de transporte importante del oeste de la Ciudad, con la estación de trenes, terminales de colectivos y el estadio de Vélez Sarsfield generando mucho movimiento de gente que vive, trabaja o pasa por el barrio. Recibimos tanto consultas familiares de los vecinos que viven en las calles residenciales como pedidos puntuales relacionados con el ida y vuelta constante de la zona comercial.",
      "Los días de partido en el estadio de Vélez pueden sumar algo de tránsito en las cuadras más cercanas, algo que nuestros médicos tienen en cuenta al calcular el tiempo de llegada, igual que sucede en otros barrios con estadios de fútbol.",
    ],
    landmarks: ["Estación Liniers", "Estadio José Amalfitani (Vélez Sarsfield)", "Avenida Rivadavia"],
    faqs: [
      {
        question: "¿Los días de partido de Vélez afectan el tiempo de llegada en Liniers?",
        answer:
          "Puede sumar algunos minutos si el domicilio está muy cerca del estadio en horario de evento; te avisamos por WhatsApp si el médico necesita más tiempo por el tránsito.",
      },
      {
        question: "¿Atienden cerca de la estación y las terminales de colectivos?",
        answer:
          "Sí, cubrimos todo el barrio, incluidas las zonas de mayor movimiento cerca de la estación.",
      },
      {
        question: "¿Puedo pedir un médico a domicilio en Liniers sin obra social?",
        answer:
          "Sí, podés pagar de forma particular y, si corresponde, te damos el comprobante para gestionar el reembolso con tu cobertura.",
      },
    ],
    nearby: ["mataderos"],
  },
  {
    slug: "mataderos",
    name: "Mataderos",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Mataderos, atención para toda la familia en uno de los barrios con más identidad de la Ciudad.",
    intro: [
      "Mataderos conserva una identidad barrial muy fuerte, ligada a su historia como zona de mercado de hacienda y a la tradicional Feria de Mataderos de los domingos, con doma y música folclórica. Es un barrio mayormente residencial y familiar, con casas bajas y una población que en muchos casos vive ahí desde hace generaciones.",
      "Los domingos de feria suelen concentrar mucho movimiento de gente en las calles cercanas al circuito de la feria, algo que tenemos en cuenta al coordinar la llegada del médico en ese horario puntual; el resto de la semana el barrio es tranquilo y los tiempos de llegada son buenos.",
    ],
    landmarks: ["Feria de Mataderos", "Mercado de Hacienda (histórico)", "Monumento al Resero"],
    faqs: [
      {
        question: "¿Los domingos de feria afectan la llegada del médico en Mataderos?",
        answer:
          "Puede sumar algunos minutos si el domicilio está muy cerca del circuito de la feria; fuera de ese horario puntual el barrio es tranquilo.",
      },
      {
        question: "¿Hacen controles familiares en Mataderos?",
        answer:
          "Sí, es la consulta más habitual en el barrio: controles pediátricos, chequeos de adultos mayores y consultas simples sin turno previo.",
      },
      {
        question: "¿Cubren todo el barrio, incluidas las calles más alejadas de la avenida principal?",
        answer:
          "Sí, cubrimos todo Mataderos, asignando el pedido al médico disponible más cercano a tu domicilio.",
      },
    ],
    nearby: ["liniers", "floresta"],
  },
  {
    slug: "villa-devoto",
    name: "Villa Devoto",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Villa Devoto, atención el mismo día en un barrio tranquilo de calles arboladas.",
    intro: [
      "Villa Devoto es uno de los barrios más verdes y tranquilos de la Ciudad, con calles arboladas, casas estilo chalet y una población mayormente familiar que valora la privacidad del barrio. Muchas de las consultas que recibimos acá son controles de rutina o cuadros simples que se resuelven perfectamente en el living de una casa, sin necesidad de trasladarse.",
      "Al ser un barrio residencial y con buena accesibilidad en auto, los tiempos de llegada suelen ser de los más cortos de la zona oeste de la Ciudad, y nuestros médicos también cubren sin problema las calles límite con Villa del Parque y Floresta.",
    ],
    landmarks: ["Plaza Miralla", "Parque Devoto", "Calles arboladas del casco histórico"],
    faqs: [
      {
        question: "¿Villa Devoto tiene buena disponibilidad de médicos a domicilio?",
        answer:
          "Sí, al ser una zona residencial con buena accesibilidad, los tiempos de llegada suelen ser cortos comparados con otras zonas de la Ciudad.",
      },
      {
        question: "¿Atienden casas con jardín o rejas de acceso?",
        answer:
          "Sí, es habitual en Villa Devoto y coordinamos por WhatsApp cualquier detalle de acceso antes de que el médico llegue.",
      },
      {
        question: "¿Cubren el límite con Villa del Parque y Floresta?",
        answer:
          "Sí, cubrimos todo Villa Devoto incluyendo las zonas limítrofes con los barrios vecinos.",
      },
    ],
    nearby: ["villa-del-parque", "floresta"],
  },
  {
    slug: "villa-del-parque",
    name: "Villa del Parque",
    zone: "Oeste",
    seoDescription:
      "Médico a domicilio en Villa del Parque, atención rápida para familias en un barrio tranquilo del oeste porteño.",
    intro: [
      "Villa del Parque es un barrio residencial de calles tranquilas y edificios bajos, con un eje comercial de cercanía sobre la avenida Álvarez Jonte y una población mayormente familiar. La mayoría de los pedidos que recibimos son consultas simples: controles, cuadros febriles o dolores que se resuelven sin necesidad de moverse hasta un centro de salud.",
      "Por su ubicación central dentro de la zona oeste, también cubrimos consultas de las zonas límite con Villa Devoto, Floresta y Villa Urquiza, siempre asignando el pedido al médico disponible más cercano al domicilio.",
    ],
    landmarks: ["Avenida Álvarez Jonte", "Parque Agronomía (cercano)", "Límite con Villa Devoto"],
    faqs: [
      {
        question: "¿Atienden en las calles residenciales de Villa del Parque?",
        answer:
          "Sí, es donde se concentra la mayoría de nuestras consultas en el barrio: controles familiares y cuadros simples resueltos en el domicilio.",
      },
      {
        question: "¿Cubren el límite con Villa Devoto y Floresta?",
        answer:
          "Sí, cubrimos todo Villa del Parque incluyendo las zonas limítrofes con los barrios vecinos.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Villa del Parque?",
        answer:
          "El tiempo habitual es de 30 a 60 minutos según el horario y la demanda del momento.",
      },
    ],
    nearby: ["villa-devoto", "floresta", "villa-urquiza"],
  },
  {
    slug: "chacarita",
    name: "Chacarita",
    zone: "Norte",
    seoDescription:
      "Médico a domicilio en Chacarita, atención rápida en un barrio en pleno crecimiento cerca de Palermo.",
    intro: [
      "Chacarita combina un perfil residencial tradicional -marcado por la presencia del histórico Cementerio de la Chacarita- con una zona en pleno crecimiento cerca de las vías del tren, donde en los últimos años se instalaron bares, estudios y locales gastronómicos que atraen a gente joven de otros barrios. Esa mezcla genera tanto consultas familiares de siempre como pedidos nocturnos o de fin de semana ligados a la vida social de la zona.",
      "Al estar pegado a Palermo y Colegiales, también recibimos consultas de las zonas límite entre estos barrios, y nuestros médicos están acostumbrados a moverse entre ellos sin demoras adicionales.",
    ],
    landmarks: ["Cementerio de la Chacarita", "Avenida Federico Lacroze", "Límite con Palermo Hollywood"],
    faqs: [
      {
        question: "¿Atienden de noche en la zona de bares de Chacarita?",
        answer:
          "Sí, tenemos profesionales disponibles todos los días, incluidas noches y fines de semana, algo pedido en esta zona por su vida nocturna creciente.",
      },
      {
        question: "¿Cubren el límite con Palermo y Colegiales?",
        answer:
          "Sí, cubrimos todo Chacarita incluyendo las zonas limítrofes con los barrios vecinos.",
      },
      {
        question: "¿Hacen consultas familiares tradicionales en Chacarita?",
        answer:
          "Sí, seguimos atendiendo los controles y consultas simples de las familias que viven hace años en el barrio, no solo la zona de bares.",
      },
    ],
    nearby: ["villa-crespo", "colegiales", "palermo"],
  },
  {
    slug: "parque-patricios",
    name: "Parque Patricios",
    zone: "Sur",
    seoDescription:
      "Médico a domicilio en Parque Patricios, atención para vecinos y trabajadores del Distrito Tecnológico.",
    intro: [
      "Parque Patricios combina un perfil residencial e industrial histórico con el crecimiento del Distrito Tecnológico, que trajo al barrio oficinas de empresas de software y edificios corporativos nuevos junto a las casas y galpones tradicionales. Recibimos tanto consultas familiares de los vecinos de siempre como pedidos de gente que trabaja en alguna de las oficinas tecnológicas de la zona.",
      "Al ser un barrio en transformación, también cubrimos las zonas límite con Boedo y Nueva Pompeya, asignando el pedido al médico disponible más cercano al domicilio o la oficina indicada.",
    ],
    landmarks: ["Distrito Tecnológico", "Parque Patricios (plaza)", "Límite con Boedo"],
    faqs: [
      {
        question: "¿Atienden oficinas del Distrito Tecnológico en Parque Patricios?",
        answer:
          "Sí, si alguien se descompone en su oficina podemos coordinar la visita al edificio durante el horario laboral.",
      },
      {
        question: "¿Cubren también las casas y galpones tradicionales del barrio?",
        answer:
          "Sí, atendemos todo Parque Patricios, tanto las zonas de oficinas nuevas como las calles residenciales de siempre.",
      },
      {
        question: "¿Cuánto tarda en llegar un médico a Parque Patricios?",
        answer:
          "El tiempo habitual es de 30 a 60 minutos según la zona puntual y la demanda del momento.",
      },
    ],
    nearby: ["boedo"],
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
