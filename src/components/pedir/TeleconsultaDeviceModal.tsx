"use client";

import { useEffect, useRef, useState } from "react";
import DeviceCheck from "./DeviceCheck";

export default function TeleconsultaDeviceModal({ onClose, onContinue, onSuccess }: {
  onClose: () => void;
  onContinue: () => void;
  onSuccess: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return <dialog ref={dialog} className="teleconsulta-device-modal" aria-labelledby="teleconsulta-check-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    style={{ width: "min(560px, calc(100% - 24px))", maxHeight: "85dvh", margin: "auto", padding: 24, borderRadius: 24, border: "1px solid #cbd5e1", background: "#ffffff", color: "#102a43", overflowY: "auto", boxShadow: "0 24px 80px #00000066", colorScheme: "light" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <h1 id="teleconsulta-check-title" tabIndex={-1} autoFocus style={{ fontSize: 24, lineHeight: 1.25, fontWeight: 800 }}>{ready ? "Todo funciona" : "Antes de comenzar"}</h1>
      <button type="button" onClick={onClose} aria-label="Cerrar prueba" style={{ padding: 10, minWidth: 48, minHeight: 48, flexShrink: 0, background: "#edf2f7", color: "#102a43", border: "1px solid #cbd5e1", borderRadius: 12, cursor: "pointer", fontSize: 26 }}>×</button>
    </div>
    <DeviceCheck modal onReadyChange={setReady} onSuccess={onSuccess} onContinue={onContinue} continueLabel="Continuar con teleconsulta" />
    <style>{`
      .teleconsulta-device-modal::backdrop { background: rgba(0, 0, 0, .82); }
      .teleconsulta-device-modal > section { background: #fff !important; color: #102a43 !important; border: 0 !important; padding: 0 !important; margin: 14px 0 0 !important; }
      .teleconsulta-device-modal .device-check-intro, .teleconsulta-device-modal .device-check-status { color: #334155 !important; font-size: 17px !important; line-height: 1.55 !important; margin: 8px 0 0 !important; }
      .teleconsulta-device-modal .device-check-success { display: flex; align-items: center; gap: 8px; color: #047857; font-size: 18px; margin: 6px 0 10px; }
      .teleconsulta-device-modal video { height: 190px; max-height: 190px !important; margin-top: 12px; }
      .teleconsulta-device-modal .device-check-actions { display: grid !important; gap: 10px !important; margin-top: 16px !important; }
      .teleconsulta-device-modal section button { width: 100%; min-height: 54px; justify-content: center; font-size: 18px; font-weight: 700; line-height: 1.4; }
      .teleconsulta-device-modal .device-check-test, .teleconsulta-device-modal .device-check-continue { background: #4338ca !important; color: #fff !important; border: 0 !important; }
      .teleconsulta-device-modal .device-check-continue:not(:first-child) { background: #fff !important; color: #334155 !important; border: 2px solid #64748b !important; }
      .teleconsulta-device-modal .device-check-retry { background: transparent !important; color: #475569 !important; border: 0 !important; min-height: 44px !important; font-size: 16px !important; text-decoration: underline; }
      .teleconsulta-device-modal :focus-visible { outline-color: #4338ca; }
      .teleconsulta-device-modal h1:focus { outline: none; }
      @media (max-width: 560px) {
        .teleconsulta-device-modal { width: min(100% - 20px, 560px) !important; max-height: 92dvh !important; padding: 18px !important; }
        .teleconsulta-device-modal h1 { font-size: 22px !important; }
        .teleconsulta-device-modal .device-check-intro, .teleconsulta-device-modal .device-check-status { font-size: 16px !important; }
        .teleconsulta-device-modal video { height: 160px; max-height: 160px !important; margin-top: 8px; }
        .teleconsulta-device-modal .device-check-actions { margin-top: 12px !important; }
      }
    `}</style>
  </dialog>;
}
