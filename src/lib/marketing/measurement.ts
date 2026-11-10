export const ADS_ID = "AW-18548149251";
export const CONSENT_VERSION = "ads-v1";
export const CONSENT_KEY = "docya_ad_consent_v1";
const VISIT_KEY = "docya_marketing_visit_v1";
const REVOKE_KEY = "docya_marketing_withdrawals_v1";
export const CONSENT_EVENT = "docya:ad-consent";
export const OPEN_CONSENT_EVENT = "docya:open-ad-consent";
export const NOTICE_SESSION_KEY = "docya_ad_notice_dismissed_v1";
const API = process.env.NEXT_PUBLIC_API_BASE || "";
export const MARKETING_ENABLED = process.env.NEXT_PUBLIC_MARKETING_ENABLED === "true";
export type Proof = { visit_id: string; visit_token: string; expires_at: string; gclid?: string };
export type Consent = { advertising: boolean; version: string; updated_at: string };
export type Conversion = { transaction_id: string; value: number | string; currency: string };

export function parseConsent(raw: string | null, now=Date.now()): Consent | null {
  try {
    const c=JSON.parse(raw || "null");
    const age=now-Date.parse(c?.updated_at);
    return c?.version===CONSENT_VERSION && typeof c.advertising==="boolean" && age>=0 && age<180*86400000 ? c : null;
  } catch { return null; }
}
export function consent(): Consent | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
export function permitted() { return MARKETING_ENABLED && consent()?.advertising===true; }
export function readProof(): Proof | null {
  if (!permitted()) return null;
  try {
    const p=JSON.parse(localStorage.getItem(VISIT_KEY) || "null");
    return p?.visit_id && p?.visit_token && Date.parse(p.expires_at)>Date.now() ? p : null;
  } catch { return null; }
}
export function publicMarketingPath(path: string) {
  // An allowlist, not a blacklist of clinical pages.
  return ["/", "/teleconsulta-ads", "/medico-online", "/teleconsulta-particular", "/medico-a-domicilio-particular",
    "/medico-a-domicilio", "/medico-a-domicilio-caba", "/teleconsulta", "/telemedicina",
    "/teleconsulta-argentina", "/teleconsulta-24-horas", "/teleconsulta-turistas", "/teleconsulta-aeropuerto",
    "/doctor-in-buenos-aires", "/medical-care-tourists-argentina"].includes(path);
}
function coded(value: string | null, max=100) {
  return value && new RegExp(`^[A-Za-z0-9_-]{1,${max}}$`).test(value) ? value : undefined;
}
export function landingEvidence(url: string, referrer: string) {
  const u=new URL(url);
  const isPublic=publicMarketingPath(u.pathname);
  const gclid=u.searchParams.get("gclid");
  let host="";
  try { host=new URL(referrer).hostname.toLowerCase(); } catch { /* Empty/invalid. */ }
  // No internal navigation is evidence of a new acquisition or direct entry.
  const internal=["docya.com.ar","www.docya.com.ar",u.hostname].includes(host);
  return {
    consent_version: CONSENT_VERSION, advertising:true,
    gclid:isPublic && gclid && /^[A-Za-z0-9_-]{10,256}$/.test(gclid) ? gclid : undefined,
    utm_source:isPublic ? coded(u.searchParams.get("utm_source"),80) : undefined,
    utm_medium:isPublic ? coded(u.searchParams.get("utm_medium"),80) : undefined,
    utm_campaign:isPublic ? coded(u.searchParams.get("utm_campaign")) : undefined,
    referrer_host:isPublic && !internal ? codedHost(host) : undefined,
    entry_observed:isPublic && !internal,
  };
}
function codedHost(host: string) { return /^[a-z0-9.-]{1,150}$/.test(host) ? host : undefined; }

