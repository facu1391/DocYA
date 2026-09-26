"use client";

import { UserRound, UsersRound } from "lucide-react";
import { usePedirTheme } from "./theme";

export default function RecipientChoice({ other, onChange, pediatrics = false }: { other: boolean; onChange: (other: boolean) => void; pediatrics?: boolean }) {
  const { text, inputBg, brandBorder } = usePedirTheme();
  return <section style={{ padding: 20, marginBottom: 20, background: inputBg, border: `1px solid ${brandBorder}`, borderRadius: 20 }}>
    <h2 style={{ margin: "0 0 14px", fontSize: 20, color: text }}>¿Quién necesita atención?</h2>
    <div style={{ display: "flex", gap: 12 }}>
      {[{ label: "Yo", value: false, Icon: UserRound }, { label: "Otra persona", value: true, Icon: UsersRound }].map(({label, value, Icon}) => <button key={label} type="button" aria-pressed={other === value} disabled={pediatrics && !value} onClick={() => onChange(value)} style={{ flex: 1, minHeight: 56, padding: 12, borderRadius: 14, border: `2px solid ${other === value ? "#00b3a6" : brandBorder}`, background: other === value ? "rgba(0,179,166,.12)" : "transparent", color: text, fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", opacity: pediatrics && !value ? .45 : 1 }}><Icon size={20} />{label}</button>)}
    </div>
  </section>;
}
