import type { Metadata } from "next";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  FileSignature,
  FileCheck2,
  ClipboardList,
  MessageCircle,
  Sparkles,
  Shield,
  BarChart3,
  Settings,
  Clock,
  Mic,
  Pill,
  Stethoscope,
  Search,
  Bell,
  Palette,
  UserCog,
  ArrowRight,
  Check,
  Zap,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "DocYa Clinic — Software de gestion para clinicas y consultorios",
  description:
    "Plataforma integral para profesionales de la salud. Turnos, recetas digitales, certificados, ordenes medicas, historia clinica y bot de WhatsApp con IA.",
  alternates: { canonical: "/clinic" },
  openGraph: {
    title: "DocYa Clinic — Gestion clinica inteligente",
    description:
      "Agenda, recetas, certificados, ordenes y WhatsApp con IA. Todo en un solo lugar.",
    url: "/clinic",
  },
};

const FEATURES = [
  {
    icon: CalendarDays,
    title: "Agenda inteligente",
    description:
      "Calendario semanal con vista por dia. Crea turnos, confirma, completa o cancela. Configura disponibilidad por profesional y bloquea fechas de vacaciones o feriados.",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    icon: Users,
    title: "Gestion de pacientes",
    description:
      "Ficha completa de cada paciente con DNI, obra social, plan, credencial, fecha de nacimiento y notas. Historial de consultas con evolucion clinica.",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.1)",
  },
  {
    icon: FileSignature,
    title: "Recetas digitales",
    description:
      "Busca medicamentos en el vademecum RCTA, diagnosticos CIE-10 y financiadores. Genera recetas con firma digital, QR de verificacion y codigo de barras.",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.1)",
  },
  {
    icon: FileCheck2,
    title: "Certificados medicos",
    description:
      "Ausentismo laboral, escolar, constancia de asistencia y reposo domiciliario. Campos dinamicos por tipo. PDF profesional con formato narrativo.",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
  },
  {
    icon: ClipboardList,
    title: "Ordenes medicas",
    description:
      "Laboratorio, imagenes y derivaciones. Catalogo predefinido de estudios. CUIR oficial, prioridad (normal/preferencial/urgente) y HTML para imprimir.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
  {
    icon: MessageCircle,
    title: "Bot de WhatsApp con IA",
    description:
      "Tus pacientes reservan turnos por WhatsApp. La IA de Claude maneja la conversacion, busca horarios disponibles, registra pacientes nuevos y envia recordatorios automaticos.",
    color: "#25d366",
    bg: "rgba(37,211,102,0.1)",
  },
  {
    icon: Mic,
    title: "Dictado por voz + IA",
    description:
      "Dicta las notas de la consulta por voz. La IA estructura el texto en formato clinico profesional con un click.",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
  },
  {
    icon: BarChart3,
    title: "Dashboard en tiempo real",
    description:
      "Turnos de hoy y manana, pacientes totales, ocupacion semanal y mensual. Grafico de turnos por estado.",
    color: "#0891b2",
    bg: "rgba(8,145,178,0.1)",
  },
  {
    icon: Settings,
    title: "Configuracion completa",
    description:
      "Logo del sistema y de documentos, colores de marca, horarios por profesional, bloqueos de fechas y gestion de equipo con roles y firma digital.",
    color: "#64748b",
    bg: "rgba(100,116,139,0.1)",
  },
];

const INTEGRATIONS = [
  { name: "Anthropic Claude", desc: "IA para notas clinicas y bot WhatsApp", icon: Sparkles },
  { name: "RCTA / QBI2", desc: "Vademecum, diagnosticos CIE-10, financiadores", icon: Pill },
  { name: "WhatsApp Cloud API", desc: "Reservas, recordatorios y confirmaciones", icon: MessageCircle },
  { name: "Cloudinary", desc: "Firmas digitales y logos", icon: Globe },
];

const CHECKLIST = [
  "Turnos con calendario semanal y vista lista",
  "Estados de turno: pendiente, confirmado, completado, cancelado",
  "Ficha del paciente con DNI, sexo, obra social, plan y credencial",
  "Historia clinica por consulta con dictado por voz",
  "Mejora de notas clinicas con inteligencia artificial",
  "Recetas digitales con busqueda en vademecum RCTA",
  "Busqueda de diagnosticos CIE-10",
  "Busqueda de obras sociales y financiadores",
  "Firma digital del profesional en recetas",
  "QR de verificacion en cada receta",
  "Certificado de ausentismo laboral",
  "Certificado de ausentismo escolar",
  "Constancia de asistencia medica",
  "Certificado de reposo domiciliario",
  "Ordenes de laboratorio con catalogo predefinido",
  "Ordenes de imagenes (Rx, eco, TAC, RMN)",
  "Derivaciones e interconsultas",
  "CUIR oficial en cada orden",
  "Bot de WhatsApp con IA conversacional",
  "Reserva de turnos por WhatsApp",
  "Recordatorios automaticos a las 18:00",
  "Confirmacion y reprogramacion por WhatsApp",
  "Dashboard con estadisticas en tiempo real",
  "Grafico de ocupacion semanal y mensual",
  "Disponibilidad configurable por profesional",
  "Bloqueo de fechas (vacaciones, feriados, ausencias)",
  "Gestion de equipo con roles (propietario, admin, profesional)",
  "Logo personalizable para sistema y documentos",
  "Colores de marca personalizables",
  "Modo oscuro",
  "Responsive (desktop y mobile)",
  "Multi-tenant (cada clinica tiene sus datos aislados)",
];

