export const RETRY_REQUEST_DRAFT_KEY = "docya_busqueda_reintento_v1";
export const RETRY_REQUEST_HANDOFF_KEY = "docya_reintento_handoff_v1";

export type RetryService = "medico" | "teleconsulta";

export type RetryRequestDraft = {
  ownerId: string;
  sourceConsultationId: string;
  tipo: RetryService | "enfermero";
  motivo: string;
  direccion: string;
  lat: number | null;
  lng: number | null;
  provincia?: string | null;
  localidad?: string | null;
  indicacionesDomicilio?: string;
  categoriaConsulta: string;
  paraOtraPersona: boolean;
  familiarSeleccionadoId?: number | null;
  pacienteMenorNombre?: string;
  pacienteMenorDni?: string;
  pacienteMenorFechaNacimiento?: string;
  pacienteMenorSexo?: string;
  responsableVinculo?: string;
  recipientAuthorized?: boolean;
  metodoPago: string;
};

export type RetryRequestHandoff = RetryRequestDraft & {
  targetType: RetryService;
  previousPaymentStatus: string;
};

export function readRetryDraft(): RetryRequestDraft | null {
  try {
    const raw = sessionStorage.getItem(RETRY_REQUEST_DRAFT_KEY);
    return raw ? JSON.parse(raw) as RetryRequestDraft : null;
  } catch {
    return null;
  }
}

export function saveRetryDraft(draft: RetryRequestDraft): void {
  try { sessionStorage.setItem(RETRY_REQUEST_DRAFT_KEY, JSON.stringify(draft)); } catch {}
}

export function clearRetryDraft(): void {
  try {
    sessionStorage.removeItem(RETRY_REQUEST_DRAFT_KEY);
    sessionStorage.removeItem(RETRY_REQUEST_HANDOFF_KEY);
  } catch {}
}

export function paymentStatusMessage(status: string, method: string): string {
  const normalized = status.trim().toLowerCase();
  if (normalized === "refunded") {
    return "El pago de tu consulta anterior fue reintegrado. La acreditación puede demorar según tu medio de pago. Para iniciar una nueva búsqueda, deberás realizar un nuevo pago.";
  }
  if (normalized === "cancelled" || normalized === "canceled") {
    return "El pago anterior fue anulado y se solicitó la liberación del importe retenido. El plazo depende de tu medio de pago. Para volver a buscar un médico, deberás autorizar un nuevo pago.";
  }
  if (["refund_pending", "qr_refund_pending", "pendiente_de_refund", "refunding", "processing_refund"].includes(normalized)) {
    return "Estamos procesando la devolución de tu consulta anterior. Podés iniciar una nueva búsqueda realizando un nuevo pago.";
  }
  if (normalized === "transfer_credit_available") {
    return "El importe de la transferencia anterior quedó disponible como crédito. El flujo de pago te indicará si alcanza para la nueva consulta; no vuelvas a transferir hasta confirmarlo.";
  }
  if (method === "efectivo") {
    return "La consulta anterior era con pago al profesional. Si volvés a solicitar domicilio, conservarás ese medio; para teleconsulta te mostraremos las opciones de pago vigentes.";
  }
  return "El estado del pago anterior todavía no figura como reintegrado o anulado. DocYa aún no recibió confirmación del proveedor. Si iniciás otra búsqueda, se generará una operación nueva; no se reutiliza la anterior.";
}
