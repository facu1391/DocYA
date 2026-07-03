// src/app/profesionales/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  FileSignature,
  FileText,
  Gift,
  Laptop,
  MapPin,
  Navigation,
  Printer,
  Quote,
  Send,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Sun,
  TrendingUp,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import ProIncomeSimulator from "@/components/landing/ProIncomeSimulator";

export const metadata = {
  title: "Profesionales",
  description: "Sumate como médico o enfermero. Elegí horarios y zonas. Ingresos semanales.",
  alternates: { canonical: "/profesionales" },
  openGraph: {
    title: "Profesionales",
    description: "Elegí horarios y zonas. Ingresos semanales.",
    url: "/profesionales",
  },
};

const PRO_APP_STORE_URL = "https://apps.apple.com/ar/app/docyapro/id6753040185";
const PRO_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.docya.pro";

const benefits = [
  { icon: Sun, title: "Libertad total", text: "Vos elegís cuándo y dónde trabajar, sin mínimos ni horarios fijos." },
  { icon: TrendingUp, title: "Más ingresos", text: "El mejor valor por consulta, con pagos claros y semanales." },
  { icon: Laptop, title: "Consultorio digital gratis", text: "Generá recetas y certificados desde tu celular o computadora, incluso para tus propios pacientes." },
  { icon: FileText, title: "Sin burocracia", text: "Olvidate de obras sociales, papeles y trámites innecesarios." },
];

const tools = [
  {
    icon: FileSignature,
    title: "Recetas digitales",
    text: "Generá recetas profesionales en segundos, listas para enviar por WhatsApp o imprimir.",
    items: [
      { icon: Zap, text: "Generación en segundos" },
      { icon: Smartphone, text: "Envío directo al paciente" },
      { icon: Printer, text: "Formato listo para imprimir" },
      { icon: CheckCircle2, text: "Menos errores, más claridad" },
    ],
  },
  {
    icon: FileText,
    title: "Certificados médicos",
    text: "Emití certificados médicos con formato profesional sin perder tiempo.",
    items: [
      { icon: Clock, text: "Ahorro de tiempo en cada consulta" },
      { icon: FileCheck, text: "Formato claro y profesional" },
      { icon: Send, text: "Entrega inmediata al paciente" },
      { icon: ShieldCheck, text: "Listos para validar y presentar" },
    ],
  },
];

const comparison = [
  ["Flexibilidad horaria", "Turnos libres y a demanda", "+24 hs consecutivas"],
  ["Ingreso por hora de trabajo", "Alto potencial neto", "Fijo y licuado por horas"],
  ["Carga de estrés relacional", "1 paciente a la vez", "Sala de espera llena y apuros"],
  ["Libre de auditorías presenciales", "Todo 100% digital en tu app", "Papeleo constante y burocracia"],
  ["Ambiente de trabajo", "Cambio de aire constante", "Encerrado en una sola sala"],
];

function StoreBadges({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <a href={PRO_PLAY_STORE_URL} target="_blank" rel="noreferrer" className="transition hover:-translate-y-0.5 hover:brightness-110">
        <Image
          src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg"
          alt="Disponible en Google Play"
          width={162}
          height={48}
          className="h-12 w-auto"
        />
      </a>
      <a href={PRO_APP_STORE_URL} target="_blank" rel="noreferrer" className="transition hover:-translate-y-0.5 hover:brightness-110">
        <Image
          src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
          alt="Descargar en App Store"
          width={144}
          height={48}
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#14b8a6]/40 bg-[#14b8a6]/10 px-4 py-2 text-sm font-semibold text-[#4fdbc8]">
      {children}
    </span>
  );
}

