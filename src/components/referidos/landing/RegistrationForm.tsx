// src/components/referidos/landing/RegistrationForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { Lock, CheckCircle, Loader2 } from "lucide-react";
import Reveal from "@/components/referidos/common/Reveal";
import { apiUrl } from "@/lib/referidos";

type Status = "idle" | "loading" | "success";

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
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

      const res = await fetch(apiUrl("/referidos/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData: { detail?: string } = await res.json();
        throw new Error(errData.detail || "Error en registro");
      }

      setStatus("success");

      setTimeout(() => {
        setStatus("idle");
        form.reset();
      }, 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("No se pudo completar el registro");
      }
      setStatus("idle");
    }
  };

  return (
    <section id="registro" className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-3">
            Empezá hoy mismo
          </h2>
          <p className="text-slate-400 text-lg">
            Completá tus datos para obtener tu link de referidos
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/[0.07]">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Nombre completo
                </label>
                <input
                  name="full_name"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    DNI
                  </label>
                  <input
                    name="dni"
                    type="number"
                    placeholder="Sin puntos ni espacios"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">
                    Teléfono (WhatsApp)
                  </label>
                  <input
                    name="telefono"
                    type="tel"
                    placeholder="Ej: 1123456789"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Alias o CBU (Para recibir tus pagos)
                </label>
                <input
                  name="cbu_alias"
                  type="text"
                  placeholder="Ej: docya.pagos.ok"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white placeholder-white/20 focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">
                  Tipo de perfil
                </label>
                <select
                  name="tipo"
                  required
                  defaultValue="embajador"
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/[0.08] text-white focus:outline-none focus:border-teal-500/60 focus:bg-black/50 transition-all"
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
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Registro completado con éxito. Ya podés iniciar sesión.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Crear mi cuenta
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