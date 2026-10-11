import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  MapPin,
  MessageCircle,
  Mic2,
  Navigation,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Video,
  Wallet,
  UserRound,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import InvestorAnalyticsLoader from "./investor-analytics-loader";

export const metadata: Metadata = {
  title: "DocYa para inversores | Atención médica bajo demanda",
  description:
    "DocYa conecta pacientes con médicos independientes cercanos y disponibles, con geolocalización, teleconsulta, continuidad clínica e inteligencia artificial.",
  alternates: { canonical: "/inversores" },
  openGraph: {
    title: "DocYa | La red de atención médica bajo demanda",
    description:
      "Una experiencia tipo Uber para la atención médica, conectada con software clínico e IA.",
    url: "/inversores",
  },
};

const flow = [
  { icon: Bot, title: "La IA orienta", text: "El paciente cuenta qué necesita. DocYa IA explica el servicio, ayuda a elegir teleconsulta o visita y reconoce señales que requieren atención urgente." },
  { icon: MapPin, title: "DocYa encuentra", text: "Para una visita, la app usa la ubicación y busca médicos cercanos que estén conectados y disponibles en ese momento." },
  { icon: Stethoscope, title: "El profesional acepta", text: "El médico independiente decide cuándo conectarse y qué solicitudes atender. El paciente puede seguir el estado y la ubicación durante el viaje." },
  { icon: FileText, title: "La consulta continúa", text: "El médico documenta con dictado por voz y asistencia de IA; puede emitir documentos y el paciente los consulta desde su app." },
];

const patientTools = [
  { icon: Bot, title: "Orientación con IA", text: "Un chat dentro de la app explica cómo funciona DocYa, ayuda a decidir qué canal de atención usar y orienta ante señales de posible emergencia." },
  { icon: MapPin, title: "Atención cercana", text: "Solicitud a domicilio con geolocalización, búsqueda de profesionales disponibles y seguimiento del estado de la visita." },
  { icon: Video, title: "Teleconsulta", text: "Atención por videollamada para pacientes que necesitan conversar con un profesional sin esperar una visita presencial." },
  { icon: FileCheck2, title: "Todo en su cuenta", text: "Historial de consultas, recetas, certificados y órdenes médicas disponibles desde la app del paciente." },
];

const proTools = [
  { icon: Clock3, title: "Trabajo flexible", text: "Cada profesional elige cuándo conectarse y puede aceptar o rechazar solicitudes según su disponibilidad." },
  { icon: Mic2, title: "Historia clínica por voz", text: "El médico dicta la evolución. La IA organiza la información en un borrador estructurado que el profesional revisa." },
  { icon: FileCheck2, title: "Documentación desde la app", text: "Recetas, certificados y órdenes médicas vinculadas al paciente, con la firma del profesional incorporada al documento." },
  { icon: Wallet, title: "Gestión profesional", text: "La app Pro reúne consultas, historial, tarifas, comisiones y pagos en un solo espacio." },
];

const businessLines = [
  { icon: Activity, label: "Marketplace de atención", text: "Ingresos por consulta o comisión por servicio, sujetos a los precios y condiciones vigentes en cada mercado." },
  { icon: Smartphone, label: "Software para clínicas", text: "Suscripción SaaS para agenda, pacientes, documentos, teleconsulta, gestión e IA clínica." },
  { icon: UsersRound, label: "Servicios conectados", text: "Farmacia, pagos, mensajería y otras integraciones que pueden ampliar el valor por paciente y profesional." },
];

const metrics = ["Solicitudes atendidas y consultas completadas", "Tiempo desde el pedido hasta la aceptación y la llegada", "Médicos activos y frecuencia de conexión", "Pacientes que vuelven y recomiendan DocYa", "Ingresos netos y margen por consulta", "Retención e ingresos recurrentes de clínicas"];

function SectionTitle({ eyebrow, title, subtitle, light = false }: { eyebrow: string; title: string; subtitle: string; light?: boolean }) {
  return (
    <ScrollReveal className="mx-auto max-w-3xl text-center">
      <span className="badge-trusted">{eyebrow}</span>
      <h2 className={`section-title mt-4 ${light ? "text-white" : "text-foreground"}`}>{title}</h2>
      <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-text-muted"}`}>{subtitle}</p>
    </ScrollReveal>
  );
}

