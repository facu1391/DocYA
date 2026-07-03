import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  Check,
  ClipboardList,
  Download,
  FileCheck2,
  FileSignature,
  FlaskConical,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Mic,
  Monitor,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
  Users,
  Video,
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
  {
    icon: Video,
    title: "Teleconsultas por video",
    text: "El medico atiende en videollamada, dicta la evolucion por voz y emite recetas u ordenes en el acto. El paciente no necesita trasladarse.",
  },
  {
    icon: Smartphone,
    title: "App para pacientes",
    text: "El paciente accede a su historia clinica, descarga recetas, certificados y ordenes medicas, y solicita turno viendo la agenda disponible del medico.",
  },
  {
    icon: Monitor,
    title: "Sala de espera digital",
    text: "Pantalla para el consultorio que muestra el llamado actual y el historial de llamados. El medico llama al siguiente paciente desde su propio sistema.",
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
    label: "Teleconsulta",
    title: "Video, dictado y documentos remotos",
    text: "El medico atiende en vivo, dicta la evolucion por voz y emite recetas u ordenes sin que el paciente viaje.",
  },
  {
    label: "App paciente",
    title: "Historia clinica y documentos en el movil",
    text: "El paciente ve su historia clinica, descarga recetas y ordenes, y solicita turno desde la app DocYa.",
  },
  {
    label: "Sala de espera",
    title: "Turnero digital para el consultorio",
    text: "Pantalla con el llamado en curso y el historial de llamados. El medico convoca al siguiente paciente desde su sistema.",
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
  "Teleconsultas por videollamada integradas",
  "Recetas y ordenes emitibles durante la consulta remota",
  "Pacientes atendidos sin importar la distancia",
  "App para pacientes con historia clinica y documentos",
  "Solicitud de turnos online con agenda en tiempo real",
  "Sala de espera digital con llamado desde el sistema",
  "Notificaciones al paciente por turno y resultado",
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

function ClinicalAiCapture() {
  const evolution = [
    ["Motivo de consulta", "Dolor e inflamacion en rodilla luego de episodio de luxacion.", "text-sky-600", "bg-sky-50"],
    [
      "Enfermedad actual",
      "Paciente masculino de 47 anos con tumefaccion y dolor a la movilidad posterior a luxacion de rodilla.",
      "text-violet-600",
      "bg-violet-50",
    ],
    ["Antecedentes", "Niega antecedentes de relevancia", "text-amber-600", "bg-amber-50"],
    [
      "Examen fisico",
      "Edema articular y dolor a la movilizacion de rodilla afectada por clinica referida.",
      "text-teal-600",
      "bg-teal-50",
    ],
    [
      "Impresion diagnostica",
      "Luxacion de rodilla con sinovitis reactiva. CIE-10: S83.1.",
      "text-rose-600",
      "bg-rose-50",
    ],
  ];

  const suggestions = [
    ["Receta sugerida", "Ibuprofeno 400 mg cada 8 hs + Paracetamol 1000 mg cada 8 hs", "Generar receta", "border-orange-200 text-orange-600"],
    ["Certificado sugerido", "Reposo relativo con descarga de miembro inferior por 5 dias", "Generar certificado", "border-blue-200 text-blue-600"],
    ["Orden sugerida", "Radiografia de rodilla afectada frente y perfil. Resonancia magnetica de rodilla.", "Crear orden", "border-emerald-200 text-emerald-600"],
    ["CIE-10 sugerido", "S83.1 - Luxacion de rodilla", "Agregar", "border-violet-200 text-violet-600"],
  ];

  return (
    <div className="h-[430px] overflow-hidden rounded-[8px] border border-slate-200 bg-[#f6f8fb] shadow-2xl shadow-slate-950/10 lg:h-[455px]">
      <div className="grid h-full lg:grid-cols-[118px_1fr] xl:grid-cols-[128px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-[#0f1726] p-3 text-white lg:block">
          <Image src={CLINIC_LOGO} alt="DocYa Clinic" width={110} height={35} className="h-auto w-[110px]" />
          <nav className="mt-7 space-y-1.5 text-[11px] font-semibold text-slate-400">
            {["Dashboard", "Pacientes", "Agenda", "Recetario", "Ordenes"].map((item, index) => (
              <div
                key={item}
                className={`rounded-[8px] px-2.5 py-2 ${index === 1 ? "bg-teal-400/15 text-teal-300" : ""}`}
              >
                {item}
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2.5">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-950 sm:text-base">Pacientes</h3>
                <span className="hidden rounded-full bg-teal-50 px-2 py-1 text-[10px] font-bold text-teal-700 sm:inline">
                  IA CLINICA
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Gestiona tu base de pacientes</p>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex h-8 w-40 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs text-slate-500">
                <Search className="h-3.5 w-3.5" />
                Buscar...
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                CG
              </span>
              <div className="text-xs">
                <p className="font-semibold text-slate-950">Carlos Gonzalez</p>
                <p className="text-slate-500">Propietario</p>
              </div>
            </div>
          </header>

          <div className="p-3">
            <div className="mb-3 flex items-center justify-between rounded-[8px] border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                  DR
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950">Diego Ramirez</p>
                  <p className="text-xs text-slate-500">47 anos · +54 11 5555-0003 · diego@email.com</p>
                </div>
              </div>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 sm:inline">
                Cliente desde 23/06/2026
              </span>
            </div>

            <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-950">Historia clinica</h4>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  Escribi la evolucion de cada consulta y guardala en la ficha del paciente.
                </p>
              </div>

              <div className="border-b border-slate-200 bg-white px-3 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-teal-50 text-teal-600">
                      <CalendarDays className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-950">21/06/2026</p>
                      <p className="text-xs text-slate-500">09:30 - 10:00</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700">Pendiente</span>
                </div>
              </div>

              <div className="grid gap-3 p-3 xl:grid-cols-[1fr_230px]">
                <div className="min-w-0">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-violet-100 text-violet-600">
                        <Sparkles className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-950">Evolucion generada por IA</p>
                    </div>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                      Lista para revisar
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {evolution.map(([label, text, color, bg]) => (
                      <div key={label} className="flex gap-2 rounded-[8px] border border-slate-200 bg-slate-50/80 p-2.5">
                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] ${bg}`}>
                          <ClipboardList className={`h-4 w-4 ${color}`} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
                          <p className="mt-1 text-xs leading-5 text-slate-800">{text}</p>
                        </div>
                      </div>
                    ))}
                    <div className="rounded-[8px] border border-teal-300 bg-white p-2.5 ring-1 ring-teal-100 sm:col-span-2">
                      <div className="flex gap-2">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-teal-600">
                          <Check className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">Conducta</p>
                          <p className="mt-1 rounded-[8px] border border-slate-200 bg-slate-50 p-2 text-xs leading-5 text-slate-800">
                            Reposo relativo con descarga de la articulacion afectada, elevacion del miembro inferior,
                            crioterapia local, analgesicos segun tolerancia y estudios por imagen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="hidden space-y-2 xl:block">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Sugerencias IA</p>
                  {suggestions.slice(0, 3).map(([title, text, action, color]) => (
                    <div key={title} className="rounded-[8px] border border-slate-200 bg-white p-2.5 shadow-sm">
                      <p className="text-xs font-bold text-slate-950">{title}</p>
                      <p className="mt-1.5 text-[11px] leading-4 text-slate-500">{text}</p>
                      <button className={`mt-2 h-7 w-full rounded-[8px] border bg-white text-[11px] font-bold ${color}`}>
                        {action}
                      </button>
                    </div>
                  ))}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientAppCapture() {
  return (
    <WindowFrame eyebrow="App DocYa" title="Mi historia clinica">
      <div className="grid gap-4 p-5 lg:grid-cols-[160px_1fr]">
        <nav className="hidden space-y-1 lg:block">
          {[
            ["Historia clinica", true],
            ["Mis documentos", false],
            ["Solicitar turno", false],
            ["Perfil", false],
          ].map(([label, active]) => (
            <div
              key={label as string}
              className={`rounded-[8px] px-3 py-2.5 text-xs font-semibold ${
                active ? "bg-teal-50 text-teal-700" : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {label as string}
            </div>
          ))}
        </nav>
        <div className="space-y-3">
          <div className="rounded-[8px] border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">Consulta</p>
                <p className="text-sm font-bold text-slate-950">15/06/2026 · Dr. Gonzalez</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Completada</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {[
                ["Diagnostico", "Hipertension arterial controlada. CIE-10: I10"],
                ["Conducta", "Continuar losartan 50mg. Repetir laboratorio en 3 meses"],
              ].map(([label, text]) => (
                <div key={label as string} className="rounded-[8px] bg-slate-50 p-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label as string}</p>
                  <p className="mt-0.5 text-xs text-slate-700">{text as string}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                ["Receta", "border-orange-200 bg-orange-50 text-orange-700"],
                ["Orden medica", "border-emerald-200 bg-emerald-50 text-emerald-700"],
                ["Certificado", "border-sky-200 bg-sky-50 text-sky-700"],
              ].map(([label, classes]) => (
                <div
                  key={label as string}
                  className={`flex items-center justify-center gap-1.5 rounded-[8px] border px-2 py-2 text-[11px] font-semibold ${classes}`}
                >
                  <Download className="h-3 w-3" />
                  {label as string}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-teal-200 bg-teal-50/60 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4 text-teal-700" />
                <p className="text-xs font-bold text-teal-900">Proximos turnos disponibles</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {["Lun 21/07 · 09:00", "Mie 23/07 · 10:30", "Vie 25/07 · 16:00"].map((slot) => (
                <div
                  key={slot}
                  className="rounded-[8px] border border-teal-300 bg-white px-2 py-2 text-center text-[11px] font-semibold text-teal-800"
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function TurneroCapture() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <Image src={CLINIC_LOGO} alt="DocYa Clinic" width={130} height={41} className="h-auto w-[130px]" />
          <span className="ml-2 text-xl font-bold text-white">· Sala de espera</span>
        </div>
        <p className="text-2xl font-bold tabular-nums text-white">10:11 p. m.</p>
      </div>
      <div className="grid lg:grid-cols-[1fr_280px]">
        <div className="border-r border-white/10 p-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">Paciente</p>
          <h3 className="mt-4 text-5xl font-black leading-tight tracking-tight text-white">
            Laura<br />Fernandez
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-[8px] bg-teal-950 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Consultorio</p>
              <p className="mt-2 text-5xl font-black text-white">8</p>
            </div>
            <div className="rounded-[8px] bg-slate-900 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Turno</p>
              <p className="mt-2 text-5xl font-black text-white">10:15</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <p className="text-base font-bold text-white">Ultimos llamados</p>
          <div className="mt-3 divide-y divide-white/10">
            {[
              { name: "Laura Fernandez", consultorio: "8", hora: "10:15" },
              { name: "Martin Diaz", consultorio: "5", hora: "10:02" },
              { name: "Sofia Romero", consultorio: "12", hora: "09:48" },
            ].map((entry) => (
              <div key={entry.name + entry.hora} className="flex items-start justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-bold text-white">{entry.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Paciente</p>
                  <p className="mt-1 text-sm text-slate-300">{entry.consultorio}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600">Consultorio</p>
                </div>
                <p className="text-2xl font-black text-teal-400">{entry.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeleconsultaCapture() {
  return (
    <WindowFrame eyebrow="Teleconsulta" title="Consulta remota activa">
      <div className="p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_210px]">
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-[8px] bg-slate-900" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-700 text-xl font-bold text-slate-300">
                    MG
                  </span>
                  <span className="text-sm font-medium text-slate-400">Maria Gonzalez</span>
                </div>
              </div>
              <div className="absolute bottom-3 right-3 flex h-20 w-28 items-center justify-center rounded-[8px] border border-white/20 bg-slate-800">
                <span className="text-xs font-bold text-slate-400">Dra. Garcia</span>
              </div>
              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-white">En vivo · 08:24</span>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-[8px] border border-violet-200 bg-violet-50 px-4 py-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                <Mic className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-violet-900">Dictando evolucion...</p>
                <p className="truncate text-xs text-violet-600">Paciente refiere mejoria parcial, continua con medicacion...</p>
              </div>
              <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-[8px] border border-slate-200 bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Paciente</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                  MG
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-950">Maria Gonzalez</p>
                  <p className="text-xs text-slate-500">38 anos · OSDE 210</p>
                </div>
              </div>
              <div className="mt-3 rounded-[8px] bg-slate-50 p-2.5">
                <p className="text-[10px] font-semibold text-slate-500">Motivo</p>
                <p className="mt-0.5 text-xs text-slate-800">Control de estudios de laboratorio</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Acciones rapidas</p>
              {[
                ["Emitir receta", "border-orange-200 bg-orange-50 text-orange-700"],
                ["Crear orden medica", "border-emerald-200 bg-emerald-50 text-emerald-700"],
                ["Emitir certificado", "border-sky-200 bg-sky-50 text-sky-700"],
              ].map(([action, classes]) => (
                <div
                  key={action}
                  className={`w-full rounded-[8px] border px-3 py-2 text-xs font-semibold ${classes}`}
                >
                  {action}
                </div>
              ))}
            </div>
          </div>
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
              Dictado por voz, teleconsultas, IA y WhatsApp
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
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 text-sm font-semibold text-slate-600 sm:grid-cols-4 lg:grid-cols-7">
          {["Agenda", "Historia IA", "Dictado por voz", "Teleconsulta", "App paciente", "Sala espera", "WhatsApp IA"].map((item) => (
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
        <div className="mx-auto max-w-[1480px] px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div className="max-w-xl">
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
            <div className="min-w-0">
              <ClinicalAiCapture />
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
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <TeleconsultaCapture />
            <PatientAppCapture />
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

      <section className="border-y border-slate-200 bg-[linear-gradient(180deg,#f0fdf9_0%,#ffffff_55%,#eff6ff_100%)] py-20 lg:py-24">
        <div className="mx-auto max-w-[1480px] px-6">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div className="min-w-0">
              <TeleconsultaCapture />
            </div>
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Teleconsultas</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                El paciente no necesita viajar horas para un control.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Con teleconsulta integrada el medico atiende por video desde el mismo panel, dicta la evolucion por voz y emite recetas u ordenes medicas en el momento. Ideal para controles de estudios, ajuste de medicacion y seguimientos sin que el paciente se desplace.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  [Video, "Videollamada directamente desde el panel"],
                  [Mic, "Dictado por voz durante la consulta remota"],
                  [FileSignature, "Recetas y ordenes emitidas al instante"],
                  [MapPin, "Alcance a pacientes de cualquier zona geografica"],
                ].map(([Icon, text]) => {
                  const TypedIcon = Icon as typeof Video;
                  return (
                    <div key={text as string} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-indigo-50 text-indigo-600">
                        <TypedIcon className="h-4 w-4" />
                      </span>
                      {text as string}
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 rounded-[8px] border border-indigo-200 bg-indigo-50 p-4">
                <p className="text-sm font-semibold text-indigo-950">
                  Un paciente de zona rural puede controlar sus estudios o cambiar su medicacion sin viajar horas hasta el consultorio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-[1480px] px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">App para pacientes</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                El paciente lleva su historia clinica en el celular.
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Desde la app DocYa, cada paciente puede ver la historia clinica de sus consultas, descargar las recetas, certificados y ordenes medicas que le emitio el medico, y solicitar un nuevo turno viendo la agenda disponible en tiempo real.
              </p>
              <div className="mt-8 grid gap-3">
                {[
                  [ClipboardList, "Historia clinica completa en el movil"],
                  [Download, "Descarga de recetas, ordenes y certificados"],
                  [CalendarPlus, "Solicitud de turno con agenda en tiempo real"],
                  [Bell, "Notificaciones de turno y recordatorios"],
                ].map(([Icon, text]) => {
                  const TypedIcon = Icon as typeof ClipboardList;
                  return (
                    <div key={text as string} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-teal-50 text-teal-700">
                        <TypedIcon className="h-4 w-4" />
                      </span>
                      {text as string}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="min-w-0">
              <PatientAppCapture />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0d12] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">Sala de espera</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              El medico llama al siguiente paciente desde su sistema.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400">
              DocYa Clinic incluye una pantalla de sala de espera para proyectar en el televisor del consultorio. Muestra el llamado actual y el historial de llamados recientes. Sin papelitos, sin anotaciones manuales.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              [Monitor, "Proyectar en cualquier TV", "Abre la pantalla de sala de espera en un navegador y la conectas a cualquier televisor del consultorio."],
              [Bell, "El medico llama desde el panel", "Un clic en el turno del sistema llama al paciente en la pantalla grande. Sin interrumpir la consulta en curso."],
              [Users, "Historial de llamados en tiempo real", "Los ultimos pacientes llamados quedan visibles en la pantalla para que nadie pierda su lugar."],
            ].map(([Icon, title, text]) => {
              const TypedIcon = Icon as typeof Monitor;
              return (
                <div key={title as string} className="rounded-[8px] border border-white/10 bg-white/5 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-teal-400/10 text-teal-400">
                    <TypedIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text as string}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <TurneroCapture />
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
