"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PATIENT_LOGIN_RETURN_KEY, PATIENT_SESSION_INVALID, PATIENT_SESSION_MESSAGE, patientTokenExpired, paymentLoginReturnPath } from "@/lib/pedir/session";

export default function PatientSessionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [invalid, setInvalid] = useState(false);
  const loginButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const showLogin = () => setInvalid(true);
    const checkSession = () => {
      try {
        const raw = localStorage.getItem("pedir_user");
        if (!raw) return;
        const user = JSON.parse(raw);
        if (!user.access_token || patientTokenExpired(user.access_token)) showLogin();
      } catch { /* El flujo de ingreso maneja datos locales ilegibles. */ }
    };
    window.addEventListener(PATIENT_SESSION_INVALID, showLogin);
    window.addEventListener("focus", checkSession);
    checkSession();
    return () => {
      window.removeEventListener(PATIENT_SESSION_INVALID, showLogin);
      window.removeEventListener("focus", checkSession);
    };
  }, [pathname]);

  useEffect(() => {
    if (invalid) loginButton.current?.focus();
  }, [invalid]);

  const login = () => {
    // Conservamos la consulta y los pagos pendientes para su recuperación.
    try {
      const user = JSON.parse(localStorage.getItem("pedir_user") || "null");
      const path = window.location.pathname + window.location.search;
      if (user?.id && paymentLoginReturnPath(path)) {
        sessionStorage.setItem(PATIENT_LOGIN_RETURN_KEY, JSON.stringify({ ownerId: String(user.id), path }));
      }
    } catch { /* Volver a ingresar sigue disponible sin recuperación local. */ }
    localStorage.removeItem("pedir_user");
    sessionStorage.removeItem("pedir_user");
    window.location.assign("/pedir");
  };

  return <>
    <div inert={invalid}>{children}</div>
    {invalid && <div role="alertdialog" aria-modal="true" aria-labelledby="patient-session-title" aria-describedby="patient-session-description" style={{ position: "fixed", inset: 0, zIndex: 20000, display: "grid", placeItems: "center", padding: 20, background: "rgba(2,12,20,.82)", backdropFilter: "blur(8px)" }}>
      <div style={{ width: "100%", maxWidth: 420, borderRadius: 24, padding: 28, background: "#102730", color: "#fff", boxShadow: "0 24px 80px rgba(0,0,0,.4)" }}>
        <h2 id="patient-session-title" style={{ margin: 0, fontSize: 23 }}>Volvé a iniciar sesión</h2>
        <p id="patient-session-description" style={{ lineHeight: 1.6, color: "#c4d8dc" }}>{PATIENT_SESSION_MESSAGE}</p>
        <p style={{ lineHeight: 1.5, color: "#c4d8dc", fontSize: 14 }}>Si ya hiciste la transferencia, no la repitas. Iniciá sesión para continuar con tu solicitud.</p>
        <button ref={loginButton} type="button" onClick={login} style={{ width: "100%", minHeight: 50, marginTop: 10, border: 0, borderRadius: 14, background: "#00b3a6", color: "#fff", fontSize: 16, fontWeight: 750, cursor: "pointer" }}>Iniciar sesión</button>
      </div>
    </div>}
  </>;
}
