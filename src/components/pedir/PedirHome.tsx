"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope, Video, HeartPulse, ShieldCheck, Clock,
  Home, FileText, Star, CreditCard, ChevronRight,
  Phone, LogOut, User, ChevronDown, Sun, Moon,
  MessageCircle, AlertTriangle, Globe, Gift,
} from "lucide-react";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";
import { recuperarConsultaPendienteGlobal } from "@/lib/pedir/pendingPayment";
import { getPatientReferrals, type PatientReferralSummary } from "@/lib/pedir/patientReferrals";
import ReferralProgressCard from "./ReferralProgressCard";
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

const SERVICIOS_ICONS = [
  { id: "medico" as const, icon: Stethoscope, color: "#00b3a6", bgColor: "rgba(0,179,166,0.12)", badgeBg: "rgba(0,179,166,0.15)", badgeColor: "#00b3a6", trustIcons: [Clock, Home, ShieldCheck] },
  { id: "teleconsulta" as const, icon: Video, color: "#818cf8", bgColor: "rgba(129,140,248,0.12)", badgeBg: "rgba(129,140,248,0.15)", badgeColor: "#818cf8", trustIcons: [Clock, ShieldCheck, FileText] },
  { id: "enfermero" as const, icon: HeartPulse, color: "#f472b6", bgColor: "rgba(244,114,182,0.12)", badgeBg: "rgba(244,114,182,0.15)", badgeColor: "#f472b6", trustIcons: [Clock, Home, Star] },
];

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

