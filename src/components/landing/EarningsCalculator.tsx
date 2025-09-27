
"use client";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PRECIO = 30000;
const COMISION = 0.2;
const NETO = PRECIO * (1 - COMISION);

export default function EarningsCalculator() {
  const [consultas, setConsultas] = useState(10);
  const semanal = useMemo(() => consultas * NETO, [consultas]);
  const mensual = useMemo(() => semanal * 4, [semanal]);

  return (
    <section className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold">Calculadora de ingresos</h2>
      <p className="text-sm text-muted-foreground mt-2">
        Precio por consulta: ${PRECIO.toLocaleString("es-AR")} — Comisión DocYa: {COMISION * 100}% — 
        Neto por consulta: <strong>${NETO.toLocaleString("es-AR")}</strong>
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <Card className="p-6">
          <Label htmlFor="c">Consultas por semana</Label>
          <Input
            id="c"
            type="number"
            min={0}
            value={consultas}
            onChange={(e) => setConsultas(Number(e.target.value || 0))}
            className="mt-2"
          />
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Ingreso semanal estimado</p>
          <p className="text-2xl font-bold mt-2">${semanal.toLocaleString("es-AR")}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Ingreso mensual estimado</p>
          <p className="text-2xl font-bold mt-2">${mensual.toLocaleString("es-AR")}</p>
        </Card>
      </div>
    </section>
  );
}
