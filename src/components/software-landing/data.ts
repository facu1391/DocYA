// src/components/software-landing/data.ts
import {
  AppWindow,
  Plug,
  BarChart3,
  Workflow,
  BrainCircuit,
  LifeBuoy,
  TrendingDown,
  MessageCircle,
  Mic,
  LayoutDashboard,
  CheckSquare,
  FileText,
  Network,
  Sparkles,
  RefreshCw,
  Users,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  capabilities: string[];
}

export const services: Service[] = [
  {
    icon: AppWindow,
    title: "Aplicaciones personalizadas",
    description:
      "Desarrollo de aplicaciones para Jira, Jira Service Management y Confluence utilizando Atlassian Forge y APIs REST.",
    capabilities: [
      "Apps nativas con Forge",
      "Extensiones de UI en Jira y Confluence",
      "Lógica de negocio a medida",
      "Integración con permisos y roles existentes",
    ],
  },
  {
    icon: Plug,
    title: "Integraciones empresariales",
    description:
      "Conexión de Atlassian con CRM, ERP, WhatsApp, Microsoft Teams, Slack, sistemas internos y servicios externos.",
    capabilities: [
      "Sincronización bidireccional de datos",
      "Webhooks y eventos en tiempo real",
      "Autenticación segura (OAuth 2.0)",
      "Middlewares de integración a medida",
    ],
  },
  {
    icon: BarChart3,
    title: "Dashboards y SLA Analytics",
    description:
      "Dashboards ejecutivos, métricas de SLA, Time to Resolution, Time to First Response, tendencias, cumplimiento y reportes por cliente.",
    capabilities: [
      "Métricas de SLA en tiempo real",
      "Tendencias históricas y comparativas",
      "Reportes segmentados por cliente o equipo",
      "Exportación y automatización de reportes",
    ],
  },
  {
    icon: Workflow,
    title: "Automatización de procesos",
    description:
      "Flujos avanzados, aprobaciones, validaciones, sincronización de datos y acciones automáticas sobre tickets.",
    capabilities: [
      "Reglas de automatización complejas",
      "Flujos de aprobación multinivel",
      "Validaciones previas a transiciones",
      "Acciones programadas y disparadas por eventos",
    ],
  },
  {
    icon: BrainCircuit,
    title: "Inteligencia artificial",
    description:
      "Resumen de incidencias, clasificación automática, generación de respuestas, análisis de causas y detección de riesgos de SLA.",
    capabilities: [
      "Resumen automático de tickets",
      "Clasificación y priorización inteligente",
      "Sugerencias de respuesta",
      "Alertas tempranas de riesgo de incumplimiento",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Soporte y mantenimiento",
    description:
      "Corrección de errores, evolución funcional, monitoreo, actualización frente a cambios de Atlassian y soporte técnico continuo.",
    capabilities: [
      "Monitoreo proactivo",
      "Corrección de errores y mejoras continuas",
      "Adaptación a cambios de plataforma",
      "Soporte técnico con tiempos definidos",
    ],
  },
];

export interface Solution {
  icon: LucideIcon;
  title: string;
}

export const solutions: Solution[] = [
  { icon: BarChart3, title: "Dashboard avanzado de SLA" },
  { icon: TrendingDown, title: "Predicción de incumplimiento de SLA" },
  { icon: MessageCircle, title: "WhatsApp conectado con Jira Service Management" },
  { icon: Mic, title: "Audios de WhatsApp convertidos en comentarios" },
  { icon: LayoutDashboard, title: "Portal personalizado para clientes" },
  { icon: CheckSquare, title: "Centro de aprobaciones" },
  { icon: FileText, title: "Reportes automáticos en PDF" },
  { icon: Network, title: "Integración con ERP o CRM" },
  { icon: Sparkles, title: "Resúmenes de tickets mediante IA" },
  { icon: RefreshCw, title: "Sincronización entre proyectos e instancias" },
  { icon: Users, title: "Gestión avanzada de proveedores" },
  { icon: Building2, title: "Aplicaciones internas para operaciones" },
];

export const technologies: string[] = [
  "Atlassian Forge",
  "Jira Cloud",
  "Jira Service Management",
  "Confluence",
  "Atlassian REST API",
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Webhooks",
  "OAuth 2.0",
  "Inteligencia artificial",
  "Integraciones empresariales",
];
