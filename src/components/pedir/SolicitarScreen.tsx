"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Stethoscope, Video, HeartPulse,
  CreditCard, Wallet, Banknote, Loader2, ChevronRight,
  Navigation,
} from "lucide-react";
import AddressInput from "./AddressInput";
import MapView from "./MapView";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean };
type MetodoPago = "tarjeta" | "saldo_mp" | "efectivo";

const TIPO_CONFIG = {
  medico:       { label: "Médico a domicilio",     icon: Stethoscope, color: "#00b3a6" },
  teleconsulta: { label: "Teleconsulta",            icon: Video,       color: "#818cf8" },
  enfermero:    { label: "Enfermería a domicilio",  icon: HeartPulse,  color: "#f472b6" },
} as const;

const METODOS: { id: MetodoPago; icon: typeof CreditCard; label: string; sub: string }[] = [
  { id: "tarjeta",  icon: CreditCard, label: "Tarjeta de crédito", sub: "Visa, Mastercard o Amex" },
  { id: "saldo_mp", icon: Wallet,     label: "Saldo Mercado Pago",  sub: "Tu cuenta de MP" },
  { id: "efectivo", icon: Banknote,   label: "Efectivo",            sub: "Le pagás al profesional" },
];

const notify = (msg: string, ok = true) => {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:12px;font-size:14px;font-weight:600;color:#fff;background:${ok ? "rgba(0,179,166,0.9)" : "rgba(239,68,68,0.9)"};box-shadow:0 8px 24px rgba(0,0,0,0.25)`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
};