export async function marketingFetch(path: string, body?: unknown, token?: string) {
  const res=await fetch(`${API}/marketing${path}`,{
    method:body===undefined ? "GET" : "POST",cache:"no-store",
    headers:{"Content-Type":"application/json",...(token ? {Authorization:`Bearer ${token}`} : {})},
    ...(body===undefined ? {} : {body:JSON.stringify(body)}),
  });
  if (!res.ok) throw new Error("Measurement unavailable");
  return res.json();
}
let creating: Promise<Proof | null> | null=null;
export function ensureVisit(evidence: ReturnType<typeof landingEvidence>): Promise<Proof | null> {
  if (!permitted()) return Promise.resolve(null);
  const p=readProof();
  if (p) return Promise.resolve(p);
  if (creating) return creating;
  creating=marketingFetch("/visits",evidence).then((p:Proof)=>{
    if (permitted()) { localStorage.setItem(VISIT_KEY,JSON.stringify(p)); return p; }
    queueWithdrawal(p);return null;
  }).catch(()=>null).finally(()=>{creating=null;});
  return creating;
}
function queueWithdrawal(p:Proof) {
  try {
    const pending:Proof[]=JSON.parse(localStorage.getItem(REVOKE_KEY) || "[]");
    if (!pending.some(x=>x.visit_id===p.visit_id)) pending.push({visit_id:p.visit_id,visit_token:p.visit_token,expires_at:p.expires_at});
    localStorage.setItem(REVOKE_KEY,JSON.stringify(pending.slice(-10)));
  } catch { /* Do not interrupt consent changes. */ }
  void retryWithdrawals();
}
export async function retryWithdrawals() {
  try {
    const pending:Proof[]=JSON.parse(localStorage.getItem(REVOKE_KEY) || "[]");
    for (const p of pending) {
      try {
        await marketingFetch("/visits/revoke",{visit_id:p.visit_id,visit_token:p.visit_token});
        const latest:Proof[]=JSON.parse(localStorage.getItem(REVOKE_KEY) || "[]");
        localStorage.setItem(REVOKE_KEY,JSON.stringify(latest.filter(x=>x.visit_id!==p.visit_id)));
      } catch { /* Keep withdrawal proof for a later retry; never export it. */ }
    }
  } catch { /* Storage unavailable. */ }
}
export function saveConsent(advertising:boolean) {
  try {
    // Read proof before persisting denial.
    const old=JSON.parse(localStorage.getItem(VISIT_KEY) || "null") as Proof | null;
    localStorage.setItem(CONSENT_KEY,JSON.stringify({advertising,version:CONSENT_VERSION,updated_at:new Date().toISOString()}));
    if (!advertising) {
      localStorage.removeItem(VISIT_KEY);
      if (old) queueWithdrawal(old);
      for (const item of document.cookie.split(";")) {
        const key=item.split("=")[0].trim();
        if (!/^_gcl_/.test(key)) continue;
        for (const domain of ["",`; domain=${location.hostname}`,"; domain=.docya.com.ar"]) {
          document.cookie=`${key}=; max-age=0; path=/${domain}; SameSite=Lax`;
        }
      }
    }
  } finally { window.dispatchEvent(new Event(CONSENT_EVENT)); }
}
export function patientSession(): {id:string;access_token:string} | null {
  try {
    const p=JSON.parse(localStorage.getItem("pedir_user") || "null");
    return p?.id && p?.access_token ? p : null;
  } catch { return null; }
}
export async function attachConsultation(consultaId:unknown, token:string) {
  if (!permitted() || !Number.isInteger(Number(consultaId)) || Number(consultaId)<=0) return;
  const proof=readProof();if (!proof) return;
  await marketingFetch(`/consultations/${Number(consultaId)}/attribution`,{visit_id:proof.visit_id,visit_token:proof.visit_token},token);
}
export function safeConversion(c:Conversion) {
  return /^[0-9a-f-]{36}$/i.test(c.transaction_id) && c.currency==="ARS" && Number.isFinite(Number(c.value)) && Number(c.value)>0;
}
