import { getToken } from "@/lib/recetario/auth";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.NEXT_PUBLIC_API_URL ||
  "";

// ── Helpers ───────────────────────────────────────────────────────────────────

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function parseJsonResponse(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `La API respondió un formato inválido (${res.status}). Verificá NEXT_PUBLIC_API_BASE/NEXT_PUBLIC_API_URL.`,
    );
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginMedico(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al iniciar sesión");
  return data;
}

export async function loginMedicoConGoogle(idToken: string) {
  const res = await fetch(`${BASE}/auth/google_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al iniciar sesión con Google");
  return data;
}

export interface MedicoPerfil {
  id: number;
  full_name: string;
  email: string;
  especialidad: string | null;
  telefono: string | null;
  alias_cbu: string | null;
  matricula: string | null;
  foto_perfil: string | null;
  tipo: string;
  firma_url: string | null;
  numero_documento?: string | null;
  matricula_validada?: boolean;
  perfil_completo?: boolean;
  validado?: boolean;
}

export async function obtenerPerfilMedico(medico_id: number, token: string): Promise<MedicoPerfil> {
  const res = await fetch(`${BASE}/auth/medico/${medico_id}`, {
    headers: authHeaders(token),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al cargar el perfil");
  return data;
}

export async function registerMedico(payload: Record<string, unknown>) {
  const res = await fetch(`${BASE}/auth/register_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al registrarse");
  return data as { medico_id?: number; id?: number; [key: string]: unknown };
}

export interface CompletarPerfilMedicoIn {
  medico_id: number;
  tipo: string;
  tipo_documento: string;
  numero_documento: string;
  matricula: string;
  especialidad?: string | null;
  telefono: string;
  direccion: string;
  provincia?: string | null;
  localidad?: string | null;
  foto_dni_frente: string;
  foto_dni_dorso: string;
  selfie_dni: string;
  acepta_terminos: boolean;
}

export async function completarPerfilMedico(
  payload: CompletarPerfilMedicoIn,
  token?: string
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}/auth/completar_perfil_medico`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al completar el perfil");
  return data;
}

export async function subirFirmaDigital(medico_id: number, file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/auth/medico/${medico_id}/firma`, {
    method: "POST",
    body: form,
  });
  const data = await parseJsonResponse(res);
  if (!res.ok) throw new Error(data.detail || "Error al subir la firma");
  return data as { ok: boolean; firma_url: string };
}

// ── Medicamentos ──────────────────────────────────────────────────────────────

export interface Medicamento {
  id: number;
  nombre_comercial: string;
  principio_activo_str: string;
  forma: string | null;
  concentracion: string | null;
  laboratorio: string | null;
  presentacion?: string | null;
  requiere_receta: boolean;
  categoria: string | null;
  alertas: string[];
  codigo_alfabeta?: string | null;
  regNo?: string | null;
  nombreProducto?: string | null;
  nombreDroga?: string | null;
  tieneCobertura?: boolean;
  requiereAprobacion?: boolean;
  descuento?: number | null;
  requiereDuplicado?: boolean;
  hiv?: boolean;
  psicofarmaco?: boolean;
  estupefaciente?: boolean;
  ventaControlada?: boolean;
  pvp_pami?: number | null;
  cobertura_pct?: number | null;
  importe_afiliado?: number | null;
  /** Indica si el resultado matcheó por nombre comercial o principio activo */
  match_field?: "nombre_comercial" | "principio_activo";
}

export async function buscarMedicamentos(q: string): Promise<Medicamento[]> {
  if (q.length < 2) return [];
  const token = getToken();
  if (!token) throw new Error("Token no proporcionado");
  const termino = q.trim();
  const res = await fetch(
    `${BASE}/recetario/rcta/medicamentos?q=${encodeURIComponent(termino)}`,
    { headers: authHeaders(token) },
  );
  const data = await parseJsonResponse(res);
  if (!res.ok) {
    throw new Error(data.detail || data.mensaje || "No se pudo consultar el vademécum QBI2");
  }
  const medicamentos = data?.response?.medicamentos ?? data?.medicamentos;
  if (!Array.isArray(medicamentos)) {
    throw new Error("QBI2 no devolvió un listado de medicamentos válido");
  }
  return medicamentos.map((item: Record<string, unknown>, index: number) => {
    const nombreProducto = String(item.nombreProducto ?? "").trim();
    const nombreDroga = String(item.nombreDroga ?? "").trim();
    const regNo = String(item.regNo ?? "").trim();
    return {
      id: Number(regNo) || index,
      nombre_comercial: nombreProducto,
      principio_activo_str: nombreDroga,
      forma: null,
      concentracion: null,
      laboratorio: null,
      presentacion: typeof item.presentacion === "string" ? item.presentacion : null,
      requiere_receta: true,
      categoria: null,
      alertas: [
        item.psicofarmaco ? "Psicofármaco" : "",
        item.estupefaciente ? "Estupefaciente" : "",
        item.ventaControlada ? "Venta controlada" : "",
        item.hiv ? "HIV" : "",
        item.requiereDuplicado ? "Requiere duplicado" : "",
        item.requiereAprobacion ? "Requiere aprobación" : "",
      ].filter(Boolean) as string[],
      codigo_alfabeta: regNo || null,
      regNo: regNo || null,
      nombreProducto: nombreProducto || null,
      nombreDroga: nombreDroga || null,
      tieneCobertura: Boolean(item.tieneCobertura),
      requiereAprobacion: Boolean(item.requiereAprobacion),
      descuento: typeof item.descuento === "number" ? item.descuento : null,
      requiereDuplicado: Boolean(item.requiereDuplicado),
      hiv: Boolean(item.hiv),
      psicofarmaco: Boolean(item.psicofarmaco),
      estupefaciente: Boolean(item.estupefaciente),
      ventaControlada: Boolean(item.ventaControlada),
      match_field: nombreProducto.toLowerCase().includes(termino.toLowerCase())
        ? "nombre_comercial" as const
        : "principio_activo" as const,
    };
  });
}

