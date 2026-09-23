"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { usePedirTheme } from "./theme";

const API = process.env.NEXT_PUBLIC_API_BASE!;

type MensajeChat = {
  id: number;
  remitente_tipo: string;
  remitente_id: string | number;
  mensaje: string;
  creado_en?: string;
};

type Props = {
  consultaId: string;
  pacienteId: string;
  token: string;
  profesional: string;
};

function websocketUrl(consultaId: string, token: string) {
  const api = new URL(API);
  const protocol = api.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${api.host}/ws/chat-web/${encodeURIComponent(consultaId)}?token=${encodeURIComponent(token)}`;
}

function hora(raw?: string) {
  if (!raw) return "Ahora";
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  }
  const match = raw.match(/(\d{2}:\d{2})/g);
  return match?.at(-1) ?? "Ahora";
}

export default function PacienteChat({ consultaId, pacienteId, token, profesional }: Props) {
  const { surface, brandBorder: border, text, muted, softPanel } = usePedirTheme();
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(true);
  const [conectado, setConectado] = useState(false);
  const [error, setError] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(true);

  const agregarMensaje = useCallback((nuevo: MensajeChat) => {
    setMensajes(actuales => actuales.some(item => item.id === nuevo.id) ? actuales : [...actuales, nuevo]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  useEffect(() => {
    mountedRef.current = true;
    const controller = new AbortController();

    const cargarHistorial = async () => {
      try {
        const res = await fetch(`${API}/consultas/${consultaId}/chat-web`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error(data?.detail || "No pudimos cargar el chat.");
        if (mountedRef.current) {
          setMensajes(actuales => {
            const combinados = new Map<number, MensajeChat>();
            for (const item of Array.isArray(data) ? data : []) combinados.set(item.id, item);
            for (const item of actuales) combinados.set(item.id, item);
            return [...combinados.values()].sort((a, b) => a.id - b.id);
          });
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (mountedRef.current) setError(err instanceof Error ? err.message : "No pudimos cargar el chat.");
      } finally {
        if (mountedRef.current) setCargando(false);
      }
    };

    const conectar = () => {
      if (!mountedRef.current) return;
      const socket = new WebSocket(websocketUrl(consultaId, token));
      socketRef.current = socket;
      socket.onopen = () => {
        if (!mountedRef.current) return;
        setConectado(true);
        setError("");
      };
      socket.onmessage = event => {
        try {
          agregarMensaje(JSON.parse(event.data) as MensajeChat);
        } catch {}
      };
      socket.onerror = () => {
        if (mountedRef.current) setConectado(false);
      };
      socket.onclose = event => {
        if (!mountedRef.current) return;
        setConectado(false);
        if (event.code === 1008) {
          setError("No pudimos validar el acceso a este chat.");
          return;
        }
        reconnectRef.current = setTimeout(conectar, 2500);
      };
    };

    void cargarHistorial();
    conectar();
    return () => {
      mountedRef.current = false;
      controller.abort();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      socketRef.current?.close(1000, "Vista cerrada");
    };
  }, [agregarMensaje, consultaId, token]);

  const enviar = (event: FormEvent) => {
    event.preventDefault();
    const mensaje = texto.trim().slice(0, 2000);
    if (!mensaje || socketRef.current?.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({ mensaje }));
    setTexto("");
  };

  return (
    <section style={{ background: surface, border: `1.5px solid ${border}`, borderRadius: 20, padding: 20, marginBottom: 16 }} aria-label={`Chat con ${profesional}`}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <MessageCircle size={21} color="#2dd4bf" />
          <div>
            <h2 style={{ color: text, fontSize: 17, fontWeight: 850, margin: 0 }}>Chat con {profesional}</h2>
            <p style={{ color: muted, fontSize: 12, margin: "3px 0 0" }}>Los mensajes también aparecen en la app del profesional.</p>
          </div>
        </div>
        <span style={{ color: conectado ? "#22c55e" : "#f59e0b", fontSize: 11, fontWeight: 800 }}>
          {conectado ? "En línea" : "Reconectando…"}
        </span>
      </div>

      <div style={{ height: 280, overflowY: "auto", background: softPanel, borderRadius: 16, padding: 12, display: "flex", flexDirection: "column", gap: 9 }}>
        {cargando && <div style={{ color: muted, margin: "auto", display: "flex", gap: 8, alignItems: "center" }}><Loader2 size={16} className="animate-spin" /> Cargando mensajes…</div>}
        {!cargando && !mensajes.length && <p style={{ color: muted, fontSize: 13, textAlign: "center", margin: "auto" }}>Todavía no hay mensajes. Podés escribirle al profesional.</p>}
        {mensajes.map(msg => {
          const propio = msg.remitente_tipo === "paciente" && String(msg.remitente_id) === pacienteId;
          return (
            <div key={msg.id} style={{ alignSelf: propio ? "flex-end" : "flex-start", maxWidth: "82%", background: propio ? "#0f9f94" : surface, color: propio ? "#fff" : text, border: propio ? "none" : `1px solid ${border}`, borderRadius: propio ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "9px 12px" }}>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.45, overflowWrap: "anywhere", whiteSpace: "pre-wrap" }}>{msg.mensaje}</p>
              <span style={{ display: "block", marginTop: 4, fontSize: 10, opacity: 0.72, textAlign: "right" }}>{hora(msg.creado_en)}</span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {error && <p role="alert" style={{ color: "#f87171", fontSize: 12, margin: "10px 2px 0" }}>{error}</p>}
      <form onSubmit={enviar} style={{ display: "flex", gap: 9, marginTop: 12 }}>
        <input
          value={texto}
          onChange={event => setTexto(event.target.value)}
          placeholder="Escribí un mensaje…"
          maxLength={2000}
          aria-label="Mensaje"
          style={{ flex: 1, minWidth: 0, border: `1px solid ${border}`, background: softPanel, color: text, borderRadius: 14, padding: "12px 14px", outline: "none", fontSize: 14 }}
        />
        <button type="submit" disabled={!conectado || !texto.trim()} aria-label="Enviar mensaje" style={{ width: 46, border: 0, borderRadius: 14, background: conectado && texto.trim() ? "#14b8a6" : border, color: "#fff", display: "grid", placeItems: "center", cursor: conectado && texto.trim() ? "pointer" : "not-allowed" }}>
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
