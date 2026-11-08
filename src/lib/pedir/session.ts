export const PATIENT_SESSION_INVALID = "docya:patient-session-invalid";
export const PATIENT_SESSION_MESSAGE = "Tu sesión ya no es válida. Volvé a iniciar sesión para continuar.";
const rejectedTokens = new Set<string>();
export const PATIENT_LOGIN_RETURN_KEY = "docya:patient-login-return";

export function paymentLoginReturnPath(path: string): boolean {
  return /^\/pedir\/(transferencia|pago|qr)(\?|$)/.test(path);
}

export class PatientSessionError extends Error {
  constructor() {
    super(PATIENT_SESSION_MESSAGE);
    this.name = "PatientSessionError";
  }
}

export function patientTokenExpired(token: string): boolean {
  try {
    const payload = token.split(".")[1];
    const { exp } = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof exp === "number" && exp * 1000 <= Date.now();
  } catch {
    // El servidor sigue siendo la autoridad para validar el token.
    return false;
  }
}

export function requestPatientLogin(): PatientSessionError {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(PATIENT_SESSION_INVALID));
  return new PatientSessionError();
}

/** No reintenta solicitudes: un pago o una consulta no deben duplicarse. */
export async function patientFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined));
  const authorization = headers.get("Authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (authorization?.startsWith("Bearer ")) {
    if (!token || token === "undefined" || token === "null" || rejectedTokens.has(token) || patientTokenExpired(token)) {
      throw requestPatientLogin();
    }
  }
  const response = await fetch(input, init);
  const observeFunnel = process.env.NEXT_PUBLIC_PATIENT_CONVERSION_ENABLED !== "false";
  const observeCampaign = process.env.NEXT_PUBLIC_MARKETING_ENABLED === "true";
  // Detached observation never retries or delays the original operation.
  if ((observeFunnel || observeCampaign) && response.ok && token && init?.method?.toUpperCase()==='POST') {
    const url=typeof input==='string'?input:input instanceof URL?input.href:input.url;
    if (/\/(consultas\/crear_previa|consultas\/solicitar|teleconsultas)(\?|$)/.test(url)) {
      try {
        void response.clone().json().then(data=>{
          const id = data.consulta_id ?? data.id;
          if (observeFunnel) void import('./conversion').then(({requestCreated})=>requestCreated(id,token)).catch(()=>undefined);
          if (observeCampaign) void import('../marketing/measurement')
            .then(({attachConsultation})=>attachConsultation(id,token)).catch(()=>undefined);
        }).catch(()=>undefined);
      } catch { /* Observability cannot fail an already successful request. */ }
    }
  }
  if (response.status === 401 && authorization) {
    if (token) rejectedTokens.add(token);
    throw requestPatientLogin();
  }
  return response;
}
