// src/data/teleconsulta-locations.ts
//
// Fuente de datos para las paginas de SEO programatico por provincia y por
// ciudad turistica (/teleconsulta/[localidad]). A diferencia de
// medico-a-domicilio (solo CABA), la teleconsulta es un servicio nacional,
// asi que estas paginas cubren todo el pais.
//
// Cada entrada tiene texto propio -no una plantilla con el nombre insertado-
// para evitar contenido duplicado entre paginas. IMPORTANTE: estas paginas
// solo pueden prometer teleconsulta (videollamada). Nunca describir la visita
// presencial de "medico a domicilio" como disponible fuera de CABA: hoy ese
// servicio no cubre el resto del pais.
//
// Para agregar una localidad nueva: sumar un objeto a TELECONSULTA_LOCATIONS
// con contenido genuino (no copiar/pegar de otra localidad) y, si
// corresponde, agregarla al array `related` de las localidades vinculadas.

export type TeleconsultaLocationType = "provincia" | "ciudad";

export interface TeleconsultaFaq {
  question: string;
  answer: string;
}

export interface TeleconsultaLocation {
  slug: string;
  name: string;
  type: TeleconsultaLocationType;
  /** Etiqueta corta para badges y areaServed, ej. "Provincia de Córdoba" o "Río Negro, Patagonia" */
  region: string;
  seoDescription: string;
  intro: string[];
  highlights: string[];
  faqs: TeleconsultaFaq[];
  related: string[];
}