export default function ClinicPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a272c] via-[#0f353d] to-[#0a272c]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20,184,166,0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.2), transparent 40%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300 mb-8">
            <Sparkles className="h-4 w-4" />
            Software de gestion clinica con IA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Tu clinica, <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">inteligente</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Agenda, recetas digitales, certificados, ordenes medicas, historia clinica y bot de WhatsApp con IA. Todo lo que necesitas para gestionar tu consultorio en un solo lugar.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:-translate-y-0.5"
            >
              Solicitar demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Todo lo que necesita tu consultorio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada modulo esta disenado para que el profesional se enfoque en atender, no en administrar.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: feature.bg, color: feature.color }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp Highlight */}
      <section className="py-20 bg-[var(--hero-bg-dark)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm font-medium text-green-400 mb-6">
                <MessageCircle className="h-4 w-4" />
                WhatsApp + IA
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Tus pacientes reservan por WhatsApp
              </h2>
              <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                Un bot con inteligencia artificial atiende a tus pacientes 24/7. Busca horarios disponibles, registra pacientes nuevos y reserva turnos. Todo por WhatsApp, sin que vos tengas que hacer nada.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Conversacion natural con IA (Claude)",
                  "Busca profesionales y horarios disponibles",
                  "Registra pacientes nuevos automaticamente",
                  "Recordatorios automaticos a las 18:00",
                  "Confirmacion y reprogramacion con botones",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="w-80 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">DocYa Bot</p>
                    <p className="text-slate-400 text-xs">En linea</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-200 max-w-[85%]">
                    Hola! Necesito un turno con un clinico para manana
                  </div>
                  <div className="bg-green-600/20 border border-green-500/20 rounded-2xl rounded-tr-md px-4 py-2.5 text-sm text-green-100 max-w-[85%] ml-auto">
                    Tengo disponible manana a las 09:00, 10:30 y 15:00 con el Dr. Gonzalez. Cual preferis?
                  </div>
                  <div className="bg-slate-700/50 rounded-2xl rounded-tl-md px-4 py-2.5 text-sm text-slate-200 max-w-[85%]">
                    Las 10:30 por favor
                  </div>
                  <div className="bg-green-600/20 border border-green-500/20 rounded-2xl rounded-tr-md px-4 py-2.5 text-sm text-green-100 max-w-[85%] ml-auto">
                    Listo! Turno confirmado para manana 10:30 con Dr. Gonzalez. Te envio un recordatorio esta tarde.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Integraciones
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Conectado con los servicios que importan en salud
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATIONS.map((integration) => {
              const Icon = integration.icon;
              return (
                <div
                  key={integration.name}
                  className="rounded-2xl border border-border bg-card p-5 text-center hover:shadow-md transition-shadow"
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-[var(--brand)]" />
                  <h3 className="font-semibold text-foreground text-sm">{integration.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{integration.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Checklist */}
      <section className="py-20 bg-[var(--hero-bg-dark)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Todo incluido
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              {CHECKLIST.length} funcionalidades listas para usar
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-start gap-2.5 py-1.5">
                <Check className="h-4 w-4 text-teal-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0">
                <Shield className="h-8 w-8 text-teal-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Seguridad y privacidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Autenticacion JWT con refresh tokens. Roles de acceso (propietario, administrador, profesional). Cada clinica tiene sus datos completamente aislados (multi-tenant). Firma digital conforme Ley 25.506. Soft deletes para auditoria. Validacion de webhooks con HMAC-SHA256.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-600 dark:text-teal-400 mb-6">
            <Zap className="h-4 w-4" />
            Empeza hoy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Tu consultorio merece tecnologia de verdad
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Pedinos una demo personalizada y te mostramos como DocYa Clinic puede simplificar la gestion de tu consultorio.
          </p>
          <div className="mt-10">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all hover:-translate-y-0.5"
            >
              Solicitar demo gratuita
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
