"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  Loader2,
  LogIn,
  Eye,
  EyeOff,
  ArrowLeft,
  Home,
} from "lucide-react";
import { apiUrl } from "@/lib/referidos";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  "327572770521-tom99oocat1tcp9pahlejsar4iu62lhg.apps.googleusercontent.com";

export default function ReferidosLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [googleStatus, setGoogleStatus] = useState("");
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleRenderedRef = useRef(false);

  useEffect(() => {
    if (!googleLoaded || !googleButtonRef.current || googleRenderedRef.current) {
      return;
    }

    let attempts = 0;
    const maxAttempts = 20;

    const renderGoogleButton = () => {
      const googleId = window.google?.accounts?.id;
      if (!googleId || !googleButtonRef.current) {
        attempts += 1;
        if (attempts < maxAttempts) {
          window.setTimeout(renderGoogleButton, 300);
        } else {
          setGoogleStatus("No pudimos cargar Google en este momento. Probá recargar la página.");
        }
        return;
      }

      setGoogleStatus("");
      googleId.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential?: string }) => {
          if (!response.credential) return;
          setGoogleBusy(true);
          setError("");

          try {
            const res = await fetch(apiUrl("/referidos/google"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: response.credential }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
              setError(
                data.detail ||
                  "No se pudo ingresar con Google. Si todavía no tenés cuenta, registrate primero.",
              );
              return;
            }

            localStorage.setItem("docya_token", data.access_token);
            localStorage.setItem("docya_referente", JSON.stringify(data.referente));
            router.push("/referidos/panel");
          } catch {
            setError("Error de conexión. Intentá de nuevo.");
          } finally {
            setGoogleBusy(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      googleId.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
        width: 360,
        logo_alignment: "left",
      });

      googleRenderedRef.current = true;
    };

    renderGoogleButton();
  }, [googleLoaded, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/referidos/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail ?? "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("docya_token", data.access_token);
      localStorage.setItem("docya_referente", JSON.stringify(data.referente));
      router.push("/referidos/panel");
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#070d14] px-6 text-white">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <Image
            src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
            alt="DocYa"
            width={120}
            height={40}
            className="mx-auto mb-6 h-10 w-auto object-contain"
            unoptimized
          />
          <h1 className="mb-2 text-3xl font-black">Panel de Embajadores</h1>
          <p className="text-slate-400">Ingresá con tu cuenta para ver tus ganancias</p>
        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.03] p-8 backdrop-blur-xl">
          <div className="mb-6 rounded-2xl border border-white/[0.08] bg-black/20 p-5">
            <p className="mb-3 text-sm font-semibold text-slate-300">
              Entrá con Google si ya registraste tu cuenta de embajador con ese mail
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
            {googleStatus && (
              <p className="mt-3 text-center text-xs text-amber-400">
                {googleStatus}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 text-white placeholder-white/20 transition-all focus:outline-none focus:border-teal-500/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-400">Contraseña</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Tu contraseña"
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3 pr-12 text-white placeholder-white/20 transition-all focus:outline-none focus:border-teal-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-teal-600 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              {loading ? "Ingresando..." : "Entrar al panel"}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-slate-600">
              ¿No tenés cuenta?{" "}
              <a
                href="/referidos#registro"
                className="text-teal-500/70 underline underline-offset-2 transition-colors hover:text-teal-400"
              >
                Registrate como embajador
              </a>
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <Link
                href="/referidos"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a referidos
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
              >
                <Home className="h-4 w-4" />
                Página principal
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
