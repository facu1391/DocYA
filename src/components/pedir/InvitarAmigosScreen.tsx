"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Copy, Gift, Link2, MessageCircle, Share2, CheckCircle2, Clock3, Users } from "lucide-react";
import { getPatientReferrals, getSafeReferrals, type PatientReferralSummary, type SafeReferral } from "@/lib/pedir/patientReferrals";
import { PATIENT_REFERRALS_ENABLED } from "@/lib/pedir/referralFeature";

type User = { access_token?: string };

export default function InvitarAmigosScreen() {
  const router = useRouter();
  const [summary, setSummary] = useState<PatientReferralSummary | null>(null);
  const [friends, setFriends] = useState<SafeReferral[]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
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
  const copyLink = async () => {
    await navigator.clipboard.writeText(summary.link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  const share = async () => {
    if (navigator.share) await navigator.share({ title: "DocYa", text: message, url: summary.link }).catch(() => undefined);
    else await copyLink();
  };
  const progress = Math.min(100, (summary.progress_in_cycle / summary.referrals_per_reward) * 100);
  const progressMessage = summary.progress_in_cycle === 0 && summary.available_rewards_count > 0
    ? "¡Completaste un ciclo! Ya empezaste a sumar para el próximo beneficio."
    : summary.progress_in_cycle === 0
      ? "Compartí tu enlace para empezar a sumar."
      : `Te faltan ${remaining} amigos para tu próxima teleconsulta gratis.`;

  return <main className="min-h-screen bg-[#061a22] px-4 pb-20 pt-5 text-slate-50 sm:px-6 sm:pt-8">
    <div className="mx-auto max-w-3xl">
      <button onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"><ArrowLeft size={18}/> Volver</button>

      <header className="mx-auto max-w-2xl pb-8 pt-7 text-center sm:pt-10">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-teal-300/20 bg-gradient-to-br from-teal-400/20 to-indigo-400/20 shadow-[0_16px_50px_rgba(45,212,191,.12)]"><Gift size={32} className="text-teal-300"/></div>
        <p className="mb-2 text-xs font-black uppercase tracking-[.2em] text-teal-300">Programa de beneficios</p>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Invitá amigos, ganá salud</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">Ganás una teleconsulta gratis por cada 5 amigos que se registren con tu enlace y completen su primera consulta finalizada y abonada, a domicilio o por teleconsulta.</p>
      </header>

      <section className="overflow-hidden rounded-3xl border border-teal-300/15 bg-gradient-to-br from-[#172554] via-[#12435a] to-[#0f766e] p-5 shadow-2xl shadow-black/20 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-wider text-teal-100/70">Tu progreso</p><p className="mt-1 text-3xl font-black">{summary.progress_in_cycle} <span className="text-xl text-white/60">de {summary.referrals_per_reward}</span></p></div>
          <div className="rounded-2xl border border-white/15 bg-black/15 px-4 py-3 text-right"><p className="text-2xl font-black text-teal-200">{summary.available_rewards_count}</p><p className="text-xs text-white/70">beneficio{summary.available_rewards_count === 1 ? "" : "s"} disponible{summary.available_rewards_count === 1 ? "" : "s"}</p></div>
        </div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-black/20"><div className="h-full rounded-full bg-gradient-to-r from-teal-300 to-cyan-300 transition-all duration-500" style={{ width: `${progress}%` }}/></div>
        <p className="mt-4 text-sm font-medium text-teal-50">{progressMessage}</p>
      </section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-[#0b2732] p-5 sm:p-7">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-teal-400/10 text-teal-300"><Link2 size={20}/></div><div><h2 className="font-bold">Tu enlace personal</h2><p className="text-xs text-slate-400">Cada amigo que se registre desde acá queda asociado a tu cuenta.</p></div></div>
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#061a22] p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Código</p>
          <p className="mt-1 break-all font-mono text-sm font-bold text-teal-200 sm:text-base">{summary.code}</p>
          <div className="my-3 h-px bg-white/10"/>
          <p className="break-all text-xs leading-5 text-slate-400">{summary.link}</p>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href={`https://wa.me/?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-black text-[#052e16] transition hover:brightness-110 sm:col-span-2"><MessageCircle size={18}/>Compartir por WhatsApp</a>
          <button onClick={share} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-700 px-4 text-sm font-bold transition hover:bg-slate-600"><Share2 size={18}/>Compartir</button>
          <button onClick={copyLink} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 text-sm font-bold transition hover:border-teal-300/50 hover:bg-teal-300/5">{copied ? <Check size={18} className="text-teal-300"/> : <Copy size={18}/>} {copied ? "Link copiado" : "Copiar link"}</button>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-black">Amigos invitados</h2><p className="mt-1 text-xs text-slate-400">Vas a ver cuándo cada persona complete su primera consulta.</p></div><div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-400"><Users size={20}/></div></div>
        {friends.length === 0 ? <div className="rounded-3xl border border-dashed border-white/15 bg-white/[.025] px-6 py-10 text-center"><Users size={30} className="mx-auto text-slate-600"/><p className="mt-3 font-semibold text-slate-300">Todavía no hay amigos registrados</p><p className="mt-1 text-sm text-slate-500">Compartí tu enlace para empezar a completar el progreso.</p></div> : <div className="space-y-3">{friends.map(f => <div key={f.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b2732] p-4">{f.status === "qualified" ? <CheckCircle2 className="shrink-0 text-teal-300"/> : <Clock3 className="shrink-0 text-amber-300"/>}<div><strong>{f.display_name}</strong><div className="mt-0.5 text-xs text-slate-400">{f.status === "qualified" ? "Consulta completada · referido válido" : "Registrado · pendiente de su primera consulta"}</div></div></div>)}</div>}
      </section>
    </div>
  </main>;
}
