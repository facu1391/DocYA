import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  Check,
  ClipboardList,
  FileCheck2,
  FileSignature,
  FlaskConical,
  LockKeyhole,
  MessageCircle,
  Mic,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";

const CLINIC_LOGO =
  "https://res.cloudinary.com/dqsacd9ez/image/upload/v1782353919/docyaclinicblanco_snztro.png";

export const metadata: Metadata = {
  title: "DocYa Clinic - Software de gestion para clinicas y consultorios",
  description:
    "Agenda, pacientes, historia clinica con dictado por voz, evolucion asistida por IA, recetas digitales, certificados, ordenes medicas y WhatsApp con IA.",
  alternates: { canonical: "/clinic" },
  openGraph: {
    title: "DocYa Clinic - Gestion clinica inteligente",
    description:
      "Sistema integral para consultorios: turnos, pacientes, evolucion clinica con IA, documentos medicos y automatizacion por WhatsApp.",
    url: "/clinic",
  },
};

const WORKFLOWS = [
  {
    icon: CalendarDays,
    title: "Agenda y turnos",
    text: "Calendario semanal, estados de atencion, bloqueos de horarios y disponibilidad por profesional.",
  },
  {
    icon: Users,
    title: "Pacientes e historia clinica",
    text: "Ficha completa, consultas previas, obra social, credencial, evolucion clinica y notas generadas desde dictado por voz.",
  },
  {
    icon: Mic,
    title: "Dictado por voz + IA medica",
    text: "El medico dicta la consulta y la IA ordena el relato en evolucion, antecedentes, indicaciones y resumen clinico para no perder tiempo escribiendo.",
  },
  {
    icon: FileSignature,
    title: "Recetas digitales",
    text: "Vademecum RCTA, diagnosticos CIE-10, financiadores, firma digital, QR y codigo de verificacion.",
  },
  {
    icon: ClipboardList,
    title: "Ordenes medicas",
    text: "Laboratorio, imagenes y derivaciones con catalogos prearmados, prioridad y CUIR oficial.",
  },
  {
    icon: FileCheck2,
    title: "Certificados",
    text: "Ausentismo laboral, escolar, constancia de atencion y reposo domiciliario con PDF profesional.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp con IA",
    text: "El paciente consulta horarios, reserva turnos y recibe recordatorios sin cargar al equipo administrativo.",
  },
];

const METRICS = [
  { label: "Turnos hoy", value: "24", icon: CalendarCheck, accent: "text-sky-600", bg: "bg-sky-50" },
  { label: "Pacientes", value: "1.248", icon: Users, accent: "text-violet-600", bg: "bg-violet-50" },
  { label: "Ocupacion", value: "86%", icon: BarChart3, accent: "text-amber-600", bg: "bg-amber-50" },
  { label: "Docs emitidos", value: "312", icon: FileSignature, accent: "text-teal-600", bg: "bg-teal-50" },
];

const CAPTURES = [
  {
    label: "Dashboard",
    title: "Resumen operativo en tiempo real",
    text: "Turnos, ocupacion, pacientes y actividad diaria en una vista preparada para recepcion y direccion medica.",
  },
  {
    label: "Ordenes",
    title: "Emision guiada de documentos",
    text: "Flujos por pasos para recetas, certificados y ordenes, con busqueda de pacientes y datos clinicos.",
  },
  {
    label: "Configuracion",
    title: "Marca, equipo y permisos",
    text: "Logo, colores, profesionales, firmas digitales, horarios y roles desde un mismo panel.",
  },
];

const CHECKLIST = [
  "Calendario semanal y vista lista",
  "Turnos pendientes, confirmados, completados o cancelados",
  "Ficha de paciente con DNI, obra social, plan y credencial",
  "Historia clinica por consulta",
  "Dictado por voz durante la atencion",
  "IA para redactar evolucion e historia clinica",
  "Resumen clinico para no perder tiempo administrativo",
  "Recetas digitales con RCTA y CIE-10",
  "Certificados medicos con campos dinamicos",
  "Ordenes de laboratorio, imagenes y derivaciones",
  "Firma digital, QR y codigo de verificacion",
  "Bot de WhatsApp para reservas y recordatorios",
  "Disponibilidad por profesional",
  "Bloqueo de vacaciones, feriados y ausencias",
  "Roles de propietario, admin y profesional",
  "Logo y colores personalizables",
  "Datos aislados por clinica",
];

