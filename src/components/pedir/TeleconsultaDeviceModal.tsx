"use client";

import { useEffect, useRef } from "react";
import DeviceCheck from "./DeviceCheck";
import { usePedirTheme } from "./theme";

export default function TeleconsultaDeviceModal({ onClose, onContinue, onSuccess }: {
  onClose: () => void;
  onContinue: () => void;
  onSuccess: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const { cardBg, text, border } = usePedirTheme();

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

  return <dialog ref={dialog} aria-labelledby="teleconsulta-check-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    style={{ width: "min(560px, calc(100% - 24px))", maxHeight: "85dvh", margin: "auto", padding: 16, borderRadius: 24, border: `1px solid ${border}`, background: cardBg, color: text, overflowY: "auto" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <h1 id="teleconsulta-check-title" style={{ fontSize: 18, fontWeight: 800 }}>Antes de solicitar tu teleconsulta</h1>
      <button type="button" onClick={onClose} aria-label="Cerrar prueba" style={{ padding: 10, background: "transparent", color: text, border: 0, cursor: "pointer", fontSize: 24 }}>×</button>
    </div>
    <DeviceCheck onSuccess={onSuccess} onContinue={onContinue} continueLabel="Continuar con teleconsulta" />
    <style>{`dialog::backdrop { background: rgba(0, 0, 0, .7); }`}</style>
  </dialog>;
}
