"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import PedirAsistente from "@/components/pedir/PedirAsistente";
import PublicAISection from "./PublicAISection";
import { chatConversationId, chatTelemetry } from "@/lib/chat-analytics";
import "@/app/pedir/pedir.css";
import "./public-ai.css";

const API = (process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_URL || "https://docya-railway-production.up.railway.app").replace(/\/$/, "");

export default function PublicAIChat() {
  const router = useRouter();
  const conversation = useRef("");
  return <PedirAsistente apiUrl="" locale="es" dark text="#f2f8fa" muted="#9fb6c3" border="#ffffff18"
    onRequest={service => router.push(service === "teleconsulta" ? "/pedir?tipo=teleconsulta" : "/pedir")}
    publicChat={{
      launcher: open => <PublicAISection onOpen={open} />,
      send: async messages => {
        const response = await fetch(`${API}/chat-ia/public/message`, {
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "omit",
          body: JSON.stringify({ messages, telemetry: chatTelemetry(conversation.current ||= chatConversationId()) }),
          signal: AbortSignal.timeout(45000),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : "No pudimos responder. Intentá nuevamente o contactanos por WhatsApp.");
        return data;
      },
    }} />;
}
