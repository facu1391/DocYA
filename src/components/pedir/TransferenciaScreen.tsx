"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Clock3, Copy, Landmark, Loader2, ShieldCheck, XCircle } from "lucide-react";
import { usePedirTheme } from "./theme";
import {
  leerPagoPendienteLocal,
  limpiarPagoPendiente,
  solicitarConsulta,
} from "@/lib/pedir/pendingPayment";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type PedirUser = { id: string; access_token?: string };
type Estado = "sin_aviso" | "pendiente" | "aprobada" | "rechazada" | "activada";

export default function TransferenciaScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const consultaId = params.get("consulta_id") ?? "";
  const tipo = params.get("tipo") ?? "medico";
  const monto = Number(params.get("monto") || 0);
  const { bg, inputBg, brandBorder: border, text, muted } = usePedirTheme();
  const [user, setUser] = useState<PedirUser | null>(null);
  const [alias, setAlias] = useState("docya.sas");
  const [cvu, setCvu] = useState("0000003100049989113284");
  const [estado, setEstado] = useState<Estado>("sin_aviso");
  const [creditoDisponible, setCreditoDisponible] = useState(false);
  const [saldoCredito, setSaldoCredito] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const activando = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("pedir_user");
      if (!raw) { router.replace("/pedir"); return; }
      setUser(JSON.parse(raw));
    } catch { router.replace("/pedir"); }
  }, [router]);

  useEffect(() => {
    fetch(`${API}/pagos/transferencia/datos`).then(r => r.ok ? r.json() : null).then(data => {
      if (data?.alias) setAlias(data.alias);
      if (data?.cvu) setCvu(data.cvu);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user?.access_token || !monto) return;
    const uri = `${API}/pagos/transferencia/credito-disponible?paciente_uuid=${encodeURIComponent(user.id)}&monto=${monto}`;
    fetch(uri, { headers: { Authorization: `Bearer ${user.access_token}` }, cache: "no-store" })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setCreditoDisponible(data?.suficiente === true);
        setSaldoCredito(Number(data?.saldo || 0));
      })
      .catch(() => {});
  }, [monto, user]);

  const activar = useCallback(async () => {
    if (activando.current || !user) return;
    activando.current = true;
    setLoading(true);
    try {
      const pending = leerPagoPendienteLocal();
      if (!pending || String(pending.consulta_id) !== consultaId) throw new Error("No encontramos los datos de esta solicitud. Volve a iniciarla.");
      const result = await solicitarConsulta({ ...pending, metodo_pago: "transferencia", access_token: user.access_token });
      limpiarPagoPendiente();
      router.replace(`/pedir/buscando?consulta_id=${result.consulta_id}&tipo=${tipo}&metodo=transferencia`);
    } catch (e) {
      activando.current = false;
      setLoading(false);
      setError(e instanceof Error ? e.message : "No pudimos iniciar la consulta.");
    }
  }, [consultaId, router, tipo, user]);

  const consultarEstado = useCallback(async () => {
    if (!user?.access_token || !consultaId || estado === "sin_aviso") return;
    const res = await fetch(`${API}/pagos/transferencia/${consultaId}/estado?paciente_uuid=${encodeURIComponent(user.id)}`, {
      headers: { Authorization: `Bearer ${user.access_token}` }, cache: "no-store",
    });
    if (!res.ok) return;
    const data = await res.json();
    const nuevo = data.estado as Estado;
    setEstado(nuevo);
    if (nuevo === "aprobada" || nuevo === "activada") await activar();
  }, [activar, consultaId, estado, user]);

  useEffect(() => {
    if (estado !== "pendiente") return;
    const id = window.setInterval(consultarEstado, 3000);
    consultarEstado();
    return () => window.clearInterval(id);
  }, [consultarEstado, estado]);

  const avisar = async () => {
    if (!user?.access_token) return;
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/pagos/transferencia/avisar`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.access_token}` },
        body: JSON.stringify({ consulta_id: Number(consultaId), paciente_uuid: user.id, usar_credito: creditoDisponible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "No pudimos avisar la transferencia.");
      setAlias(data.alias || alias); setCvu(data.cvu || cvu); setEstado(data.estado || "pendiente");
      if (data.estado === "aprobada") await activar();
    } catch (e) { setError(e instanceof Error ? e.message : "Error inesperado."); }
    finally { setLoading(false); }
  };

  const copiar = async (valor: string) => { try { await navigator.clipboard.writeText(valor); } catch {} };
  const dinero = monto ? `$${monto.toLocaleString("es-AR")}` : "el monto indicado";

  return (
    <main style={{ minHeight: "100vh", background: bg, color: text, padding: "36px 18px", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Landmark size={38} color="#2dd4bf" />
          <h1 style={{ fontSize: 26, margin: "12px 0 6px" }}>{creditoDisponible ? "Tenes un pago disponible" : "Paga por transferencia"}</h1>
          <p style={{ color: muted, lineHeight: 1.5, margin: 0 }}>
            {creditoDisponible
              ? <>Tu saldo de <strong style={{ color: text }}>${saldoCredito.toLocaleString("es-AR")}</strong> alcanza para esta consulta. No tenes que volver a transferir.</>
              : <>Transferi <strong style={{ color: text }}>{dinero}</strong> y luego toca el boton para que verifiquemos el ingreso.</>}
          </p>
        </div>

        {!creditoDisponible && <section style={{ background: inputBg, border: `1px solid ${border}`, borderRadius: 20, padding: 20 }}>
          {[{ label: "Alias", value: alias }, { label: "CVU", value: cvu }].map(item => (
            <div key={item.label} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: muted, textTransform: "uppercase", fontWeight: 800 }}>{item.label}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 5 }}>
                <strong style={{ fontSize: 18, wordBreak: "break-all" }}>{item.value}</strong>
                <button onClick={() => copiar(item.value)} aria-label={`Copiar ${item.label}`} style={{ border: `1px solid ${border}`, background: "transparent", color: "#2dd4bf", borderRadius: 10, padding: 9, cursor: "pointer" }}><Copy size={17} /></button>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 9, color: muted, fontSize: 13, lineHeight: 1.45 }}><ShieldCheck size={18} color="#2dd4bf" style={{ flexShrink: 0 }} />La consulta no se inicia hasta que un administrador comprueba la transferencia.</div>
        </section>}

        {estado === "sin_aviso" && <button onClick={avisar} disabled={loading} style={{ width: "100%", marginTop: 18, padding: 16, border: 0, borderRadius: 16, background: "#00b3a6", color: "white", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>{loading ? <Loader2 className="animate-spin" size={20} /> : creditoDisponible ? "Usar pago disponible" : "Ya realice la transferencia"}</button>}
        {estado === "pendiente" && <div style={{ marginTop: 18, padding: 18, borderRadius: 16, background: "rgba(245,158,11,.12)", color: "#fbbf24", display: "flex", gap: 12, alignItems: "center" }}><Clock3 size={22} /><div><strong>Esperando verificacion</strong><div style={{ fontSize: 13, marginTop: 3 }}>Te avisaremos y continuaremos automaticamente cuando se apruebe.</div></div></div>}
        {estado === "rechazada" && <div style={{ marginTop: 18, padding: 18, borderRadius: 16, background: "rgba(239,68,68,.12)", color: "#f87171", display: "flex", gap: 12 }}><XCircle size={22} /><div><strong>No pudimos verificarla</strong><div style={{ fontSize: 13, marginTop: 3 }}>Revisa el importe o comunicate con soporte antes de volver a avisar.</div></div></div>}
        {(estado === "aprobada" || estado === "activada") && <div style={{ marginTop: 18, padding: 18, borderRadius: 16, background: "rgba(16,185,129,.12)", color: "#34d399", display: "flex", gap: 12 }}><Check size={22} /><strong>Transferencia aprobada. Iniciando consulta...</strong></div>}
        {loading && estado !== "sin_aviso" && <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}><Loader2 className="animate-spin" color="#2dd4bf" /></div>}
        {error && <p style={{ color: "#f87171", textAlign: "center", marginTop: 16 }}>{error}</p>}
      </div>
    </main>
  );
}
