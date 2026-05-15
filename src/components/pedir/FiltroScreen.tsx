"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Wind, Heart, Brain, Droplets,
  Thermometer, Baby, Bandage, AlertTriangle,
  Phone, CheckCircle2, ChevronRight, X,
} from "lucide-react";
import { usePedirTheme } from "./theme";

const PREGUNTAS = [
  { id: 0, texto: "¿Tenés dificultad grave para respirar?",             icon: Wind,        color: "#38D7D2" },
  { id: 1, texto: "¿Tenés dolor intenso en el pecho?",                  icon: Heart,       color: "#FF4F70" },
  { id: 2, texto: "¿Tenés pérdida de conocimiento o convulsiones?",     icon: Brain,       color: "#A78BFA" },
  { id: 3, texto: "¿Tenés sangrado abundante o que no se detiene?",     icon: Droplets,    color: "#FF344E" },
  { id: 4, texto: "¿Tenés fiebre muy alta (+39.5 °C) con mal estado?", icon: Thermometer, color: "#FF9B45" },
  { id: 5, texto: "¿Es un menor de 12 años con fiebre persistente?",    icon: Baby,        color: "#2DD4BF" },
  { id: 6, texto: "¿Tuviste un accidente grave, fractura o quemadura?", icon: Bandage,     color: "#FFB84D" },
];

type Resp = Record<number, boolean>;

