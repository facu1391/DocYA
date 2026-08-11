// Recuperación de pagos pendientes para el flujo /pedir (paciente web).
//
// Antes solo el flujo de saldo_mp guardaba algo en localStorage (porque ahí
// es obvio que hay un redirect externo de por medio). El flujo de tarjeta
// (iframe embebido) no persistía nada: si el usuario cerraba la pestaña o
// refrescaba justo después de autorizar el pago pero antes de que el
// iframe avisara por postMessage, la consulta quedaba pagada pero nunca
// activada — el mismo bug que se arregló del lado de las apps móviles.
//
// Este módulo centraliza esa persistencia para los dos métodos de pago
// online (tarjeta y saldo_mp) y agrega una recuperación GLOBAL (no atada a
// una página puntual) apoyada en el backend: GET
// /pacientes/{uuid}/consulta_en_curso, la misma fuente de verdad que usan
// las apps móviles.

const API = process.env.NEXT_PUBLIC_API_BASE!;

export const PENDING_PAYMENT_KEY = "docya_pago_pendiente_v1";
// Clave vieja, usada solo por el flujo de saldo_mp antes de esta unificación.
// La seguimos leyendo como fallback por si hay un redirect de MP en vuelo
// justo cuando se despliega este cambio.
const LEGACY_SALDO_MP_KEY = "docya_saldo_mp_pending";

export type PedirUser = { id: string; access_token?: string };

export type PagoPendientePayload = {
  consulta_id: string | number;
  tipo: string;
  motivo?: string;
  direccion?: string;
  lat?: number | null;
  lng?: number | null;
  paciente_uuid: string;
  access_token?: string;
  categoria_consulta?: string;
  provincia?: string;
  paciente_menor_nombre?: string;
  paciente_menor_dni?: string;
  paciente_menor_fecha_nacimiento?: string;
  paciente_menor_sexo?: string;
  responsable_vinculo?: string;
  metodo_pago?: string;
  payment_id?: string;
};

export function guardarPagoPendiente(payload: PagoPendientePayload): void {
  try {
    const raw = JSON.stringify(payload);
    localStorage.setItem(PENDING_PAYMENT_KEY, raw);
    sessionStorage.setItem(PENDING_PAYMENT_KEY, raw);
  } catch {
    // localStorage puede fallar en navegación privada estricta; el flujo
    // normal (postMessage/polling en la misma pestaña) sigue funcionando.
  }
}

export function limpiarPagoPendiente(): void {
  try {
    localStorage.removeItem(PENDING_PAYMENT_KEY);
    sessionStorage.removeItem(PENDING_PAYMENT_KEY);
    localStorage.removeItem(LEGACY_SALDO_MP_KEY);
    sessionStorage.removeItem(LEGACY_SALDO_MP_KEY);
  } catch {}
}

function readStoredJson(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key) || sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function leerPagoPendienteLocal(): PagoPendientePayload | null {
  const data = readStoredJson(PENDING_PAYMENT_KEY) || readStoredJson(LEGACY_SALDO_MP_KEY);
  if (!data || !data.consulta_id || !data.paciente_uuid) return null;
  return data as unknown as PagoPendientePayload;
}

export function leerPedirUser(): PedirUser | null {
  const data = readStoredJson("pedir_user");
  if (!data?.id) return null;
  return { id: String(data.id), access_token: data.access_token ? String(data.access_token) : undefined };
}

/** Reconstruye el payload de activación pegándole al backend con el
 * consulta_id (útil cuando no hay nada en localStorage: otro navegador,
 * modo privado, o el usuario volvió por un link distinto al de vuelta de
 * MP). mp_preautorizado=true es la señal de que el pago se autorizó con
 * tarjeta (hold); si no, y ya está aprobado, fue con saldo_mp. */
export async function reconstruirPagoDesdeConsulta(
  consultaId: string,
  user: PedirUser,
): Promise<PagoPendientePayload | null> {
  if (!consultaId || !user?.access_token) return null;

  const [consultaRes, estadoRes] = await Promise.all([
    fetch(`${API}/consultas/${consultaId}`),
    fetch(`${API}/consultas/${consultaId}/estado`),
  ]);
  if (!consultaRes.ok) return null;

  const consulta = await consultaRes.json();
  const estado = estadoRes.ok ? await estadoRes.json().catch(() => ({})) : {};
  if (String(consulta.paciente_uuid) !== user.id) return null;

  return {
    consulta_id: consulta.id ?? consultaId,
    tipo: consulta.canal_atencion === "teleconsulta" ? "teleconsulta" : consulta.tipo || "teleconsulta",
    motivo: consulta.motivo,
    direccion: consulta.direccion,
    lat: consulta.lat,
    lng: consulta.lng,
    paciente_uuid: user.id,
    access_token: user.access_token,
    categoria_consulta: consulta.categoria_consulta,
    provincia: consulta.provincia,
    paciente_menor_nombre: consulta.paciente_menor_nombre,
    paciente_menor_dni: consulta.paciente_menor_dni,
    paciente_menor_fecha_nacimiento: consulta.paciente_menor_fecha_nacimiento,
    paciente_menor_sexo: consulta.paciente_menor_sexo,
    responsable_vinculo: consulta.responsable_vinculo,
    metodo_pago: estado.metodo_pago || (estado.mp_preautorizado ? "tarjeta" : "saldo_mp"),
    payment_id: estado.payment_id,
  };
}

