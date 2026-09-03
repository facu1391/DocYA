"use client";

import { Gift, ChevronRight } from "lucide-react";
import type { PatientReferralSummary } from "@/lib/pedir/patientReferrals";

export default function ReferralProgressCard({ summary, onOpen, compact = false }: {
  summary: PatientReferralSummary;
  onOpen: () => void;
  compact?: boolean;
}) {
  const available = summary.available_rewards_count;
  const remaining = summary.referrals_per_reward - summary.progress_in_cycle;
  return (
    <button onClick={onOpen} style={{ width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid rgba(129,140,248,.3)", borderRadius: 20, padding: compact ? "16px 18px" : "20px 22px", color: "inherit", background: "linear-gradient(135deg,rgba(129,140,248,.16),rgba(45,212,191,.10))", display: "flex", gap: 14, alignItems: "center", fontFamily: "inherit" }}>
      <span style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 14, display: "grid", placeItems: "center", background: "rgba(129,140,248,.2)" }}><Gift size={23} color="#a5b4fc" /></span>
      <span style={{ flex: 1 }}>
        <strong style={{ display: "block", fontSize: 16 }}>{available > 0 ? `Tenés ${available} teleconsulta${available === 1 ? "" : "s"} gratis` : "Invitá amigos"}</strong>
        <span style={{ display: "block", marginTop: 4, opacity: .75, fontSize: 13 }}>{available > 0 ? "Usala cuando solicites una teleconsulta" : `${summary.progress_in_cycle} de ${summary.referrals_per_reward} · Te faltan ${remaining} para ganar una teleconsulta`}</span>
      </span>
      <ChevronRight size={20} opacity={.65} />
    </button>
  );
}
