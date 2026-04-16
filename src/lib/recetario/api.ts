const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "";

function authHeaders(token: string) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function parseApiResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const raw = await res.text();

  if (!contentType.includes("application/json")) {
    if (raw.trim().startsWith("<!DOCTYPE") || raw.trim().startsWith("<html")) {
      throw new Error(
        "La API devolvio HTML en lugar de JSON. Revisa la URL del backend en Vercel.",
      );
    }
    throw new Error("La API devolvio una respuesta no valida.");
  }

  return JSON.parse(raw) as T;
}

function requireBaseUrl() {
  if (!BASE) {
    throw new Error("Falta configurar NEXT_PUBLIC_API_URL o NEXT_PUBLIC_API_BASE.");
  }
}

interface LoginMedicoResponse {
  medico_id: number;
  access_token: string;
  full_name?: string;
  tipo?: string;
  email?: string;
  dni?: string;
  validado?: boolean;
  matricula_validada?: boolean;
  perfil_completo?: boolean;
  especialidad?: string | null;
  matricula?: string | null;
  firma_url?: string | null;
  detail?: string;
  [key: string]: unknown;
}

export async function loginMedico(
  email: string,
  password: string,
): Promise<LoginMedicoResponse> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/auth/login_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseApiResponse<LoginMedicoResponse>(res);
  if (!res.ok) throw new Error(data.detail || "Error al iniciar sesion");
  return data;
}

export async function loginMedicoConGoogle(
  idToken: string,
): Promise<LoginMedicoResponse> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/auth/google_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_token: idToken }),
  });
  const data = await parseApiResponse<LoginMedicoResponse>(res);
  if (!res.ok) throw new Error(data.detail || "Error al iniciar sesion con Google");
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

export async function obtenerPerfilMedico(
  medico_id: number,
  token: string,
): Promise<MedicoPerfil> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/auth/medico/${medico_id}`, {
    headers: authHeaders(token),
  });
  const data = await parseApiResponse<MedicoPerfil & { detail?: string }>(res);
  if (!res.ok) throw new Error(data.detail || "Error al cargar el perfil");
  return data;
}

export async function registerMedico(payload: Record<string, unknown>) {
  requireBaseUrl();
  const res = await fetch(`${BASE}/auth/register_medico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse<{
    medico_id?: number;
    id?: number;
    detail?: string;
    [key: string]: unknown;
  }>(res);
  if (!res.ok) throw new Error(data.detail || "Error al registrarse");
  return data;
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

interface CompletarPerfilMedicoResponse {
  ok?: boolean;
  detail?: string;
  medico?: Partial<MedicoPerfil> & {
    validado?: boolean;
    matricula_validada?: boolean;
    perfil_completo?: boolean;
  };
  [key: string]: unknown;
}

export async function completarPerfilMedico(
  payload: CompletarPerfilMedicoIn,
  token?: string,
): Promise<CompletarPerfilMedicoResponse> {
  requireBaseUrl();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}/auth/completar_perfil_medico`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const data = await parseApiResponse<CompletarPerfilMedicoResponse>(res);
  if (!res.ok) throw new Error(data.detail || "Error al completar el perfil");
  return data;
}

export async function subirFirmaDigital(medico_id: number, file: File) {
  requireBaseUrl();
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/auth/medico/${medico_id}/firma`, {
    method: "POST",
    body: form,
  });
  const data = await parseApiResponse<{ ok: boolean; firma_url: string; detail?: string }>(
    res,
  );
  if (!res.ok) throw new Error(data.detail || "Error al subir la firma");
  return data;
}

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
  pvp_pami?: number | null;
  cobertura_pct?: number | null;
  importe_afiliado?: number | null;
  match_field?: "nombre_comercial" | "principio_activo";
}

export async function buscarMedicamentos(q: string): Promise<Medicamento[]> {
  requireBaseUrl();
  if (q.length < 2) return [];
  const res = await fetch(`${BASE}/medicamentos?q=${encodeURIComponent(q)}&limit=12`);
  const data = await parseApiResponse<{ resultados?: Medicamento[] }>(res);
  return data.resultados ?? [];
}

