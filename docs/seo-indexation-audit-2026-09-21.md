# Auditoría de indexación SEO — 21 de septiembre de 2026

## Diagnóstico de landings prioritarias

Las URLs prioritarias verificadas en producción responden `200`, incluyen contenido y H1 en el HTML inicial, declaran `index, follow` y usan canonical HTTPS absoluto propio. Están permitidas por `robots.txt` y aparecen una sola vez en el sitemap. Para estas URLs, el estado “Descubierta: actualmente sin indexar” no evidencia un problema técnico; corresponde esperar el rastreo de Google y sostener el enlazado interno.

| URL | Canonical | Estado técnico |
|---|---|---|
| `/medico-online` | propia | Indexable, enlazada desde navegación, home y páginas relacionadas |
| `/certificado-medico-online` | propia | Indexable y enlazada desde el cluster de documentos |
| `/certificado-medico-laboral` | propia | Indexable y enlazada desde certificado médico |
| `/receta-medica-online` | propia | Indexable y enlazada desde médico online, certificados y órdenes |
| `/orden-medica-online` | propia | Indexable y enlazada desde médico online, recetas y certificados |
| `/medico-a-domicilio-caba` | propia | Indexable; pilar del cluster de domicilio |
| `/medico-a-domicilio-particular` | propia | Indexable; intención particular/sin cobertura |
| `/doctor-in-buenos-aires` | propia | Indexable; pilar en inglés para turistas |
| `/doctor-at-hotel-buenos-aires` | propia | Indexable; intención presencial en alojamiento |
| `/teleconsulta-turistas` | propia | Indexable; intención turística en español |

## Páginas funcionales

`/pedir/livekit-demo` y `/pedir/invitar` no aportan una intención de búsqueda comercial. Se retiraron del sitemap y ahora publican `noindex, follow` mediante metadata y `X-Robots-Tag`. No se bloquearon en `robots.txt`, para que Google pueda rastrear y detectar el `noindex`.

`/pedir` conserva canonical limpio propio. Sus variantes con `tipo`, UTM u otros parámetros heredan `https://www.docya.com.ar/pedir`, por lo que no crean páginas independientes. La home mantiene canonical `/` ante parámetros de tracking.

## Auditoría de barrios

La URL pública oficial es plana: `/medico-a-domicilio-{barrio}`. La variante interna `/medico-a-domicilio/{barrio}` responde `200` por la arquitectura de Next.js, pero declara canonical hacia la URL plana. Google puede clasificar correctamente la variante con slash como alternativa con canonical adecuada. No se modificaron estos canonicals.

Todas las páginas comparten la estructura visual, beneficios generales y CTA. Cada una aporta dos párrafos locales, referencias geográficas, preguntas frecuentes y enlaces a barrios cercanos. El contenido estructural compartido es aproximadamente 55–65%; el bloque local suele aportar alrededor de 170–280 palabras. La candidatura futura exige validar demanda y calidad de los claims locales antes de cambiar la estrategia.

| Barrio / URL plana | Canonical actual | Contenido local | Enlaces internos | Clasificación | Riesgo doorway |
|---|---|---|---|---|---|
| Palermo | propia plana | Alto: subzonas, accesos, vida nocturna y referencias | CABA + cercanos | A | Medio |
| Belgrano | propia plana | Alto: referencias y contexto barrial | CABA + cercanos | A | Medio |
| Caballito | propia plana | Alto: contexto residencial y referencias | CABA + cercanos | A | Medio |
| Recoleta | propia plana | Alto: turismo, edificios y referencias | CABA + cercanos | A | Medio |
| Núñez | propia plana | Medio: contexto y referencias locales | CABA + cercanos | B | Medio/alto |
| Almagro | propia plana | Medio: contexto residencial local | CABA + cercanos | B | Medio/alto |
| Boedo | propia plana | Alto: contexto barrial y referencias diferenciadas | CABA + cercanos | A | Medio |
| Villa Crespo | propia plana | Medio: contexto y referencias locales | CABA + cercanos | B | Medio/alto |
| Villa Urquiza | propia plana | Medio: contexto residencial | CABA + cercanos | B | Medio/alto |
| Colegiales | propia plana | Medio: contexto residencial | CABA + cercanos | B | Medio/alto |
| San Telmo | propia plana | Alto: turismo, casco histórico y alojamientos | CABA + cercanos | A | Medio |
| Puerto Madero | propia plana | Alto: hoteles, torres y accesos particulares | CABA + cercanos | A | Medio |
| Monserrat | propia plana | Medio: contexto céntrico | CABA + cercanos | B | Medio/alto |
| Flores | propia plana | Alto: extensión, diversidad y referencias | CABA + cercanos | A | Medio |
| Floresta | propia plana | Medio: contexto residencial | CABA + cercanos | B | Alto |
| Liniers | propia plana | Alto: estación, estadio y tránsito | CABA + cercanos | A | Medio |
| Mataderos | propia plana | Alto: feria, eventos y contexto barrial | CABA + cercanos | A | Medio |
| Villa Devoto | propia plana | Medio: contexto residencial | CABA + cercanos | B | Medio/alto |
| Villa del Parque | propia plana | Medio: contexto residencial | CABA + cercanos | B | Alto |
| Chacarita | propia plana | Alto: mezcla residencial y nocturna | CABA + cercanos | A | Medio |
| Parque Patricios | propia plana | Alto: Distrito Tecnológico y contexto local | CABA + cercanos | A | Medio |

**A — candidata futura:** tiene diferenciación local suficiente para estudiar indexación y demanda individual, sin que esta auditoría cambie canonical alguno.

**B — mantener estrategia actual y revisar más adelante:** la diferencia local existe, pero el riesgo de página doorway o contenido repetitivo es mayor.

**C — eliminar/no usar para SEO:** ninguna se clasifica aquí por ahora; antes de retirar una URL hacen falta datos de impresiones, enlaces y conversiones.
