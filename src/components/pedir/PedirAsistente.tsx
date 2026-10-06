"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Bot, X, Send, Sparkles, LoaderCircle, MessageCircle, Video, Stethoscope } from "lucide-react";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };
type Service = "teleconsulta" | "domicilio";

type Props = {
  apiUrl: string;
  locale: "es" | "en";
  dark: boolean;
  muted: string;
  text: string;
  border: string;
  onRequest: (service: Service, motivo: string) => void;
};

const QUICK_QUESTIONS = {
  es: ["¿Cómo funciona DocYa?", "¿Tengo que elegir horario?", "¿Dónde quedan mis documentos?"],
  en: ["How does DocYa work?", "Do I choose an appointment time?", "Where are my documents?"],
};

const WELCOME = {
  es: "¡Hola! Soy DocYa IA. Puedo ayudarte con dudas sobre el servicio, precios, recetas y certificados, o a elegir qué tipo de atención pedir. ¿Qué necesitás saber?",
  en: "Hi! I'm DocYa AI. I can answer questions about our services, prices, prescriptions and certificates, or help you choose what type of care to request. What would you like to know?",
};

export default function PedirAsistente({ apiUrl, locale, dark, muted, text, border, onRequest }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isEnglish = locale === "en";
  const panel = dark ? "#0c222a" : "#ffffff";
  const surface = dark ? "#112d36" : "#f2f8f8";
  const bubble = dark ? "#142f38" : "#eef6f6";
  const teal = "#14b8a6";

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const motivoDesdeChat = () => {
    const supportTopics = /precio|cuesta|tarifa|certificado|receta|orden|documento|qr|firma|horario|turno|cardiolog|especialidad|cómo funciona|como funciona|how does|price|document/i;
    const healthTerms = /dolor|duele|fiebre|tos|mareo|v[oó]mit|n[aá]use|diarrea|sangrad|respir|garganta|cabeza|pecho|espalda|est[oó]mago|abdomen|alergia|herida|malestar|s[ií]ntoma|me siento|me pasa|cough|fever|pain|symptom/i;
    return messages
      .filter(message => message.role === "user" && healthTerms.test(message.content) && !supportTopics.test(message.content))
      .slice(-2)
      .map(message => message.content.trim())
      .join(". ")
      .slice(0, 400);
  };

  const send = async (rawText = input) => {
    const content = rawText.trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/chat-ia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      if (!response.ok) throw new Error("chat request failed");
      const data = await response.json() as { response?: string; emergencia?: boolean };
      const answer = typeof data.response === "string" && data.response.trim()
        ? data.response
        : (isEnglish ? "I couldn't prepare an answer right now. Please try again." : "No pude preparar una respuesta ahora. Intentá de nuevo.");
      setMessages([...next, { role: "assistant", content: answer }]);
      setEmergency(previous => previous || data.emergencia === true);
    } catch {
      setMessages([...next, {
        role: "assistant",
        content: isEnglish
          ? "I couldn't connect right now. Please try again in a moment, or contact our support team on WhatsApp."
          : "No pude conectarme ahora. Intentá de nuevo en un momento o escribinos por WhatsApp.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send();
  };

  const startRequest = (service: Service) => {
    setOpen(false);
    onRequest(service, motivoDesdeChat());
  };

  return (
    <>
      <button
        type="button"
        className="pedir-ai-launcher wa-card"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ color: text, borderColor: "rgba(20,184,166,.3)", background: dark ? "rgba(20,184,166,.10)" : "rgba(20,184,166,.08)" }}
      >
        <span className="pedir-ai-launcher-icon"><Sparkles size={22} /></span>
        <span className="pedir-ai-launcher-copy">
          <strong>{isEnglish ? "Need help? Ask DocYa AI" : "¿Necesitás ayuda? Preguntale a DocYa IA"}</strong>
          <small style={{ color: muted }}>{isEnglish ? "Answers about care, prices and documents" : "Respuestas sobre atención, precios y documentos"}</small>
        </span>
        <span className="pedir-ai-launcher-arrow" aria-hidden="true">›</span>
      </button>

      {open && (
        <div className="pedir-ai-overlay" onMouseDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="pedir-ai-dialog" role="dialog" aria-modal="true" aria-labelledby="pedir-ai-title" style={{ color: text, background: panel, borderColor: border }}>
            <header className="pedir-ai-header" style={{ borderColor: border }}>
              <div className="pedir-ai-mark"><Sparkles size={22} /></div>
              <div className="pedir-ai-heading">
                <h2 id="pedir-ai-title">DocYa IA</h2>
                <p style={{ color: muted }}>{isEnglish ? "Help and guidance for patients" : "Ayuda y orientación para pacientes"}</p>
              </div>
              <button type="button" className="pedir-ai-close" onClick={() => setOpen(false)} aria-label={isEnglish ? "Close chat" : "Cerrar chat"}>
                <X size={20} />
              </button>
            </header>

            <div className="pedir-ai-notice" style={{ color: muted, background: surface }}>
              <Bot size={15} color={teal} />
              <span>{isEnglish ? "General guidance only; it doesn't replace a medical professional or emergency care." : "Orientación general: no reemplaza a un profesional ni a los servicios de emergencia."}</span>
            </div>

            <div className="pedir-ai-messages" ref={listRef} aria-live="polite">
              <div className="pedir-ai-message assistant" style={{ background: bubble }}>{WELCOME[locale]}</div>
              {messages.map((message, index) => (
                <div key={`${index}-${message.role}`} className={`pedir-ai-message ${message.role}`} style={{ background: message.role === "user" ? teal : bubble, color: message.role === "user" ? "#fff" : text }}>
                  {message.content}
                </div>
              ))}
              {loading && <div className="pedir-ai-message assistant pedir-ai-loading" style={{ background: bubble, color: muted }}><span className="pedir-ai-dots" />{isEnglish ? "Thinking…" : "Estoy pensando…"}</div>}
            </div>

            {messages.length === 0 && (
              <div className="pedir-ai-suggestions">
                {QUICK_QUESTIONS[locale].map(question => (
                  <button type="button" key={question} onClick={() => void send(question)} disabled={loading} style={{ color: text, borderColor: border, background: surface }}>{question}</button>
                ))}
              </div>
            )}

            {messages.length > 0 && !emergency && !loading && messages[messages.length - 1]?.role === "assistant" && (
              <div className="pedir-ai-actions">
                <button type="button" onClick={() => startRequest("teleconsulta")}><Video size={17} />{isEnglish ? "Request a teleconsultation" : "Pedir teleconsulta"}</button>
                <button type="button" onClick={() => startRequest("domicilio")}><Stethoscope size={17} />{isEnglish ? "Request a home doctor" : "Pedir médico a domicilio"}</button>
              </div>
            )}

            {emergency && <div className="pedir-ai-emergency" role="alert">{isEnglish ? "If this is an emergency, call 911 or go to the nearest emergency department now." : "Si es una emergencia, llamá al 107 o al 911, o acudí a una guardia ahora."}</div>}

            <form className="pedir-ai-form" onSubmit={submit} style={{ borderColor: border, background: surface }}>
              <input
                ref={inputRef}
                value={input}
                onChange={event => setInput(event.target.value)}
                placeholder={isEnglish ? "Ask about DocYa or tell me what's going on…" : "Preguntá sobre DocYa o contame qué te pasa…"}
                aria-label={isEnglish ? "Your message" : "Tu mensaje"}
                maxLength={1200}
                disabled={loading}
              />
              <button type="submit" disabled={loading || !input.trim()} aria-label={isEnglish ? "Send message" : "Enviar mensaje"}>
                {loading ? <LoaderCircle size={19} className="pedir-ai-spin" /> : <Send size={18} />}
              </button>
            </form>

            <a className="pedir-ai-whatsapp" href="https://wa.me/5491168700607" target="_blank" rel="noreferrer" style={{ color: muted }}>
              <MessageCircle size={15} color="#25d366" />{isEnglish ? "Need a person? Contact us on WhatsApp" : "¿Necesitás hablar con alguien? Escribinos por WhatsApp"}
            </a>
          </section>
        </div>
      )}
    </>
  );
}
