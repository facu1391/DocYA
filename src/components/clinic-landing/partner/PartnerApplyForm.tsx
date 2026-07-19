// src/components/clinic-landing/partner/PartnerApplyForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import ScrollReveal from "../shared/ScrollReveal";
import SectionHeading from "../shared/SectionHeading";
import { PARTNER_ANCHORS } from "./anchors";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(6, "Ingresá un teléfono de contacto"),
  zona: z.string().optional(),
  mensaje: z.string().optional(),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "mt-2 h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/30";

export default function PartnerApplyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    if (data.website) return; // honeypot: los bots completan este campo oculto

    const mensaje = [
      data.zona ? `Zona / organización: ${data.zona}` : null,
      data.mensaje || null,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono,
          motivo: "alianzas",
          mensaje: mensaje || "Quiere sumarse como Partner de DocYa Clinic.",
          origen: "clinic-partner",
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("¡Listo! Te contactamos a la brevedad.");
      reset();
    } catch {
      toast.error("No pudimos enviar tu postulación. Probá otra vez.");
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1 text-xs text-red-400">{msg}</p> : null;

  return (
    <section id={PARTNER_ANCHORS.postularme} className="dark-section scroll-mt-24 py-28">
      <div className="mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow="Sumate"
          title="Quiero ser Partner"
          subtitle="Dejanos tus datos y te contactamos para darte de alta en el panel."
          dark
        />

        <ScrollReveal className="mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("website")}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-white/80">Nombre y apellido</label>
                <input className={inputCls} {...register("nombre")} />
                <Err msg={errors.nombre?.message} />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Email</label>
                <input type="email" className={inputCls} {...register("email")} />
                <Err msg={errors.email?.message} />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-white/80">Teléfono</label>
                <input className={inputCls} {...register("telefono")} />
                <Err msg={errors.telefono?.message} />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80">Zona u organización (opcional)</label>
                <input className={inputCls} {...register("zona")} />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium text-white/80">Contanos sobre vos (opcional)</label>
              <textarea
                rows={4}
                className={`${inputCls} h-auto resize-none py-3`}
                {...register("mensaje")}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary mt-6 h-12 w-full text-base"
            >
              {isSubmitting ? (
                <>
                  Enviando
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Quiero ser Partner
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-white/40">
              También podés escribirnos directo a{" "}
              <a href="mailto:soporte@docya.com.ar" className="underline hover:text-white/60">
                soporte@docya.com.ar
              </a>
              .
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
