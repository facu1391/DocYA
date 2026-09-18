"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle2, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { usePedirTheme } from "./theme";
import { leerPagoPendienteLocal, leerPedirUser, limpiarPagoPendiente, reconstruirPagoDesdeConsulta, solicitarConsulta } from "@/lib/pedir/pendingPayment";

const API = process.env.NEXT_PUBLIC_API_BASE!;

export default function QrPaymentScreen() {
  const params = useSearchParams();
  const router = useRouter();
  const consultaId = params.get("consulta_id") ?? "";
  const url = params.get("url") ?? "";
  const orderId = params.get("order_id") ?? "";
  const amount = Number(params.get("monto") ?? "0");
  const valid = /^\d+$/.test(consultaId) && /^https:\/\/mpago\.la\/pos\/\d+$/.test(url) && !!orderId && Number.isFinite(amount) && amount > 0;
  const { bg, cardBg, text, muted, brandBorder } = usePedirTheme();
  const [status, setStatus] = useState("created");
  const [message, setMessage] = useState("");
  const [activating, setActivating] = useState(false);
  const activatingRef = useRef(false);

  const check = useCallback(async () => {
    if (!valid || activatingRef.current) return;
    const user = leerPedirUser();
    if (!user?.access_token) { setMessage("Ingresá nuevamente a tu cuenta para confirmar el pago."); return; }
    try {
      const response = await fetch(`${API}/pagos/qr/consulta/${consultaId}`, {
        headers: { Authorization: `Bearer ${user.access_token}` }, cache: "no-store",
      });
      if (!response.ok) throw new Error("No pudimos verificar el pago. Volvé a consultar en unos segundos.");
      const result = await response.json();
      if (result.order_id !== orderId || result.currency !== "ARS" || Number(result.amount) !== amount) throw new Error("La orden QR no coincide con esta solicitud.");
      setStatus(result.status);
      setMessage("");
      if (["expired", "canceled", "refunded"].includes(result.status)) {
        limpiarPagoPendiente();
        return;
      }
      if (result.status !== "processed" || !result.payment_id) return;
      if (activatingRef.current) return;

      activatingRef.current = true;
      setActivating(true);
      const pendingLocal = leerPagoPendienteLocal();
      const pending = pendingLocal && String(pendingLocal.consulta_id) === consultaId
        ? pendingLocal : await reconstruirPagoDesdeConsulta(consultaId, user);
      if (!pending || pending.metodo_pago !== "qr_mp") throw new Error("El pago se acreditó, pero faltan datos para iniciar la consulta. Contactá a DocYa con el número de orden.");
      const activated = await solicitarConsulta({ ...pending, consulta_id: consultaId, paciente_uuid: user.id, access_token: user.access_token, metodo_pago: "qr_mp", payment_id: result.payment_id });
      if (!activated.consulta_id) throw new Error("El pago se acreditó, pero no pudimos iniciar la consulta.");
      limpiarPagoPendiente();
      router.replace(`/pedir/buscando?consulta_id=${activated.consulta_id}&tipo=teleconsulta&metodo=qr_mp`);
    } catch (error) {
      activatingRef.current = false;
      setActivating(false);
      setMessage(error instanceof Error ? error.message : "No pudimos verificar el pago.");
    }
  }, [amount, consultaId, orderId, router, valid]);

  useEffect(() => {
    if (!valid) return;
    void check();
    const timer = window.setInterval(() => { void check(); }, 5000);
    const onFocus = () => { void check(); };
    window.addEventListener("focus", onFocus);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", onFocus); };
  }, [check, valid]);

  const terminal = ["expired", "canceled", "refunded"].includes(status);
  return <main style={{ minHeight: "100vh", background: bg, color: text, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
    <div style={{ maxWidth: 460, width: "100%", background: cardBg, border: `1px solid ${brandBorder}`, borderRadius: 22, padding: 24, textAlign: "center" }}>
      {!valid ? <><h1>Enlace QR inválido</h1><Link href="/pedir">Volver a DocYa</Link></> : <>
        <h1 style={{ fontSize: 23, margin: "0 0 8px" }}>Pagá con Mercado Pago</h1>
        <p style={{ color: muted, margin: "0 0 18px" }}>Importe confirmado por DocYa</p>
        <p style={{ fontSize: 34, fontWeight: 800, margin: "0 0 18px" }}>{amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</p>
        {!terminal && <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, padding: 15, borderRadius: 12, background: "#00b3a6", color: "white", fontWeight: 800, textDecoration: "none" }}>Abrir Mercado Pago en este celular <ExternalLink size={18} /></a>}
        {!terminal && <details style={{ marginTop: 18 }}><summary style={{ cursor: "pointer", color: muted, fontSize: 13 }}>Pagar desde otro celular</summary><div style={{ background: "white", borderRadius: 14, padding: 12, width: "fit-content", margin: "14px auto" }}><QRCodeSVG value={url} size={204} /></div><p style={{ fontSize: 13, color: muted }}>Escaneá este código desde el otro celular.</p></details>}
        <p style={{ fontSize: 13, color: muted, lineHeight: 1.5 }}>Después de pagar, regresá a esta pantalla. Confirmaremos el pago automáticamente.</p>
        <p style={{ fontSize: 12, color: muted, overflowWrap: "anywhere" }}>Orden: {orderId}</p>
        {activating ? <p><Loader2 size={18} className="animate-spin" style={{ verticalAlign: "middle" }} /> Pago acreditado. Iniciando consulta...</p>
          : status === "processed" ? <p><CheckCircle2 size={18} style={{ verticalAlign: "middle" }} /> Pago acreditado.</p>
          : terminal ? <p>La orden terminó ({status}). No realices el pago con este QR.</p>
          : <p><Loader2 size={18} className="animate-spin" style={{ verticalAlign: "middle" }} /> Esperando confirmación del pago...</p>}
        {message && <p role="alert" style={{ color: "#ef4444", lineHeight: 1.5 }}>{message}</p>}
        <button onClick={() => { void check(); }} disabled={activating} style={{ border: `1px solid ${brandBorder}`, background: "transparent", color: text, borderRadius: 10, padding: "10px 14px", cursor: "pointer" }}><RefreshCw size={16} style={{ verticalAlign: "middle" }} /> Verificar pago</button>
      </>}
    </div>
  </main>;
}
