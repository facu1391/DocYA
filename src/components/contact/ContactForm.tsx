// src/components/contact/ContactForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import Link from "next/link";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  email: z.string().email("Email inválido"),
  telefono: z.string().optional(),
  motivo: z.enum(["soporte", "alianzas", "prensa", "clinic_demo", "otro"], {
    message: "Elegí un motivo",
  }),
  mensaje: z.string().min(10, "Contanos en al menos 10 caracteres"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  isClinic?: boolean;
}

export default function ContactForm({ isClinic = false }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: isClinic ? { motivo: "clinic_demo" } : undefined,
  });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isClinic ? { ...data, origen: "clinic-demo" } : data),
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("¡Mensaje enviado! Te respondemos a la brevedad.");
      reset();
    } catch {
      toast.error("No pudimos enviar el mensaje. Probá otra vez.");
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1 text-xs text-red-500">{msg}</p> : null;

  return (
    <article className="lg:col-span-8">
      <div className="surface rounded-3xl border p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-8">
        <div className="mb-6">
          <span className="badge">{isClinic ? "Demo DocYa Clinic" : "Formulario"}</span>
          <h2 className="mt-3 text-xl font-semibold md:text-2xl">Escribinos</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Completá tus datos y te respondemos lo antes posible.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
          <input
            type="text"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Nombre</Label>
              <Input {...register("nombre")} className="mt-2 h-11 md:h-12" />
              <Err msg={errors.nombre?.message} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} className="mt-2 h-11 md:h-12" />
              <Err msg={errors.email?.message} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Teléfono (opcional)</Label>
              <Input {...register("telefono")} className="mt-2 h-11 md:h-12" />
            </div>

            <div>
              <Label>Motivo</Label>
              <select
                {...register("motivo")}
                defaultValue=""
                className="
                  mt-2 h-11 w-full rounded-md border px-3 md:h-12
                  bg-background
                  focus:outline-none focus:ring-2 focus:ring-[var(--brand)]
                  focus:border-[var(--brand)]
                "
              >
                <option value="" disabled>
                  Elegí una opción
                </option>
                <option value="soporte">Soporte</option>
                <option value="alianzas">Alianzas</option>
                <option value="prensa">Prensa</option>
                <option value="clinic_demo">Demo de DocYa Clinic</option>
                <option value="otro">Otro</option>
              </select>
              <Err msg={errors.motivo?.message} />
            </div>
          </div>

          <div>
            <Label>Mensaje</Label>
            <Textarea rows={6} {...register("mensaje")} className="mt-2 min-h-[150px]" />
            <Err msg={errors.mensaje?.message} />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand-hover)]"
            >
              {isSubmitting ? (
                <>
                  Enviando
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Enviar
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Al enviar aceptás la{" "}
            <Link href="/legal/privacidad" className="link-primary">
              Política de Privacidad
            </Link>
            .
          </p>
        </form>
      </div>

      <div className="mt-6 text-center lg:text-left">
        <p className="text-sm text-muted-foreground">
          ¿Dudas comunes? Visitá las{" "}
          <Link href="/faqs" className="link-primary">
            Preguntas frecuentes
          </Link>
          .
        </p>
      </div>
    </article>
  );
}