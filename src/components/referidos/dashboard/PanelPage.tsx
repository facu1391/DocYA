// src/components/referidos/dashboard/PanelPage.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Copy,
  CheckCheck,
  QrCode,
  Download,
  X,
  Loader2,
} from "lucide-react";
import DashboardShell from "./DashboardShell";
import {
  Referente,
  Stats,
  apiUrl,
  getStoredReferente,
  getStoredToken,
} from "@/lib/referidos";

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "teal",
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: "teal" | "emerald" | "amber" | "blue";
  delay?: number;
}) {
  const c = {
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/[0.07]"
    >
      <div className={`inline-flex p-2.5 rounded-xl border mb-4 ${c[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-black text-white">{value}</p>
      {sub && <p className="text-slate-500 text-xs mt-1">{sub}</p>}
    </motion.div>
  );
}

function QRModal({ link, onClose }: { link: string; onClose: () => void }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&color=0f172a&bgcolor=f0fdfa&data=${encodeURIComponent(
    link
  )}`;

  const download = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = 280;
    canvas.height = 280;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0, 280, 280);

    const a = document.createElement("a");
    a.download = "qr-referido-docya.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-[#08111c] border border-white/[0.08] rounded-3xl p-8 max-w-sm w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-black mb-1">Tu QR de referido</h2>
        <p className="text-slate-400 text-sm mb-6">
          Compartilo en redes o imprimilo.
        </p>

        <div className="flex justify-center mb-6">
          <div
            className="rounded-2xl overflow-hidden p-3 bg-[#f0fdfa] relative"
            style={{ width: 304, height: 304 }}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={qrUrl}
              alt="QR"
              width={280}
              height={280}
              crossOrigin="anonymous"
              onLoad={() => setLoaded(true)}
              className={loaded ? "block" : "invisible"}
              style={{ borderRadius: 8 }}
            />
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 font-mono mb-6 truncate px-2">
          {link}
        </p>

        <button
          onClick={download}
          disabled={!loaded}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
        >
          <Download className="w-4 h-4" />
          Descargar PNG
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function PanelPage() {
  const [referente, setReferente] = useState<Referente | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    const stored = getStoredReferente();

    if (!token || !stored) return;

    setReferente(stored);

    fetch(apiUrl(`/referidos/${stored.id}/stats`), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats(d))
      .finally(() => setLoading(false));
  }, []);

  const copyLink = () => {
    if (!referente) return;
    navigator.clipboard.writeText(referente.link_referido);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="px-5 md:px-8 py-8 md:py-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-black mb-1">
            Hola, {referente?.full_name?.split(" ")[0] ?? "Embajador"}
          </h1>
          <p className="text-slate-400 text-sm">
            Este es el resumen de tu actividad como referente.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-white/[0.03] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              icon={Users}
              label="Total referidos"
              value={`${stats?.total_referidos ?? 0}`}
              color="teal"
              delay={0.05}
            />
            <StatCard
              icon={TrendingUp}
              label="Consultas válidas"
              value={`${stats?.total_consultas_validas ?? 0}`}
              color="emerald"
              delay={0.1}
            />
            <StatCard
              icon={DollarSign}
              label="Total acumulado"
              value={`$${(stats?.monto_total_acumulado ?? 0).toLocaleString(
                "es-AR"
              )}`}
              color="blue"
              delay={0.15}
            />
            <StatCard
              icon={Clock}
              label="Pendiente de cobro"
              value={`$${(stats?.monto_pendiente ?? 0).toLocaleString(
                "es-AR"
              )}`}
              color="amber"
              delay={0.2}
            />
          </div>
        )}

        {referente && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.07] rounded-3xl p-6 md:p-8"
          >
            <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-3">
              Tu link personalizado
            </p>

            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-teal-300 font-mono text-sm break-all">
                {referente.link_referido}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyLink}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-all"
                >
                  {copied ? (
                    <CheckCheck className="w-4 h-4 text-teal-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copiado" : "Copiar"}
                </button>

                <button
                  onClick={() => setShowQR(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  Ver QR
                </button>
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {showQR && referente && (
            <QRModal
              link={referente.link_referido}
              onClose={() => setShowQR(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
}