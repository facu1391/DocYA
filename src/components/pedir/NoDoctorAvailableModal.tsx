"use client";

import { Loader2, MapPin, Video, X } from "lucide-react";
import type { RetryService } from "@/lib/pedir/retryRequest";

type Props = {
  open: boolean;
  homePrice: number | null;
  teleconsultPrice: number | null;
  paymentNotice: string;
  busy: boolean;
  onRetry: (service: RetryService) => void;
  onClose: () => void;
};

const pesos = (amount: number | null) => amount
  ? `$${amount.toLocaleString("es-AR")}`
  : "consultar precio";

export default function NoDoctorAvailableModal({
  open,
  homePrice,
  teleconsultPrice,
  paymentNotice,
  busy,
  onRetry,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={event => { if (event.target === event.currentTarget && !busy) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 1300, display: "flex", alignItems: "center", justifyContent: "center", padding: 14, background: "rgba(2,12,20,.78)", backdropFilter: "blur(9px)" }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="no-doctor-title"
        style={{ width: "100%", maxWidth: 520, maxHeight: "min(92dvh, 820px)", overflowY: "auto", borderRadius: 26, border: "1px solid rgba(129,140,248,.3)", background: "#0b2029", color: "#e5f6f8", boxShadow: "0 28px 90px rgba(0,0,0,.5)" }}
      >
        <header style={{ display: "flex", alignItems: "flex-start", gap: 13, padding: "22px 22px 14px" }}>
          <div style={{ width: 46, height: 46, flex: "0 0 auto", borderRadius: 15, display: "grid", placeItems: "center", color: "#fbbf24", background: "rgba(251,191,36,.12)" }}>
            <MapPin size={23} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 id="no-doctor-title" style={{ margin: 0, fontSize: 21, lineHeight: 1.2, fontWeight: 900 }}>No encontramos un médico disponible por ahora</h2>
            <p style={{ margin: "8px 0 0", color: "#a9bdc3", fontSize: 14, lineHeight: 1.5 }}>Finalizó la búsqueda y ningún médico cercano pudo aceptar tu consulta a domicilio.</p>
          </div>
          <button type="button" aria-label="Cerrar" onClick={onClose} disabled={busy} style={{ width: 36, height: 36, flex: "0 0 auto", display: "grid", placeItems: "center", borderRadius: 12, border: "1px solid rgba(255,255,255,.13)", background: "transparent", color: "#a9bdc3", cursor: "pointer" }}><X size={18} /></button>
        </header>

        <div style={{ margin: "0 20px 16px", padding: "16px", borderRadius: 18, border: "1px solid rgba(129,140,248,.24)", background: "rgba(129,140,248,.08)" }}>
          <h3 style={{ margin: "0 0 7px", color: "#c7d2fe", fontSize: 16, fontWeight: 850 }}>¿Sabías que también podemos atenderte por videollamada?</h3>
          <p style={{ margin: 0, color: "#b8c8cc", fontSize: 13, lineHeight: 1.55 }}>Muchas consultas pueden resolverse mediante una teleconsulta, sin necesidad de trasladarte a una guardia.</p>
          <p style={{ margin: "9px 0 0", color: "#b8c8cc", fontSize: 13, lineHeight: 1.55 }}>Un médico puede evaluar tus síntomas, orientarte con un tratamiento y, si corresponde, emitir recetas electrónicas, certificados médicos, órdenes de análisis y estudios, además de indicaciones y seguimiento. Si tu situación requiere una revisión física, te indicará cómo continuar.</p>
        </div>

        {paymentNotice && <p role="status" style={{ margin: "0 20px 16px", padding: "12px 14px", borderRadius: 14, color: "#d5e3e6", background: "rgba(255,255,255,.055)", fontSize: 12.5, lineHeight: 1.55 }}>{paymentNotice}</p>}

        <div style={{ display: "grid", gap: 10, padding: "0 20px" }}>
          <button type="button" disabled={busy} onClick={() => onRetry("teleconsulta")} style={{ minHeight: 54, padding: "12px 15px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, border: 0, borderRadius: 15, background: "linear-gradient(90deg,#5278ee,#818cf8)", color: "#fff", fontSize: 15, fontWeight: 850, cursor: busy ? "wait" : "pointer" }}>
            {busy ? <Loader2 size={19} className="animate-spin" /> : <Video size={19} />}
            Solicitar teleconsulta · {pesos(teleconsultPrice)}
          </button>
          <button type="button" disabled={busy} onClick={() => onRetry("medico")} style={{ minHeight: 52, padding: "12px 15px", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, border: "1px solid rgba(20,184,166,.55)", borderRadius: 15, background: "rgba(20,184,166,.10)", color: "#5eead4", fontSize: 14, fontWeight: 800, cursor: busy ? "wait" : "pointer" }}>
            <MapPin size={18} /> Volver a buscar médico a domicilio · {pesos(homePrice)}
          </button>
        </div>

        <p style={{ margin: "15px 22px 8px", color: "#91a9b0", fontSize: 11.5, lineHeight: 1.5, textAlign: "center" }}>Ambas modalidades cuentan con profesionales matriculados. Ante síntomas graves, solicitá atención de urgencia.</p>
        <button type="button" disabled={busy} onClick={onClose} style={{ width: "100%", minHeight: 48, border: 0, borderTop: "1px solid rgba(255,255,255,.08)", background: "transparent", color: "#a9bdc3", fontWeight: 750, cursor: busy ? "wait" : "pointer" }}>Ahora no</button>
      </section>
    </div>
  );
}
