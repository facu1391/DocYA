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
  motivo: z.enum(["soporte", "alianzas", "prensa", "otro"], {
    message: "Elegí un motivo",
  }),
  mensaje: z.string().min(10, "Contanos en al menos 10 caracteres"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al enviar");
      toast.success("¡Mensaje enviado! Te respondemos a la brevedad.");
      reset();
    } catch {
      toast.error("No pudimos enviar el mensaje. Probá otra vez.");
    }
  }

  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  return (
    <article className="lg:col-span-8">
      <div className="surface rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
          <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <Input {...register("nombre")} />
              <Err msg={errors.nombre?.message} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" {...register("email")} />
              <Err msg={errors.email?.message} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Teléfono (opcional)</Label>
              <Input {...register("telefono")} />
            </div>

            <div>
              <Label>Motivo</Label>
              <select
                {...register("motivo")}
                defaultValue=""
                className="
                  w-full h-10 rounded-md border px-3
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
                <option value="otro">Otro</option>
              </select>
              <Err msg={errors.motivo?.message} />
            </div>
          </div>

          <div>
            <Label>Mensaje</Label>
            <Textarea rows={6} {...register("mensaje")} />
            <Err msg={errors.mensaje?.message} />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--brand-foreground)]"
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

      <div className="text-center mt-6">
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
