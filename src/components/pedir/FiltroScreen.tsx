"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Wind, Heart, Brain, Droplets,
  Thermometer, Baby, Bandage, AlertTriangle,
  Phone, CheckCircle2, ChevronRight,
} from "lucide-react";

const PREGUNTAS = [
  { id: 0, texto: "¿Tenés dificultad grave para respirar?",               icon: Wind,        color: "#38D7D2" },
  { id: 1, texto: "¿Tenés dolor intenso en el pecho?",                    icon: Heart,       color: "#FF4F70" },
  { id: 2, texto: "¿Tenés pérdida de conocimiento o convulsiones?",       icon: Brain,       color: "#A78BFA" },
  { id: 3, texto: "¿Tenés sangrado abundante o que no se detiene?",       icon: Droplets,    color: "#FF344E" },
  { id: 4, texto: "¿Tenés fiebre muy alta (+39.5 °C) con mal estado?",   icon: Thermometer, color: "#FF9B45" },
  { id: 5, texto: "¿Es un menor de 12 años con fiebre persistente?",      icon: Baby,        color: "#2DD4BF" },
  { id: 6, texto: "¿Tuviste un accidente grave, fractura o quemadura?",   icon: Bandage,     color: "#FFB84D" },
];

type Resp = Record<number, boolean>;

export default function FiltroScreen() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = params.get("tipo") ?? "medico";

  const [respuestas, setRespuestas] = useState<Resp>({});
  const [urgenciaIdx, setUrgenciaIdx] = useState<number | null>(null);

  const dark = true;
  const bg      = "#071b22";
  const surface = "rgba(255,255,255,0.05)";
  const border  = "rgba(255,255,255,0.10)";
  const text    = "#e2f0f0";
  const muted   = "rgba(255,255,255,0.55)";

  const responder = (idx: number, valor: boolean) => {
    setRespuestas(prev => ({ ...prev, [idx]: valor }));
    if (valor) setUrgenciaIdx(idx);
  };

  const todasNo = PREGUNTAS.every(p => respuestas[p.id] === false);
  const respondidas = Object.keys(respuestas).length;

  return (
    <div style={{ minHeight: "100vh", background: bg, color: text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* HEADER */}
      <header style={{ borderBottom: `1px solid ${border}`, background: "rgba(7,27,34,0.92)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50, padding: "0 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/pedir" style={{ color: muted, display: "flex", alignItems: "center" }}>
            <ArrowLeft size={22} />
          </Link>
          <Image src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png" alt="DocYa" width={80} height={26} style={{ height: 26, width: "auto" }} />
          <div style={{ marginLeft: "auto", fontSize: 13, color: muted }}>
            {respondidas}/{PREGUNTAS.length} preguntas
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* INTRO */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 999, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#fbbf24", marginBottom: 16 }}>
            <AlertTriangle size={14} />
            Evaluación de seguridad
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, marginBottom: 10 }}>
            Antes de continuar, respondé estas preguntas
          </h1>
          <p style={{ color: muted, fontSize: 15, lineHeight: 1.6 }}>
            Si alguno de estos síntomas aplica, puede tratarse de una <strong style={{ color: text }}>emergencia</strong> que requiere atención inmediata. DocYa no reemplaza al 107 ni al 911.
          </p>
        </div>

        {/* PREGUNTAS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {PREGUNTAS.map((p) => {
            const Icon = p.icon;
            const resp = respuestas[p.id];
            const sinResp = resp === undefined;
            return (
              <div
                key={p.id}
                style={{
                  background: resp === true ? "rgba(239,68,68,0.08)" : resp === false ? "rgba(0,179,166,0.06)" : surface,
                  border: `1.5px solid ${resp === true ? "rgba(239,68,68,0.35)" : resp === false ? "rgba(0,179,166,0.25)" : border}`,
                  borderRadius: 18,
                  padding: "18px 18px",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Icon size={20} color={p.color} />
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4, flex: 1, paddingTop: 4 }}>
                    {p.texto}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    onClick={() => responder(p.id, true)}
                    style={{
                      flex: 1, padding: "10px 0", borderRadius: 12, border: `1.5px solid ${resp === true ? "#ef4444" : border}`,
                      background: resp === true ? "rgba(239,68,68,0.18)" : "transparent",
                      color: resp === true ? "#f87171" : muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => responder(p.id, false)}
                    style={{
                      flex: 1, padding: "10px 0", borderRadius: 12, border: `1.5px solid ${resp === false ? "#00b3a6" : border}`,
                      background: resp === false ? "rgba(0,179,166,0.15)" : "transparent",
                      color: resp === false ? "#2dd4bf" : muted, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ALERTA URGENCIA */}
        {urgenciaIdx !== null && (
          <div style={{ background: "rgba(239,68,68,0.10)", border: "1.5px solid rgba(239,68,68,0.35)", borderRadius: 20, padding: "24px 22px", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(239,68,68,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={22} color="#f87171" />
              </div>
              <div>
                <p style={{ fontWeight: 800, fontSize: 16, color: "#f87171", margin: 0 }}>Posible emergencia detectada</p>
                <p style={{ fontSize: 13, color: muted, margin: 0 }}>Este síntoma requiere atención inmediata</p>
              </div>
            </div>
            <p style={{ color: muted, fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>
              Lo que describiste puede ser una urgencia. DocYa atiende consultas no urgentes. Te recomendamos llamar al <strong style={{ color: "#f87171" }}>107</strong> (emergencias médicas) o al <strong style={{ color: "#f87171" }}>911</strong>, o ir al hospital más cercano.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="tel:107"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "#ef4444", color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
              >
                <Phone size={16} /> Llamar al 107
              </a>
              <a
                href="tel:911"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.4)", color: "#f87171", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
              >
                <Phone size={16} /> Llamar al 911
              </a>
            </div>
          </div>
        )}

        {/* CONTINUAR */}
        {todasNo && (
          <div style={{ background: "rgba(0,179,166,0.08)", border: "1.5px solid rgba(0,179,166,0.25)", borderRadius: 20, padding: "20px 22px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CheckCircle2 size={22} color="#2dd4bf" />
              <p style={{ fontWeight: 700, color: "#2dd4bf", fontSize: 15, margin: 0 }}>
                Todo en orden — podés continuar con tu consulta
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => todasNo && router.push(`/pedir/solicitar?tipo=${tipo}`)}
          disabled={!todasNo}
          style={{
            width: "100%", padding: "17px 20px", borderRadius: 18, border: "none",
            background: todasNo ? "linear-gradient(90deg, #00b3a6, #2dd4bf)" : "rgba(255,255,255,0.08)",
            color: todasNo ? "#fff" : muted, fontSize: 16, fontWeight: 700,
            cursor: todasNo ? "pointer" : "not-allowed", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10, fontFamily: "inherit",
            boxShadow: todasNo ? "0 8px 24px rgba(0,179,166,0.35)" : "none",
            transition: "all 0.2s",
          }}
        >
          {todasNo ? (
            <>Continuar con la solicitud <ChevronRight size={20} /></>
          ) : (
            <>Respondé todas las preguntas para continuar</>
          )}
        </button>

        <p style={{ fontSize: 12, color: muted, textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>
          DocYa es un servicio de atención médica no urgente. Ante una emergencia llamá al 107 o 911.
        </p>

      </main>
    </div>
  );
}
