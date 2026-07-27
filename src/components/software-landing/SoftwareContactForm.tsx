// src/components/software-landing/SoftwareContactForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const ORGANIZATION_LABELS: Record<string, string> = {
  "empresa-usuaria": "Empresa usuaria de Atlassian",
  "partner-atlassian": "Partner Atlassian",
  consultora: "Consultora tecnológica",
  otro: "Otro",
};

const PRODUCT_LABELS: Record<string, string> = {
  jira: "Jira",
  jsm: "Jira Service Management",
  confluence: "Confluence",
  varios: "Varios productos",
};

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre."),
  empresa: z.string().min(1, "Ingresá el nombre de tu empresa."),
  email: z.string().email("Ingresá un correo válido."),
  pais: z.string().min(1, "Ingresá tu país."),
  tipoOrganizacion: z.string().min(1, "Seleccioná una opción."),
  producto: z.string().min(1, "Seleccioná una opción."),
  necesidad: z
    .string()
    .min(20, "Agregá un poco más de detalle (mínimo 20 caracteres)."),
  whiteLabel: z.boolean(),
  website: z.string().max(0).optional(), // honeypot: los bots completan este campo oculto
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "mt-2 w-full rounded-lg border border-[var(--sw-border-strong)] bg-[var(--sw-bg)] px-4 py-3 text-sm text-[var(--sw-text)] placeholder:text-[var(--sw-subtle)]/60 outline-none transition-colors focus:border-[var(--sw-teal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sw-teal)]";

const labelCls = "text-sm font-medium text-[var(--sw-text)]";
const errorCls = "mt-1.5 text-xs text-red-400";

export default function SoftwareContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { whiteLabel: false },
  });

  async function onSubmit(data: FormValues) {
    if (data.website) return; // honeypot

    const mensaje = [
      `Empresa: ${data.empresa}`,
      `País: ${data.pais}`,
      `Tipo de organización: ${ORGANIZATION_LABELS[data.tipoOrganizacion] ?? data.tipoOrganizacion}`,
      `Producto: ${PRODUCT_LABELS[data.producto] ?? data.producto}`,
      `Modalidad white-label: ${data.whiteLabel ? "Sí" : "No"}`,
      "",
      "Descripción de la necesidad:",
      data.necesidad,
    ].join("\n");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: data.nombre,
          email: data.email,
          motivo: "otro",
          mensaje,
          origen: "software-landing",
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("¡Listo! Recibimos tu solicitud, te contactamos a la brevedad.");
      reset();
    } catch {
      toast.error("No pudimos enviar tu solicitud. Probá otra vez.");
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className={errorCls}>{msg}</p> : null;

  return (
    <section id="software-contacto" className="bg-[var(--sw-bg2)] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Solicitá una evaluación técnica"
          description="Contanos sobre tu proyecto o el de tu cliente. Te responderemos con los próximos pasos."
        />

        <ScrollReveal delay={0.1} className="mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6 rounded-3xl border border-[var(--sw-border)] bg-[var(--sw-bg)] p-6 md:p-8"
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("website")}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sw-nombre" className={labelCls}>
                  Nombre
                </label>
                <input id="sw-nombre" type="text" autoComplete="name" className={inputCls} {...register("nombre")} />
                <Err msg={errors.nombre?.message} />
              </div>

              <div>
                <label htmlFor="sw-empresa" className={labelCls}>
                  Empresa
                </label>
                <input
                  id="sw-empresa"
                  type="text"
                  autoComplete="organization"
                  className={inputCls}
                  {...register("empresa")}
                />
                <Err msg={errors.empresa?.message} />
              </div>

              <div>
                <label htmlFor="sw-email" className={labelCls}>
                  Correo corporativo
                </label>
                <input id="sw-email" type="email" autoComplete="email" className={inputCls} {...register("email")} />
                <Err msg={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="sw-pais" className={labelCls}>
                  País
                </label>
                <input
                  id="sw-pais"
                  type="text"
                  autoComplete="country-name"
                  className={inputCls}
                  {...register("pais")}
                />
                <Err msg={errors.pais?.message} />
              </div>

              <div>
                <label htmlFor="sw-tipo" className={labelCls}>
                  Tipo de organización
                </label>
                <select id="sw-tipo" defaultValue="" className={inputCls} {...register("tipoOrganizacion")}>
                  <option value="" disabled>
                    Seleccioná una opción
                  </option>
                  <option value="empresa-usuaria">Empresa usuaria de Atlassian</option>
                  <option value="partner-atlassian">Partner Atlassian</option>
                  <option value="consultora">Consultora tecnológica</option>
                  <option value="otro">Otro</option>
                </select>
                <Err msg={errors.tipoOrganizacion?.message} />
              </div>

              <div>
                <label htmlFor="sw-producto" className={labelCls}>
                  Producto
                </label>
                <select id="sw-producto" defaultValue="" className={inputCls} {...register("producto")}>
                  <option value="" disabled>
                    Seleccioná una opción
                  </option>
                  <option value="jira">Jira</option>
                  <option value="jsm">Jira Service Management</option>
                  <option value="confluence">Confluence</option>
                  <option value="varios">Varios productos</option>
                </select>
                <Err msg={errors.producto?.message} />
              </div>
            </div>

            <div>
              <label htmlFor="sw-necesidad" className={labelCls}>
                Descripción de la necesidad
              </label>
              <textarea
                id="sw-necesidad"
                rows={5}
                className={`${inputCls} resize-none`}
                {...register("necesidad")}
              />
              <Err msg={errors.necesidad?.message} />
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-[var(--sw-subtle)]">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--sw-border-strong)] bg-[var(--sw-bg)] text-[var(--sw-teal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sw-teal)]"
                {...register("whiteLabel")}
              />
              Necesito una modalidad white-label (presentar el desarrollo bajo mi
              propia marca).
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--sw-blue)] to-[var(--sw-teal)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--sw-teal-30)] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  Enviando
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Solicitar evaluación
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[var(--sw-subtle)] sm:text-left">
              También podés escribirnos directo a{" "}
              <a href="mailto:soporte@docya.com.ar" className="underline hover:text-[var(--sw-text)]">
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