function WindowFrame({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/12 bg-white shadow-2xl shadow-slate-950/30">
      <div className="flex h-10 items-center justify-between border-b border-slate-200 bg-slate-950 px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[11px] font-medium text-slate-400">{eyebrow}</span>
      </div>
      <div className="bg-slate-50">
        <div className="border-b border-slate-200 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold text-slate-950">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

function DashboardCapture() {
  return (
    <WindowFrame eyebrow="DocYa Clinic" title="Panel de control">
      <div className="grid gap-4 p-5">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="rounded-[8px] border border-slate-200 bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">{metric.value}</p>
                  </div>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${metric.bg}`}>
                    <Icon className={`h-5 w-5 ${metric.accent}`} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[8px] border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-950">Turnos de hoy</p>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700">En vivo</span>
            </div>
            {[
              ["09:00", "Maria Gomez", "Confirmado", "bg-emerald-50 text-emerald-700"],
              ["10:30", "Juan Perez", "En espera", "bg-amber-50 text-amber-700"],
              ["12:15", "Lucia Torres", "Completado", "bg-sky-50 text-sky-700"],
            ].map(([time, name, status, badge]) => (
              <div key={time} className="flex items-center gap-3 border-t border-slate-100 py-3">
                <span className="w-12 text-sm font-semibold text-slate-950">{time}</span>
                <span className="flex-1 text-sm text-slate-700">{name}</span>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${badge}`}>{status}</span>
              </div>
            ))}
          </div>
          <div className="rounded-[8px] border border-slate-200 bg-white p-4">
            <p className="mb-4 text-sm font-semibold text-slate-950">Ocupacion semanal</p>
            {["Lun", "Mar", "Mie", "Jue", "Vie"].map((day, index) => (
              <div key={day} className="mb-3 grid grid-cols-[34px_1fr_38px] items-center gap-3">
                <span className="text-xs font-medium text-slate-500">{day}</span>
                <span className="h-2 rounded-full bg-slate-100">
                  <span
                    className="block h-2 rounded-full bg-teal-500"
                    style={{ width: `${[78, 92, 64, 84, 71][index]}%` }}
                  />
                </span>
                <span className="text-right text-xs font-semibold text-slate-700">{[78, 92, 64, 84, 71][index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function OrdersCapture() {
  return (
    <WindowFrame eyebrow="Ordenes medicas" title="Emision guiada">
      <div className="grid gap-4 p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[8px] border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tipo de orden</p>
          <div className="mt-4 grid gap-3">
            {[
              [FlaskConical, "Laboratorio", "Hemograma, tiroides, orina", "text-emerald-700", "bg-emerald-50"],
              [ScanLine, "Imagenes", "Rx, eco, TAC, RMN", "text-indigo-700", "bg-indigo-50"],
              [Stethoscope, "Derivacion", "Interconsultas", "text-sky-700", "bg-sky-50"],
            ].map(([Icon, title, text, color, bg]) => {
              const TypedIcon = Icon as typeof FlaskConical;
              return (
                <div key={title as string} className="flex items-center gap-3 rounded-[8px] border border-slate-200 p-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-[8px] ${bg}`}>
                    <TypedIcon className={`h-5 w-5 ${color}`} />
                  </span>
                  <span>
                    <strong className="block text-sm text-slate-950">{title as string}</strong>
                    <span className="text-xs text-slate-500">{text as string}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-4">
          <div className="mb-4 flex rounded-[8px] bg-slate-100 p-1 text-[11px] font-semibold text-slate-500">
            {["Paciente", "Estudios", "Clinica", "Confirmar"].map((step, index) => (
              <span
                key={step}
                className={`flex-1 rounded-[6px] px-2 py-2 text-center ${
                  index === 1 ? "bg-teal-600 text-white" : ""
                }`}
              >
                {step}
              </span>
            ))}
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <div className="rounded-[8px] border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-500">
              Buscar estudio o paciente...
            </div>
          </div>
          <div className="space-y-2">
            {["Hemograma completo", "Glucemia en ayunas", "Perfil lipidico completo"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-[8px] border border-slate-200 p-3">
                <span className="text-sm text-slate-800">{item}</span>
                <Check className="h-4 w-4 text-teal-600" />
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-[8px] border border-teal-100 bg-teal-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Diagnostico</p>
            <p className="mt-1 text-sm text-teal-950">Control metabolico. Prioridad normal.</p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function SettingsCapture() {
  return (
    <WindowFrame eyebrow="Configuracion" title="Marca y equipo medico">
      <div className="grid gap-4 p-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[8px] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-950">Identidad de la clinica</p>
          <div className="mt-4 grid gap-3">
            {["Logo del sistema", "Logo para documentos", "Color principal"].map((field, index) => (
              <div key={field} className="rounded-[8px] border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">{field}</p>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <span
                    className={`block h-2 rounded-full ${index === 2 ? "bg-teal-500" : "bg-slate-400"}`}
                    style={{ width: `${[74, 58, 92][index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[8px] border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold text-slate-950">Equipo</p>
          {["Propietario", "Admin", "Profesional"].map((role, index) => (
            <div key={role} className="mt-3 flex items-center gap-3 rounded-[8px] border border-slate-200 p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                {["DG", "RM", "LT"][index]}
              </span>
              <span className="flex-1">
                <strong className="block text-sm text-slate-950">{["Dra. Garcia", "Recepcion", "Lic. Torres"][index]}</strong>
                <span className="text-xs text-slate-500">{role}</span>
              </span>
              <ShieldCheck className="h-4 w-4 text-teal-600" />
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}

function ValueBento() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Impacto operativo</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            La diferencia se nota en la agenda, la consulta y el cierre del dia.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Un sistema clinico vende mejor cuando muestra tiempo ahorrado, menos escritura y mejores decisiones.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#071d21_0%,#00b3a6_52%,#d9fbf7_100%)] p-6 text-white shadow-lg shadow-teal-950/20">
            <div className="mx-auto max-w-md rounded-[8px] border border-white/30 bg-white/95 p-4 shadow-xl">
              <div className="grid grid-cols-5 border-b border-teal-100 pb-2 text-center text-[10px] font-semibold text-teal-600">
                {["lun", "mar", "mie", "jue", "vie"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="grid h-36 grid-cols-[42px_1fr] pt-3">
                <div className="space-y-6 text-[10px] text-slate-400">
                  <p>8:00</p>
                  <p>9:00</p>
                  <p>10:00</p>
                </div>
                <div className="relative grid grid-cols-5 gap-px bg-teal-100">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <span key={index} className="bg-white/90" />
                  ))}
                  <div className="absolute left-[20%] top-10 rounded-[6px] bg-teal-300 px-3 py-2 text-[10px] font-semibold text-teal-950">
                    Sesion con paciente
                  </div>
                  <div className="absolute inset-x-0 top-[74px] h-px bg-cyan-500" />
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-bold">Ganas hasta un 60% de tiempo semanalmente</h3>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-teal-50">
              Agenda, pacientes, turnos, seguimientos clinicos y reservas por WhatsApp IA desde un solo lugar.
            </p>
          </article>

          <article className="overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#e6fffb_0%,#b5f5ec_46%,#dbeafe_100%)] p-6 text-[#071d21] shadow-lg shadow-teal-950/10">
            <div className="flex min-h-44 items-center justify-between gap-5">
              <div className="flex items-center gap-3 text-teal-700">
                <span className="flex h-24 w-16 items-center justify-center rounded-r-[8px] border-8 border-l-0 border-teal-700" />
                <span className="h-1 w-4 rounded-full bg-white" />
                <span className="h-1 w-4 rounded-full bg-white" />
                <span className="h-1 w-4 rounded-full bg-white" />
              </div>
              <div className="grid gap-3">
                {["Generando resumen", "Generando transcripcion", "Generando analisis clinico"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-6 rounded-[8px] bg-white px-4 py-3 text-xs font-bold text-teal-900 shadow-md">
                    {item}
                    <span className="h-4 w-4 rounded-full border-2 border-teal-600 border-t-transparent" />
                  </div>
                ))}
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-bold">100% conexion humana</h3>
            <p className="mt-3 max-w-xl text-sm font-bold leading-6 text-teal-700">
              La IA toma notas y estructura la consulta para que el medico mire al paciente, no a la pantalla.
            </p>
          </article>

          <article className="overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#d9fbf7_0%,#e0f2fe_52%,#ffffff_100%)] p-6 text-[#071d21] shadow-lg shadow-teal-950/10">
            <div className="rounded-[8px] bg-[#0a272c] p-4 shadow-xl">
              <div className="flex items-center justify-between rounded-[8px] bg-white/15 px-4 py-3 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold">A</span>
                  <span className="text-xs font-bold">Agustina Gutierrez</span>
                </div>
                <span className="rounded-full bg-teal-500 px-4 py-1 text-xs font-bold text-slate-950">Activo</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Resumen", "Ficha clinica", "Historia clinica", "Analisis clinico"].map((tab, index) => (
                  <span
                    key={tab}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                      index === 2 ? "bg-teal-500 text-slate-950" : "bg-white/85 text-teal-900"
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>
              <div className="mt-5 rounded-[8px] bg-white p-4">
                <span className="rounded-full bg-teal-100 px-2 py-1 text-[9px] font-bold text-teal-700">Generado con IA</span>
                <div className="mt-3 space-y-2">
                  <span className="block h-2 rounded-full bg-slate-200" />
                  <span className="block h-2 w-10/12 rounded-full bg-slate-200" />
                  <span className="block h-2 w-11/12 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-bold">Ahorras mas de 50 horas mensuales</h3>
            <p className="mt-3 max-w-xl text-sm font-bold leading-6 text-teal-700">
              Historias clinicas digitales inteligentes: registra, analiza y accede a cada evolucion con precision.
            </p>
          </article>

          <article className="overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,#071d21_0%,#0f6f78_48%,#88f7eb_100%)] p-6 text-white shadow-lg shadow-teal-950/20">
            <div className="relative rounded-[8px] bg-white p-5 text-slate-950 shadow-xl">
              <p className="text-sm font-bold">Sesiones completadas por mes</p>
              <p className="mt-1 text-xs text-slate-500">Tendencia de atenciones y documentos emitidos</p>
              <div className="mt-6 flex h-32 items-end gap-2 border-b border-l border-slate-200 px-3">
                {[42, 46, 44, 40, 52, 68, 76].map((height, index) => (
                  <span
                    key={index}
                    className="flex-1 rounded-t-[6px] bg-[linear-gradient(180deg,#00b3a6,#d9fbf7)]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="absolute right-4 top-8 rounded-[8px] bg-white px-4 py-3 shadow-lg">
                <p className="text-xs text-slate-500">Consultantes activos</p>
                <p className="text-3xl font-bold text-teal-700">19</p>
              </div>
              <div className="absolute bottom-6 right-8 rounded-[8px] bg-white px-4 py-3 shadow-lg">
                <p className="text-xs text-slate-500">Sesiones completadas</p>
                <p className="text-3xl font-bold text-teal-700">165</p>
              </div>
            </div>
            <h3 className="mt-6 text-2xl font-bold">Metricas e insights en tiempo real</h3>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-teal-50">
              Datos claros sobre desempeno, demanda, evolucion de pacientes y resultados clinicos.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export default function ClinicPage() {
  return (
    <main className="min-h-screen bg-[#f5f7fa] text-slate-950">
      <section className="relative overflow-hidden bg-[#071d21] text-white">
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-20">
          <div>
            <Image
              src={CLINIC_LOGO}
              alt="DocYa Clinic"
              width={248}
              height={78}
              priority
              className="h-auto w-56 object-contain"
            />
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 text-sm font-medium text-teal-100">
              <Sparkles className="h-4 w-4" />
              Dictado por voz, evolucion con IA y WhatsApp
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              La operacion diaria de tu clinica en un solo panel.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Agenda, pacientes, historia clinica, dictado por voz, evolucion asistida por IA, recetas, certificados, ordenes y automatizacion por WhatsApp con una experiencia profesional lista para consultorios y centros medicos.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-teal-500 px-6 text-sm font-semibold text-white shadow-lg shadow-teal-950/30 transition hover:bg-teal-400"
              >
                Solicitar demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#capturas"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/15 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver capturas
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ["24/7", "reservas"],
                ["RCTA", "recetas"],
                ["Multi", "clinica"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-5 top-8 hidden rounded-[8px] border border-white/12 bg-white/10 px-4 py-3 text-sm font-medium text-white shadow-xl backdrop-blur lg:block">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
              24 turnos activos
            </div>
            <DashboardCapture />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 text-sm font-semibold text-slate-600 md:grid-cols-4">
          {["Agenda", "Historia IA", "Dictado por voz", "WhatsApp IA"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-teal-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <ValueBento />

      <section className="bg-[linear-gradient(180deg,#ecfeff_0%,#f8fafc_45%,#eef2ff_100%)] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_0.42fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Sistema integral</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Una herramienta pensada para trabajar, no para decorar.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
              DocYa Clinic ordena el circuito completo de atencion: desde el primer turno hasta el documento medico emitido.
              </p>
            </div>
            <div className="rounded-[8px] border border-teal-200 bg-white/75 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Foco del sistema</p>
              <p className="mt-2 text-2xl font-bold text-slate-950">Menos carga administrativa</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Agenda, documentos e historia clinica unidos para que el medico atienda y no pierda tiempo duplicando datos.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOWS.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className={`rounded-[8px] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                    index % 3 === 0
                      ? "border-teal-200 bg-white"
                      : index % 3 === 1
                        ? "border-sky-200 bg-sky-50/80"
                        : "border-indigo-200 bg-indigo-50/80"
                  }`}
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-[8px] ${
                    index % 3 === 0
                      ? "bg-teal-100 text-teal-700"
                      : index % 3 === 1
                        ? "bg-sky-100 text-sky-700"
                        : "bg-indigo-100 text-indigo-700"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-slate-950">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Historia clinica con IA</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              El medico habla. DocYa ordena la evolucion.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Durante la consulta, el profesional puede dictar por voz lo que ve, pregunta e indica. La IA transforma ese texto en una evolucion clinica clara, prolija y lista para guardar en la historia del paciente.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                [Mic, "Dictado por voz dentro de la consulta"],
                [Sparkles, "IA para estructurar evolucion, antecedentes e indicaciones"],
                [Stethoscope, "Historia clinica completa sin cortar la atencion"],
                [Zap, "Menos tiempo escribiendo despues de atender"],
              ].map(([Icon, text]) => {
                const TypedIcon = Icon as typeof Mic;
                return (
                  <div key={text as string} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                      <TypedIcon className="h-4 w-4" />
                    </span>
                    {text as string}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-4 shadow-xl">
            <div className="rounded-[8px] border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Consulta en curso</p>
                  <h3 className="text-sm font-semibold text-slate-950">Evolucion clinica asistida</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Dictando
                </span>
              </div>
              <div className="grid gap-4 p-4 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-[8px] border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Voz del medico</p>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    Paciente consulta por dolor lumbar de tres dias, sin fiebre, sin deficit neurologico. Indico analgesia, reposo relativo y control si no mejora.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 flex-1 rounded-full bg-teal-200" />
                    <span className="h-2 flex-1 rounded-full bg-teal-400" />
                    <span className="h-2 flex-1 rounded-full bg-teal-600" />
                    <span className="h-2 flex-1 rounded-full bg-teal-300" />
                  </div>
                </div>
                <div className="rounded-[8px] border border-teal-100 bg-teal-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Evolucion generada por IA</p>
                  <div className="mt-3 space-y-3 text-sm leading-6 text-teal-950">
                    <p>
                      <strong>Motivo:</strong> dolor lumbar de 72 hs de evolucion.
                    </p>
                    <p>
                      <strong>Evaluacion:</strong> sin signos de alarma referidos, sin fiebre ni deficit neurologico.
                    </p>
                    <p>
                      <strong>Conducta:</strong> analgesia, reposo relativo, pautas de alarma y control evolutivo.
                    </p>
                  </div>
                  <button className="mt-4 inline-flex h-9 items-center justify-center rounded-[8px] bg-teal-600 px-4 text-xs font-semibold text-white">
                    Guardar en historia clinica
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capturas" className="bg-[#0b1220] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Capturas del sistema</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Interfaces basadas en el panel DocYa IA.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Use la estructura real del sistema `docya-ia`: dashboard, ordenes, configuracion, recetas, certificados y agenda. La landing muestra el producto, no una promesa generica.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {CAPTURES.map((item) => (
                <div key={item.label} className="rounded-[8px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-300">{item.label}</p>
                  <h3 className="mt-2 text-sm font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <OrdersCapture />
            <SettingsCapture />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Automatizacion</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              WhatsApp atiende la demanda repetitiva.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              El bot conversa con pacientes, encuentra horarios disponibles, registra datos basicos y envia recordatorios. El equipo conserva el control desde el panel.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                [MessageCircle, "Conversacion natural con IA"],
                [CalendarCheck, "Reserva, confirmacion y reprogramacion"],
                [Zap, "Recordatorios automaticos"],
                [LockKeyhole, "Datos de la clinica aislados por cuenta"],
              ].map(([Icon, text]) => {
                const TypedIcon = Icon as typeof MessageCircle;
                return (
                  <div key={text as string} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                      <TypedIcon className="h-4 w-4" />
                    </span>
                    {text as string}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mx-auto w-full max-w-md rounded-[8px] border border-slate-200 bg-white p-5 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-950">DocYa Clinic Bot</p>
                <p className="text-xs text-emerald-700">En linea</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p className="max-w-[82%] rounded-[8px] bg-slate-100 px-4 py-3 text-sm text-slate-700">
                Necesito un turno con clinica medica esta semana.
              </p>
              <p className="ml-auto max-w-[86%] rounded-[8px] bg-emerald-600 px-4 py-3 text-sm text-white">
                Tengo disponibilidad el martes 10:30 y jueves 16:00 con la Dra. Garcia. Cual preferis?
              </p>
              <p className="max-w-[82%] rounded-[8px] bg-slate-100 px-4 py-3 text-sm text-slate-700">
                Martes 10:30.
              </p>
              <p className="ml-auto max-w-[86%] rounded-[8px] bg-emerald-600 px-4 py-3 text-sm text-white">
                Listo. Turno confirmado. Te enviaremos un recordatorio automatico.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-teal-900/20 bg-[#071d21] py-20 text-white lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Todo incluido</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Funcionalidades listas para operar.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              La clinica puede iniciar con agenda y pacientes, y activar documentos, IA, WhatsApp y configuracion avanzada cuando lo necesite.
            </p>
            <div className="mt-8 rounded-[8px] border border-teal-300/20 bg-teal-300/10 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-teal-400 text-slate-950">
                  <Zap className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Ahorro de tiempo para el medico</p>
                  <p className="mt-1 text-sm text-teal-100">
                    Dictado por voz, IA para evolucion y documentos emitidos sin recargar datos.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] px-4 py-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                <span className="text-sm leading-6 text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071d21] py-20 text-white lg:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[8px] bg-teal-400/10 text-teal-300">
            <Mic className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Una clinica mas ordenada, una atencion mas rapida.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Mostrales a recepcion, administracion y profesionales un sistema que se entiende desde el primer dia.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-teal-500 px-6 text-sm font-semibold text-white transition hover:bg-teal-400"
            >
              Pedir demo de DocYa Clinic
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-white/15 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Volver a DocYa
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
