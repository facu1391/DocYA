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
  if (response.status === 401 && authorization) {
    if (token) rejectedTokens.add(token);
    throw requestPatientLogin();
  }
  return response;
}
