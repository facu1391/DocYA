
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = z.object({
  nombre: z.string().min(2),
  apellido: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(6),
  rol: z.enum(["medico", "enfermero"], { message: "Elegí un rol" }),
  matricula: z.string().min(3),
  zona: z.string().min(2),
  comentario: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function RegistroPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    await fetch("/api/registro", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.push("/gracias");
  }

  return (
    <main className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-semibold">Registro de profesionales</h1>
      <p className="text-sm text-muted-foreground mt-2">
        Completá tus datos y te contactamos.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4">
        {/* Campos */}
        <div>
          <Label>Nombre</Label>
          <Input {...register("nombre")} />
          {errors.nombre && (
            <p className="text-sm text-red-600 mt-1">Ingresá un nombre válido</p>
          )}
        </div>

        <div>
          <Label>Apellido</Label>
          <Input {...register("apellido")} />
          {errors.apellido && (
            <p className="text-sm text-red-600 mt-1">Ingresá un apellido válido</p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">Email inválido</p>
          )}
        </div>

        <div>
          <Label>Teléfono</Label>
          <Input {...register("telefono")} />
          {errors.telefono && (
            <p className="text-sm text-red-600 mt-1">Teléfono inválido</p>
          )}
        </div>

        <div>
          <Label>Rol</Label>
          <select
            className="w-full border rounded-md h-10 px-3"
            {...register("rol")}
          >
            <option value="">Elegí una opción</option>
            <option value="medico">Médico/a</option>
            <option value="enfermero">Enfermero/a</option>
          </select>
          {errors.rol && (
            <p className="text-sm text-red-600 mt-1">Elegí un rol</p>
          )}
        </div>

        <div>
          <Label>Matrícula</Label>
          <Input {...register("matricula")} />
          {errors.matricula && (
            <p className="text-sm text-red-600 mt-1">Ingresá tu matrícula</p>
          )}
        </div>

        <div>
          <Label>Zona preferida</Label>
          <Input
            placeholder="Ej: Palermo / Belgrano"
            {...register("zona")}
          />
          {errors.zona && (
            <p className="text-sm text-red-600 mt-1">Ingresá una zona</p>
          )}
        </div>

        <div>
          <Label>Comentario (opcional)</Label>
          <Textarea rows={4} {...register("comentario")} />
        </div>

        {/* Disclaimer legal */}
        <p className="text-xs text-muted-foreground mt-2">
          Al enviar aceptás los{" "}
          <Link href="/legal/terminos" className="underline hover:opacity-80">
            Términos
          </Link>{" "}
          y la{" "}
          <Link href="/legal/privacidad" className="underline hover:opacity-80">
            Política de Privacidad
          </Link>{" "}
          de DocYa Pro.
        </p>

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          Enviar
        </Button>
      </form>
    </main>
  );
}
