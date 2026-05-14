"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  Video,
  HeartPulse,
  ShieldCheck,
  Clock,
  Star,
  ChevronRight,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
// toast simple inline
const notify = (msg: string, ok = true) => {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;background:${ok ? "rgba(0,179,166,0.9)" : "rgba(239,68,68,0.9)"};box-shadow:0 8px 24px rgba(0,0,0,0.25);transition:opacity 0.3s`;
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; setTimeout(() => el.remove(), 300); }, 3000);
};

const API = process.env.NEXT_PUBLIC_API_BASE!;
const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";
const APPLE_SERVICE_ID =
  process.env.NEXT_PUBLIC_APPLE_SERVICE_ID || "com.docya.web";

type PedirUser = {
  id: string;
  full_name: string;
  email: string;
  perfil_completo: boolean;
};

const SERVICIOS = [
  {
    id: "medico",
    icon: Stethoscope,
    title: "Médico a domicilio",
    subtitle: "Un profesional va a tu casa",
    desc: "Diagnóstico, receta y tratamiento en el momento. Sin esperar en guardias.",
    color: "#00b3a6",
    bg: "rgba(0,179,166,0.10)",
    badge: "Disponible ahora",
  },
  {
    id: "teleconsulta",
    icon: Video,
    title: "Teleconsulta",
    subtitle: "Consulta por videollamada",
    desc: "Hablá con un médico desde tu computadora o celular. Sin salir de casa.",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.10)",
    badge: "Sin esperas",
  },
  {
    id: "enfermero",
    icon: HeartPulse,
    title: "Enfermería a domicilio",
    subtitle: "Atención profesional en tu hogar",
    desc: "Inyectables, curaciones, controles y más. Profesionales certificados.",
    color: "#f472b6",
    bg: "rgba(244,114,182,0.10)",
    badge: "Profesionales verificados",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "Profesionales verificados" },
  { icon: Clock, label: "Atención en minutos" },
  { icon: Star, label: "Pagos seguros con MP" },
];

type GoogleId = {
  initialize: (c: object) => void;
  renderButton: (el: HTMLElement, opts: object) => void;
};
type AppleAuthFn = {
  init: (c: object) => void;
  signIn: () => Promise<{
    authorization: { id_token: string };
    user?: { name?: { firstName?: string; lastName?: string }; email?: string };
  }>;
};
type PedirWin = {
  google?: { accounts?: { id?: GoogleId } };
  AppleID?: { auth?: AppleAuthFn };
};

export default function PedirHome() {
  const router = useRouter();
  const googleRef = useRef<HTMLDivElement | null>(null);
  const googleRendered = useRef(false);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [appleLoaded, setAppleLoaded] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [appleBusy, setAppleBusy] = useState(false);
  const [user, setUser] = useState<PedirUser | null>(null);
  const [dark, setDark] = useState(true);

  // Leer sesión guardada
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (_) {}
  }, []);

  const saveUser = (u: PedirUser) => {
    localStorage.setItem("pedir_user", JSON.stringify(u));
    setUser(u);
  };

  const handleGoogleCredential = useCallback(async (credential: string) => {
    setGoogleBusy(true);
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Error con Google");
      saveUser({
        id: String(data.user?.id ?? ""),
        full_name: data.user?.full_name ?? "Usuario",
        email: data.user?.email ?? "",
        perfil_completo: data.perfil_completo ?? data.user?.perfil_completo ?? false,
      });
      notify("¡Bienvenido a DocYa!");
    } catch (e) {
      notify(e instanceof Error ? e.message : "No se pudo iniciar sesión", false);
    } finally {
      setGoogleBusy(false);
    }
  }, []);

  // Renderizar botón Google
  useEffect(() => {
    if (!googleLoaded || googleRendered.current || !googleRef.current || user) return;
    const g = (window as unknown as PedirWin).google?.accounts?.id;
    if (!g) return;
    g.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (r: { credential?: string }) => {
        if (r?.credential) void handleGoogleCredential(r.credential);
      },
    });
    g.renderButton(googleRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signin_with",
      width: Math.min(googleRef.current.offsetWidth || 340, 380),
      logo_alignment: "left",
    });
    googleRendered.current = true;
  }, [googleLoaded, user, handleGoogleCredential]);

  const handleApple = useCallback(async () => {
    setAppleBusy(true);
    try {
      const appleAuth = (window as unknown as PedirWin).AppleID?.auth;
      appleAuth?.init({
        clientId: APPLE_SERVICE_ID,
        scope: "name email",
        redirectURI: "https://www.docya.com.ar/pedir",
        usePopup: true,
      });
      const resp = await appleAuth?.signIn();
      if (!resp) throw new Error("Apple no respondió");
      const token = resp.authorization?.id_token;
      if (!token) throw new Error("Token inválido");
      const firstName = resp.user?.name?.firstName ?? "";
      const lastName = resp.user?.name?.lastName ?? "";
      const fullName = [firstName, lastName].filter(Boolean).join(" ") || undefined;
      const res = await fetch(`${API}/auth/apple`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity_token: token, full_name: fullName, email: resp.user?.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Error con Apple");
      saveUser({
        id: String(data.user?.id ?? ""),
        full_name: data.user?.full_name ?? fullName ?? "Usuario",
        email: data.user?.email ?? resp.user?.email ?? "",
        perfil_completo: data.perfil_completo ?? data.user?.perfil_completo ?? false,
      });
      notify("¡Bienvenido a DocYa!");
    } catch (e: unknown) {
      if (e && typeof e === "object" && "error" in e && (e as { error: string }).error === "popup_closed_by_user") return;
      notify(e instanceof Error ? e.message : "No se pudo iniciar con Apple", false);
    } finally {
      setAppleBusy(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("pedir_user");
    setUser(null);
    googleRendered.current = false;
  };

  const bg = dark ? "#071b22" : "#f5f7fa";
  const surface = dark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const text = dark ? "#e2f0f0" : "#0f172a";
  const muted = dark ? "rgba(255,255,255,0.55)" : "#64748b";

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setGoogleLoaded(true)} />
      <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" strategy="afterInteractive" onLoad={() => setAppleLoaded(true)} />

      <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${border}`, background: dark ? "rgba(7,27,34,0.92)" : "rgba(245,247,250,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, padding: "0 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/">
              <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png" alt="DocYa" width={100} height={32} style={{ height: 32, width: "auto", filter: dark ? "none" : "invert(1)" }} />
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {user ? (
                <>
                  <span style={{ fontSize: 14, color: muted }}>{user.full_name.split(" ")[0]}</span>
                  <button onClick={logout} style={{ fontSize: 13, color: muted, background: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 999, border: `1px solid ${border}` }}>Salir</button>
                </>
              ) : null}
              <button onClick={() => setDark(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", color: muted, padding: 6, borderRadius: 999, display: "flex", alignItems: "center" }}>
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px 80px" }}>

          {!user ? (
            /* ── PANTALLA DE LOGIN ─────────────────────────────── */
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 48, paddingTop: 64, maxWidth: 480, margin: "0 auto" }}>
              {/* Hero */}
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,179,166,0.12)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "#00b3a6", marginBottom: 20 }}>
                  <ShieldCheck size={14} />
                  Profesionales verificados · Pago seguro
                </div>
                <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.5px" }}>
                  Atención médica cuando la necesitás
                </h1>
                <p style={{ fontSize: 17, color: muted, lineHeight: 1.6, marginBottom: 32 }}>
                  Médico a domicilio, teleconsulta o enfermería. Sin descargar ninguna app.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
                  {TRUST.map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: muted }}>
                      <Icon size={15} color="#00b3a6" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card de login */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, padding: "32px 28px", backdropFilter: "blur(12px)", boxShadow: dark ? "0 20px 60px rgba(0,0,0,0.3)" : "0 10px 40px rgba(0,0,0,0.08)" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, textAlign: "center" }}>Ingresá para continuar</h2>
                <p style={{ fontSize: 14, color: muted, textAlign: "center", marginBottom: 28, lineHeight: 1.5 }}>
                  Usá tu cuenta para pedir atención médica desde el navegador.
                </p>

                {/* Google */}
                <div style={{ marginBottom: 14 }}>
                  <p style={{ fontSize: 12, color: muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Con Google</p>
                  <div style={{ minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {googleBusy ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, color: muted, fontSize: 14 }}>
                        <Loader2 size={16} className="animate-spin" /> Verificando...
                      </div>
                    ) : (
                      <div ref={googleRef} style={{ width: "100%" }} />
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                  <div style={{ flex: 1, height: 1, background: border }} />
                  <span style={{ fontSize: 12, color: muted }}>o</span>
                  <div style={{ flex: 1, height: 1, background: border }} />
                </div>

                {/* Apple */}
                <button
                  onClick={handleApple}
                  disabled={appleBusy || !appleLoaded}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 20px", borderRadius: 999, background: dark ? "#fff" : "#000", color: dark ? "#000" : "#fff", border: "none", fontSize: 15, fontWeight: 700, cursor: appleBusy ? "not-allowed" : "pointer", opacity: (appleBusy || !appleLoaded) ? 0.5 : 1, transition: "opacity 0.2s" }}
                >
                  {appleBusy ? <Loader2 size={18} className="animate-spin" /> : (
                    <svg width="18" height="18" viewBox="0 0 814 1000" fill="currentColor">
                      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.9-103.2c-46-60.9-85.5-159-85.5-252.9 0-73.4 13.1-145.8 41.1-207.8 40.2-91.5 105-150 165.9-150 62.5 0 101.6 39.5 165.9 39.5 62.5 0 100.2-39.5 165.9-39.5 62.5 0 126.2 58.4 165.9 150zm-114.3-258.8c27.6-31.7 47.6-75.7 47.6-119.8 0-6.1-.5-12.2-1.6-17.3-45.1 1.6-98.8 30.3-130.5 63.2-27.6 29.9-51.2 73.9-51.2 118.5 0 6.7 1.1 13.4 1.6 15.5 2.7.5 7.1 1.1 11.6 1.1 41.9 0 91.5-28.1 122.5-61.2z" />
                    </svg>
                  )}
                  Continuar con Apple
                </button>

                <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 20, lineHeight: 1.5 }}>
                  Al ingresar aceptás los{" "}
                  <Link href="/legal/pacientes/terminos" style={{ color: "#00b3a6", textDecoration: "none" }}>Términos</Link>
                  {" "}y la{" "}
                  <Link href="/legal/pacientes/privacidad" style={{ color: "#00b3a6", textDecoration: "none" }}>Política de privacidad</Link>.
                </p>
              </div>
            </div>

          ) : (
            /* ── PANTALLA PRINCIPAL (LOGUEADO) ────────────────── */
            <div style={{ paddingTop: 48 }}>
              {/* Saludo */}
              <div style={{ marginBottom: 40 }}>
                <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 8 }}>
                  Hola, {user.full_name.split(" ")[0]} 👋
                </h1>
                <p style={{ fontSize: 16, color: muted }}>¿Qué necesitás hoy?</p>
              </div>

              {/* Grid de servicios */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
                {SERVICIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => router.push(`/pedir/solicitar?tipo=${s.id}`)}
                    style={{ background: surface, border: `1px solid ${border}`, borderRadius: 24, padding: "28px 24px", textAlign: "left", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", display: "flex", flexDirection: "column", gap: 0 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = dark ? "0 16px 48px rgba(0,0,0,0.35)" : "0 8px 32px rgba(0,0,0,0.12)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 16, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <s.icon size={26} color={s.color} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, padding: "4px 10px", borderRadius: 999, letterSpacing: "0.3px" }}>
                        {s.badge}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: text }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: muted, marginBottom: 4, fontWeight: 500 }}>{s.subtitle}</p>
                    <p style={{ fontSize: 13, color: muted, lineHeight: 1.5, marginBottom: 20, flex: 1 }}>{s.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: s.color, fontSize: 14, fontWeight: 700 }}>
                      Solicitar <ChevronRight size={16} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Trust strip */}
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
                {TRUST.map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: muted }}>
                    <Icon size={17} color="#00b3a6" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${border}`, padding: "24px 20px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: muted }}>
            DocYa · Atención médica a domicilio ·{" "}
            <Link href="/legal/pacientes/terminos" style={{ color: muted, textDecoration: "underline" }}>Términos</Link>
            {" · "}
            <Link href="/legal/pacientes/privacidad" style={{ color: muted, textDecoration: "underline" }}>Privacidad</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
