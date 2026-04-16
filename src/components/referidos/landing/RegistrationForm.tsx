"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CheckCircle, Loader2, Lock } from "lucide-react";
import Reveal from "@/components/referidos/common/Reveal";
import { apiUrl } from "@/lib/referidos";

type Status = "idle" | "loading" | "success";

type GoogleProfile = {
  credential: string;
  name: string;
  email: string;
};

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";

type GoogleIdConfiguration = {
  client_id: string;
  callback: (response: { credential?: string }) => void | Promise<void>;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
};

function parseGoogleCredential(credential: string): GoogleProfile {
  const [, payloadPart] = credential.split(".");
  const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(normalized)
      .split("")
      .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
      .join(""),
  );
  const payload = JSON.parse(json) as { name?: string; email?: string };
  return {
    credential,
    name: payload.name || "",
    email: payload.email || "",
  };
}

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleProfile, setGoogleProfile] = useState<GoogleProfile | null>(null);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleRenderedRef = useRef(false);

  useEffect(() => {
    if (!googleLoaded || !googleButtonRef.current || googleRenderedRef.current || !window.google?.accounts?.id) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: { credential?: string }) => {
        if (!response.credential) return;
        setGoogleBusy(true);
        setError("");

        try {
          const loginRes = await fetch(apiUrl("/referidos/google"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_token: response.credential }),
          });

          const loginData = await loginRes.json().catch(() => ({}));

          if (loginRes.ok) {
            localStorage.setItem("docya_token", loginData.access_token);
            localStorage.setItem("docya_referente", JSON.stringify(loginData.referente));
            window.location.href = "/referidos/panel";
            return;
          }

          if (loginRes.status !== 404) {
            throw new Error(loginData.detail || "No se pudo validar la cuenta Google.");
          }

          setGoogleProfile(parseGoogleCredential(response.credential));
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se pudo iniciar con Google.");
        } finally {
          setGoogleBusy(false);
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    } as GoogleIdConfiguration);

    window.google.accounts.id.renderButton(googleButtonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "signup_with",
      width: 360,
      logo_alignment: "left",
    });

    googleRenderedRef.current = true;
  }, [googleLoaded]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const baseData = {
      full_name: formData.get("full_name"),
      dni: formData.get("dni"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      password: formData.get("password"),
      cbu_alias: formData.get("cbu_alias"),
      tipo: formData.get("tipo"),
      acepto_condiciones: true,
    };

    try {
      setStatus("loading");
      setError("");

      const endpoint = googleProfile ? apiUrl("/referidos/google/register") : apiUrl("/referidos/register");
      const payload = googleProfile
        ? {
            id_token: googleProfile.credential,
            dni: formData.get("dni"),
            telefono: formData.get("telefono"),
            cbu_alias: formData.get("cbu_alias"),
            tipo: formData.get("tipo"),
            acepto_condiciones: true,
          }
        : baseData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(responseData.detail || "Error en registro");
      }

      setStatus("success");

      if (googleProfile) {
        localStorage.setItem("docya_token", responseData.access_token);
        localStorage.setItem("docya_referente", JSON.stringify(responseData.referente));
        setTimeout(() => {
          window.location.href = "/referidos/panel";
        }, 1200);
        return;
      }

      setTimeout(() => {
        setStatus("idle");
        form.reset();
      }, 4000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "No se pudo completar el registro");
      setStatus("idle");
    }
  };

  const isGoogleMode = !!googleProfile;

  return (
    <section id="registro" className="relative px-6 py-28">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <Reveal className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-black md:text-5xl">Empezá hoy mismo</h2>
          <p className="text-lg text-slate-400">
            {isGoogleMode
              ? "Completá los datos finales para activar tu cuenta de embajador con Google."
              : "Completá tus datos para obtener tu link de referidos"}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl md:p-12">
            {!isGoogleMode && (
              <div className="mb-6 rounded-2xl border border-white/[0.08] bg-black/20 p-5">
                <p className="mb-3 text-sm font-semibold text-slate-300">
                  Registrate con Google y completá el resto de tus datos en segundos
                </p>
                <div className="flex min-h-12 items-center justify-center">
                  {googleBusy ? (
                    <div className="inline-flex items-center gap-2 text-sm text-slate-400">
                      Validando tu cuenta
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <div ref={googleButtonRef} />
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-400">
                  Nombre completo
                </label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  defaultValue={googleProfile?.name || ""}
                  disabled={isGoogleMode}
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60 disabled:opacity-70"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-400">DNI</label>
                  <input
                    name="dni"
                    type="number"
                    placeholder="Sin puntos ni espacios"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-400">
                    Teléfono (WhatsApp)
                  </label>
                  <input
                    name="telefono"
                    type="tel"
                    placeholder="Ej: 1123456789"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-400">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  defaultValue={googleProfile?.email || ""}
                  disabled={isGoogleMode}
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60 disabled:opacity-70"
                />
              </div>

              {!isGoogleMode && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-400">
                    Contraseña
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-400">
                  Alias o CBU (Para recibir tus pagos)
                </label>
                <input
                  name="cbu_alias"
                  type="text"
                  placeholder="Ej: docya.pagos.ok"
                  required
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-400">
                  Tipo de perfil
                </label>
                <select
                  name="tipo"
                  required
                  defaultValue="embajador"
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white transition-all focus:bg-black/50 focus:outline-none focus:border-teal-500/60"
                >
                  <option value="embajador">Embajador</option>
                  <option value="influencer">Influencer</option>
                  <option value="partner">Partner</option>
                  <option value="paciente">Paciente Feliz</option>
                </select>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  {isGoogleMode
                    ? "Cuenta creada con Google. Te estamos llevando al panel."
                    : "Registro completado con éxito. Ya podés iniciar sesión."}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-500 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-teal-600 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {isGoogleMode ? "Creando cuenta..." : "Registrando..."}
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    {isGoogleMode ? "Completar registro con Google" : "Crear mi cuenta"}
                  </>
                )}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
