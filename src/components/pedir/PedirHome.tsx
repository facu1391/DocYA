"use client";

import { PATIENT_LOGIN_RETURN_KEY, paymentLoginReturnPath } from "@/lib/pedir/session";
import TeleconsultaDeviceModal from "./TeleconsultaDeviceModal";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppSupportButton from "@/components/fab/WhatsAppSupportButton";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, Clock, Star, CreditCard, ChevronRight,
  Phone, LogOut, User, ChevronDown, Sun, Moon,
  AlertTriangle, Globe, Gift,
} from "lucide-react";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";
import { leerPagoPendienteLocal, recuperarConsultaPendienteGlobal } from "@/lib/pedir/pendingPayment";
import { getPatientReferrals, type PatientReferralSummary } from "@/lib/pedir/patientReferrals";
import PatientHomeDashboard from "./PatientHomeDashboard";
import PedirAsistente from "./PedirAsistente";
import { PATIENT_REFERRALS_ENABLED } from "@/lib/pedir/referralFeature";

const API = process.env.NEXT_PUBLIC_API_BASE!;
const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";
const APPLE_SERVICE_ID = process.env.NEXT_PUBLIC_APPLE_SERVICE_ID || "com.docya.web";

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean; access_token?: string };
type AppleWin = Window & { AppleID?: { auth?: { init: (c: object) => void; signIn: () => Promise<{ authorization: { id_token: string }; user?: { name?: { firstName?: string; lastName?: string }; email?: string } }> } } };
type GoogleWin = Window & { google?: { accounts?: { id?: { initialize: (c: object) => void; renderButton: (el: HTMLElement, opts: object) => void } } } };
type ServicioId = "medico" | "teleconsulta" | "enfermero";
type PrecioServicio = { monto: number; descripcion?: string };

const TRUST_ICONS = [ShieldCheck, Clock, CreditCard, Star];

const TARIFA_ENDPOINTS: Record<ServicioId, string> = {
  medico: "consulta-medico",
  teleconsulta: "teleconsulta",
  enfermero: "consulta-enfermero",
};