export default function SolicitarScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") ?? "medico") as keyof typeof TIPO_CONFIG;
  const cfg = TIPO_CONFIG[tipo] ?? TIPO_CONFIG.medico;

  // AddressInput component maneja el autocomplete internamente

  const [user, setUser] = useState<PedirUser | null>(null);
  const [motivo, setMotivo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("tarjeta");
  const [submitting, setSubmitting] = useState(false);
  const [dark] = useState(true);

  const bg = dark ? "#071b22" : "#f5f7fa";
  const surface = dark ? "rgba(255,255,255,0.05)" : "#ffffff";
  const border = dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";
  const text = dark ? "#e2f0f0" : "#0f172a";
  const muted = dark ? "rgba(255,255,255,0.55)" : "#64748b";
  const inputBg = dark ? "rgba(255,255,255,0.06)" : "#f8fafc";

  // Auth check
  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) { router.replace("/pedir"); return; }
      setUser(JSON.parse(raw));
    } catch (_) { router.replace("/pedir"); }
  }, [router]);

  // Geolocalización inicial
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => { setLat(pos.coords.latitude); setLng(pos.coords.longitude); },
      () => {}
    );
  }, []);


  const PLACES_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "AIzaSyAcvJIlpOAkRzVaXlcnE8lJQfQGBqx-bKA";

  const usarUbicacionActual = useCallback(() => {
    if (!navigator.geolocation) return notify("Geolocalización no disponible", false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        try {
          const res = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords.latitude},${pos.coords.longitude}&key=${PLACES_KEY}&language=es`
          );
          const data = await res.json();
          const addr = data.results?.[0]?.formatted_address;
          if (addr) setDireccion(addr);
        } catch (_) {}
      },
      () => notify("No pudimos obtener tu ubicación", false)
    );
  }, [PLACES_KEY]);

  const handleSubmit = useCallback(async () => {
    if (!user) return;
    if (!motivo.trim()) return notify("Describí el motivo de la consulta", false);
    if (!direccion.trim()) return notify("Ingresá tu dirección", false);
    if (lat === null || lng === null) return notify("Necesitamos tus coordenadas. Usá el botón de ubicación o buscá tu dirección.", false);

    setSubmitting(true);
    try {
      if (metodoPago === "tarjeta") {
        // Crear previa y abrir formulario MP en modal
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo }),
        });
        if (!previaRes.ok) throw new Error("No se pudo preparar la consulta");
        const { consulta_id } = await previaRes.json();

        const tarifaRes = await fetch(`${API}/tarifas/consulta-${tipo === "enfermero" ? "enfermero" : "medico"}`);
        const tarifaData = await tarifaRes.json();
        const monto = tarifaData.monto ?? 30000;

        const mpUrl = `${API}/pagos/embebido/formulario?paciente_uuid=${user.id}&consulta_id=${consulta_id}&monto=${monto}&tipo=${tipo}&motivo=${encodeURIComponent(motivo.trim())}`;
        router.push(`/pedir/pago?url=${encodeURIComponent(mpUrl)}&consulta_id=${consulta_id}&motivo=${encodeURIComponent(motivo.trim())}&direccion=${encodeURIComponent(direccion.trim())}&lat=${lat}&lng=${lng}&tipo=${tipo}`);
        return;
      }

      if (metodoPago === "saldo_mp") {
        const previaRes = await fetch(`${API}/consultas/crear_previa`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, tipo }),
        });
        if (!previaRes.ok) throw new Error("No se pudo preparar la consulta");
        const { consulta_id } = await previaRes.json();

        const tarifaRes = await fetch(`${API}/tarifas/consulta-${tipo === "enfermero" ? "enfermero" : "medico"}`);
        const tarifaData = await tarifaRes.json();
        const monto = tarifaData.monto ?? 30000;

        const prefRes = await fetch(`${API}/pagos/saldo-mp/preferencia`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paciente_uuid: user.id, consulta_id, monto, motivo: motivo.trim() }),
        });
        if (!prefRes.ok) throw new Error("No se pudo crear la preferencia");
        const { init_point } = await prefRes.json();
        router.push(`/pedir/pago?url=${encodeURIComponent(init_point)}&consulta_id=${consulta_id}&motivo=${encodeURIComponent(motivo.trim())}&direccion=${encodeURIComponent(direccion.trim())}&lat=${lat}&lng=${lng}&tipo=${tipo}`);
        return;
      }

      // Efectivo: solicitar directo
      const res = await fetch(`${API}/consultas/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paciente_uuid: user.id, motivo: motivo.trim(), direccion: direccion.trim(), lat, lng, metodo_pago: "efectivo", tipo }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail?.mensaje || err.detail || "No se pudo iniciar la consulta");
      }
      const data = await res.json();
      router.push(`/pedir/buscando?consulta_id=${data.consulta_id}&tipo=${tipo}&metodo=efectivo`);
    } catch (e) {
      notify(e instanceof Error ? e.message : "Error al solicitar", false);
    } finally {
      setSubmitting(false);
    }
  }, [user, motivo, direccion, lat, lng, metodoPago, tipo, router]);

  if (!user) return null;

  const Icon = cfg.icon;

  return (
    <>

      <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${border}`, background: dark ? "rgba(7,27,34,0.92)" : "rgba(245,247,250,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/pedir" style={{ color: muted, display: "flex", alignItems: "center" }}>
              <ArrowLeft size={22} />
            </Link>
            <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png" alt="DocYa" width={80} height={26} style={{ height: 26, width: "auto", filter: dark ? "none" : "invert(1)" }} />
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, background: `${cfg.color}18`, border: `1px solid ${cfg.color}40`, borderRadius: 999, padding: "4px 12px 4px 8px" }}>
              <Icon size={14} color={cfg.color} />
              <span style={{ fontSize: 13, fontWeight: 600, color: cfg.color }}>{cfg.label}</span>
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 800, marginBottom: 8 }}>
            Solicitá tu {cfg.label.toLowerCase()}
          </h1>
          <p style={{ color: muted, fontSize: 15, marginBottom: 32 }}>
            Hola {user.full_name.split(" ")[0]}, completá los datos para buscar un profesional.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* MOTIVO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
                Motivo de la consulta
              </label>
              <textarea
                value={motivo}
                onChange={e => setMotivo(e.target.value)}
                rows={3}
                placeholder="Describí tus síntomas o el motivo de la consulta..."
                style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 16px", color: text, fontSize: 15, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              <p style={{ fontSize: 12, color: muted, marginTop: 8 }}>
                Sé específico: síntomas, duración, medicación actual.
              </p>
            </div>

            {/* DIRECCIÓN */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>
                {tipo === "teleconsulta" ? "Tu ubicación (para asignar profesional cercano)" : "Dirección de atención"}
              </label>
              <AddressInput
                value={direccion}
                onChange={setDireccion}
                onPlaceSelect={(addr, lat, lng) => {
                  setDireccion(addr);
                  if (lat !== undefined) setLat(lat);
                  if (lng !== undefined) setLng(lng);
                }}
                placeholder="Empezá a escribir tu dirección..."
                dark={dark}
              />
              <button
                onClick={usarUbicacionActual}
                style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 13, color: cfg.color, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
              >
                <Navigation size={14} />
                Usar mi ubicación actual
              </button>

              {/* Mini mapa Leaflet */}
              {lat !== null && lng !== null && (
                <MapView lat={lat} lng={lng} height={180} />
              )}
            </div>

            {/* MÉTODO DE PAGO */}
            <div style={{ background: "rgba(0,179,166,0.05)", border: "1.5px solid rgba(0,179,166,0.18)", borderRadius: 20, padding: "22px 20px" }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>
                Método de pago
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {METODOS.map(m => {
                  const selected = metodoPago === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMetodoPago(m.id)}
                      style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${selected ? cfg.color : border}`, background: selected ? `${cfg.color}12` : inputBg, cursor: "pointer", textAlign: "left", transition: "all 0.15s", color: text, fontFamily: "inherit" }}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 12, background: selected ? `${cfg.color}20` : `${border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <m.icon size={18} color={selected ? cfg.color : muted} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>{m.label}</p>
                        <p style={{ fontSize: 12, color: muted, margin: 0 }}>{m.sub}</p>
                      </div>
                      <div style={{ width: 20, height: 20, borderRadius: 999, border: `2px solid ${selected ? cfg.color : border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {selected && <div style={{ width: 10, height: 10, borderRadius: 999, background: cfg.color }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {metodoPago === "tarjeta" && (
                <p style={{ fontSize: 12, color: muted, marginTop: 12, lineHeight: 1.5, padding: "10px 14px", background: `${cfg.color}10`, borderRadius: 10 }}>
                  💳 Solo aceptamos <strong style={{ color: text }}>tarjetas de crédito</strong> (Visa, Mastercard, Amex). El cobro se realiza solo cuando un profesional acepta tu consulta.
                </p>
              )}
              {metodoPago === "efectivo" && (
                <p style={{ fontSize: 12, color: muted, marginTop: 12, lineHeight: 1.5, padding: "10px 14px", background: `${cfg.color}10`, borderRadius: 10 }}>
                  💵 Le pagás directamente al profesional cuando llegue o por transferencia.
                </p>
              )}
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              style={{ width: "100%", padding: "17px 20px", borderRadius: 18, border: "none", background: submitting ? "rgba(0,179,166,0.5)" : `linear-gradient(90deg, ${cfg.color}, #2dd4bf)`, color: "#fff", fontSize: 16, fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "inherit", boxShadow: submitting ? "none" : `0 8px 24px ${cfg.color}44` }}
            >
              {submitting ? (
                <><Loader2 size={20} className="animate-spin" /> Buscando profesional...</>
              ) : (
                <>Solicitar {cfg.label} <ChevronRight size={20} /></>
              )}
            </button>

          </div>
        </main>
      </div>
    </>
  );
}
