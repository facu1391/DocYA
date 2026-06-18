"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, RotateCcw, Home } from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; access_token?: string };

function getConsultaId(data: Record<string, unknown>) {
  return data.id ?? data.consulta_id;
}

function readStoredJson(key: string): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(key) || sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readPedirUser(): PedirUser | null {
  const data = readStoredJson("pedir_user");
  if (!data?.id) return null;
  return { id: String(data.id), access_token: data.access_token ? String(data.access_token) : undefined };
}

async function reconstruirPendingDesdeConsulta(consultaId: string): Promise<Record<string, unknown> | null> {
  if (!consultaId) return null;
  const user = readPedirUser();
  if (!user?.access_token) return null;

  const [consultaRes, estadoRes] = await Promise.all([
    fetch(`${API}/consultas/${consultaId}`),
    fetch(`${API}/consultas/${consultaId}/estado`),
  ]);
  if (!consultaRes.ok) return null;

  const consulta = await consultaRes.json();
  const estado = estadoRes.ok ? await estadoRes.json().catch(() => ({})) : {};
  if (String(consulta.paciente_uuid) !== user.id) return null;

  return {
    consulta_id: consulta.id ?? consultaId,
    tipo: consulta.canal_atencion === "teleconsulta" ? "teleconsulta" : consulta.tipo || "teleconsulta",
    motivo: consulta.motivo,
    direccion: consulta.direccion,
    lat: consulta.lat,
    lng: consulta.lng,
    paciente_uuid: user.id,
    access_token: user.access_token,
    categoria_consulta: consulta.categoria_consulta,
    provincia: consulta.provincia,
    paciente_menor_nombre: consulta.paciente_menor_nombre,
    paciente_menor_dni: consulta.paciente_menor_dni,
    paciente_menor_fecha_nacimiento: consulta.paciente_menor_fecha_nacimiento,
    paciente_menor_sexo: consulta.paciente_menor_sexo,
    responsable_vinculo: consulta.responsable_vinculo,
    payment_id: estado.payment_id,
  };
}

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
        provincia: body.provincia || "Argentina",
        localidad: body.direccion || "Argentina",
        categoria_consulta: body.categoria_consulta,
        paciente_menor_nombre: body.paciente_menor_nombre,
        paciente_menor_dni: body.paciente_menor_dni,
        paciente_menor_fecha_nacimiento: body.paciente_menor_fecha_nacimiento,
        paciente_menor_sexo: body.paciente_menor_sexo,
        responsable_vinculo: body.responsable_vinculo,
        necesita_certificado: false,
        consentimiento_teleconsulta: true,
        metodo_pago: body.metodo_pago,
        payment_id: body.payment_id,
      }
    : body;

  if (tipo === "teleconsulta") {
    const token = String(body.access_token ?? "");
    if (!token) throw new Error("Token requerido. Cerra sesion e ingresa nuevamente.");
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

export default function PagoResultadoScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status") ?? "";
  const collectionStatus = params.get("collection_status") ?? "";
  const paymentId = params.get("payment_id") || params.get("collection_id") || "";
  const consultaId = params.get("consulta_id") ?? "";

  const { bg, text, muted, headerBg, logo, border, brandBorder } = usePedirTheme();
  const [fase, setFase] = useState<"procesando" | "ok" | "error">("procesando");
  const [mensaje, setMensaje] = useState("");
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;

    const esPago = status === "success" || status === "approved" || collectionStatus === "approved";

    if (!esPago) {
      setFase("error");
      setMensaje(
        status === "pending"
          ? "Tu pago esta siendo procesado por Mercado Pago. Revisa tu cuenta de MP en unos minutos."
          : "El pago no pudo completarse. No se realizo ningun cobro."
      );
      return;
    }

    doneRef.current = true;

    const solicitar = async () => {
      try {
        const pending = readStoredJson("docya_saldo_mp_pending") || await reconstruirPendingDesdeConsulta(consultaId);
        if (!pending) {
          throw new Error("Pago recibido, pero no pudimos retomar tu sesion. Volve a ingresar a DocYa e intenta nuevamente.");
        }

        const data = await solicitarConsulta({
          paciente_uuid: pending.paciente_uuid,
          motivo: pending.motivo,
          direccion: pending.direccion,
          lat: pending.lat,
          lng: pending.lng,
          metodo_pago: "saldo_mp",
          tipo: pending.tipo,
          consulta_id: pending.consulta_id,
          access_token: pending.access_token,
          payment_id: pending.payment_id || paymentId || undefined,
          categoria_consulta: pending.categoria_consulta,
          provincia: pending.provincia,
          paciente_menor_nombre: pending.paciente_menor_nombre,
          paciente_menor_dni: pending.paciente_menor_dni,
          paciente_menor_fecha_nacimiento: pending.paciente_menor_fecha_nacimiento,
          paciente_menor_sexo: pending.paciente_menor_sexo,
          responsable_vinculo: pending.responsable_vinculo,
        });

        localStorage.removeItem("docya_saldo_mp_pending");
        sessionStorage.removeItem("docya_saldo_mp_pending");

        const nuevaConsultaId = getConsultaId(data);
        if (!nuevaConsultaId) throw new Error("No se pudo obtener la teleconsulta creada");

        setFase("ok");
        setTimeout(() => {
          router.replace(`/pedir/buscando?consulta_id=${nuevaConsultaId}&tipo=${pending.tipo}&metodo=saldo_mp`);
        }, 1200);
      } catch (e) {
        doneRef.current = false;
        setFase("error");
        setMensaje(e instanceof Error ? e.message : "Error al iniciar la consulta");
      }
    };

    void solicitar();
  }, [status, collectionStatus, paymentId, consultaId, router]);

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
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#22c55e" }}>Pago confirmado</p>
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
