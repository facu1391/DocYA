import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, Globe2, MapPin, Network, Stethoscope, Wallet } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";

const advantages = [
  { icon: MapPin, title: "Disponibilidad que se convierte en atención", text: "La ubicación y el estado de conexión permiten buscar al profesional cercano que puede atender ahora. El paciente accede a una oferta activa y el médico recibe una oportunidad concreta de trabajo." },
  { icon: Bot, title: "IA dentro del recorrido completo", text: "La IA orienta al paciente antes de pedir atención y lo acompaña mientras espera. Después, ayuda al médico a transformar el dictado en un borrador de historia clínica. El profesional conserva la decisión clínica." },
  { icon: Network, title: "Continuidad que hace más útil la red", text: "La atención genera una historia y documentos que el paciente conserva en su app. La próxima consulta puede partir de ese contexto: pedir atención y guardar lo que ocurrió forman parte de la misma experiencia." },
];

export function MarketplaceModel() {
  return (
    <section id="modelo" className="bg-[var(--background)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <span className="badge-trusted">El modelo, explicado</span>
          <h2 className="section-title mt-4 text-foreground">Una comunidad de médicos independientes. Una red disponible a demanda.</h2>
          <p className="mt-5 text-lg leading-relaxed text-text-muted">DocYa conecta dos necesidades: pacientes que buscan atención y profesionales que quieren aprovechar su disponibilidad. Cada médico decide cuándo conectarse y qué consultas aceptar; DocYa coordina la solicitud, la ubicación, la comunicación y la continuidad digital.</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">Qué significa la experiencia Uber</p>
              <h3 className="mt-3 text-2xl font-bold text-foreground">Pedir, encontrar disponibilidad y seguir la atención desde el teléfono.</h3>
              <p className="mt-4 leading-relaxed text-text-muted">Para una visita, el paciente indica su domicilio. La app busca al médico más cercano que esté conectado y disponible, le presenta la solicitud y el profesional decide si la acepta. El paciente sigue el estado de la visita y la ubicación del médico en camino. Para atención online, el encuentro se realiza por teleconsulta.</p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] p-4"><Stethoscope className="h-5 w-5 text-[var(--brand)]" /><p className="mt-3 font-semibold text-foreground">El médico aporta la atención</p><p className="mt-2 text-sm leading-relaxed text-text-muted">Su tiempo, experiencia y decisiones clínicas. La disponibilidad la elige él.</p></div>
                <div className="rounded-2xl bg-[color-mix(in_srgb,var(--brand)_8%,transparent)] p-4"><Wallet className="h-5 w-5 text-[var(--brand)]" /><p className="mt-3 font-semibold text-foreground">DocYa aporta la coordinación</p><p className="mt-2 text-sm leading-relaxed text-text-muted">Conecta demanda con oferta y reúne solicitudes, comunicación, cobros y documentación.</p></div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={.1}>
            <figure className="rounded-[2rem] bg-[#0a272c] px-5 pb-6 pt-8">
              <div className="flex items-end justify-center gap-3 sm:gap-5">
                <Image src="/how/experiencia2.png" alt="DocYa Pro: el médico activa su disponibilidad en el mapa" width={477} height={976} sizes="(max-width: 640px) 42vw, 200px" className="h-auto w-[43%] max-w-[195px] drop-shadow-xl" />
                <Image src="/how/experiencia3.png" alt="DocYa Pro: solicitud con ubicación, motivo y opción de aceptar o rechazar" width={474} height={970} sizes="(max-width: 640px) 42vw, 200px" className="h-auto w-[43%] max-w-[195px] translate-y-3 drop-shadow-xl" />
              </div>
              <figcaption className="mt-7 text-center text-sm text-white/70">Conectarse cuando quiera. Recibir una solicitud cercana. Elegir atenderla.</figcaption>
            </figure>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-20 max-w-3xl">
          <span className="badge-trusted">Nuestra apuesta</span>
          <h2 className="mt-4 text-3xl font-bold text-foreground md:text-4xl">La innovación está en conectar todo el recorrido.</h2>
          <p className="mt-4 text-lg leading-relaxed text-text-muted">Nuestra tesis es que el acceso mejora cuando disponibilidad médica, cercanía y herramientas clínicas funcionan juntas. DocYa combina el encuentro a demanda con la documentación y el seguimiento que hacen falta después de atender.</p>
        </ScrollReveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {advantages.map(({ icon: Icon, title, text }, index) => <ScrollReveal key={title} delay={index * .06}><article className="glass-card h-full rounded-3xl p-6"><Icon className="h-6 w-6 text-[var(--brand)]" /><h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-text-muted">{text}</p></article></ScrollReveal>)}
        </div>
      </div>
    </section>
  );
}

export function RegionalThesis() {
  return (
    <section id="expansion" className="bg-[var(--background)] px-6 py-24 md:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="badge-trusted"><Globe2 className="h-4 w-4" />Visión regional</span>
            <h2 className="section-title mt-4 text-foreground">Un problema de las Américas. Una expansión ciudad por ciudad.</h2>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">Las barreras de acceso y la fragmentación de la atención son desafíos regionales documentados por la OPS. La oportunidad de DocYa es acercar atención para consultas que pueden resolverse a domicilio u online, con una experiencia simple y continuidad clínica.</p>
            <a href="https://www.paho.org/en/documents/analyzing-and-overcoming-access-barriers-strengthen-primary-health-care" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-xs font-medium text-[var(--brand)] underline underline-offset-4">Contexto regional: OPS, barreras de acceso a la atención primaria</a>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 md:p-9">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand)]">Argentina como punto de partida</p>
            <h3 className="mt-3 text-2xl font-bold text-foreground">Primero una red confiable en cada ciudad. Después, replicar el modelo.</h3>
            <p className="mt-4 leading-relaxed text-text-muted">La visión es crecer en América Latina y, con el tiempo, explorar otros mercados de las Américas. Cada nueva ciudad necesita una comunidad local de profesionales, demanda suficiente y una operación que funcione. Cada país requiere adaptar habilitaciones, recetas, firma, privacidad y pagos a sus reglas.</p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { number: "01", title: "Concentrar la oferta", text: "Incorporar médicos independientes en zonas concretas y acompañarlos para que estén disponibles cuando hay demanda." },
            { number: "02", title: "Demostrar la experiencia", text: "Medir aceptación, tiempos de llegada, consultas completadas, satisfacción, repetición y margen por consulta." },
            { number: "03", title: "Replicar lo que funciona", text: "Expandir la red a otra ciudad cuando la operación y la economía local sean sostenibles. La teleconsulta complementa la cobertura presencial." },
          ].map(({ number, title, text }) => <ScrollReveal key={number}><article className="glass-card h-full rounded-3xl p-6"><p className="text-3xl font-bold text-[var(--brand)]">{number}</p><h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-text-muted">{text}</p></article></ScrollReveal>)}
        </div>

        <ScrollReveal className="mt-12 rounded-[2rem] bg-[#0a272c] p-7 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#4debd8]">Cómo puede fortalecerse la red</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div><h3 className="text-lg font-semibold">Más disponibilidad cercana</h3><p className="mt-2 text-sm leading-relaxed text-white/70">Puede mejorar la probabilidad de encontrar un profesional y reducir la espera.</p></div>
            <div><h3 className="text-lg font-semibold">Una experiencia que invita a volver</h3><p className="mt-2 text-sm leading-relaxed text-white/70">Consultas útiles y documentos accesibles pueden aumentar la repetición y las recomendaciones.</p></div>
            <div><h3 className="text-lg font-semibold">Más oportunidades para médicos</h3><p className="mt-2 text-sm leading-relaxed text-white/70">Más demanda local puede hacer que conectarse sea más atractivo para los profesionales.</p></div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/60">La ventaja que buscamos construir es la densidad de la red, la confianza en la atención y la utilidad diaria del producto. Este efecto debe demostrarse con uso y retención en cada mercado.</p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function YCombinatorCase() {
  return (
    <section id="yc" className="relative overflow-hidden bg-[#0a272c] px-6 py-24 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,179,166,.18),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal className="max-w-3xl">
          <span className="badge-trusted">La propuesta para Y Combinator</span>
          <h2 className="section-title mt-5 text-white">Invertir en una nueva forma de acceder a la atención médica.</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">DocYa reúne un problema cotidiano, un modelo de ingresos por atención y un producto que conecta pacientes, profesionales e IA. Buscamos que YC nos ayude a convertir esa base en una operación repetible que pueda crecer desde Argentina hacia América Latina.</p>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { title: "Una necesidad clara", text: "Cuando alguien necesita atención, encontrar un profesional cercano y disponible exige coordinación. DocYa permite pedirla y seguirla desde una app." },
            { title: "Un modelo que moviliza oferta", text: "Los médicos independientes eligen cuándo conectarse. La red aprovecha esa disponibilidad y les acerca oportunidades de generar ingresos adicionales." },
            { title: "Producto para todo el recorrido", text: "Geolocalización, teleconsulta, chat con IA, dictado clínico y documentación compartida dan utilidad antes, durante y después de la consulta." },
          ].map(({ title, text }) => <ScrollReveal key={title}><article className="h-full rounded-3xl border border-white/10 bg-white/[.045] p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p></article></ScrollReveal>)}
        </div>
        <div className="mt-10 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[.035] p-7 md:grid-cols-2 md:p-9">
          <div><h3 className="text-xl font-bold">Qué queremos acelerar con inversión</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/75"><li>Incorporar y activar más profesionales en las zonas con demanda.</li><li>Mejorar asignación, experiencia del paciente y herramientas clínicas con IA.</li><li>Medir adquisición, repetición y margen por consulta para sostener el crecimiento.</li><li>Preparar la expansión a nuevas ciudades y la adaptación del producto a cada país.</li></ul></div>
          <div><h3 className="text-xl font-bold">Qué debe demostrar la siguiente etapa</h3><p className="mt-4 text-sm leading-relaxed text-white/75">Que los pacientes reciben atención y vuelven; que los médicos encuentran valor en conectarse; y que la red puede crecer con una economía sostenible. La inversión debe traducirse en mejor cobertura, más consultas completadas y una operación que podamos repetir.</p><p className="mt-4 text-sm leading-relaxed text-white/60">La propuesta es construir una empresa regional a partir de evidencia local. El producto, la actividad real y la capacidad de ejecución son la base para evaluar esa oportunidad.</p></div>
        </div>
        <ScrollReveal className="mt-12 max-w-3xl">
          <p className="text-xl font-semibold leading-relaxed md:text-2xl">Buscamos inversión y acompañamiento para hacer que encontrar atención médica sea tan simple como pedir un servicio desde el teléfono.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="mailto:soporte@docya.com.ar?subject=Inversi%C3%B3n%20en%20DocYa" className="btn-primary h-12 px-6">Conversar sobre inversión <ArrowRight className="h-4 w-4" /></Link><Link href="/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/85 hover:bg-white/5">Conocer DocYa <ArrowRight className="h-4 w-4" /></Link></div>
          <p className="mt-6 text-xs text-white/45">DocYa · Construido en Argentina · Con visión para América Latina</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