function parseMonto(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

const notify = (msg: string, ok = true) => {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;background:${ok ? "rgba(0,179,166,0.9)" : "rgba(239,68,68,0.9)"};box-shadow:0 8px 24px rgba(0,0,0,0.25)`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
};

export default function PedirHome() {
  const router = useRouter();
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [telePediatricaPendiente, setTelePediatricaPendiente] = useState(false);
  const devicesTested = useRef(false);
  const markDevicesTested = () => { devicesTested.current = true; };
  const startTeleconsulta = (pediatrica = false) => {
    setTelePediatricaPendiente(pediatrica);
    const destino = `/pedir/filtro?tipo=teleconsulta${pediatrica ? "&pediatria=1" : ""}`;
    if (devicesTested.current) router.push(destino);
    else setDeviceModalOpen(true);
  };
  const googleRef = useRef<HTMLDivElement | null>(null);
  const googleRendered = useRef(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [appleLoaded, setAppleLoaded]   = useState(false);
  const [googleBusy, setGoogleBusy]     = useState(false);
  const [appleBusy, setAppleBusy]       = useState(false);
  const [user, setUser]                 = useState<PedirUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(true);
  const [precios, setPrecios]           = useState<Partial<Record<ServicioId, PrecioServicio>>>({});
  const [referralSummary, setReferralSummary] = useState<PatientReferralSummary | null>(null);
  const { dark, setTheme, homeBg: bg, cardBg, border, text, muted, headerBg, logo } = usePedirTheme();
  const { t, locale, setLocale } = useI18n();

  const TRUST_STRIP = TRUST_ICONS.map((icon, i) => ({
    icon,
    label: t.pedir.trustStrip[i].title,
    sub: t.pedir.trustStrip[i].description,
  }));

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Recuperar consulta activa si el paciente navegó atrás accidentalmente
  // (chequeo instantáneo, sin red — cubre el caso más común).
  useEffect(() => {
    try {
      if (!localStorage.getItem("pedir_user")) return;
      const raw = localStorage.getItem("docya_consulta_activa");
      if (!raw) return;
      const { consulta_id, tipo } = JSON.parse(raw) as { consulta_id: string; tipo: string };
      if (!consulta_id) return;
      router.replace(`/pedir/buscando?consulta_id=${consulta_id}&tipo=${tipo}`);
    } catch {}
  }, [router]);

  // Recuperación GLOBAL contra el backend: cubre el caso que el chequeo de
  // arriba no puede ver — un pago ya aprobado por Mercado Pago que nunca
  // llegó a activar la consulta (por ejemplo, la pestaña se cerró antes de
  // volver de MP, o antes de que el iframe de tarjeta avisara). No depende
  // de en qué página haya quedado el paciente: alcanza con que vuelva a
  // abrir DocYa logueado.
  useEffect(() => {
    if (!user) return;
    const qr = leerPagoPendienteLocal();
    if (qr?.metodo_pago === "qr_mp" && qr.qr_url && qr.qr_order_id && qr.qr_amount && String(qr.paciente_uuid) === String(user.id)) {
      const query = new URLSearchParams({ consulta_id: String(qr.consulta_id), url: qr.qr_url, order_id: qr.qr_order_id, monto: qr.qr_amount });
      router.replace(`/pedir/qr?${query.toString()}`);
      return;
    }
    let cancelado = false;
    recuperarConsultaPendienteGlobal(user).then(info => {
      if (cancelado || !info) return;
      router.replace(`/pedir/buscando?consulta_id=${info.consultaId}&tipo=${info.tipo}`);
    });
    return () => { cancelado = true; };
  }, [user, router]);

  useEffect(() => {
    if (!PATIENT_REFERRALS_ENABLED || !user?.access_token) { setReferralSummary(null); return; }
    getPatientReferrals(user.access_token).then(setReferralSummary).catch(() => undefined);
  }, [user]);

  useEffect(() => {
    let alive = true;
    Promise.all(
      (Object.entries(TARIFA_ENDPOINTS) as [ServicioId, string][]).map(async ([id, endpoint]) => {
        try {
          const res = await fetch(`${API}/tarifas/${endpoint}`, { cache: "no-store" });
          if (!res.ok) return null;
          const data = await res.json();
          const monto = parseMonto(data?.monto);
          if (!monto) return null;
          return [id, { monto, descripcion: data?.descripcion }] as const;
        } catch {
          return null;
        }
      })
    ).then(items => {
      if (!alive) return;
      setPrecios(Object.fromEntries(items.filter(Boolean) as [ServicioId, PrecioServicio][]));
      setPricesLoading(false);
    });
    return () => { alive = false; };
  }, []);

  const saveUser = (u: PedirUser) => {
    localStorage.setItem("pedir_user", JSON.stringify(u));
    try {
      const raw = sessionStorage.getItem(PATIENT_LOGIN_RETURN_KEY);
      sessionStorage.removeItem(PATIENT_LOGIN_RETURN_KEY);
      const resume = raw ? JSON.parse(raw) : null;
      if (u.perfil_completo && resume?.ownerId === String(u.id) && typeof resume.path === "string" && paymentLoginReturnPath(resume.path)) {
        window.location.assign(resume.path);
        return true;
      }
    } catch { /* El ingreso no depende del almacenamiento de recuperación. */ }
    setUser(u);
    return false;
  };

  const logout = () => {
    localStorage.removeItem("pedir_user");
    setUser(null);
    googleRendered.current = false;
    setUserMenuOpen(false);
  };

  const handleGoogleCredential = useCallback(async (credential: string) => {
    setGoogleBusy(true);
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Error con Google");
      const u: PedirUser = {
        id: String(data.user?.id ?? ""), full_name: data.user?.full_name ?? "Usuario",
        email: data.user?.email ?? "", perfil_completo: data.perfil_completo ?? data.user?.perfil_completo ?? false,
        access_token: data.access_token,
      };
      if (saveUser(u)) return;
      notify(t.pedir.bienvenido);
      if (!u.perfil_completo) router.push("/pedir/perfil");
    } catch (e) {
      notify(e instanceof Error ? e.message : t.pedir.errorLogin, false);
    } finally { setGoogleBusy(false); }
  }, [router, t]);

  useEffect(() => {
    if (!googleLoaded || googleRendered.current || !googleRef.current || user) return;
    const g = (window as GoogleWin).google?.accounts?.id;
    if (!g) return;
    g.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r: { credential?: string }) => { if (r?.credential) void handleGoogleCredential(r.credential); } });
    g.renderButton(googleRef.current, {
      theme: dark ? "filled_black" : "outline", size: "large", shape: "pill",
      text: "signin_with", width: Math.min(googleRef.current.offsetWidth || 300, 340), logo_alignment: "left",
    });
    googleRendered.current = true;
  }, [googleLoaded, user, handleGoogleCredential, dark]);

  const handleApple = useCallback(async () => {
    setAppleBusy(true);
    try {
      const a = (window as AppleWin).AppleID?.auth;
      a?.init({ clientId: APPLE_SERVICE_ID, scope: "name email", redirectURI: "https://www.docya.com.ar/pedir", usePopup: true });
      const resp = await a?.signIn();
      if (!resp) throw new Error("Apple no respondió");
      const token = resp.authorization?.id_token;
      if (!token) throw new Error("Token inválido");
      const firstName = resp.user?.name?.firstName ?? "";
      const lastName  = resp.user?.name?.lastName ?? "";
      const fullName  = [firstName, lastName].filter(Boolean).join(" ") || undefined;
      const res = await fetch(`${API}/auth/apple`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_token: token, full_name: fullName, email: resp.user?.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Error con Apple");
      const u: PedirUser = {
        id: String(data.user?.id ?? ""), full_name: data.user?.full_name ?? fullName ?? "Usuario",
        email: data.user?.email ?? "", perfil_completo: data.perfil_completo ?? data.user?.perfil_completo ?? false,
        access_token: data.access_token,
      };
      if (saveUser(u)) return;
      notify(t.pedir.bienvenido);
      if (!u.perfil_completo) router.push("/pedir/perfil");
    } catch (e: unknown) {
      if (e && typeof e === "object" && "error" in e && (e as { error: string }).error === "popup_closed_by_user") return;
      notify(e instanceof Error ? e.message : t.pedir.errorApple, false);
    } finally { setAppleBusy(false); }
  }, [router, t]);

  const whatsappSupport = (
    <a
      className="pedir-whatsapp-support"
      href={`https://wa.me/5491168700607?text=${encodeURIComponent(locale === "es" ? "Hola DocYa, tengo una duda antes de solicitar atención médica." : "Hi DocYa, I have a question before requesting medical care.")}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: text, background: dark ? "#25d36614" : "#25d3660d" }}
    >
      <FaWhatsapp size={27} color={dark ? "#70e5a0" : "#167c42"} aria-hidden="true" />
      <span>
        <strong>{locale === "es" ? "Hablá con nosotros por WhatsApp" : "Talk to us on WhatsApp"}</strong>
        <small style={{ color: muted }}>{locale === "es" ? "Nuestro equipo te ayuda con tus dudas antes de pedir atención" : "Our team can answer your questions before you request care"}</small>
      </span>
      <ChevronRight size={18} aria-hidden="true" />
    </a>
  );

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setGoogleLoaded(true)} />
      <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" strategy="afterInteractive" onLoad={() => setAppleLoaded(true)} />

      <div className={user ? "pedir-app-page" : undefined} style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header className="pedir-header pedir-app-shell" style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50 }}>
          <div className="pedir-header-inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Link href={user ? "/pedir" : "/"} className="pedir-header-logo">
              <Image src={logo} alt="DocYa" width={190} height={60} style={{ width: "clamp(150px, 22vw, 190px)", height: "auto", maxHeight: 60, objectFit: "contain", display: "block", flexShrink: 0 }} />
            </Link>
            <div className="pedir-header-controls">
            {user && (
              <Link href="/pedir/consultas" className="pedir-header-consultas" style={{ fontSize: 13, fontWeight: 600, color: muted, textDecoration: "none", padding: "8px 12px", borderRadius: 999, border: `1px solid ${border}`, transition: "all 0.15s", flexShrink: 0 }}>
                {t.pedir.misConsultas}
              </Link>
            )}
            {user ? (
              <div className="pedir-header-user-menu" style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  aria-label={locale === "es" ? "Mi cuenta" : "My account"}
                  aria-expanded={userMenuOpen}
                  className="pedir-header-user"
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}
                >
                  <User size={16} />
                  <span className="pedir-header-user-name">{user.full_name.split(" ")[0]}</span>
                  <ChevronDown size={14} style={{ color: muted }} />
                </button>
                {userMenuOpen && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: dark ? "#0f2a35" : "#fff", border: `1px solid ${border}`, borderRadius: 14, padding: "8px", minWidth: 180, boxShadow: "0 12px 40px rgba(0,0,0,0.25)", zIndex: 100 }}>
                    <p style={{ fontSize: 12, color: muted, padding: "4px 12px 8px" }}>{user.email}</p>
                    <button onClick={() => router.push("/pedir/perfil")} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: text, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}><User size={15} />{locale === "es" ? "Mi perfil" : "My profile"}</button>
                    {PATIENT_REFERRALS_ENABLED && <button onClick={() => router.push("/pedir/invitar")} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: text, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                      <Gift size={15} /> {locale === "es" ? "Invitá amigos" : "Invite friends"}
                    </button>}
                    <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                      <LogOut size={15} /> {t.pedir.salir}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            <button className="pedir-header-language" onClick={() => setLocale(locale === "es" ? "en" : "es")} aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"} title={locale === "es" ? "English" : "Español"} style={{ background: "none", cursor: "pointer", color: muted, padding: 8, borderRadius: 999, display: "flex", alignItems: "center", gap: 4, border: `1px solid ${border}`, position: "relative" }}>
              <Globe size={18} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{locale === "es" ? "EN" : "ES"}</span>
            </button>
            <button className="pedir-header-theme" onClick={() => setTheme(dark ? "light" : "dark")} aria-label={locale === "es" ? dark ? "Usar tema claro" : "Usar tema oscuro" : dark ? "Switch to light mode" : "Switch to dark mode"} style={{ background: "none", cursor: "pointer", color: muted, padding: 8, borderRadius: 999, display: "flex", alignItems: "center", border: `1px solid ${border}` }}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            </div>
          </div>
        </header>

        {!user && <WhatsAppSupportButton english={locale === "en"} />}
        <main className={user ? "pedir-app-main" : undefined} style={{ maxWidth: 1200, margin: "0 auto", padding: user ? "0 24px 48px" : "0 24px 80px" }}>
          {user ? (
            /* ── LOGUEADO ─────────────────────────────────────── */
            <>
              <PatientHomeDashboard
                name={user.full_name.split(" ")[0]}
                dark={dark}
                locale={locale}
                prices={precios}
                pricesLoading={pricesLoading}
                referralsEnabled={PATIENT_REFERRALS_ENABLED}
                referralSummary={referralSummary}
                onService={(service, pediatrics = false) => {
                  if (service === "teleconsulta") startTeleconsulta(pediatrics);
                  else router.push(service === "enfermero" ? "/pedir/solicitar?tipo=enfermero" : `/pedir/filtro?tipo=medico${pediatrics ? "&pediatria=1" : ""}`);
                }}
                onReferral={() => referralSummary && referralSummary.available_rewards_count > 0 ? startTeleconsulta() : router.push("/pedir/invitar")}
                help={<>
                  <PedirAsistente apiUrl={API} locale={locale} dark={dark} muted={muted} text={text} border={border}
                    onRequest={service => service === "teleconsulta" ? startTeleconsulta() : router.push("/pedir/filtro?tipo=medico")} />
                  {whatsappSupport}
                </>}
              />

              {/* TRUST STRIP */}
              <div className="pedir-trust">
                {TRUST_STRIP.map(({ icon: TIcon, label, sub }) => (
                  <div key={label} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 18, padding: "20px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(0,179,166,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <TIcon size={20} color="#00b3a6" />
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: text }}>{label}</p>
                      <p style={{ fontSize: 12, color: muted, lineHeight: 1.4 }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* EMERGENCY STRIP */}
              <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.18)", borderRadius: 18, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <AlertTriangle size={22} color="#f87171" />
                  <div>
                    <p style={{ fontWeight: 700, color: "#f87171", fontSize: 14, margin: 0 }}>{t.pedir.emergencia}</p>
                    <p style={{ color: muted, fontSize: 13, margin: 0 }}>{t.pedir.emergenciaDetalle}</p>
                  </div>
                </div>
                <a href="tel:107" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                  <Phone size={16} /> {t.pedir.llamar107}
                </a>
              </div>
            </>
          ) : (
            /* ── LOGIN ────────────────────────────────────────── */
            <div className="pedir-login">
              {/* Right — login card */}
              <div className="pedir-login-card" style={{
                position: "relative",
                borderRadius: 32,
                padding: "28px 24px",
                background: dark
                  ? "linear-gradient(145deg, rgba(0,179,166,0.14) 0%, rgba(11,26,34,0.97) 60%)"
                  : "linear-gradient(145deg, rgba(0,179,166,0.08) 0%, #ffffff 60%)",
                border: "1.5px solid rgba(0,179,166,0.35)",
                boxShadow: dark
                  ? "0 0 60px rgba(0,179,166,0.15), 0 32px 80px rgba(0,0,0,0.5)"
                  : "0 0 40px rgba(0,179,166,0.10), 0 16px 48px rgba(0,0,0,0.10)",
              }}>
                {/* Glow top */}
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 3, background: "linear-gradient(90deg, transparent, #00b3a6, #2dd4bf, transparent)", borderRadius: 999 }} />

                {/* Título */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(135deg, #00b3a6, #2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(0,179,166,0.4)" }}>
                    <ShieldCheck size={26} color="#fff" />
                  </div>
                  <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: dark ? "#2dd4bf" : "#08796d" }}>
                    {t.pedir.loginCardTitle}
                  </h1>
                  <p style={{ fontSize: 14, color: muted, lineHeight: 1.5 }}>
                    {t.pedir.loginCardDescription}
                  </p>
                </div>

                {/* Google */}
                <div style={{ background: "rgba(0,179,166,0.06)", border: "1px solid rgba(0,179,166,0.18)", borderRadius: 18, padding: "16px", marginBottom: 12 }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#2dd4bf", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12, textAlign: "center" }}>{t.pedir.continuarGoogle}</p>
                  <div style={{ minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {googleBusy ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#2dd4bf", fontSize: 14 }}>
                        <span style={{ width: 18, height: 18, border: "2px solid rgba(0,179,166,0.3)", borderTopColor: "#00b3a6", borderRadius: 999, display: "inline-block", animation: "spin 0.8s linear infinite" }} /> {t.pedir.verificando}
                      </div>
                    ) : (
                      <div ref={googleRef} style={{ width: "100%" }} />
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
                  <div style={{ flex: 1, height: 1, background: "rgba(0,179,166,0.15)" }} />
                  <span style={{ fontSize: 12, color: muted, fontWeight: 600 }}>{t.pedir.o}</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(0,179,166,0.15)" }} />
                </div>

                {/* Apple */}
                <button
                  onClick={handleApple}
                  disabled={appleBusy || !appleLoaded}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "15px 20px", borderRadius: 16, background: "linear-gradient(135deg, #1a1a2e, #0d1b2a)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.18)", fontSize: 15, fontWeight: 700, cursor: appleBusy ? "not-allowed" : "pointer", opacity: (appleBusy || !appleLoaded) ? 0.5 : 1, fontFamily: "inherit", boxShadow: "0 4px 16px rgba(0,0,0,0.3)", transition: "all 0.2s" }}
                  onMouseEnter={e => !appleBusy && ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,179,166,0.5)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)")}
                >
                  <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.9-103.2c-46-60.9-85.5-159-85.5-252.9 0-73.4 13.1-145.8 41.1-207.8 40.2-91.5 105-150 165.9-150 62.5 0 101.6 39.5 165.9 39.5 62.5 0 100.2-39.5 165.9-39.5 62.5 0 126.2 58.4 165.9 150zm-114.3-258.8c27.6-31.7 47.6-75.7 47.6-119.8 0-6.1-.5-12.2-1.6-17.3-45.1 1.6-98.8 30.3-130.5 63.2-27.6 29.9-51.2 73.9-51.2 118.5 0 6.7 1.1 13.4 1.6 15.5 2.7.5 7.1 1.1 11.6 1.1 41.9 0 91.5-28.1 122.5-61.2z" />
                  </svg>
                  {appleBusy ? t.pedir.verificando : t.pedir.continuarApple}
                </button>

                <p style={{ fontSize: 11, color: muted, textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
                  {t.pedir.terminosInicio}
                  <Link href="/legal/pacientes/terminos" style={{ color: "#2dd4bf", textDecoration: "none", fontWeight: 600 }}>{t.pedir.terminos}</Link>
                  {t.pedir.y}
                  <Link href="/legal/pacientes/privacidad" style={{ color: "#2dd4bf", textDecoration: "none", fontWeight: 600 }}>{t.pedir.privacidad}</Link>.
                </p>

                {/* Descarga */}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(0,179,166,0.15)" }}>
                  <p style={{ fontSize: 12, color: muted, textAlign: "center", marginBottom: 14, lineHeight: 1.5 }}>
                    {t.pedir.prefiereApp}<strong style={{ color: "#2dd4bf" }}>{t.pedir.mejorExperiencia}</strong>.
                  </p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="https://apps.apple.com/ar/app/docya/id6753604975" target="_blank" rel="noreferrer" style={{ display: "inline-block", transition: "transform 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
                    >
                      <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467671/Download_on_the_App_Store_Badge_ES_RGB_blk_100217_p2sw34.svg"
                        alt="App Store" width={130} height={40} style={{ height: 38, width: "auto", filter: "invert(1)" }} />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.docya.paciente" target="_blank" rel="noreferrer" style={{ display: "inline-block", transition: "transform 0.15s" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
                    >
                      <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1774467963/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM_cbr148.svg"
                        alt="Google Play" width={130} height={40} style={{ height: 38, width: "auto" }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${border}`, padding: "24px 24px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: muted }}>
            {t.pedir.footerText}
            <Link href="/legal/pacientes/terminos" style={{ color: muted, textDecoration: "underline" }}>{t.pedir.terminos}</Link>
            {" · "}
            <Link href="/legal/pacientes/privacidad" style={{ color: muted, textDecoration: "underline" }}>{t.pedir.privacidad}</Link>
          </p>
        </footer>
      </div>

      {deviceModalOpen && <TeleconsultaDeviceModal onClose={() => setDeviceModalOpen(false)} onSuccess={markDevicesTested} onContinue={() => {
        setDeviceModalOpen(false);
        router.push(`/pedir/filtro?tipo=teleconsulta${telePediatricaPendiente ? "&pediatria=1" : ""}`);
      }} />}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .pedir-header { width: 100%; padding: 0 16px; }
        .pedir-header-inner { min-width: 0; height: 64px; display: flex; align-items: center; gap: 10px; }
        .pedir-header-logo { display: flex; align-items: center; flex: 0 0 auto; min-width: 0; }
        .pedir-header-controls { min-width: 0; margin-left: auto; display: flex; align-items: center; gap: 10px; }
        .pedir-header-consultas, .pedir-header-user, .pedir-header-language, .pedir-header-theme { flex: 0 0 auto; }
        .pedir-header-user-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .pedir-hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; padding: 40px 0 36px; }
        .pedir-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .pedir-documents-banner { display: flex; align-items: center; gap: 16px; min-height: 92px; padding: 18px 20px; margin: -18px 0 32px; border-radius: 20px; transition: transform .15s, box-shadow .15s; }
        .pedir-documents-banner:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.12); }
        .pedir-documents-icon { width: 46px; height: 46px; flex: 0 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: rgba(0,179,166,.11); }
        .pedir-documents-copy { min-width: 0; flex: 1; }
        .pedir-documents-arrow { flex: 0 0 auto; }
        .pedir-trust { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .pedir-login { display: grid; grid-template-columns: minmax(0, 460px); justify-content: center; padding: 32px 0 16px; }
        .wa-card { min-width: 220px; }
        .pedir-help-options { display: grid; gap: 12px; width: 340px; max-width: 100%; min-width: 0; }
        .pedir-whatsapp-support { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 78px; padding: 14px 16px; border: 1px solid #25a85c70; border-radius: 20px; text-decoration: none; transition: border-color .18s ease, background-color .18s ease; }
        .pedir-whatsapp-support:hover { border-color: #25a85c; }
        .pedir-whatsapp-support > :global(svg) { flex-shrink: 0; }
        .pedir-whatsapp-support > span { display: grid; gap: 4px; min-width: 0; flex: 1; }
        .pedir-whatsapp-support strong { font-size: 14px; line-height: 1.35; }
        .pedir-whatsapp-support small { font-size: 12px; line-height: 1.4; }
        @media (max-width: 900px) {
          .pedir-cards { grid-template-columns: 1fr; }
          .pedir-documents-banner { margin-top: -22px; }
          .pedir-trust { grid-template-columns: repeat(2, 1fr); }

        }
        @media (max-width: 640px) {
          .pedir-header { padding: 10px 12px 12px; }
          .pedir-header-inner { height: auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; }
          .pedir-header-logo { height: 42px; justify-self: start; }
          .pedir-header-logo img { width: 160px !important; }
          .pedir-header-controls { width: 100%; min-width: 0; margin-left: 0; display: grid; grid-template-columns: minmax(76px, .9fr) minmax(88px, 1.1fr) 50px 44px; gap: 6px; align-items: center; }
          .pedir-header-consultas, .pedir-header-user, .pedir-header-language, .pedir-header-theme { min-width: 0; min-height: 46px; justify-content: center; }
          .pedir-header-consultas { padding: 8px 6px !important; font-size: 12px !important; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .pedir-header-user-menu { min-width: 0; }
          .pedir-header-user { width: 100%; padding: 8px 8px !important; gap: 5px !important; }
          .pedir-header-user-name { min-width: 0; flex: 1; text-align: left; }
          .pedir-header-language { padding: 8px 6px !important; gap: 3px !important; }
          .pedir-header-theme { padding: 8px 10px !important; }
          .pedir-header-user-menu > div { right: 0; max-width: calc(100vw - 24px); }
          .pedir-hero { grid-template-columns: 1fr; gap: 16px; padding: 24px 0 28px; }
          .wa-card { min-width: auto; width: 100%; }
          .pedir-help-options { width: 100%; }
          .pedir-help-options :global(.pedir-ai-launcher) { width: 100%; }
          .pedir-trust { grid-template-columns: 1fr; }
          .pedir-documents-banner { min-height: 0; gap: 12px; padding: 16px; margin: -20px 0 28px; align-items: flex-start; }
          .pedir-documents-icon { width: 42px; height: 42px; border-radius: 13px; }
          .pedir-documents-banner p:first-child { font-size: 15px !important; }
          .pedir-documents-secondary { display: none; }
          .pedir-documents-arrow { margin-top: 10px; }
          .pedir-login { padding-top: 20px; padding-bottom: 40px; }
          .pedir-login-card { width: 100%; }
        }
        @media (max-width: 340px) {
          .pedir-header-controls { grid-template-columns: minmax(70px, .85fr) minmax(76px, 1.15fr) 46px 42px; gap: 4px; }
          .pedir-header-consultas { font-size: 11px !important; }
          .pedir-header-user { font-size: 13px !important; padding: 8px 6px !important; }
          .pedir-header-language { font-size: 0; }
        }
        .pedir-app-shell { padding: 0 20px; }
        .pedir-app-shell .pedir-header-inner { position: relative; display: flex; align-items: center; height: 72px; min-height: 72px; }
        .pedir-app-shell .pedir-header-logo { position: absolute; left: 50%; transform: translateX(-50%); height: auto; }
        .pedir-app-shell .pedir-header-logo img { width: clamp(120px, 22vw, 158px) !important; max-height: 50px !important; }
        .pedir-app-shell .pedir-header-controls { display: flex; width: auto; gap: 6px; margin-left: auto; }
        .pedir-app-shell .pedir-header-consultas { display: none; }
        .pedir-app-shell .pedir-header-language { position: absolute !important; left: 0; min-width: 54px; min-height: 40px; padding: 8px !important; }
        .pedir-app-shell .pedir-header-user, .pedir-app-shell .pedir-header-theme { display: flex; justify-content: center; width: 38px; height: 40px; min-height: 40px; padding: 8px !important; }
        .pedir-app-shell .pedir-header-user-name, .pedir-app-shell .pedir-header-user > svg:last-child { display: none; }
        .pedir-app-main .pedir-trust { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        @media (max-width: 760px) { .pedir-app-main .pedir-trust { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) {
          .pedir-app-shell { padding: 0 16px; }
          .pedir-app-shell .pedir-header-inner { height: 66px; min-height: 66px; }
          .pedir-app-shell .pedir-header-logo img { width: 120px !important; }
          .pedir-app-shell .pedir-header-user, .pedir-app-shell .pedir-header-theme { width: 34px; padding: 7px !important; }
          .pedir-app-shell .pedir-header-controls { gap: 4px; }
          .pedir-app-main { padding-left: 16px !important; padding-right: 16px !important; }
          .pedir-app-page { padding-bottom: calc(76px + env(safe-area-inset-bottom)); }
          .pedir-app-main .pedir-whatsapp-support { min-height: 78px; border-radius: 17px; }
        }
      `}</style>
    </>
  );
}