export default function InvestorsPage() {
  return (
    <main className="font-[family-name:var(--font-poppins)] overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a272c]/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <Link href="/" aria-label="DocYa, inicio" className="flex items-center gap-2 text-white">
            <Image src="/logo_puclic-light.png" alt="DocYa" width={128} height={38} priority className="h-8 w-auto" />
            <span className="hidden rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/55 sm:inline">Inversores</span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <a className="text-sm text-white/75 hover:text-white" href="#experiencia">Cómo funciona</a>
            <a className="text-sm text-white/75 hover:text-white" href="#producto">Producto</a>
            <a className="text-sm text-white/75 hover:text-white" href="#oportunidad">Oportunidad</a>
          </div>
          <Link href="mailto:soporte@docya.com.ar?subject=Inversi%C3%B3n%20en%20DocYa" className="btn-primary h-10 px-4 text-sm">Conversemos <ArrowRight className="h-4 w-4" /></Link>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0a272c_0%,#071d21_78%,#0a272c_100%)] pb-24 pt-32 text-white md:pb-32 md:pt-40">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 18% 24%, rgba(0,179,166,.2), transparent 34%), radial-gradient(circle at 82% 16%, rgba(58,134,255,.15), transparent 34%)" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.06fr_.94fr]">
          <ScrollReveal>
            <span className="badge-trusted">Atención médica bajo demanda</span>
            <h1 className="hero-title mt-6 max-w-3xl text-white">La experiencia de Uber, aplicada a la atención médica.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">El paciente comparte dónde está. DocYa busca al médico más cercano que esté conectado y disponible. Profesionales independientes eligen cuándo trabajar; la tecnología coordina el encuentro y acompaña la atención.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Geolocalización en tiempo real", "Médicos independientes", "Domicilio + teleconsulta", "IA integrada"].map((item) => <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 sm:text-sm">{item}</span>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#experiencia" className="btn-primary h-12 px-6">Conocer la oportunidad <ArrowDown className="h-4 w-4" /></a>
              <Link href="/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/90 transition hover:bg-white/5">Visitar DocYa.com.ar <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <p className="mt-5 text-xs text-white/45">Una red de profesionales independientes, activada cuando ellos eligen conectarse.</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[510px] rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.15em] text-white/45">Solicitud activa</p><p className="mt-1 text-lg font-semibold text-white">Médico a domicilio</p></div><span className="flex items-center gap-2 rounded-full bg-[#00b3a6]/15 px-3 py-1.5 text-xs font-semibold text-[#52e7d9]"><span className="h-2 w-2 animate-pulse rounded-full bg-[#00d4c3]" />Buscando cerca</span></div>
              <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#102f35]">
                <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1776468713/Captura_de_pantalla_2026-04-09_144113-portrait_vagywd.png" alt="Pantalla de DocYa con seguimiento geolocalizado del profesional" width={800} height={1000} className="h-[300px] w-full object-cover object-center opacity-75 sm:h-[350px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d21]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a272c]/90 p-3 backdrop-blur-md"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#00b3a6]/15 text-[#4debd8]"><Navigation className="h-5 w-5" /></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-white">Profesional en camino</p><p className="text-xs text-white/55">Ubicación y estado desde la app</p></div><MapPin className="h-5 w-5 text-[#4debd8]" /></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[{ value: "01", label: "Ubicación" }, { value: "02", label: "Disponibilidad" }, { value: "03", label: "Asignación" }].map((item) => <div key={item.value} className="rounded-xl border border-white/10 bg-white/[.03] px-2 py-3"><p className="text-xs font-bold text-[#4debd8]">{item.value}</p><p className="mt-1 text-[11px] text-white/55">{item.label}</p></div>)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="problema" className="bg-[var(--background)] px-6 py-24 md:py-28">
        <SectionTitle eyebrow="El problema" title="Acceder a atención y organizarla sigue siendo difícil." subtitle="Pacientes y profesionales enfrentan fricciones distintas dentro de un mismo sistema fragmentado." />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { icon: UserRound, title: "Para el paciente", text: "Buscar un profesional, confirmar disponibilidad, explicar dónde está y coordinar la consulta puede implicar varias llamadas y herramientas." },
            { icon: Stethoscope, title: "Para el médico", text: "Conseguir pacientes y administrar solicitudes, traslados, cobros y documentos resta tiempo al trabajo clínico." },
            { icon: Activity, title: "Para el consultorio", text: "Agenda, historia clínica, mensajes, teleconsulta y finanzas suelen quedar repartidos entre sistemas y planillas." },
          ].map(({ icon: Icon, title, text }, i) => <ScrollReveal key={title} delay={i * .08}><article className="glass-card h-full rounded-3xl p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3><p className="mt-3 leading-relaxed text-text-muted">{text}</p></article></ScrollReveal>)}
        </div>
      </section>

      <section id="experiencia" className="dark-section px-6 py-24 text-white md:py-28">
        <SectionTitle eyebrow="Así funciona" title="Del chat a la atención, en una misma experiencia." subtitle="DocYa coordina el acceso, la oferta profesional y la continuidad después de la consulta." light />
        <div className="relative mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {flow.map(({ icon: Icon, title, text }, i) => <ScrollReveal key={title} delay={i * .08}><article className="relative h-full rounded-3xl border border-white/10 bg-white/[.045] p-6 backdrop-blur"><div className="flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00b3a6]/15 text-[#4debd8]"><Icon className="h-6 w-6" /></span><span className="text-sm font-bold text-white/30">0{i + 1}</span></div><h3 className="mt-6 text-lg font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/65">{text}</p></article></ScrollReveal>)}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/45">DocYa IA brinda orientación inicial y ayuda a dirigir señales de alarma a emergencias. No realiza diagnósticos ni sustituye a un profesional o servicio de emergencias. La disponibilidad de visitas depende de la zona y del momento.</p>
      </section>

      <InvestorAnalyticsLoader />

      <section id="producto" className="bg-[var(--background)] px-6 py-24 md:py-28">
        <SectionTitle eyebrow="Un producto conectado" title="Una app para el paciente. Herramientas para quien atiende." subtitle="La red conecta la experiencia del paciente con la operación del profesional y las herramientas clínicas." />
        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm md:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[color-mix(in_srgb,var(--brand)_12%,transparent)] text-[var(--brand)]"><Smartphone className="h-5 w-5" /></span>
                <div><p className="text-xs font-semibold uppercase tracking-wider text-text-muted">DocYa Paciente</p><h3 className="text-xl font-bold text-foreground">Orientación, atención y seguimiento</h3></div>
              </div>
              <div className="mt-6 flex h-[270px] items-center justify-center overflow-hidden rounded-2xl bg-[#071d21] px-4">
                <Image src="/images/clinic/docya-patient-app.webp" alt="Vista de la app DocYa para pacientes" width={1200} height={2364} sizes="(max-width: 1024px) 100vw, 520px" className="h-[258px] w-auto max-w-full object-contain" />
              </div>
              <div className="mt-7 space-y-4">{patientTools.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-[var(--brand)]" /><div><p className="font-semibold text-foreground">{title}</p><p className="mt-1 text-sm leading-relaxed text-text-muted">{text}</p></div></div>)}</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={.1}>
            <div className="h-full rounded-[2rem] border border-white/10 bg-[#0a272c] p-7 shadow-xl md:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#00b3a6]/15 text-[#4debd8]"><Stethoscope className="h-5 w-5" /></span>
                <div><p className="text-xs font-semibold uppercase tracking-wider text-white/45">DocYa Pro</p><h3 className="text-xl font-bold text-white">Una práctica más conectada y flexible</h3></div>
              </div>
              <div className="relative mt-6 h-[270px] overflow-hidden rounded-2xl bg-white">
                <Image src="/images/clinic/docya-clinic-hero-mockup.jpg" alt="Panel DocYa Clinic en computadora y dispositivos móviles" fill sizes="(max-width: 1024px) 100vw, 520px" className="object-contain" />
              </div>
              <div className="mt-7 space-y-4">{proTools.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><Icon className="mt-1 h-5 w-5 shrink-0 text-[#4debd8]" /><div><p className="font-semibold text-white">{title}</p><p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p></div></div>)}</div>
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="flex items-center gap-2 text-sm font-semibold text-[#4debd8]"><ShieldCheck className="h-4 w-4" />Decisión clínica del profesional</p><p className="mt-2 text-xs leading-relaxed text-white/55">La IA prepara borradores editables. El médico revisa, decide y emite la documentación que corresponda. La firma configurada se incorpora al documento.</p></div>
            </div>
          </ScrollReveal>
        </div>
        <div className="mx-auto mt-6 max-w-6xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 md:flex md:items-center md:justify-between"><div><p className="font-semibold text-foreground">DocYa IA para consultorios</p><p className="mt-1 text-sm text-text-muted">Agenda, pacientes, historia clínica, documentos, teleconsulta y asistencia por WhatsApp configurable.</p></div><Link href="/clinic" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline md:mt-0">Ver producto para clínicas <ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section id="oportunidad" className="dark-section px-6 py-24 text-white md:py-28">
        <SectionTitle eyebrow="La oportunidad" title="Una red flexible, con más de una vía para crear valor." subtitle="El marketplace coordina la atención. El software clínico acompaña el trabajo profesional antes y después del encuentro." light />
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 md:grid-cols-3">{businessLines.map(({ icon: Icon, label, text }, i) => <ScrollReveal key={label} delay={i * .08}><article className="h-full rounded-3xl border border-white/10 bg-white/[.045] p-7"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#00b3a6]/15 text-[#4debd8]"><Icon className="h-6 w-6" /></span><h3 className="mt-5 text-lg font-semibold text-white">{label}</h3><p className="mt-3 text-sm leading-relaxed text-white/65">{text}</p></article></ScrollReveal>)}</div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-white/[.035] p-7 md:grid-cols-[.85fr_1.15fr] md:p-10"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#4debd8]">La tesis</p><h3 className="mt-3 text-2xl font-bold text-white">Convertir disponibilidad profesional en acceso oportuno.</h3><p className="mt-4 text-sm leading-relaxed text-white/60">Cada profesional decide cuándo conectarse. DocYa busca acercar esa capacidad a pacientes que necesitan atención y dar continuidad con herramientas digitales.</p></div><div><p className="text-sm font-semibold text-white">Las métricas que validan la oportunidad</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{metrics.map((metric) => <div key={metric} className="flex gap-2.5 text-sm text-white/70"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4debd8]" />{metric}</div>)}</div><p className="mt-5 text-xs leading-relaxed text-white/40">No publicamos aquí cifras de tracción que no estén verificadas. La escala debe demostrarse ciudad por ciudad, con cobertura y economía unitaria medibles.</p></div></div>
      </section>

      <section className="bg-[var(--background)] px-6 py-24 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <ScrollReveal><span className="badge-trusted">Impacto profesional</span><h2 className="section-title mt-4 text-foreground">Más oportunidades para profesionales independientes.</h2><p className="mt-5 text-lg leading-relaxed text-text-muted">DocYa busca que médicos y enfermeros puedan sumar actividad e ingresos sin quedar atados a una jornada fija. Se conectan cuando quieren y aceptan las solicitudes que les sirven.</p><p className="mt-4 text-sm leading-relaxed text-text-muted">La oportunidad de empleo se mide en consultas realizadas e ingresos incrementales para los profesionales; la plataforma no promete trabajo garantizado.</p></ScrollReveal>
          <ScrollReveal delay={.1}><div className="grid gap-4 sm:grid-cols-2">{[{ icon: Clock3, title: "Disponibilidad propia", text: "El profesional activa o pausa su disponibilidad." }, { icon: MapPin, title: "Demanda cercana", text: "Las solicitudes incluyen ubicación para coordinar visitas." }, { icon: MessageCircle, title: "Flujo coordinado", text: "Notificaciones, comunicación y estados de consulta." }, { icon: FileText, title: "Menos tareas sueltas", text: "Historia, documentos y cobros desde sus herramientas." }].map(({ icon: Icon, title, text }) => <div key={title} className="glass-card rounded-2xl p-5"><Icon className="h-5 w-5 text-[var(--brand)]" /><p className="mt-3 font-semibold text-foreground">{title}</p><p className="mt-1 text-sm leading-relaxed text-text-muted">{text}</p></div>)}</div></ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a272c] px-6 py-24 text-white md:py-28">
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 120%, rgba(0,179,166,.18), transparent 55%)" }} />
        <ScrollReveal className="relative mx-auto max-w-4xl text-center"><span className="badge-trusted">Construyendo la próxima capa de acceso</span><h2 className="section-title mt-5 text-white">Una solicitud. El profesional cercano. La atención conectada.</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/65">Estamos construyendo una red que combina geolocalización, profesionales independientes, atención online y a domicilio, software clínico e IA.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="mailto:soporte@docya.com.ar?subject=Inversi%C3%B3n%20en%20DocYa" className="btn-primary h-12 px-6">Conversemos sobre DocYa <ArrowRight className="h-4 w-4" /></Link><Link href="/" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/85 hover:bg-white/5">Explorar el servicio <ArrowRight className="h-4 w-4" /></Link></div><p className="mt-7 text-xs text-white/35">DocYa · Argentina · Atención médica conectada</p></ScrollReveal>
      </section>
      <footer className="footer-surface"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between"><Link href="/" className="font-bold text-white">DocYa</Link><p>Atención médica bajo demanda, conectada de principio a fin.</p><div className="flex gap-5"><Link href="/clinic" className="hover:text-white">DocYa Clinic</Link><Link href="/profesionales" className="hover:text-white">Profesionales</Link><Link href="/contacto" className="hover:text-white">Contacto</Link></div></div></footer>
    </main>
  );
}





