"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, RotateCcw, Home } from "lucide-react";
import { usePedirTheme } from "./theme";
import { useI18n } from "@/lib/i18n/context";
import {
  leerPagoPendienteLocal,
  leerPedirUser,
  limpiarPagoPendiente,
  reconstruirPagoDesdeConsulta,
  solicitarConsulta,
} from "@/lib/pedir/pendingPayment";

export default function PagoResultadoScreen() {
  const router = useRouter();
  const { t } = useI18n();
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
          ? t.pagoResultado.pagoPendiente
          : t.pagoResultado.pagoFallido
      );
      return;
    }

    doneRef.current = true;

    const solicitar = async () => {
      try {
        const user = leerPedirUser();
        const pendingLocal = leerPagoPendienteLocal();
        const pending = (pendingLocal && String(pendingLocal.consulta_id) === consultaId)
          ? pendingLocal
          : user
            ? await reconstruirPagoDesdeConsulta(consultaId, user)
            : null;
        if (!pending) {
          throw new Error(t.pagoResultado.errorSesion);
        }

        const data = await solicitarConsulta({
          paciente_uuid: pending.paciente_uuid,
          motivo: pending.motivo,
          direccion: pending.direccion,
          lat: pending.lat,
          lng: pending.lng,
          metodo_pago: pending.metodo_pago || "saldo_mp",
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

        limpiarPagoPendiente();

        const nuevaConsultaId = data.consulta_id;
        if (!nuevaConsultaId) throw new Error(t.pagoResultado.errorTeleconsulta);

        setFase("ok");
        setTimeout(() => {
          router.replace(`/pedir/buscando?consulta_id=${nuevaConsultaId}&tipo=${pending.tipo}&metodo=saldo_mp`);
        }, 1200);
      } catch (e) {
        doneRef.current = false;
        setFase("error");
        const msg = e instanceof Error ? e.message : "";
        const errorMap: Record<string, string> = {
          TOKEN_REQUIRED: t.pagoResultado.tokenRequerido,
          ERROR_INICIAR: t.pagoResultado.errorIniciar,
        };
        setMensaje(errorMap[msg] || msg || t.pagoResultado.errorGeneral);
      }
    };

    void solicitar();
  }, [status, collectionStatus, paymentId, consultaId, router, t]);

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
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{t.pagoResultado.confirmando}</p>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6 }}>{t.pagoResultado.procesando}</p>
            </div>
          </>
        )}

        {fase === "ok" && (
          <>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={40} color="#22c55e" />
            </div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: "#22c55e" }}>{t.pagoResultado.pagoConfirmado}</p>
              <p style={{ color: muted, fontSize: 14 }}>{t.pagoResultado.redirigiendo}</p>
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
                {status === "pending" ? t.pagoResultado.pagoEnProceso : t.pagoResultado.noSePudo}
              </p>
              <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>{mensaje}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 320 }}>
              <Link
                href="/pedir"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 16, background: "linear-gradient(90deg,#00b3a6,#2dd4bf)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: 15 }}
              >
                <Home size={18} /> {t.pagoResultado.volverInicio}
              </Link>
              <Link
                href="/pedir/solicitar"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 16, border: `1px solid ${border}`, color: text, fontWeight: 600, textDecoration: "none", fontSize: 15 }}
              >
                <RotateCcw size={18} /> {t.pagoResultado.intentarDeNuevo}
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