function formatPesos(value?: number | null, fallback = "Consultando") {
  if (!value) return fallback;
  return `$${value.toLocaleString("es-AR")}`;
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
  const googleRef = useRef<HTMLDivElement | null>(null);
  const googleRendered = useRef(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [appleLoaded, setAppleLoaded]   = useState(false);
  const [googleBusy, setGoogleBusy]     = useState(false);
  const [appleBusy, setAppleBusy]       = useState(false);
  const [user, setUser]                 = useState<PedirUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [precios, setPrecios]           = useState<Partial<Record<ServicioId, PrecioServicio>>>({});
  const [referralSummary, setReferralSummary] = useState<PatientReferralSummary | null>(null);
  const { dark, setTheme, homeBg: bg, cardBg, border, text, muted, headerBg, logo } = usePedirTheme();
  const { t, locale, setLocale } = useI18n();

  const SERVICIOS = SERVICIOS_ICONS.map((s, i) => ({
    ...s,
    badge: t.pedir.services[i].badge,
    title: t.pedir.services[i].title,
    sub: t.pedir.services[i].subtitle,
    desc: t.pedir.services[i].description,
    trust: s.trustIcons.map((TIcon, j) => ({ icon: TIcon, label: t.pedir.services[i].chips[j] })),
    btn: t.pedir.services[i].cta,
  }));

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
    });
    return () => { alive = false; };
  }, []);

  const saveUser = (u: PedirUser) => {
    localStorage.setItem("pedir_user", JSON.stringify(u));
    setUser(u);
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
      saveUser(u);
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
      saveUser(u);
      notify(t.pedir.bienvenido);
      if (!u.perfil_completo) router.push("/pedir/perfil");
    } catch (e: unknown) {
      if (e && typeof e === "object" && "error" in e && (e as { error: string }).error === "popup_closed_by_user") return;
      notify(e instanceof Error ? e.message : t.pedir.errorApple, false);
    } finally { setAppleBusy(false); }
  }, [router, t]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setGoogleLoaded(true)} />
      <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" strategy="afterInteractive" onLoad={() => setAppleLoaded(true)} />

      <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 16px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", flex: "0 0 auto", minWidth: 0 }}>
              <Image src={logo} alt="DocYa" width={100} height={32} style={{ width: "clamp(76px, 22vw, 100px)", height: "auto", maxHeight: 32, objectFit: "contain", display: "block", flexShrink: 0 }} />
            </Link>
            <div style={{ flex: 1 }} />
            {user && (
              <Link href="/pedir/consultas" style={{ fontSize: 13, fontWeight: 600, color: muted, textDecoration: "none", padding: "8px 12px", borderRadius: 999, border: `1px solid ${border}`, transition: "all 0.15s", flexShrink: 0 }}>
                {t.pedir.misConsultas}
              </Link>
            )}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: `1px solid ${border}`, background: "transparent", color: text, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", flexShrink: 0 }}
                >
                  <User size={16} />
                  {user.full_name.split(" ")[0]}
                  <ChevronDown size={14} style={{ color: muted }} />
                </button>
                {userMenuOpen && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: dark ? "#0f2a35" : "#fff", border: `1px solid ${border}`, borderRadius: 14, padding: "8px", minWidth: 180, boxShadow: "0 12px 40px rgba(0,0,0,0.25)", zIndex: 100 }}>
                    <p style={{ fontSize: 12, color: muted, padding: "4px 12px 8px" }}>{user.email}</p>
                    {PATIENT_REFERRALS_ENABLED && <button onClick={() => router.push("/pedir/invitar")} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: text, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                      <Gift size={15} /> Invitá amigos
                    </button>}
                    <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                      <LogOut size={15} /> {t.pedir.salir}
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            <button onClick={() => setLocale(locale === "es" ? "en" : "es")} aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"} title={locale === "es" ? "English" : "Español"} style={{ background: "none", cursor: "pointer", color: muted, padding: 8, borderRadius: 999, display: "flex", alignItems: "center", gap: 4, border: `1px solid ${border}`, position: "relative" }}>
              <Globe size={18} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>{locale === "es" ? "EN" : "ES"}</span>
            </button>
            <button onClick={() => setTheme(dark ? "light" : "dark")} style={{ background: "none", cursor: "pointer", color: muted, padding: 8, borderRadius: 999, display: "flex", alignItems: "center", border: `1px solid ${border}` }}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px", overflowX: "hidden" }}>

          {user ? (
            /* ── LOGUEADO ─────────────────────────────────────── */
            <>
              {/* HERO */}
              <div className="pedir-hero">
                <div>
                  <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, marginBottom: 6, letterSpacing: "-0.5px" }}>
                    {t.pedir.holaUser.replace("{name}", user.full_name.split(" ")[0])}
                  </h1>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#00b3a6", marginBottom: 8 }}>{t.pedir.queNecesitas}</p>
                  <p style={{ color: muted, fontSize: 15 }}>{t.pedir.conectamos}</p>
                </div>
                <a
                  href="https://wa.me/5491168700607"
                  target="_blank" rel="noreferrer"
                  className="wa-card"
                  style={{ display: "flex", alignItems: "center", gap: 16, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", borderRadius: 20, padding: "16px 20px", textDecoration: "none", color: text, transition: "all 0.15s" }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 999, background: "rgba(37,211,102,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageCircle size={22} color="#25d366" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{t.pedir.ayuda}</p>
                    <p style={{ fontSize: 13, color: muted, margin: 0 }}>{t.pedir.ayudaWa}</p>
                  </div>
                  <ChevronRight size={18} color={muted} />
                </a>
              </div>

              {PATIENT_REFERRALS_ENABLED && referralSummary && (
                <div style={{ marginBottom: 22 }}>
                  <ReferralProgressCard summary={referralSummary} onOpen={() => router.push(referralSummary.available_rewards_count > 0 ? "/pedir/filtro?tipo=teleconsulta" : "/pedir/invitar")} compact />
                </div>
              )}

              {/* CARDS */}
              <div className="pedir-cards">
                {SERVICIOS.map(s => {
                  const precio = precios[s.id as ServicioId];
                  return (
                    <div
                      key={s.id}
                      style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 24, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 0, transition: "transform 0.15s, box-shadow 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = dark ? "0 20px 50px rgba(0,0,0,0.4)" : "0 12px 40px rgba(0,0,0,0.12)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 18, background: s.bgColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <s.icon size={28} color={s.color} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: s.badgeColor, background: s.badgeBg, padding: "5px 12px", borderRadius: 999 }}>{s.badge}</span>
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, color: text }}>{s.title}</h3>
                      <p style={{ fontSize: 14, color: muted, fontWeight: 500, marginBottom: 8 }}>{s.sub}</p>
                      <div style={{ border: `1px solid ${s.color}30`, background: `${s.color}12`, borderRadius: 14, padding: "10px 12px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                        <span style={{ fontSize: 12, color: muted, fontWeight: 800 }}>{t.pedir.precio}</span>
                        <strong style={{ fontSize: 18, color: s.color, lineHeight: 1 }}>{formatPesos(precio?.monto, t.pedir.consultando)}</strong>
                      </div>
                      <p style={{ fontSize: 14, color: muted, lineHeight: 1.55, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
                        {s.trust.map(({ icon: TIcon, label }) => (
                          <div key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: muted }}>
                            <TIcon size={13} color={s.color} /> {label}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => router.push(s.id === "enfermero" ? `/pedir/solicitar?tipo=enfermero` : `/pedir/filtro?tipo=${s.id}`)}
                        style={{ width: "100%", padding: "14px 0", borderRadius: 14, border: "none", background: s.color, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit", boxShadow: `0 6px 20px ${s.color}40` }}
                      >
                        {s.btn} <ChevronRight size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>

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
              {/* Left */}
              <div className="pedir-login-left">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,179,166,0.12)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#00b3a6", marginBottom: 24 }}>
                  <ShieldCheck size={14} /> {t.pedir.loginBadge}
                </div>
                <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
                  {t.pedir.loginTitle}
                </h1>
                <p style={{ fontSize: 18, color: muted, lineHeight: 1.65, marginBottom: 36 }}>
                  {t.pedir.loginDescription}
                </p>
                {SERVICIOS.map(s => (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bgColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <s.icon size={18} color={s.color} />
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 500, color: text, flex: 1 }}>{s.title}</p>
                    <span style={{ color: s.color, fontSize: 13, fontWeight: 850 }}>{formatPesos(precios[s.id as ServicioId]?.monto, t.pedir.consultando)}</span>
                  </div>
                ))}
              </div>

              {/* Right — login card */}
              <div className="pedir-login-card" style={{
                position: "relative",
                borderRadius: 32,
                padding: "40px 36px",
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

                {/* Mini hero visible solo en mobile */}
                <div className="pedir-mobile-hero" style={{ marginBottom: 28, paddingBottom: 22, borderBottom: "1px solid rgba(0,179,166,0.2)" }}>
                  <Image src={logo} alt="DocYa" width={90} height={28} style={{ width: 90, height: "auto", maxHeight: 28, objectFit: "contain", marginBottom: 16, display: "block" }} />
                  <p style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, lineHeight: 1.2, color: "#2dd4bf" }}>{t.pedir.loginMobileTitle}</p>
                  <p style={{ fontSize: 14, color: muted, lineHeight: 1.5 }}>{t.pedir.loginMobileDescription}</p>
                </div>

                {/* Título */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 18, background: "linear-gradient(135deg, #00b3a6, #2dd4bf)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 8px 24px rgba(0,179,166,0.4)" }}>
                    <ShieldCheck size={26} color="#fff" />
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, color: "#2dd4bf" }}>
                    {t.pedir.loginCardTitle}
                  </h2>
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

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        .pedir-hero { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: center; padding: 40px 0 36px; }
        .pedir-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .pedir-trust { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
        .pedir-login { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; padding-top: 64px; align-items: center; min-height: calc(100vh - 64px); }
        .pedir-mobile-hero { display: none; }
        .wa-card { min-width: 220px; }
        @media (max-width: 900px) {
          .pedir-cards { grid-template-columns: 1fr; }
          .pedir-trust { grid-template-columns: repeat(2, 1fr); }
          .pedir-login { grid-template-columns: 1fr; gap: 32px; min-height: auto; padding-top: 40px; padding-bottom: 40px; }
        }
        @media (max-width: 640px) {
          .pedir-hero { grid-template-columns: 1fr; gap: 16px; padding: 24px 0 28px; }
          .wa-card { min-width: auto; width: 100%; }
          .pedir-trust { grid-template-columns: 1fr; }
          .pedir-login { padding-top: 20px; padding-bottom: 40px; }
          .pedir-login-left { display: none; }
          .pedir-login-card { width: 100%; }
          .pedir-mobile-hero { display: block; }
        }
      `}</style>
    </>
  );
}
