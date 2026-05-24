"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, RotateCcw, Home } from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

async function solicitarConsulta(body: Record<string, unknown>) {
  const tipo = String(body.tipo ?? "");
  const endpoint = tipo === "teleconsulta" ? "/teleconsultas" : "/consultas/solicitar";
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

  const res = await fetch(`${API}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail?.mensaje || err.detail || "No se pudo iniciar la consulta");
  }
  return res.json();
}

export default function PagoResultadoScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status") ?? "";
  const consultaId = params.get("consulta_id") ?? "";

  const { bg, text, muted, headerBg, logo, border, brandBorder } = usePedirTheme();
  const [fase, setFase] = useState<"procesando" | "ok" | "error">("procesando");
  const [mensaje, setMensaje] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    // MP puede mandar "approved" o "success" en el query param
    const esPago = status === "success" || status === "approved";

    if (!esPago) {
      setFase("error");
      setMensaje(
        status === "pending"
          ? "Tu pago está siendo procesado por Mercado Pago. Revisá tu cuenta de MP en unos minutos."
          : "El pago no pudo completarse. No se realizó ningún cobro."
      );
      return;
    }

    // Recuperar datos guardados antes del redirect a MP
    let pending: Record<string, unknown> | null = null;
    try {
      const raw = localStorage.getItem("docya_saldo_mp_pending");
      if (raw) pending = JSON.parse(raw);
    } catch {}

    if (!pending) {
      // Sin datos locales — igual intentamos con lo que tenemos
      setFase("error");
      setMensaje("Pago recibido, pero no pudimos retomar la solicitud. Contactá a soporte.");
      return;
    }

    doneRef.current = true;

    const solicitar = async () => {
      try {
        const data = await solicitarConsulta({
          paciente_uuid: pending!.paciente_uuid,
          motivo:        pending!.motivo,
          direccion:     pending!.direccion,
          lat:           pending!.lat,
          lng:           pending!.lng,
          metodo_pago:   "saldo_mp",
          tipo:          pending!.tipo,
          consulta_id:   pending!.consulta_id,
        });

        localStorage.removeItem("docya_saldo_mp_pending");

        setFase("ok");
        setTimeout(() => {
          router.replace(`/pedir/buscando?consulta_id=${data.consulta_id}&tipo=${pending!.tipo}&metodo=saldo_mp`);
        }, 1200);
      } catch (e) {
        setFase("error");
        setMensaje(e instanceof Error ? e.message : "Error al iniciar la consulta");
      }
    };

    void solicitar();
  }, [status, consultaId, router]);

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ borderBottom: `1px solid ${brandBorder}`, background: headerBg, backdropFilter: "blur(14px)", padding: "0 20px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center" }}>
          <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain" }} />
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", gap: 24 }}>

        {fase === "procesando" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "rgba(0,179,166,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Loader2 size={40} color="#2dd4bf" className="animate-spin" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Confirmando tu pago...</p>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6 }}>Estamos procesando tu pago con Mercado Pago y buscando un profesional para vos.</p>
            </div>
          </>
        )}

        {fase === "ok" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={40} color="#22c55e" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#22c55e" }}>¡Pago confirmado!</p>
              <p style={{ color: muted, fontSize: 14 }}>Redirigiendo al seguimiento de tu consulta...</p>
            </div>
          </>
        )}

        {fase === "error" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "rgba(239,68,68,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <XCircle size={40} color="#f87171" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#f87171" }}>
                {status === "pending" ? "Pago en proceso" : "No se pudo completar"}
              </p>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>{mensaje}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
              <Link
                href="/pedir"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 16, background: "linear-gradient(90deg,#00b3a6,#2dd4bf)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: 15 }}
              >
                <Home size={18} /> Volver al inicio
              </Link>
              <Link
                href="/pedir/solicitar"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 16, border: `1px solid ${border}`, color: text, fontWeight: 600, textDecoration: "none", fontSize: 15 }}
              >
                <RotateCcw size={18} /> Intentar de nuevo
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
