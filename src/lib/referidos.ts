// src/lib/referidos.ts
export interface Referente {
  id: string
  full_name: string
  email: string
  tipo: string
  codigo_referido: string
  link_referido: string
}

export interface Stats {
  total_referidos: number
  total_consultas_validas: number
  monto_total_acumulado: number
  monto_pendiente: number
  precio_por_consulta: number
}

export interface Referido {
  paciente_uuid: string
  full_name: string
  localidad: string
  fecha_registro: string | null
  ultima_consulta: string | null
  monto_total: number
  estado_pago: string
  vence_en: string | null
}

export const TIPO_LABEL: Record<string, string> = {
  influencer: "Influencer",
  embajador: "Embajador",
  paciente: "Paciente Feliz",
  partner: "Partner",
}

export function getReferidosApiBase() {
  return (
    process.env.NEXT_PUBLIC_API_BASE ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  )
}

export function apiUrl(path: string) {
  const base = getReferidosApiBase().replace(/\/$/, "")
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return `${base}${cleanPath}`
}

export function fmt(iso: string | null): string {
  if (!iso) return "—"

  const d = new Date(iso)
  const diff = (Date.now() - d.getTime()) / 1000

  if (diff < 3600) return "Hace unos minutos"
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} horas`
  if (diff < 172800) return "Ayer"

  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function fmtDate(iso: string | null): string {
  if (!iso) return "—"

  return new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function getStoredReferente(): Referente | null {
  if (typeof window === "undefined") return null

  const raw = localStorage.getItem("docya_referente")
  if (!raw) return null

  try {
    return JSON.parse(raw) as Referente
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("docya_token")
}

export function clearReferidosSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem("docya_token")
  localStorage.removeItem("docya_referente")
}