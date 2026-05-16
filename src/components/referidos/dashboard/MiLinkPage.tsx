// src/components/referidos/dashboard/MiLinkPage.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  CheckCheck,
  QrCode,
  X,
  Download,
  Loader2,
  Share2,
} from "lucide-react";
import DashboardShell from "./DashboardShell";
import { Referente, getStoredReferente } from "@/lib/referidos";

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
    a.download = "qr-partner-docya.png";
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

        <h2 className="text-xl font-black mb-1">Tu QR partner</h2>
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

const SOCIAL_ASSETS = [
  {
    id: "flyer1",
    label: "Flyer para redes",
    hint: "Ideal para stories de Instagram y WhatsApp",
    url: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774746718/Dise%C3%B1o_sin_t%C3%ADtulo_27_ccfdfm.png",
    filename: "docya-flyer-partner.png",
  },
  {
    id: "flyer2",
    label: "¡Pedí un médico!",
    hint: "Flyer comparativo ideal para Facebook y WhatsApp",
    url: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774749421/Ped%C3%ADs_sushi._Ped%C3%ADs_supermercado._Ped%C3%ADs_taxi._tqdsxq.jpg",
    filename: "docya-pedis-medico.jpg",
  },
  {
    id: "flyer3",
    label: "¿Necesitás certificado médico YA?",
    hint: "Ideal para stories y estados de WhatsApp",
    url: "https://res.cloudinary.com/dqsacd9ez/image/upload/v1774749989/Necesitas_certificado_m%C3%A9dico_YA_exl8bk.png",
    filename: "docya-certificado-medico.png",
  },
];

async function downloadAsset(url: string, filename: string) {
  const res = await fetch(url);
  const blob = await res.blob();
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(href);
}

export default function MiLinkPage() {
  const [referente, setReferente] = useState<Referente | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const s = getStoredReferente();
    if (s) setReferente(s);
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const copyLink = () => {
    if (!referente) return;
    navigator.clipboard.writeText(referente.link_referido);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const share = async () => {
    if (!referente || !navigator.share) return;

    await navigator.share({
      title: "DocYa — Médicos a domicilio",
      text: `Usá mi código ${referente.codigo_referido} en DocYa y pedí un médico a casa cuando lo necesites.`,
      url: referente.link_referido,
    });
  };

  const handleAssetDownload = async (
    id: string,
    url: string,
    filename: string
  ) => {
    try {
      setDownloading(id);
      await downloadAsset(url, filename);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <DashboardShell>
      <div className="px-5 md:px-8 py-8 md:py-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-black mb-1">Link Partner</h1>
          <p className="text-slate-400 text-sm">
            Herramientas para compartir y difundir tu código partner
          </p>
        </motion.div>

        {!referente ? null : (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/[0.07]"
            >
              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-3">
                Tu link partner
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
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
                    QR
                  </button>
                </div>
              </div>

              {canShare && (
                <button
                  onClick={share}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Compartir
                </button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/[0.07]"
            >
              <h2 className="text-lg font-bold text-white mb-1">
                Material para difundir
              </h2>
              <p className="text-slate-400 text-sm mb-5">
                Descargá piezas listas para publicar o enviar por WhatsApp.
              </p>

              <div className="space-y-3">
                {SOCIAL_ASSETS.map((asset, i) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.04 }}
                    className="rounded-2xl border border-white/[0.06] bg-black/20 p-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-white font-semibold">{asset.label}</p>
                      <p className="text-slate-500 text-sm">{asset.hint}</p>
                    </div>

                    <button
                      onClick={() =>
                        handleAssetDownload(
                          asset.id,
                          asset.url,
                          asset.filename
                        )
                      }
                      disabled={downloading === asset.id}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all disabled:opacity-60"
                    >
                      {downloading === asset.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Descargar
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
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
