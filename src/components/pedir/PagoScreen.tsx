"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;
type PedirUser = { id: string; full_name: string; email: string; perfil_completo: boolean; access_token?: string };

async function solicitarConsulta(body: Record<string, unknown>) {
  const tipo = String(body.tipo ?? "");
  const endpoint = tipo === "teleconsulta" ? "/teleconsultas" : "/consultas/solicitar";
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const payload = tipo === "teleconsulta"
    ? {
        consulta_id: body.consulta_id,
        paciente_uuid: body.paciente_uuid,
        motivo: body.motivo,
        direccion: body.direccion,
        provincia: "Argentina",
        localidad: body.direccion || "Argentina",
        necesita_certificado: false,
        consentimiento_teleconsulta: true,
        metodo_pago: body.metodo_pago,
        payment_id: body.payment_id,
      }
    : body;

  if (tipo === "teleconsulta") {
    const token = String(body.access_token ?? "");
    if (!token) throw new Error("Token requerido. Cerrá sesión e ingresá nuevamente.");
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail?.mensaje || err.detail || "No se pudo iniciar la consulta");
  }
  return res.json();
}

function formatPesos(value?: number | null) {
  if (!value) return "";
  return `$${value.toLocaleString("es-AR")}`;
}

export default function PagoScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const url         = params.get("url") ?? "";
  const consultaId  = params.get("consulta_id") ?? "";
  const motivo      = params.get("motivo") ?? "";
  const direccion   = params.get("direccion") ?? "";
  const lat         = parseFloat(params.get("lat") ?? "0");
  const lng         = parseFloat(params.get("lng") ?? "0");
  const tipo        = params.get("tipo") ?? "medico";
  const metodo      = params.get("metodo") === "saldo_mp" ? "saldo_mp" : "tarjeta";
  const monto       = Number(params.get("monto") ?? "0");

  const [user, setUser] = useState<PedirUser | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const doneRef = useRef(false);

  const { bg, brandBorder: border, text, muted, headerBg, logo, overlayBg } = usePedirTheme();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) { router.replace("/pedir"); return; }
      setUser(JSON.parse(raw));
    } catch { router.replace("/pedir"); }
  }, [router]);

  const confirmarYSolicitar = useCallback(async (paymentId?: string) => {
    if (doneRef.current) return;
    doneRef.current = true;
    if (pollRef.current) clearInterval(pollRef.current);
    setProcesando(true);
    try {
      const body: Record<string, unknown> = {
        paciente_uuid: user?.id,
        motivo, direccion, lat, lng,
        metodo_pago: metodo,
        consulta_id: parseInt(consultaId),
        tipo,
        access_token: user?.access_token,
      };
      if (paymentId) body.payment_id = paymentId;

      const data = await solicitarConsulta(body);
      router.push(`/pedir/buscando?consulta_id=${data.consulta_id}&tipo=${tipo}&metodo=${metodo}`);
    } catch (e) {
      setProcesando(false);
      doneRef.current = false;
      setError(e instanceof Error ? e.message : "Error al iniciar la consulta");
    }
  }, [user, motivo, direccion, lat, lng, consultaId, tipo, metodo, router]);

  // Mensaje desde el iframe del formulario MP (web context)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "docya_payment_success") {
        confirmarYSolicitar(e.data.payment_id?.toString());
      } else if (e.data?.type === "docya_payment_error") {
        setError(e.data.message || "No se pudo procesar el pago.");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [confirmarYSolicitar]);

  // Polling: fallback para detectar cuando el pago fue autorizado (app nativa / WebView)
  useEffect(() => {
    if (!consultaId || !user) return;
    pollRef.current = setInterval(async () => {
      if (doneRef.current) return;
      try {
        const res = await fetch(`${API}/consultas/${consultaId}/estado`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.mp_preautorizado === true || data.mp_status === "approved") {
          confirmarYSolicitar(data.payment_id ?? undefined);
        }
      } catch {}
    }, 3000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [consultaId, user, confirmarYSolicitar]);

  if (!user || !url) return null;

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px", flexShrink: 0 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href={`/pedir/solicitar?tipo=${tipo}`} style={{ color: muted, display: "flex", alignItems: "center" }}>
            <ArrowLeft size={22} />
          </Link>
          <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#2dd4bf", fontWeight: 600 }}>
            <ShieldCheck size={15} /> Pago seguro
          </div>
        </div>
      </header>

      {procesando ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: 999, background: "rgba(0,179,166,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Loader2 size={36} color="#2dd4bf" className="animate-spin" />
          </div>
          <p style={{ fontSize: 18, fontWeight: 700, textAlign: "center" }}>Confirmando tu pago...</p>
          <p style={{ color: muted, fontSize: 14, textAlign: "center" }}>Estamos buscando un profesional para vos</p>
        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: 720, margin: "0 auto", width: "100%", padding: "20px 20px 40px" }}>

          <div style={{ marginBottom: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6, color: "#2dd4bf" }}>Autorizá el pago</h1>
            <p style={{ color: muted, fontSize: 14 }}>
              El cobro se realiza <strong style={{ color: text }}>solo cuando un profesional acepta</strong> tu consulta.
            </p>
            {monto > 0 && (
              <div style={{ marginTop: 12, borderRadius: 16, border: `1px solid ${border}`, background: "rgba(0,179,166,0.08)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <span style={{ color: muted, fontSize: 13, fontWeight: 800 }}>Monto a autorizar</span>
                <strong style={{ color: "#2dd4bf", fontSize: 22, lineHeight: 1 }}>{formatPesos(monto)}</strong>
              </div>
            )}
          </div>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 14, padding: "14px 16px", marginBottom: 16, fontSize: 14, color: "#f87171", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1 }}>{error}</span>
              <button onClick={() => { setError(""); doneRef.current = false; }} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: 4 }}>
                <RefreshCw size={16} />
              </button>
            </div>
          )}

          {/* Iframe MP */}
          <div style={{ flex: 1, borderRadius: 20, overflow: "hidden", border: `1.5px solid ${border}`, position: "relative", minHeight: 520, boxShadow: "0 0 40px rgba(0,179,166,0.08)" }}>
            {!iframeLoaded && (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, background: overlayBg }}>
                <Loader2 size={32} color="#2dd4bf" className="animate-spin" />
                <p style={{ color: muted, fontSize: 14 }}>Cargando formulario de pago...</p>
              </div>
            )}
            <iframe
              src={url}
              style={{ width: "100%", height: "100%", minHeight: 520, border: "none", display: "block" }}
              onLoad={() => setIframeLoaded(true)}
              allow="payment"
              title="Formulario de pago DocYa"
            />
          </div>

          <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
            🔒 Tu información de pago es procesada por Mercado Pago con cifrado SSL.
          </p>
        </div>
      )}
    </div>
  );
}
