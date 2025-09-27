
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function HeroPro() {
  return (
    <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          DocYa — Sumate como profesional de la salud
        </h1>
        <p className="text-lg text-muted-foreground">
          Conectá con pacientes a domicilio en minutos. Elegí horarios y zonas.
          Cobrás semanalmente: $30.000 por consulta (20% comisión DocYa).
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href="/registro">Postularme ahora</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#como-funciona">Cómo funciona</Link>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Atención inicial en CABA (Palermo y Belgrano) — Expansión nacional.
        </p>
      </div>
      <div className="relative w-full aspect-video rounded-xl border bg-muted" />
    </section>
  );
}