export const TELECONSULTA_LOCATIONS: TeleconsultaLocation[] = [
  // ───────────────────────── Provincias ─────────────────────────
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    type: "provincia",
    region: "Provincia de Buenos Aires",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Buenos Aires: conurbano e interior. Médico matriculado por videollamada, mismo precio en toda la provincia.",
    intro: [
      "En el conurbano bonaerense la teleconsulta resuelve un problema muy concreto: las guardias de los hospitales públicos suelen estar saturadas y una consulta simple -un cuadro febril, una renovación de receta, una duda con la medicación de un familiar- puede significar horas de espera. Pedir una teleconsulta desde Zona Norte, Oeste o Sur del Gran Buenos Aires evita ese trámite para lo que no necesita examen físico presencial.",
      "En el interior de la provincia la lógica es otra: partidos como los que rodean Bahía Blanca, Tandil, Junín o Pergamino tienen buena atención primaria pero poca disponibilidad de especialistas puntuales, y trasladarse a la ciudad más cercana con esa especialidad puede llevar todo un día. La teleconsulta acerca esa segunda opinión o ese seguimiento sin el viaje.",
    ],
    highlights: [
      "Conurbano bonaerense (Zona Norte, Oeste y Sur)",
      "La Plata y Gran La Plata",
      "Interior productivo: Bahía Blanca, Tandil, Junín, Pergamino",
      "Costa Atlántica bonaerense",
    ],
    faqs: [
      {
        question: "¿La teleconsulta funciona igual en el conurbano que en el interior de la provincia?",
        answer:
          "Sí, el servicio y el precio son los mismos en toda la Provincia de Buenos Aires, desde el conurbano hasta los partidos más alejados de la Capital.",
      },
      {
        question: "¿Sirve para no perder horas en la guardia de un hospital del conurbano?",
        answer:
          "Para cuadros que no requieren examen físico presencial ni estudios de urgencia, sí: podés resolver la consulta por videollamada y evitar el traslado y la espera de la guardia.",
      },
      {
        question: "¿Atienden a localidades del interior bonaerense sin especialistas cercanos?",
        answer:
          "Sí. Es uno de los usos más frecuentes fuera del conurbano: acceder a una consulta o un seguimiento sin viajar a la ciudad más cercana con esa especialidad.",
      },
    ],
    related: ["mar-del-plata", "tigre", "cordoba", "santa-fe"],
  },
  {
    slug: "cordoba",
    name: "Córdoba",
    type: "provincia",
    region: "Provincia de Córdoba",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Córdoba: capital, sierras e interior. Médico matriculado por videollamada al mismo precio en toda la provincia.",
    intro: [
      "Córdoba Capital es una de las ciudades universitarias más grandes del país, con una enorme población de estudiantes que vive lejos de su familia y de su médico de cabecera. Para ese perfil -y para cualquier cordobés que no consigue turno rápido con su cobertura- la teleconsulta es una forma de resolver una consulta general, una renovación de receta o una duda puntual sin depender de la agenda de un consultorio.",
      "En las sierras -Valle de Punilla, Traslasierra, Calamuchita- convive una población estable con un fuerte movimiento turístico en temporada, y en ambos casos la oferta de especialistas es más chica que en la capital. La teleconsulta cubre esa distancia: tanto para el vecino de una localidad serrana como para quien está de vacaciones y necesita una consulta sin cortar el fin de semana.",
    ],
    highlights: [
      "Córdoba Capital",
      "Valle de Punilla (Villa Carlos Paz, La Falda, La Cumbre)",
      "Valle de Traslasierra y Calamuchita",
      "Villa María y el interior productivo",
    ],
    faqs: [
      {
        question: "¿Sirve para estudiantes que viven solos en Córdoba Capital?",
        answer:
          "Sí, es una de las consultas más frecuentes: estudiantes que viven lejos de su familia y necesitan una consulta rápida sin tener médico de cabecera en la ciudad.",
      },
      {
        question: "¿La teleconsulta llega a las sierras cordobesas?",
        answer:
          "Sí, funciona igual en Punilla, Traslasierra o Calamuchita que en la Capital: solo hace falta conexión a internet.",
      },
      {
        question: "¿Puedo usarla si estoy de vacaciones en las sierras de Córdoba?",
        answer:
          "Sí, no hace falta ser residente de la provincia. Si estás de paso y necesitás una consulta, podés pedirla igual que en tu ciudad de origen.",
      },
    ],
    related: ["villa-carlos-paz", "buenos-aires", "mendoza"],
  },
  {
    slug: "santa-fe",
    name: "Santa Fe",
    type: "provincia",
    region: "Provincia de Santa Fe",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Santa Fe: Rosario, la capital y el interior. Médico matriculado por videollamada, mismo precio en toda la provincia.",
    intro: [
      "Rosario concentra buena parte de la demanda de salud de la provincia y, como en cualquier ciudad grande, hay franjas horarias -noches, fines de semana- donde conseguir un turno rápido con la cobertura propia no es sencillo. La teleconsulta funciona ahí como una alternativa inmediata para consultas generales, seguimientos o renovación de medicación habitual.",
      "En el interior santafesino, con localidades agrícolas e industriales distribuidas en un territorio extenso a lo largo de las rutas 9, 11 y 34, la distancia hasta un especialista puntual puede ser considerable. Pedir la teleconsulta desde el pueblo, sin viajar a Rosario o Santa Fe capital, es el caso de uso más habitual fuera de las dos ciudades grandes.",
    ],
    highlights: [
      "Rosario y su área metropolitana",
      "Santa Fe Capital",
      "Corredor de las rutas 9, 11 y 34",
      "Zona agrícola e industrial del sur provincial",
    ],
    faqs: [
      {
        question: "¿Atienden fuera del horario habitual en Rosario?",
        answer:
          "Sí, podés pedir la teleconsulta cuando la necesites, incluidos fines de semana y horarios nocturnos según disponibilidad de médicos.",
      },
      {
        question: "¿Sirve para localidades del interior santafesino lejos de Rosario o la capital?",
        answer:
          "Sí, es uno de los usos más comunes: resolver la consulta sin viajar a la ciudad más cercana con esa especialidad.",
      },
      {
        question: "¿El precio cambia entre Rosario y el interior de la provincia?",
        answer:
          "No, el precio de la teleconsulta es el mismo en toda la Provincia de Santa Fe y se muestra en la app antes de confirmar el pedido.",
      },
    ],
    related: ["buenos-aires", "cordoba"],
  },
  {
    slug: "mendoza",
    name: "Mendoza",
    type: "provincia",
    region: "Provincia de Mendoza",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Mendoza: Gran Mendoza, zona vitivinícola y sur mendocino. Médico matriculado por videollamada al mismo precio.",
    intro: [
      "Mendoza recibe todo el año a turistas de bodega, montaña y nieve, además de la población que vive en el Gran Mendoza y en los departamentos vitivinícolas como Maipú, Luján de Cuyo o el Valle de Uco. Para un visitante que se descompone durante un tour de bodegas o una excursión a la montaña, la teleconsulta evita perder el resto del viaje en una guardia sin conocer la zona.",
      "En el sur mendocino y las zonas rurales alejadas del Gran Mendoza, la distancia hasta un especialista puede ser de varias horas. Ahí la teleconsulta funciona igual que en cualquier otra provincia: mismo precio, mismo proceso, sin depender de la ciudad desde la que te conectás.",
    ],
    highlights: [
      "Gran Mendoza",
      "Zona vitivinícola (Maipú, Luján de Cuyo, Valle de Uco)",
      "Alta montaña y zona de esquí",
      "San Rafael y el sur mendocino",
    ],
    faqs: [
      {
        question: "¿Sirve si estoy de paso por Mendoza haciendo un tour de bodegas?",
        answer:
          "Sí, no hace falta ser residente. Si estás de visita y necesitás una consulta, podés pedirla desde donde estés en la provincia.",
      },
      {
        question: "¿Atienden a quienes están de vacaciones en la zona de montaña o esquí?",
        answer:
          "Sí, mientras tengas conexión a internet podés pedir la teleconsulta igual que en cualquier otra parte del país.",
      },
      {
        question: "¿Cubre también el sur mendocino, lejos del Gran Mendoza?",
        answer:
          "Sí, el servicio cubre toda la provincia por igual, incluido San Rafael y las zonas rurales del sur.",
      },
    ],
    related: ["cordoba", "neuquen", "san-juan"],
  },
  {
    slug: "tucuman",
    name: "Tucumán",
    type: "provincia",
    region: "Provincia de Tucumán",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Tucumán: San Miguel y el interior. Médico matriculado por videollamada, mismo precio en toda la provincia.",
    intro: [
      "Tucumán es la provincia más chica del país en superficie pero una de las más densamente pobladas, con San Miguel de Tucumán funcionando como principal centro de salud del norte argentino y recibiendo pacientes de provincias vecinas. Esa concentración también significa demanda alta en los turnos de guardia y de especialistas para quienes viven en la capital.",
      "En los valles calchaquíes tucumanos y las localidades del interior -Tafí del Valle, Concepción, Monteros- el acceso a un especialista puntual suele requerir viajar hasta la capital provincial. La teleconsulta acorta esa distancia para consultas generales, seguimientos y renovación de medicación habitual.",
    ],
    highlights: [
      "San Miguel de Tucumán",
      "Tafí del Valle",
      "Concepción y el sur tucumano",
      "Zona cañera del este provincial",
    ],
    faqs: [
      {
        question: "¿La teleconsulta ayuda a evitar la demanda de turnos en San Miguel de Tucumán?",
        answer:
          "Para consultas que no requieren examen físico presencial, sí: podés resolverlas por videollamada sin depender de la agenda de un consultorio en la capital.",
      },
      {
        question: "¿Sirve para localidades como Tafí del Valle o Concepción?",
        answer:
          "Sí, funciona igual en cualquier punto de la provincia; solo necesitás conexión a internet para conectarte con el médico.",
      },
      {
        question: "¿El precio es distinto si vivo lejos de la capital tucumana?",
        answer:
          "No, el precio de la teleconsulta es el mismo en toda la Provincia de Tucumán, se muestre desde donde se pida.",
      },
    ],
    related: ["salta", "cafayate"],
  },
  {
    slug: "salta",
    name: "Salta",
    type: "provincia",
    region: "Provincia de Salta",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Salta: capital, valles calchaquíes y puna. Médico matriculado por videollamada al mismo precio en toda la provincia.",
    intro: [
      "Salta capital recibe cada año a miles de turistas que llegan por sus tours a los valles calchaquíes, la Quebrada de las Conchas y la puna salteña, además de ser un polo de salud para localidades del norte del país. Para un viajero que se descompone en medio de un circuito turístico, o para quien vive en la ciudad y no consigue turno rápido, la teleconsulta resuelve la consulta sin cortar el viaje ni perder el día.",
      "En los departamentos más alejados de la capital -Los Andes, la puna, buena parte de los valles- la distancia hasta un especialista puede ser de varias horas por rutas de montaña. Ahí la teleconsulta no reemplaza una urgencia real, pero sí una consulta general, un seguimiento o una renovación de receta que hoy obliga a viajar sin necesidad.",
    ],
    highlights: [
      "Salta Capital",
      "Valles Calchaquíes y Quebrada de las Conchas",
      "Puna salteña",
      "Circuito turístico del norte argentino",
    ],
    faqs: [
      {
        question: "¿Sirve si me descompongo durante un tour por los valles calchaquíes?",
        answer:
          "Sí, para cuadros que no son una urgencia real podés pedir la teleconsulta desde donde estés y seguir con el viaje después de la consulta.",
      },
      {
        question: "¿Atienden en departamentos alejados de Salta Capital, como la puna?",
        answer:
          "Sí, el único requisito es tener conexión a internet; el servicio y el precio son los mismos en toda la provincia.",
      },
      {
        question: "¿Puedo pedir receta o certificado estando de viaje por Salta?",
        answer:
          "Sí, si el médico lo considera pertinente después de evaluar tu consulta, emite receta o certificado con firma digital al finalizar la videollamada.",
      },
    ],
    related: ["cafayate", "tucuman", "jujuy"],
  },
  {
    slug: "neuquen",
    name: "Neuquén",
    type: "provincia",
    region: "Provincia de Neuquén",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Neuquén: capital, Vaca Muerta y la cordillera. Médico matriculado por videollamada, mismo precio en toda la provincia.",
    intro: [
      "Neuquén capital creció muy rápido en los últimos años de la mano de la actividad petrolera de Vaca Muerta, con mucha gente que se instaló en la provincia por trabajo y no tiene todavía un médico de cabecera o una cobertura resuelta en la zona. Para ese perfil, y para quien trabaja en yacimientos alejados de la ciudad, la teleconsulta es una forma rápida de resolver una consulta sin depender de la disponibilidad local.",
      "Hacia la cordillera neuquina -San Martín de los Andes, Villa La Angostura, Chos Malal- la población combina vecinos estables con un fuerte movimiento turístico en temporada de verano e invierno. En ambos casos, acceder a un especialista puntual suele implicar viajar hasta Neuquén capital; la teleconsulta acorta esa distancia para lo que no requiere examen físico presencial.",
    ],
    highlights: [
      "Neuquén Capital",
      "Zona de Vaca Muerta y Añelo",
      "San Martín de los Andes y Villa La Angostura",
      "Chos Malal y el norte neuquino",
    ],
    faqs: [
      {
        question: "¿Sirve para quienes se instalaron en Neuquén por trabajo y no tienen médico de cabecera?",
        answer:
          "Sí, es uno de los usos más frecuentes en la zona: resolver una consulta general o una renovación de receta sin depender de conseguir turno con un médico nuevo.",
      },
      {
        question: "¿Atienden a quienes trabajan en yacimientos alejados de la ciudad?",
        answer:
          "Sí, mientras haya conexión a internet la teleconsulta funciona igual, sin importar la distancia a un centro urbano.",
      },
      {
        question: "¿Cubre también la zona cordillerana como San Martín de los Andes?",
        answer:
          "Sí, el servicio cubre toda la Provincia de Neuquén por igual, tanto en temporada turística como fuera de ella.",
      },
    ],
    related: ["rio-negro", "mendoza"],
  },
  {
    slug: "rio-negro",
    name: "Río Negro",
    type: "provincia",
    region: "Provincia de Río Negro",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Río Negro: Alto Valle, Bariloche y la línea sur. Médico matriculado por videollamada al mismo precio en toda la provincia.",
    intro: [
      "El Alto Valle rionegrino -General Roca, Cipolletti, Cinco Saltos- es una zona productiva con localidades bien conectadas entre sí, pero donde un turno con un especialista puntual puede tardar semanas. La teleconsulta funciona ahí como una segunda vía para consultas generales, seguimientos o dudas sobre un tratamiento en curso, sin esperar ese turno.",
      "Hacia el sur y la línea sur rionegrina, con localidades más chicas y dispersas, la distancia hasta un centro de salud con especialistas es mayor. Y en Bariloche y la zona andina, además de los vecinos de siempre, hay un fuerte movimiento turístico que también recurre a la teleconsulta para no perder días de vacaciones en una guardia.",
    ],
    highlights: [
      "Alto Valle (General Roca, Cipolletti, Cinco Saltos)",
      "Viedma y Carmen de Patagones",
      "Línea Sur rionegrina",
      "Zona andina (Bariloche, El Bolsón)",
    ],
    faqs: [
      {
        question: "¿Sirve para no esperar semanas un turno con especialista en el Alto Valle?",
        answer:
          "Para consultas generales, seguimientos o dudas sobre un tratamiento que no requieren examen físico presencial, la teleconsulta te da una alternativa inmediata mientras gestionás ese turno.",
      },
      {
        question: "¿Atienden en localidades chicas de la línea sur rionegrina?",
        answer:
          "Sí, el servicio funciona en toda la provincia por igual; solo hace falta conexión a internet para conectarte con el médico.",
      },
      {
        question: "¿Es lo mismo que la teleconsulta específica para Bariloche?",
        answer:
          "Sí, es el mismo servicio. Tenemos una página específica para Bariloche por el volumen de consultas de turistas, pero la teleconsulta cubre toda la Provincia de Río Negro por igual.",
      },
    ],
    related: ["bariloche", "neuquen"],
  },
  {
    slug: "san-juan",
    name: "San Juan",
    type: "provincia",
    region: "Provincia de San Juan",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de San Juan: capital, zona vitivinícola y turismo de aventura. Médico matriculado por videollamada al mismo precio.",
    intro: [
      "San Juan tiene un fuerte desarrollo minero (Veladero, Gualcamayo) y vitivinícola, con trabajadores que pasan largas temporadas en campamentos o yacimientos alejados de la capital. Para ellos, la teleconsulta es una forma de acceder a un médico sin depender de la infraestructura de salud del yacimiento ni interrumpir el turno de trabajo.",
      "San Juan Capital también es punto de partida para el turismo de aventura hacia el Parque Nacional Ischigualasto (Valle de la Luna) y la Ruta 40 sanjuanina, con recorridos de varias horas por zonas desérticas sin centros de salud cercanos. Para un visitante que se descompone en medio de ese circuito, la teleconsulta es la alternativa más rápida disponible.",
    ],
    highlights: [
      "San Juan Capital",
      "Parque Nacional Ischigualasto (Valle de la Luna)",
      "Zona vitivinícola (Pocito, Zonda)",
      "Ruta 40 sanjuanina",
    ],
    faqs: [
      {
        question: "¿Sirve para trabajadores de la zona minera alejados de la ciudad?",
        answer:
          "Sí, mientras haya conexión a internet en el campamento o base de operaciones, podés pedir la teleconsulta sin depender de la infraestructura de salud local del yacimiento.",
      },
      {
        question: "¿Atienden a quienes visitan el Valle de la Luna o la Ruta 40?",
        answer:
          "Sí, mientras tengas señal y conexión a internet podés pedir la teleconsulta desde donde estés en el circuito.",
      },
      {
        question: "¿La actividad sísmica de la zona afecta la disponibilidad del servicio?",
        answer:
          "No, la teleconsulta depende de la conexión a internet, no de la infraestructura de salud física de la zona.",
      },
    ],
    related: ["mendoza"],
  },
  {
    slug: "jujuy",
    name: "Jujuy",
    type: "provincia",
    region: "Provincia de Jujuy",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Jujuy: capital, Quebrada de Humahuaca y puna. Médico matriculado por videollamada al mismo precio en toda la provincia.",
    intro: [
      "La Quebrada de Humahuaca, Patrimonio de la Humanidad, es uno de los circuitos más visitados del norte argentino, con localidades como Purmamarca, Tilcara y Humahuaca recibiendo turistas todo el año a más de 2.000 metros de altura. El apunamiento, la exposición solar intensa y el frío nocturno generan consultas frecuentes que muchos visitantes prefieren resolver por videollamada antes de interrumpir el recorrido.",
      "En la puna jujeña, con localidades muy alejadas de San Salvador de Jujuy, acceder a un especialista puntual puede implicar horas de viaje por rutas de montaña. La teleconsulta no reemplaza una urgencia real, pero cubre consultas generales y seguimientos sin ese traslado.",
    ],
    highlights: [
      "Quebrada de Humahuaca",
      "Purmamarca y el Cerro de los Siete Colores",
      "Tilcara y Humahuaca",
      "Puna jujeña",
    ],
    faqs: [
      {
        question: "¿Atienden consultas por apunamiento en la Quebrada de Humahuaca?",
        answer:
          "Sí, el médico evalúa tu cuadro por videollamada y te indica cómo proceder; si el caso requiere atención presencial urgente, te lo va a indicar también.",
      },
      {
        question: "¿Sirve para localidades alejadas de la puna jujeña?",
        answer:
          "Sí, el servicio cubre toda la provincia por igual; solo hace falta conexión a internet.",
      },
      {
        question: "¿Puedo pedirla si estoy de paso por Purmamarca o Tilcara?",
        answer:
          "Sí, no hace falta ser residente. Si estás de visita y necesitás una consulta, podés pedirla desde tu alojamiento.",
      },
    ],
    related: ["salta"],
  },
  {
    slug: "misiones",
    name: "Misiones",
    type: "provincia",
    region: "Provincia de Misiones",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Misiones: Posadas, zona productora de yerba mate y las Cataratas. Médico matriculado por videollamada al mismo precio.",
    intro: [
      "Misiones combina a Posadas como centro administrativo y de salud de la provincia con un interior selvático dedicado a la producción de yerba mate, té y forestación, donde muchas localidades pequeñas tienen poca oferta de especialistas puntuales. La teleconsulta acerca esa consulta o ese seguimiento a productores y familias que hoy tienen que viajar hasta Posadas u Oberá para conseguir turno.",
      "La provincia también recibe turismo hacia las ruinas jesuíticas de San Ignacio y la selva misionera, además del conocido circuito de las Cataratas del Iguazú en el extremo norte. Para un visitante que recorre ese circuito más amplio, y no solo Puerto Iguazú, la teleconsulta funciona igual en cualquier punto de Misiones.",
    ],
    highlights: [
      "Posadas",
      "Zona productora de yerba mate (Oberá, Apóstoles)",
      "Ruinas jesuíticas de San Ignacio",
      "Selva misionera",
    ],
    faqs: [
      {
        question: "¿Sirve para productores rurales lejos de Posadas u Oberá?",
        answer:
          "Sí, es uno de los usos más habituales fuera del circuito turístico: resolver una consulta o un seguimiento sin viajar hasta la capital provincial.",
      },
      {
        question: "¿Cubre también fuera del circuito de las Cataratas del Iguazú?",
        answer:
          "Sí, además de Puerto Iguazú, el servicio cubre toda la Provincia de Misiones, incluida la zona productora de yerba mate y las ruinas jesuíticas.",
      },
      {
        question: "¿Atienden turistas que visitan las ruinas de San Ignacio?",
        answer:
          "Sí, no hace falta ser residente de la provincia para pedir la teleconsulta.",
      },
    ],
    related: ["puerto-iguazu"],
  },
  {
    slug: "chaco",
    name: "Chaco",
    type: "provincia",
    region: "Provincia del Chaco",
    seoDescription:
      "Teleconsulta médica en toda la Provincia del Chaco: Resistencia y el interior chaqueño. Médico matriculado por videollamada al mismo precio en toda la provincia.",
    intro: [
      "El Chaco tiene un territorio extenso y mayormente rural, con Resistencia concentrando la mayor oferta de especialistas de la provincia y localidades del interior -Sáenz Peña, Villa Ángela, Charata- donde acceder a esa misma consulta implica horas de viaje. Las altas temperaturas del verano chaqueño también generan consultas puntuales por golpes de calor y deshidratación que se pueden orientar por videollamada.",
      "La provincia tiene además comunidades rurales distribuidas en el interior, con menor cercanía a centros de salud con especialistas. La teleconsulta no sustituye la atención primaria local, pero suma una alternativa para consultas generales y seguimientos sin el traslado hasta Resistencia.",
    ],
    highlights: ["Resistencia", "Sáenz Peña", "Villa Ángela", "Interior rural chaqueño"],
    faqs: [
      {
        question: "¿Sirve para localidades del interior chaqueño lejos de Resistencia?",
        answer:
          "Sí, es uno de los usos más frecuentes fuera de la capital provincial: resolver una consulta sin viajar hasta Resistencia.",
      },
      {
        question: "¿Atienden consultas por golpe de calor en verano?",
        answer:
          "Sí, el médico evalúa el cuadro por videollamada y te indica cómo proceder; si el caso requiere atención presencial urgente, te lo va a indicar también.",
      },
      {
        question: "¿El precio cambia entre Resistencia y el interior de la provincia?",
        answer: "No, el precio de la teleconsulta es el mismo en toda la Provincia del Chaco.",
      },
    ],
    related: ["corrientes"],
  },
  {
    slug: "corrientes",
    name: "Corrientes",
    type: "provincia",
    region: "Provincia de Corrientes",
    seoDescription:
      "Teleconsulta médica en toda la Provincia de Corrientes: capital, Esteros del Iberá e interior ganadero. Médico matriculado por videollamada al mismo precio.",
    intro: [
      "Corrientes Capital concentra buena parte de la oferta médica de la provincia, mientras que el interior -de fuerte tradición ganadera, con estancias y localidades chicas distribuidas en un territorio extenso- tiene menos especialistas puntuales disponibles. La teleconsulta acerca esa consulta a quienes viven o trabajan lejos de la capital provincial.",
      "La provincia también recibe turismo de naturaleza hacia los Esteros del Iberá, uno de los humedales más grandes del mundo, con localidades de acceso como Colonia Carlos Pellegrini bastante alejadas de cualquier centro urbano grande. Para un visitante alojado en la zona, la teleconsulta es la opción más rápida ante un cuadro que no requiere examen físico presencial.",
    ],
    highlights: ["Corrientes Capital", "Esteros del Iberá", "Colonia Carlos Pellegrini", "Interior ganadero correntino"],
    faqs: [
      {
        question: "¿Sirve para quienes están alojados cerca de los Esteros del Iberá?",
        answer:
          "Sí, mientras tengas conexión a internet en tu alojamiento podés pedir la teleconsulta sin necesidad de viajar a un centro urbano grande.",
      },
      {
        question: "¿Atienden el interior ganadero, lejos de Corrientes Capital?",
        answer:
          "Sí, el servicio cubre toda la provincia por igual, incluidas las localidades y estancias del interior.",
      },
      {
        question: "¿El precio es distinto en el interior que en la capital?",
        answer: "No, el precio de la teleconsulta es el mismo en toda la Provincia de Corrientes.",
      },
    ],
    related: ["chaco"],
  },

  // ───────────────────────── Ciudades turísticas ─────────────────────────
  {
    slug: "bariloche",
    name: "Bariloche",
    type: "ciudad",
    region: "San Carlos de Bariloche, Río Negro",
    seoDescription:
      "Teleconsulta médica para turistas y residentes de Bariloche. Hablá con un médico matriculado por videollamada sin perder tu día de vacaciones o esquí.",
    intro: [
      "Bariloche recibe turismo prácticamente todo el año -esquí y nieve en invierno, trekking y lagos en verano- y eso significa que buena parte de las consultas que llegan de la ciudad son de visitantes lejos de su obra social o su médico de siempre: un cuadro gripal en medio de la semana de esquí, un malestar después de una excursión larga, una consulta por altura o por el cambio brusco de clima. Resolverlo por teleconsulta evita perder un día de vacaciones en una guardia sin conocer la ciudad.",
      "También hay una población estable que vive en Bariloche todo el año y que, como en cualquier ciudad turística, convive con una demanda de salud que se dispara en temporada alta. Para esos vecinos, la teleconsulta es una forma de conseguir una consulta rápida sin competir con la demanda extra de los visitantes.",
    ],
    highlights: [
      "Centro cívico y km 0",
      "Circuito Chico y Cerro Catedral",
      "Villa La Angostura (cercana)",
      "Zona de lagos y trekking",
    ],
    faqs: [
      {
        question: "¿Sirve si me enfermo durante mis vacaciones en Bariloche?",
        answer:
          "Sí, es uno de los usos más frecuentes: turistas que se descomponen durante su estadía y prefieren resolver la consulta por videollamada antes de perder un día de vacaciones en una guardia.",
      },
      {
        question: "¿Atienden consultas relacionadas con la altura o el frío durante la temporada de esquí?",
        answer:
          "Sí, el médico evalúa tu cuadro por videollamada y te indica cómo proceder; si corresponde, emite receta o certificado con firma digital al finalizar la consulta.",
      },
      {
        question: "¿Los vecinos de Bariloche también pueden usar la teleconsulta, no solo los turistas?",
        answer:
          "Sí, el servicio está disponible para cualquier persona en Bariloche durante todo el año, sea residente o esté de visita.",
      },
    ],
    related: ["rio-negro", "neuquen", "el-calafate"],
  },
  {
    slug: "ushuaia",
    name: "Ushuaia",
    type: "ciudad",
    region: "Ushuaia, Tierra del Fuego",
    seoDescription:
      "Teleconsulta médica en Ushuaia para turistas y residentes. Médico matriculado por videollamada, sin depender de la única guardia disponible en la ciudad.",
    intro: [
      "Ushuaia es la ciudad más austral del país y un punto de partida habitual para cruceros y expediciones a la Antártida, lo que suma a la población estable un flujo constante de turistas de paso, muchas veces por pocos días. Para un viajero que llega enfermo, se resfría por el clima o necesita renovar una medicación antes de embarcar, la teleconsulta evita depender de la disponibilidad de la guardia local en una ventana de tiempo muy corta.",
      "La distancia con el resto del país también pesa para los residentes: Ushuaia tiene menos oferta de especialistas puntuales que una capital de provincia grande, y trasladarse implica un vuelo. La teleconsulta no reemplaza esos casos, pero sí cubre consultas generales, seguimientos y renovación de recetas sin ese viaje.",
    ],
    highlights: [
      "Puerto de Ushuaia y zona de cruceros",
      "Tren del Fin del Mundo",
      "Glaciar Martial",
      "Parque Nacional Tierra del Fuego (cercano)",
    ],
    faqs: [
      {
        question: "¿Sirve si estoy de paso por Ushuaia antes de embarcar a la Antártida?",
        answer:
          "Sí, podés pedir la teleconsulta en el tiempo acotado que tengas en tierra, sin depender de conseguir turno o esperar en una guardia.",
      },
      {
        question: "¿Los residentes de Ushuaia pueden usarla para no viajar por una consulta general?",
        answer:
          "Sí, es uno de los usos más habituales: resolver una consulta general, un seguimiento o una renovación de receta sin necesidad de un vuelo a otra ciudad.",
      },
      {
        question: "¿El precio de la teleconsulta en Ushuaia es distinto al del resto del país?",
        answer:
          "No, el precio es el mismo en toda Argentina, incluida Tierra del Fuego, y se muestra en la app antes de confirmar el pedido.",
      },
    ],
    related: ["el-calafate", "rio-negro"],
  },
  {
    slug: "el-calafate",
    name: "El Calafate",
    type: "ciudad",
    region: "El Calafate, Santa Cruz",
    seoDescription:
      "Teleconsulta médica en El Calafate para turistas y residentes. Médico matriculado por videollamada sin perder tu excursión al Glaciar Perito Moreno.",
    intro: [
      "El Calafate vive del turismo del Glaciar Perito Moreno y el Parque Nacional Los Glaciares, con una población estable chica frente a un volumen de visitantes que la multiplica varias veces en temporada alta. Eso hace que la oferta médica local, aunque existe, pueda saturarse justo cuando más turistas la necesitan: golpes de frío, indigestiones, cuadros gripales en medio de una excursión de varios días.",
      "Para un viajero alojado en la ciudad por poco tiempo, perder medio día de la estadía en una guardia puede significar perderse la excursión que motivó el viaje. La teleconsulta resuelve lo que no necesita examen físico presencial sin ese costo, y para los residentes es una alternativa cuando la demanda turística satura los turnos locales.",
    ],
    highlights: [
      "Glaciar Perito Moreno",
      "Parque Nacional Los Glaciares",
      "Laguna Nimez",
      "Centro de El Calafate",
    ],
    faqs: [
      {
        question: "¿Sirve si me descompongo durante una excursión al Glaciar Perito Moreno?",
        answer:
          "Sí, podés pedir la teleconsulta apenas tengas señal y conexión a internet, sin necesidad de interrumpir el resto del viaje si el cuadro lo permite.",
      },
      {
        question: "¿La demanda turística de El Calafate afecta la disponibilidad de la teleconsulta?",
        answer:
          "No, a diferencia de los turnos presenciales locales, la teleconsulta no depende de la oferta médica de la ciudad sino de los médicos disponibles en la app.",
      },
      {
        question: "¿Puedo renovar una medicación habitual estando de viaje en El Calafate?",
        answer:
          "Sí, si el médico lo considera pertinente después de evaluar tu situación, puede emitir la receta con firma digital al finalizar la videollamada.",
      },
    ],
    related: ["ushuaia", "bariloche"],
  },
  {
    slug: "puerto-iguazu",
    name: "Puerto Iguazú",
    type: "ciudad",
    region: "Puerto Iguazú, Misiones",
    seoDescription:
      "Teleconsulta médica en Puerto Iguazú para turistas y residentes, cerca de las Cataratas. Médico matriculado por videollamada, mismo precio que en el resto del país.",
    intro: [
      "Puerto Iguazú recibe cada año a cientos de miles de visitantes que llegan a conocer las Cataratas del Iguazú, muchos de ellos con una estadía de uno o dos días antes de seguir viaje a Brasil o Paraguay. El calor, la humedad y las largas caminatas por el Parque Nacional generan consultas frecuentes por golpes de calor, deshidratación o indigestión que un viajero prefiere resolver sin perder esas horas contadas de recorrido.",
      "Al ser una ciudad de triple frontera con alto movimiento de turismo internacional, también hay consultas de visitantes que no tienen cobertura médica válida en Argentina. La teleconsulta se paga de forma particular, sin depender de una obra social local, lo que la vuelve una opción simple para quien está de paso.",
    ],
    highlights: [
      "Cataratas del Iguazú (Parque Nacional Iguazú)",
      "Hito Tres Fronteras",
      "Centro de Puerto Iguazú",
      "Zona hotelera cercana al parque",
    ],
    faqs: [
      {
        question: "¿Sirve si me descompongo durante la visita a las Cataratas?",
        answer:
          "Sí, podés pedir la teleconsulta desde tu alojamiento o donde tengas conexión, para no perder más tiempo de recorrido del necesario.",
      },
      {
        question: "¿Puedo usarla si soy turista extranjero sin cobertura médica en Argentina?",
        answer:
          "Sí, la teleconsulta se paga de forma particular y no depende de tener una obra social o prepaga argentina.",
      },
      {
        question: "¿Atienden consultas por golpe de calor o deshidratación, frecuentes en la zona?",
        answer:
          "Sí, el médico evalúa el cuadro por videollamada y te indica cómo proceder; si el caso requiere atención presencial urgente, te lo va a indicar también.",
      },
    ],
    related: ["misiones", "santa-fe"],
  },
  {
    slug: "mar-del-plata",
    name: "Mar del Plata",
    type: "ciudad",
    region: "Mar del Plata, Buenos Aires",
    seoDescription:
      "Teleconsulta médica en Mar del Plata para turistas y residentes. Médico matriculado por videollamada, disponible también en temporada alta de verano.",
    intro: [
      "Mar del Plata multiplica su población varias veces en enero y febrero, y esa temporada alta también satura los turnos y las guardias de la ciudad justo cuando más gente de paso los necesita. Para un turista alojado por una semana, un cuadro gripal, una insolación o una indigestión resuelta por teleconsulta significa no perder días de playa haciendo fila en una guardia colapsada.",
      "Fuera de temporada, Mar del Plata funciona como cualquier ciudad grande de la Provincia de Buenos Aires: una población estable importante que a veces no consigue turno rápido con su cobertura. En ambos escenarios, la teleconsulta ofrece una alternativa inmediata para lo que no requiere examen físico presencial.",
    ],
    highlights: [
      "Playas del centro y La Perla",
      "Puerto de Mar del Plata",
      "Zona de Playa Grande",
      "Centro y peatonal San Martín",
    ],
    faqs: [
      {
        question: "¿La teleconsulta ayuda en temporada alta de verano en Mar del Plata?",
        answer:
          "Sí, es uno de los momentos donde más se usa: evita las guardias y turnos saturados por el aumento de población en enero y febrero.",
      },
      {
        question: "¿Sirve para turistas alojados por pocos días en la ciudad?",
        answer:
          "Sí, no hace falta ser residente de Mar del Plata; podés pedir la teleconsulta desde tu alojamiento durante toda la estadía.",
      },
      {
        question: "¿Atienden fuera de temporada, en otoño o invierno?",
        answer:
          "Sí, la teleconsulta está disponible todo el año en Mar del Plata, no solo en la temporada de verano.",
      },
    ],
    related: ["buenos-aires", "villa-gesell"],
  },
  {
    slug: "villa-carlos-paz",
    name: "Villa Carlos Paz",
    type: "ciudad",
    region: "Villa Carlos Paz, Córdoba",
    seoDescription:
      "Teleconsulta médica en Villa Carlos Paz para turistas y residentes. Médico matriculado por videollamada, disponible también en temporada de teatro de verano.",
    intro: [
      "Villa Carlos Paz es uno de los destinos turísticos más elegidos de las sierras cordobesas, con una temporada de verano marcada por el teatro de revista, el lago San Roque y una población que se multiplica varias veces entre diciembre y marzo. Esa temporada alta genera consultas de visitantes por golpes de calor, indigestión o cuadros gripales que preferirían no resolver perdiendo una noche de espectáculos.",
      "El resto del año, la ciudad tiene una población estable que -como en otras localidades serranas- cuenta con menos especialistas puntuales que Córdoba Capital, a poco más de 30 minutos en auto. La teleconsulta cubre esa distancia para consultas generales y seguimientos sin necesidad de viajar a la capital provincial.",
    ],
    highlights: [
      "Lago San Roque",
      "Zona de teatros y avenida San Martín",
      "Reloj Cucú",
      "Cerro de la Cruz",
    ],
    faqs: [
      {
        question: "¿Sirve si estoy de vacaciones en Villa Carlos Paz durante la temporada de teatro?",
        answer:
          "Sí, podés resolver la consulta por videollamada desde tu alojamiento sin perder tu noche de espectáculos ni un día de playa en el lago.",
      },
      {
        question: "¿Los vecinos de Carlos Paz también pueden pedirla, no solo los turistas?",
        answer:
          "Sí, está disponible todo el año para cualquier persona en la ciudad, sea residente o esté de visita.",
      },
      {
        question: "¿Necesito viajar a Córdoba Capital para una consulta con especialista?",
        answer:
          "Para muchas consultas generales y seguimientos, no: la teleconsulta te conecta con un médico matriculado sin salir de Villa Carlos Paz.",
      },
    ],
    related: ["cordoba"],
  },
  {
    slug: "cafayate",
    name: "Cafayate",
    type: "ciudad",
    region: "Cafayate, Salta",
    seoDescription:
      "Teleconsulta médica en Cafayate para turistas y residentes de los valles calchaquíes. Médico matriculado por videollamada, mismo precio que en el resto del país.",
    intro: [
      "Cafayate es el corazón turístico de los valles calchaquíes salteños, conocido por sus bodegas de altura y la Quebrada de las Conchas, y recibe visitantes durante buena parte del año que llegan tras varias horas de ruta desde Salta capital o Tucumán. Para un turista que se descompone en medio de ese circuito, la teleconsulta evita tener que decidir entre seguir el viaje enfermo o volver a la ciudad más cercana con guardia.",
      "Para quienes viven en Cafayate y los pueblos cercanos de los valles calchaquíes, la oferta de especialistas puntuales es limitada y suele requerir viajar a Salta capital. La teleconsulta no reemplaza una urgencia real, pero cubre consultas generales, seguimientos y renovación de recetas sin ese viaje.",
    ],
    highlights: [
      "Bodegas de altura de Cafayate",
      "Quebrada de las Conchas",
      "Plaza principal y centro histórico",
      "Ruta de los valles calchaquíes",
    ],
    faqs: [
      {
        question: "¿Sirve si me descompongo recorriendo bodegas o la Quebrada de las Conchas?",
        answer:
          "Sí, mientras tengas conexión a internet podés pedir la teleconsulta desde donde estés en el circuito.",
      },
      {
        question: "¿Los residentes de Cafayate necesitan viajar a Salta capital para una consulta simple?",
        answer:
          "No siempre: para consultas generales, seguimientos o renovación de receta, la teleconsulta evita ese viaje.",
      },
      {
        question: "¿El precio de la teleconsulta en Cafayate es distinto al de Salta capital?",
        answer:
          "No, el precio es el mismo en toda la Provincia de Salta y en el resto del país.",
      },
    ],
    related: ["salta", "tucuman"],
  },
  {
    slug: "puerto-madryn",
    name: "Puerto Madryn",
    type: "ciudad",
    region: "Puerto Madryn, Chubut",
    seoDescription:
      "Teleconsulta médica en Puerto Madryn para turistas y residentes. Médico matriculado por videollamada durante la temporada de avistaje de ballenas.",
    intro: [
      "Puerto Madryn es la puerta de entrada a Península Valdés y su temporada de avistaje de ballena franca austral, que entre junio y diciembre multiplica la cantidad de visitantes en la ciudad. Muchos llegan por pocos días para hacer buceo, snorkel con lobos marinos o excursiones a la península, y un cuadro gripal o una descompostura en medio de esa agenda ajustada se resuelve mejor por videollamada que perdiendo un día completo en una guardia.",
      "Fuera de temporada, Puerto Madryn tiene una población estable vinculada a la industria pesquera y a la planta de aluminio de la zona, con una oferta de especialistas más chica que en Trelew o Rawson. La teleconsulta cubre esa distancia para consultas generales y seguimientos.",
    ],
    highlights: ["Península Valdés", "Playa El Doradillo", "Costanera de Puerto Madryn", "Punta Loma"],
    faqs: [
      {
        question: "¿Sirve si me descompongo durante una excursión de avistaje de ballenas?",
        answer:
          "Sí, podés pedir la teleconsulta apenas tengas conexión a internet, sin perder el resto del día de excursión si el cuadro lo permite.",
      },
      {
        question: "¿Atienden a buceadores o a quienes hacen snorkel con lobos marinos?",
        answer:
          "Sí, el médico evalúa tu cuadro por videollamada y te indica cómo proceder después de una salida de buceo o snorkel.",
      },
      {
        question: "¿Funciona igual fuera de la temporada de ballenas?",
        answer: "Sí, la teleconsulta está disponible todo el año en Puerto Madryn, no solo en temporada de avistaje.",
      },
    ],
    related: ["ushuaia", "el-calafate"],
  },
  {
    slug: "tigre",
    name: "Tigre",
    type: "ciudad",
    region: "Tigre, Buenos Aires",
    seoDescription:
      "Teleconsulta médica en Tigre y el Delta del Paraná para turistas y residentes de las islas. Médico matriculado por videollamada, sin depender de una lancha.",
    intro: [
      "Tigre es un destino de escapada de fin de semana muy elegido por quienes viven en CABA y el conurbano, con mucho movimiento turístico en el Puerto de Frutos y los recorridos en lancha por el Delta. Buena parte de las consultas de la zona son de visitantes de paso por el día que prefieren resolver un cuadro simple por videollamada sin cortar el paseo.",
      "Lo particular de Tigre es su zona de islas: miles de personas viven o tienen su casa de fin de semana en el Delta, donde llegar a un centro de salud implica coordinar una lancha y no es inmediato. Para esos residentes isleños, la teleconsulta es especialmente útil: resuelve por videollamada lo que de otra forma exigiría un viaje en lancha hasta el continente.",
    ],
    highlights: ["Puerto de Frutos", "Delta del Paraná (islas)", "Parque de la Costa", "Estación fluvial de Tigre"],
    faqs: [
      {
        question: "¿Sirve para quienes viven en las islas del Delta?",
        answer:
          "Sí, es uno de los usos más valiosos en la zona: evita el viaje en lancha hasta el continente para una consulta que no requiere examen físico presencial.",
      },
      {
        question: "¿Atienden a turistas que van de paseo por el día a Tigre?",
        answer: "Sí, podés pedir la teleconsulta desde el Puerto de Frutos o donde estés en la zona si necesitás resolver algo simple.",
      },
      {
        question: "¿Necesito buena señal de internet en la isla para usar la teleconsulta?",
        answer:
          "Alcanza con una conexión a internet básica; no hace falta más que eso para conectarte por videollamada con el médico.",
      },
    ],
    related: ["buenos-aires"],
  },
  {
    slug: "villa-gesell",
    name: "Villa Gesell",
    type: "ciudad",
    region: "Villa Gesell, Buenos Aires",
    seoDescription:
      "Teleconsulta médica en Villa Gesell para turistas y residentes. Médico matriculado por videollamada, disponible también en temporada alta de verano.",
    intro: [
      "Villa Gesell es uno de los balnearios más elegidos por un público joven y familiar, con una temporada de verano que multiplica varias veces su población entre diciembre y febrero, entre camping, hostels y alquileres temporarios. Esa temporada alta también genera consultas frecuentes de visitantes por insolación, indigestión o cuadros gripales, que preferirían no perder un día de playa haciendo fila en una guardia saturada.",
      "Fuera de temporada, Villa Gesell tiene una población estable más chica que Mar del Plata, con menos oferta de especialistas puntuales durante el resto del año. La teleconsulta cubre esa distancia tanto para los vecinos como para quien visita la ciudad en un fin de semana largo fuera de enero y febrero.",
    ],
    highlights: ["Playa y balneario Villa Gesell", "Paseo 104 y 105", "Zona de camping y hostels", "Bosque forestado del centro"],
    faqs: [
      {
        question: "¿La teleconsulta ayuda en la temporada alta de enero y febrero?",
        answer:
          "Sí, es uno de los momentos donde más se usa: evita las guardias y turnos saturados por el aumento de población en esos meses.",
      },
      {
        question: "¿Sirve para quienes se alojan en camping o albergues?",
        answer: "Sí, no hace falta un domicilio fijo: podés pedir la teleconsulta desde donde tengas conexión a internet.",
      },
      {
        question: "¿Atienden fuera de la temporada de verano?",
        answer: "Sí, la teleconsulta está disponible todo el año en Villa Gesell, no solo en temporada alta.",
      },
    ],
    related: ["mar-del-plata"],
  },
];

export function getLocationBySlug(slug: string): TeleconsultaLocation | undefined {
  return TELECONSULTA_LOCATIONS.find((location) => location.slug === slug);
}

export function getAllLocationSlugs(): string[] {
  return TELECONSULTA_LOCATIONS.map((location) => location.slug);
}

export function getRelatedLocations(location: TeleconsultaLocation): TeleconsultaLocation[] {
  return location.related
    .map((slug) => getLocationBySlug(slug))
    .filter((item): item is TeleconsultaLocation => Boolean(item));
}

export function getLocationsByType(type: TeleconsultaLocationType): TeleconsultaLocation[] {
  return TELECONSULTA_LOCATIONS.filter((location) => location.type === type);
}
