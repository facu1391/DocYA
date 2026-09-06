"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Copy, Gift, MessageCircle, Share2, CheckCircle2, Clock3 } from "lucide-react";
import { getPatientReferrals, getSafeReferrals, type PatientReferralSummary, type SafeReferral } from "@/lib/pedir/patientReferrals";
import { PATIENT_REFERRALS_ENABLED } from "@/lib/pedir/referralFeature";

type User = { access_token?: string };

export default function InvitarAmigosScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<PatientReferralSummary | null>(null);
  const [friends, setFriends] = useState<SafeReferral[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!PATIENT_REFERRALS_ENABLED) { router.replace("/pedir"); return; }
    const raw = localStorage.getItem("pedir_user");
    if (!raw) { router.replace("/pedir"); return; }
    const user = JSON.parse(raw) as User;
    Promise.all([getPatientReferrals(user.access_token), getSafeReferrals(user.access_token)])
      .then(([s, f]) => { setSummary(s); setFriends(f); })
      .catch(e => setError(e instanceof Error ? e.message : "No pudimos cargar tus invitaciones."));
  }, [router]);

  if (error) return <main style={{ padding: 32 }}><button onClick={() => router.back()}>Volver</button><p>{error}</p></main>;
  if (!summary) return <main style={{ minHeight: "100vh", padding: 32, background: "#061a22", color: "white" }}>Cargando tus invitaciones…</main>;
  const remaining = summary.referrals_per_reward - summary.progress_in_cycle;
  const message = `Te invito a usar DocYa. Registrate desde mi enlace y accedé a atención médica: ${summary.link}`;
  const share = async () => {
    if (navigator.share) await navigator.share({ title: "DocYa", text: message, url: summary.link }).catch(() => undefined);
    else await navigator.clipboard.writeText(summary.link);
  };
  return <main style={{ minHeight: "100vh", background: "#061a22", color: "#f8fafc", padding: "24px 18px 70px", fontFamily: "system-ui" }}>
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <button onClick={() => router.back()} style={{ background: "none", border: 0, color: "#94a3b8", display: "flex", gap: 8, cursor: "pointer" }}><ArrowLeft size={19}/> Volver</button>
      <div style={{ textAlign: "center", padding: "30px 0 22px" }}><Gift size={44} color="#a5b4fc"/><h1>Invitá amigos</h1><p style={{ color: "#94a3b8" }}>Ganás una teleconsulta gratis por cada 5 amigos que se registren con tu enlace y completen su primera consulta finalizada y abonada, ya sea a domicilio o por teleconsulta.</p></div>
      <section style={{ background: "linear-gradient(135deg,#172554,#0f766e)", borderRadius: 24, padding: 24 }}>
        <strong style={{ fontSize: 22 }}>{summary.progress_in_cycle} de {summary.referrals_per_reward}</strong>
        <div style={{ height: 10, background: "rgba(255,255,255,.16)", borderRadius: 99, margin: "14px 0" }}><div style={{ width: `${summary.progress_in_cycle / summary.referrals_per_reward * 100}%`, height: "100%", background: "#5eead4", borderRadius: 99 }}/></div>
        <p>{summary.progress_in_cycle === 0 && summary.available_rewards_count > 0 ? "¡Completaste un ciclo! Tu progreso para la próxima empieza nuevamente desde cero." : summary.progress_in_cycle === 0 ? "Compartí tu enlace para empezar" : `Te faltan ${remaining} amigos para tu próxima teleconsulta gratis`}</p>
        <p style={{ fontWeight: 800 }}>🎁 {summary.available_rewards_count} disponible{summary.available_rewards_count === 1 ? "" : "s"}</p>
      </section>
      <section style={{ marginTop: 18, background: "#0b2732", borderRadius: 22, padding: 20 }}><small style={{ color: "#94a3b8" }}>TU CÓDIGO</small><h2 style={{ letterSpacing: 1 }}>{summary.code}</h2><p style={{ color: "#94a3b8", wordBreak: "break-all" }}>{summary.link}</p><div style={{ display: "grid", gap: 10 }}><a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" style={{ padding: 14, borderRadius: 13, textAlign: "center", background: "#25d366", color: "#052e16", textDecoration: "none", fontWeight: 800 }}><MessageCircle size={18} style={{ verticalAlign: "middle", marginRight: 8 }}/>Compartir por WhatsApp</a><button onClick={share} style={{ padding: 13, borderRadius: 13, background: "#334155", border: 0, color: "white", fontWeight: 700 }}><Share2 size={18} style={{ verticalAlign: "middle", marginRight: 8 }}/>Compartir</button><button onClick={() => navigator.clipboard.writeText(summary.link)} style={{ padding: 13, borderRadius: 13, background: "transparent", border: "1px solid #475569", color: "white", fontWeight: 700 }}><Copy size={18} style={{ verticalAlign: "middle", marginRight: 8 }}/>Copiar link</button></div></section>
      <section style={{ marginTop: 18 }}><h2>Amigos invitados</h2>{friends.length === 0 ? <p style={{ color: "#94a3b8" }}>Todavía no hay amigos registrados con tu enlace.</p> : friends.map(f => <div key={f.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 15, marginBottom: 9, background: "#0b2732", borderRadius: 15 }}>{f.status === "qualified" ? <CheckCircle2 color="#2dd4bf"/> : <Clock3 color="#fbbf24"/>}<div><strong>{f.display_name}</strong><div style={{ color: "#94a3b8", fontSize: 13 }}>{f.status === "qualified" ? "Referido válido" : "Pendiente de su primera consulta válida"}</div></div></div>)}</section>
    </div>
  </main>;
}