export default function FiltroScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = params.get("tipo") ?? "medico";

  const [respuestas, setRespuestas]     = useState<Resp>({});
  const [modalAbierto, setModalAbierto] = useState(false);
  const [preguntaEmerg, setPreguntaEmerg] = useState<typeof PREGUNTAS[0] | null>(null);

  const {
    dark, bg, brandBorder: border, text, muted, headerBg, logo,
    softPanel, softPanelBorder, titleStart,
  } = usePedirTheme();

  const responder = (idx: number, valor: boolean) => {
    setRespuestas(prev => ({ ...prev, [idx]: valor }));
    if (valor) {
      setPreguntaEmerg(PREGUNTAS[idx]);
      setModalAbierto(true);
    }
  };

  const cerrarModal = () => setModalAbierto(false);

  const todasNo = PREGUNTAS.every(p => respuestas[p.id] === false);
  const respondidas = Object.keys(respuestas).length;

  return (
    <>
      <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

        {/* HEADER */}
        <header style={{ borderBottom: `1px solid ${border}`, background: headerBg, backdropFilter: "blur(14px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/pedir" style={{ color: muted, display: "flex", alignItems: "center" }}>
              <ArrowLeft size={22} />
            </Link>
            <Image src={logo} alt="DocYa" width={80} height={26} style={{ width: 80, height: "auto", maxHeight: 26, objectFit: "contain", display: "block", flexShrink: 0 }} />
            <div style={{ marginLeft: "auto", background: "rgba(0,179,166,0.1)", border: "1px solid rgba(0,179,166,0.25)", borderRadius: 999, padding: "4px 12px", fontSize: 13, fontWeight: 600, color: "#2dd4bf" }}>
              {respondidas}/{PREGUNTAS.length} respondidas
            </div>
          </div>
        </header>

        <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>

          {/* INTRO CARD */}
          <div style={{ position: "relative", borderRadius: 24, padding: "28px 24px", background: dark ? "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(11,26,34,0.97) 60%)" : "linear-gradient(135deg, rgba(251,191,36,0.16) 0%, rgba(255,255,255,0.96) 60%)", border: "1.5px solid rgba(251,191,36,0.3)", boxShadow: "0 0 40px rgba(251,191,36,0.08)", marginBottom: 28 }}>
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "50%", height: 2.5, background: "linear-gradient(90deg, transparent, #fbbf24, transparent)", borderRadius: 999 }} />
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 16, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <AlertTriangle size={24} color="#fbbf24" />
              </div>
              <div>
                <h1 style={{
                  display: "block",
                  width: "fit-content",
                  maxWidth: "100%",
                  fontSize: "clamp(18px, 3.5vw, 24px)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  marginBottom: 8,
                  color: "#fbbf24",
                  background: `linear-gradient(90deg, ${titleStart}, #fbbf24)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  overflowWrap: "anywhere",
                  userSelect: "none",
                }}>
                  Evaluación de seguridad
                </h1>
                <p style={{ color: muted, fontSize: 14, lineHeight: 1.6 }}>
                  Respondé estas preguntas antes de continuar. Si alguna aplica, puede ser una emergencia que requiere atención inmediata — DocYa no reemplaza al <strong style={{ color: "#fbbf24" }}>107</strong> ni al <strong style={{ color: "#fbbf24" }}>911</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* PREGUNTAS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {PREGUNTAS.map((p) => {
              const Icon = p.icon;
              const resp = respuestas[p.id];
              return (
                <div key={p.id} style={{
                  borderRadius: 18, padding: "18px",
                  background: resp === true ? "rgba(239,68,68,0.08)" : resp === false ? "rgba(0,179,166,0.06)" : softPanel,
                  border: `1.5px solid ${resp === true ? "rgba(239,68,68,0.35)" : resp === false ? "rgba(0,179,166,0.25)" : softPanelBorder}`,
                  transition: "all 0.15s",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 12, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={19} color={p.color} />
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, flex: 1, paddingTop: 6 }}>{p.texto}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => responder(p.id, true)}
                      style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `1.5px solid ${resp === true ? "#ef4444" : softPanelBorder}`, background: resp === true ? "rgba(239,68,68,0.2)" : "transparent", color: resp === true ? "#f87171" : muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                    >Sí</button>
                    <button
                      onClick={() => responder(p.id, false)}
                      style={{ flex: 1, padding: "11px 0", borderRadius: 12, border: `1.5px solid ${resp === false ? "#00b3a6" : softPanelBorder}`, background: resp === false ? "rgba(0,179,166,0.15)" : "transparent", color: resp === false ? "#2dd4bf" : muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}
                    >No</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONFIRMACIÓN */}
          {todasNo && (
            <div style={{ background: "rgba(0,179,166,0.08)", border: "1.5px solid rgba(0,179,166,0.3)", borderRadius: 18, padding: "18px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <CheckCircle2 size={22} color="#2dd4bf" />
              <p style={{ fontWeight: 700, color: "#2dd4bf", fontSize: 15 }}>
                Todo en orden — podés continuar con tu consulta
              </p>
            </div>
          )}

          <button
            onClick={() => todasNo && router.push(`/pedir/solicitar?tipo=${tipo}`)}
            disabled={!todasNo}
            style={{
              width: "100%", padding: "17px", borderRadius: 18, border: "none",
              background: todasNo ? "linear-gradient(90deg, #00b3a6, #2dd4bf)" : softPanel,
              color: todasNo ? "#fff" : muted, fontSize: 16, fontWeight: 800,
              cursor: todasNo ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              fontFamily: "inherit",
              boxShadow: todasNo ? "0 8px 28px rgba(0,179,166,0.4)" : "none",
              transition: "all 0.2s",
            }}
          >
            {todasNo ? <>Continuar con la solicitud <ChevronRight size={20} /></> : <>Respondé todas las preguntas para continuar</>}
          </button>

          <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
            DocYa es un servicio de atención médica no urgente. Ante una emergencia llamá al 107 o 911.
          </p>
        </main>
      </div>

      {/* MODAL EMERGENCIA */}
      {modalAbierto && preguntaEmerg && (
        <div
          onClick={cerrarModal}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 440, borderRadius: 28, padding: "36px 32px", background: dark ? "linear-gradient(145deg, rgba(239,68,68,0.18) 0%, rgba(11,26,34,0.98) 50%)" : "linear-gradient(145deg, rgba(239,68,68,0.14) 0%, rgba(255,255,255,0.98) 50%)", border: "1.5px solid rgba(239,68,68,0.4)", boxShadow: dark ? "0 0 60px rgba(239,68,68,0.2), 0 32px 80px rgba(0,0,0,0.6)" : "0 0 40px rgba(239,68,68,0.12), 0 24px 70px rgba(15,23,42,0.18)", position: "relative" }}
          >
            {/* Línea superior */}
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 3, background: "linear-gradient(90deg, transparent, #ef4444, transparent)", borderRadius: 999 }} />

            {/* Cerrar */}
            <button
              onClick={cerrarModal}
              style={{ position: "absolute", top: 16, right: 16, background: softPanel, border: "none", borderRadius: 999, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: muted }}
            >
              <X size={16} />
            </button>

            {/* Ícono */}
            <div style={{ width: 64, height: 64, borderRadius: 22, background: "rgba(239,68,68,0.2)", border: "1.5px solid rgba(239,68,68,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(239,68,68,0.3)" }}>
              <AlertTriangle size={32} color="#f87171" />
            </div>

            <h2 style={{
              display: "block",
              width: "fit-content",
              maxWidth: "100%",
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1.15,
              textAlign: "center",
              margin: "0 auto 10px",
              color: "#f87171",
              background: `linear-gradient(90deg, ${titleStart}, #f87171)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              overflowWrap: "anywhere",
              userSelect: "none",
            }}>
              Posible emergencia
            </h2>

            <p style={{ color: muted, fontSize: 14, textAlign: "center", lineHeight: 1.6, marginBottom: 8 }}>
              Respondiste <strong style={{ color: "#f87171" }}>Sí</strong> a:
            </p>
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 14, padding: "12px 16px", marginBottom: 20, textAlign: "center" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fca5a5" }}>&quot;{preguntaEmerg.texto}&quot;</p>
            </div>

            <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, marginBottom: 24, textAlign: "center" }}>
              Esto puede requerir atención inmediata. <strong style={{ color: text }}>DocYa no reemplaza los servicios de emergencia.</strong> Te recomendamos llamar ahora.
            </p>

            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <a
                href="tel:107"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px", borderRadius: 16, background: "#ef4444", color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none", boxShadow: "0 6px 20px rgba(239,68,68,0.45)" }}
              >
                <Phone size={18} /> Llamar al 107
              </a>
              <a
                href="tel:911"
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px", borderRadius: 16, background: "rgba(239,68,68,0.15)", border: "1.5px solid rgba(239,68,68,0.4)", color: "#f87171", fontWeight: 800, fontSize: 16, textDecoration: "none" }}
              >
                <Phone size={18} /> Llamar al 911
              </a>
            </div>

            <button
              onClick={cerrarModal}
              style={{ width: "100%", padding: "13px", borderRadius: 14, background: softPanel, border: `1px solid ${softPanelBorder}`, color: muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              Continuar respondiendo el cuestionario
            </button>
          </div>
        </div>
      )}
    </>
  );
}