function CTAButton({ children, href = "/registro" }: { children: React.ReactNode; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4fdbc8] to-[#14b8a6] px-7 py-4 text-base font-extrabold text-[#00201c] shadow-[0_12px_35px_rgba(20,184,166,0.30)] transition hover:-translate-y-0.5 hover:brightness-110"
    >
      {children}
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/[0.055] shadow-[0_20px_60px_rgba(0,0,0,0.20)] backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <main className="overflow-hidden bg-[#04151c] text-[#d3e5ef]">
      <section className="relative min-h-[calc(100vh-72px)] px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute left-[-12%] top-1/4 h-[420px] w-[420px] rounded-full bg-[#14b8a6]/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] top-10 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <Badge><Stethoscope className="h-4 w-4" /> Para médicos y enfermeros</Badge>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
              Ganás más.
              <br />
              Trabajás menos.
              <br />
              <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">Elegís vos.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#bbcac6] md:text-xl">
              Sumate a DocYa Pro y empezá a atender pacientes a domicilio con total libertad,
              generando más ingresos en tus propios horarios.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton>Quiero empezar a ganar</CTAButton>
            </div>
            <div className="mt-6">
              <StoreBadges />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute inset-8 rounded-full bg-[#14b8a6]/20 blur-3xl" />
            <GlassCard className="relative mx-auto w-[72%] max-w-[310px] overflow-hidden rounded-[2.2rem] border-[#14b8a6]/25 p-2">
              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774994567/WhatsApp_Image_2026-03-31_at_7.00.47_PM-portrait_si8jph.png"
                alt="App DocYa Pro"
                width={420}
                height={820}
                className="h-auto w-full rounded-[1.65rem] object-cover"
                priority
              />
            </GlassCard>
            <div className="absolute left-0 top-1/4 rounded-2xl border border-[#14b8a6]/30 bg-[#0d1e25]/85 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl">
              <DollarSign className="mr-2 inline h-4 w-4 text-[#4fdbc8]" /> Pagos semanales
            </div>
            <div className="absolute bottom-16 right-0 rounded-2xl border border-[#14b8a6]/30 bg-[#0d1e25]/85 px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl">
              <Clock className="mr-2 inline h-4 w-4 text-[#4fdbc8]" /> Flexibilidad total
            </div>
          </div>
        </div>
      </section>

      <section id="ingresos" className="border-y border-white/10 bg-black/25 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[360px]">
            <Image
              src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1778806335/ChatGPT_Image_14_may_2026_21_51_26_rkuwfn.png"
              alt="Ingresos DocYa"
              width={720}
              height={720}
              className="mx-auto h-full max-h-[520px] w-full object-contain drop-shadow-[0_18px_45px_rgba(20,184,166,0.18)]"
            />
          </div>
          <div>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Ganá más en <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">menos tiempo</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#bbcac6]">
              Con DocYa podés generar ingresos altos trabajando menos horas, con mayor flexibilidad
              y sin el desgaste de los sistemas tradicionales.
            </p>
            <ProIncomeSimulator />
          </div>
        </div>
      </section>

      <section id="comofunciona" className="px-5 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">Cómo funciona</h2>
          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {["Te registrás", "Elegís horarios", "Estás disponible", "Recibís consultas", "Atendés y cobrás"].map((step, index) => (
              <GlassCard key={step} className="p-5 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#14b8a6]/50 text-lg font-black text-[#4fdbc8]">
                  {index + 1}
                </div>
                <h3 className="text-base font-bold text-white">{step}</h3>
                <p className="mt-2 text-sm text-[#bbcac6]">
                  {["Alta rápida y 100% digital", "Vos decidís cuándo trabajar", "Activás tu estado en la app", "Pacientes cerca tuyo", "Pagos rápidos y seguros"][index]}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Consultas <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">cerca tuyo</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#bbcac6]">
              DocYa asigna automáticamente pacientes cercanos a tu ubicación actual. Maximizá tu tiempo
              atendiendo sin viajes largos.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: MapPin, text: "Te conectamos con la demanda local" },
                { icon: Navigation, text: "Rutas optimizadas para llegar rápido" },
                { icon: Zap, text: "Más pacientes en menos tiempo" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[#d3e5ef]">
                  <Icon className="h-5 w-5 text-[#14b8a6]" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <GlassCard className="overflow-hidden p-2">
            <Image src="/profesionales/mapa.png" alt="Mapa DocYa" width={980} height={552} className="h-auto w-full rounded-2xl object-cover" />
          </GlassCard>
        </div>
      </section>

      <section id="beneficios" className="px-5 py-20 text-center md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">
            Beneficios <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">exclusivos</span>
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <GlassCard key={title} className="p-6 transition hover:-translate-y-1 hover:border-[#14b8a6]/30">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14b8a6]/10 text-[#4fdbc8]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#bbcac6]">{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <GlassCard className="overflow-hidden p-2">
              <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1775144141/Captura_de_pantalla_2026-04-02_123138-portrait_zxcmhf.png" alt="Dashboard médico" width={420} height={820} className="h-auto w-full rounded-2xl object-contain" />
            </GlassCard>
            <GlassCard className="overflow-hidden p-2">
              <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1775144126/Captura_de_pantalla_2026-04-02_123102-portrait_hfmeuk.png" alt="Receta digital" width={420} height={820} className="h-auto w-full rounded-2xl object-contain" />
            </GlassCard>
          </div>
          <div>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Tu consultorio digital <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">gratis</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#bbcac6]">
              Generá recetas y certificados en segundos, desde tu celular o computadora, sin depender
              de clínicas ni sistemas externos.
            </p>
            <ul className="mt-8 space-y-4">
              {["Recetas digitales en 1 clic", "Certificados médicos automáticos", "Usalo con tus propios pacientes", "Disponible en celular y computadora"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-[#14b8a6]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Badge><Gift className="h-4 w-4" /> Herramientas gratuitas para profesionales</Badge>
            <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
              Menos tiempo en tareas administrativas, <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">más tiempo para atender</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {tools.map(({ icon: Icon, title, text, items }) => (
              <GlassCard key={title} className="p-6 md:p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#14b8a6]/10 text-[#4fdbc8]">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                </div>
                <p className="text-[#bbcac6]">{text}</p>
                <ul className="mt-6 space-y-4">
                  {items.map(({ icon: ItemIcon, text: item }) => (
                    <li key={item} className="flex items-center gap-3">
                      <ItemIcon className="h-5 w-5 text-[#14b8a6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="mx-auto mt-12 max-w-4xl border-[#14b8a6]/45 p-8 text-center">
            <h3 className="text-2xl font-bold text-white">
              100% gratis. Usalas todos los días, <span className="text-[#4fdbc8]">incluso sin atender consultas en DocYa.</span>
            </h3>
            <div className="mt-7">
              <CTAButton>Crear cuenta gratis</CTAButton>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="pointer-events-none absolute left-[-14%] top-1/3 h-[420px] w-[420px] rounded-full bg-[#14b8a6]/15 blur-[120px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black leading-tight text-white md:text-6xl">
              Trabajá cuando quieras. <span className="block bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">Sin horarios fijos.</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#bbcac6]">
              DocYa se adapta a tu vida, y no al revés. Atendé de camino al hospital, en tus días libres,
              o dedicale tiempo completo de forma independiente.
            </p>
          </div>
          <GlassCard className="mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full border-[#14b8a6]/25 p-0">
            <Image src="/profesionales/lifestyle.png" alt="Profesional con flexibilidad" width={720} height={720} className="h-full w-full object-cover" />
          </GlassCard>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/25 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-4xl font-black text-white md:text-6xl">
            DocYa vs <span className="bg-gradient-to-r from-[#71f8e4] to-[#14b8a6] bg-clip-text text-transparent">Guardia tradicional</span>
          </h2>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.055]">
            <div className="min-w-[720px]">
              <div className="grid grid-cols-[1.15fr_1fr_1fr] bg-black/35 text-sm font-bold text-white">
                <div className="p-4 md:p-5">Característica</div>
                <div className="p-4 text-[#4fdbc8] md:p-5">DocYa Pro</div>
                <div className="p-4 text-[#bbcac6] md:p-5">Guardia</div>
              </div>
              {comparison.map(([label, pro, guard]) => (
                <div key={label} className="grid grid-cols-[1.15fr_1fr_1fr] border-t border-white/10 text-sm text-[#d3e5ef]">
                  <div className="p-4 font-bold md:p-5">{label}</div>
                  <div className="flex gap-2 p-4 md:p-5"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#14b8a6]" /> {pro}</div>
                  <div className="flex gap-2 p-4 text-[#bbcac6] md:p-5"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" /> {guard}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8 md:py-28">
        <GlassCard className="relative mx-auto max-w-4xl p-8 text-center md:p-12">
          <Quote className="absolute -top-6 left-10 h-14 w-14 rounded-full bg-[#04151c] p-3 text-[#14b8a6]/70" />
          <p className="text-xl italic leading-9 text-white md:text-2xl">
            &ldquo;Dejé de lado las guardias de 24 horas y empecé a usar DocYa en mis tiempos libres.
            No solo estoy ganando lo mismo o más, sino que recuperé mis fines de semana.&rdquo;
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#14b8a6] bg-white/5">
              <User className="h-7 w-7 text-[#4fdbc8]" />
            </div>
            <div className="text-left">
              <strong className="block text-lg text-white">Dr. Martin L.</strong>
              <span className="text-sm text-[#bbcac6]">Médico clínico - CABA</span>
            </div>
          </div>
        </GlassCard>
      </section>

      <section id="registro" className="relative px-5 py-24 text-center md:px-8 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#14b8a6]/20 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-4xl font-black text-white md:text-6xl">Empezá hoy</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#bbcac6]">
            Completá el registro de seguridad, validamos tus credenciales y estás listo
            para empezar a ganar con DocYa Pro.
          </p>
          <div className="mt-8">
            <CTAButton>Registrarme ahora</CTAButton>
          </div>
          <div className="mt-6">
            <StoreBadges centered />
          </div>
        </div>
      </section>
    </main>
  );
}