export async function buscarPorPrincipioActivo(
  nombre: string,
): Promise<Medicamento[]> {
  requireBaseUrl();
  const res = await fetch(
    `${BASE}/medicamentos/principio/${encodeURIComponent(nombre)}?limit=10`,
  );
  const data = await parseApiResponse<{ resultados?: Medicamento[] }>(res);
  return data.resultados ?? [];
}

export const TIPOS_DOCUMENTO = ["DNI", "CI", "Pasaporte", "LC", "LE"] as const;
export const SEXOS = ["M", "F", "X"] as const;
export type TipoDocumento = (typeof TIPOS_DOCUMENTO)[number];
export type Sexo = (typeof SEXOS)[number];

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
  token: string,
): Promise<{ paciente_id: number; creado_en: string }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/pacientes`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseApiResponse<{
    paciente_id: number;
    creado_en: string;
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al crear paciente");
  return json;
}

export async function listarPacientes(
  token: string,
  q?: string,
): Promise<{ total: number; pacientes: Paciente[] }> {
  requireBaseUrl();
  const url = q
    ? `${BASE}/recetario/pacientes?q=${encodeURIComponent(q)}`
    : `${BASE}/recetario/pacientes`;
  const res = await fetch(url, { headers: authHeaders(token) });
  const json = await parseApiResponse<{
    total: number;
    pacientes: Paciente[];
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al listar pacientes");
  return json;
}

export async function editarPaciente(
  id: number,
  data: PacienteIn,
  token: string,
): Promise<{ ok: boolean }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/pacientes/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseApiResponse<{ ok: boolean; detail?: string }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al editar paciente");
  return json;
}

export async function eliminarPaciente(
  id: number,
  token: string,
): Promise<{ ok: boolean }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/pacientes/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  const json = await parseApiResponse<{ ok: boolean; detail?: string }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al eliminar paciente");
  return json;
}

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
  sent_to_farmalink?: boolean;
}

export async function emitirReceta(
  data: RecetaIn,
  token: string,
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
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/recetas`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseApiResponse<{
    ok: boolean;
    id: number;
    receta_id: number;
    uuid: string;
    cuir: string;
    url_html: string;
    pdf_url: string;
    status: string;
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al emitir receta");
  return json;
}

export async function listarRecetas(
  token: string,
): Promise<{ total: number; recetas: RecetaResumen[] }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/recetas`, {
    headers: authHeaders(token),
  });
  const json = await parseApiResponse<{
    total: number;
    recetas: RecetaResumen[];
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al cargar historial");
  return json;
}

export async function anularReceta(
  id: number,
  motivo: string,
  token: string,
): Promise<{ ok: boolean }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/recetas/${id}/anular`, {
    method: "PATCH",
    headers: authHeaders(token),
    body: JSON.stringify({ motivo }),
  });
  const json = await parseApiResponse<{ ok: boolean; detail?: string }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al anular receta");
  return json;
}

export interface CertificadoIn {
  paciente_id: number;
  tipo_certificado:
    | "ausentismo_laboral"
    | "ausentismo_escolar"
    | "constancia_asistencia"
    | "reposo_domiciliario";
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
  token: string,
): Promise<{ id: number; creado_en: string; url_html: string }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/certificados`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  const json = await parseApiResponse<{
    id: number;
    creado_en: string;
    url_html: string;
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al emitir certificado");
  return json;
}

export async function listarCertificados(
  token: string,
): Promise<{ total: number; certificados: CertificadoResumen[] }> {
  requireBaseUrl();
  const res = await fetch(`${BASE}/recetario/certificados`, {
    headers: authHeaders(token),
  });
  const json = await parseApiResponse<{
    total: number;
    certificados: CertificadoResumen[];
    detail?: string;
  }>(res);
  if (!res.ok) throw new Error(json.detail || "Error al cargar certificados");
  return json;
}