function getConsultaId(data: Record<string, unknown>) {
  return data.id ?? data.consulta_id;
}

/** Activa la consulta previa (POST /teleconsultas o /consultas/solicitar).
 * Ambos endpoints son idempotentes del lado del backend: llamarlo de más
 * (por ejemplo porque el usuario también lo disparó desde otra pestaña) no
 * duplica la consulta ni reenvía notificaciones a los profesionales. */
export async function solicitarConsulta(body: Record<string, unknown>) {
  const tipo = String(body.tipo ?? "");
  const endpoint = tipo === "teleconsulta" ? "/teleconsultas" : "/consultas/solicitar";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const payload = tipo === "teleconsulta"
    ? {
        consulta_id: body.consulta_id,
        paciente_uuid: body.paciente_uuid,
        motivo: body.motivo,
        direccion: body.direccion,
        provincia: body.provincia || "Argentina",
        localidad: body.direccion || "Argentina",
        categoria_consulta: body.categoria_consulta,
        paciente_menor_nombre: body.paciente_menor_nombre,
        paciente_menor_dni: body.paciente_menor_dni,
        paciente_menor_fecha_nacimiento: body.paciente_menor_fecha_nacimiento,
        paciente_menor_sexo: body.paciente_menor_sexo,
        responsable_vinculo: body.responsable_vinculo,
        necesita_certificado: false,
        consentimiento_teleconsulta: true,
        metodo_pago: body.metodo_pago,
        payment_id: body.payment_id,
      }
    : body;

  if (tipo === "teleconsulta") {
    const token = String(body.access_token ?? "");
    if (!token) throw new Error("TOKEN_REQUIRED");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail?.mensaje || err.detail || "ERROR_INICIAR");
  }
  const data = await res.json();
  return { ...data, consulta_id: getConsultaId(data) };
}

export type ConsultaEnCursoInfo = {
  consultaId: string;
  tipo: string;
};

/** Recuperación GLOBAL: se llama al entrar al Home (o desde cualquier
 * página que quiera chequear). A diferencia de la recuperación puntual de
 * PagoResultadoScreen (atada a volver desde MP), esta no depende de que el
 * usuario vuelva a ninguna página en particular — solo de que en algún
 * momento vuelva a abrir DocYa logueado. Fuente de verdad: el backend, no
 * localStorage.
 *
 * Devuelve la consulta a la que hay que volver (para redirigir a
 * /pedir/buscando), o null si no hay nada pendiente/activo.
 */
export async function recuperarConsultaPendienteGlobal(
  user: PedirUser,
): Promise<ConsultaEnCursoInfo | null> {
  if (!user?.id) return null;
  try {
    const res = await fetch(`${API}/pacientes/${user.id}/consulta_en_curso`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data?.activa) {
      const pendiente = leerPagoPendienteLocal();
      if (pendiente?.metodo_pago === "transferencia") return null;
      limpiarPagoPendiente();
      return null;
    }

    const consultaId = String(data.consulta_id);
    const tipo = data.canal_atencion === "teleconsulta" ? "teleconsulta" : (data.tipo || "medico");

    if (data.fase !== "pago_pendiente") {
      // Ya está despachada (buscando profesional / asignada / en curso):
      // no hay que reactivar nada, solo retomar la pantalla de estado.
      return { consultaId, tipo };
    }

    const tienePago = data.mp_preautorizado === true || data.mp_capturado === true ||
      ["approved", "authorized", "preautorizado", "approved_manual_transfer"].includes(String(data.mp_status || "").toLowerCase());
    if (!tienePago) return null; // sigue esperando confirmación de MP

    const pendienteLocal = leerPagoPendienteLocal();
    const payload = pendienteLocal && String(pendienteLocal.consulta_id) === consultaId
      ? pendienteLocal
      : await reconstruirPagoDesdeConsulta(consultaId, user);
    if (!payload) return null;

    await solicitarConsulta({
      ...payload,
      paciente_uuid: user.id,
      access_token: user.access_token,
      consulta_id: consultaId,
    });
    limpiarPagoPendiente();
    return { consultaId, tipo };
  } catch {
    return null;
  }
}
