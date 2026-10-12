// Anonymous IDs only. Message contents and reasons for consultation are never sent here.
export function chatConversationId() {
  try { return crypto.randomUUID(); } catch { return ""; }
}

export function chatTelemetry(conversationId: string) {
  if (!conversationId) return undefined;
  try {
    let visitor: string;
    try {
      visitor = localStorage.getItem("docya_ai_visitor") || crypto.randomUUID();
      localStorage.setItem("docya_ai_visitor", visitor);
    } catch {
      visitor = sessionStorage.getItem("docya_ai_visitor") || crypto.randomUUID();
      sessionStorage.setItem("docya_ai_visitor", visitor);
    }
    return { conversation_id: conversationId, visitor_id: visitor, source: "web" as const };
  } catch { return undefined; }
}

export function chatAuthHeaders(): Record<string, string> {
  try {
    const patient = JSON.parse(localStorage.getItem("pedir_user") || "{}");
    return patient.access_token ? { Authorization: `Bearer ${patient.access_token}` } : {};
  } catch { return {}; }
}

export function chatAction(api: string, conversationId: string, event: "teleconsulta" | "domicilio" | "whatsapp") {
  try {
    const telemetry = chatTelemetry(conversationId);
    if (!telemetry) return;
    void fetch(`${api}/chat-ia/eventos`, {
      method: "POST", keepalive: true,
      headers: { "Content-Type": "application/json", ...chatAuthHeaders() },
      body: JSON.stringify({ ...telemetry, event }),
    }).catch(() => undefined);
  } catch { /* Telemetry must not interrupt care requests. */ }
}