export async function buscarPorPrincipioActivo(nombre: string): Promise<Medicamento[]> {
  return buscarMedicamentos(nombre);
}

// ── Recetario — Pacientes ─────────────────────────────────────────────────────

export const TIPOS_DOCUMENTO = ["DNI", "CI", "Pasaporte", "LC", "LE"] as const;
export const SEXOS = ["M", "F", "X"] as const;
export type TipoDocumento = typeof TIPOS_DOCUMENTO[number];
export type Sexo = typeof SEXOS[number];

export interface Paciente {
  id: number;
  nombre: string;
  apellido: string;
  tipo_documento: TipoDocumento;
  nro_documento: string;
  sexo: Sexo;
  fecha_nacimiento: string | null;
  telefono: string | null;
  email: string | null;
  obra_social: string | null;
  plan: string | null;
  nro_credencial: string | null;
  cuil: string | null;
  observaciones: string | null;
  creado_en: string;
}

export interface PacienteIn {
  nombre: string;
  apellido: string;
  tipo_documento: TipoDocumento;
  nro_documento: string;
  sexo: Sexo;
  fecha_nacimiento?: string;
  telefono?: string;
  email?: string;
  obra_social?: string;
  plan?: string;
  nro_credencial?: string;
  cuil?: string;
  observaciones?: string;
}

export async function crearPaciente(
  data: PacienteIn,
  token: string
): Promise<{ paciente_id: number; creado_en: string }> {
  const res = await fetch(`${BASE}/recetario/pacientes`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al crear paciente");
  return json;
}

export async function listarPacientes(
  token: string,
  q?: string
): Promise<{ total: number; pacientes: Paciente[] }> {
  const url = q
    ? `${BASE}/recetario/pacientes?q=${encodeURIComponent(q)}`
    : `${BASE}/recetario/pacientes`;
  const res = await fetch(url, { headers: authHeaders(token) });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al listar pacientes");
  return json;
}

export async function editarPaciente(
  id: number,
  data: PacienteIn,
  token: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/recetario/pacientes/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al editar paciente");
  return json;
}

export async function eliminarPaciente(
  id: number,
  token: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/recetario/pacientes/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al eliminar paciente");
  return json;
}

// ── Recetario — Recetas ───────────────────────────────────────────────────────

export interface MedicamentoItem {
  nombre?: string;
  ifa?: string;
  nombre_comercial?: string;
  forma_farmaceutica?: string;
  concentracion?: string;
  presentacion?: string;
  cantidad: number;
  indicaciones: string;
}

export interface RecetaIn {
  paciente_id: number;
  obra_social?: string;
  plan?: string;
  nro_credencial?: string;
  diagnostico?: string;
  medicamentos: MedicamentoItem[];
}

export interface RecetaResumen {
  id: number;
  uuid: string;
  cuir?: string;
  estado: "valida" | "anulada";
  diagnostico: string | null;
  fecha: string | null;
  paciente: string;
  documento: string;
  url_html?: string | null;
  sent_to_farmalink?: boolean;
}

export async function emitirReceta(
  data: RecetaIn,
  token: string
): Promise<{
  ok: boolean;
  id: number;
  receta_id: number;
  uuid: string;
  cuir: string;
  url_html: string;
  pdf_url: string;
  status: string;
}> {
  const res = await fetch(`${BASE}/recetario/recetas`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al emitir receta");
  return json;
}

export async function listarRecetas(
  token: string
): Promise<{ total: number; recetas: RecetaResumen[] }> {
  const res = await fetch(`${BASE}/recetario/recetas`, {
    headers: authHeaders(token),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al cargar historial");
  return json;
}

export async function anularReceta(
  id: number,
  motivo: string,
  token: string
): Promise<{ ok: boolean }> {
  const res = await fetch(`${BASE}/recetario/recetas/${id}/anular`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ motivo }),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al anular receta");
  return json;
}

// ── Recetario — Certificados ──────────────────────────────────────────────────

export interface CertificadoIn {
  paciente_id: number;
  tipo_certificado: "ausentismo_laboral" | "ausentismo_escolar" | "constancia_asistencia" | "reposo_domiciliario";
  diagnostico?: string;
  reposo_dias?: number;
  observaciones?: string;
  campos?: Record<string, string | number | undefined>;
}

export interface CertificadoResumen {
  id: number;
  tipo_certificado: string;
  tipo_label: string;
  diagnostico: string | null;
  reposo_dias: number | null;
  fecha: string | null;
  paciente: string;
  documento: string;
}

export async function emitirCertificado(
  data: CertificadoIn,
  token: string
): Promise<{ id: number; creado_en: string; url_html: string }> {
  const res = await fetch(`${BASE}/recetario/certificados`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al emitir certificado");
  return json;
}

export async function listarCertificados(
  token: string
): Promise<{ total: number; certificados: CertificadoResumen[] }> {
  const res = await fetch(`${BASE}/recetario/certificados`, {
    headers: authHeaders(token),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(json.detail || "Error al cargar certificados");
  return json;
}
