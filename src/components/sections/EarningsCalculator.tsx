"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const ARS = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export default function EarningsCalculator() {
  const [precio, setPrecio] = useState(30000);
  const [comision, setComision] = useState(20);
  const [consultas, setConsultas] = useState(12);
  const [costoVar, setCostoVar] = useState(0);
  const [costoFijo, setCostoFijo] = useState(0);
  const [retencion, setRetencion] = useState(0);

  const netoPorConsultaBruto = useMemo(() => precio * (1 - comision / 100), [precio, comision]);
  const netoPorConsulta = useMemo(
    () => Math.max(netoPorConsultaBruto - costoVar, 0),
    [netoPorConsultaBruto, costoVar]
  );
  const semanalPrevioRet = useMemo(
    () => Math.max(consultas * netoPorConsulta - costoFijo, 0),
    [consultas, netoPorConsulta, costoFijo]
  );
  const semanalRet = useMemo(() => semanalPrevioRet * (retencion / 100), [semanalPrevioRet, retencion]);
  const semanal = useMemo(() => Math.max(semanalPrevioRet - semanalRet, 0), [semanalPrevioRet, semanalRet]);
  const mensual = useMemo(() => semanal * 4, [semanal]);

  const presets = [
    { label: "8/sem", value: 8 },
    { label: "12/sem", value: 12 },
    { label: "20/sem", value: 20 },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none brand-glow" />

      {/* ✅ reemplaza container por wrapper centrado */}
      <div className="mx-auto w-full max-w-6xl px-4 relative py-16 md:py-20">
        <header className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center">
            <span className="badge">Herramienta</span>
          </div>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold">Proyección de ingresos</h1>
          <p className="mt-3 text-sm md:text-base text-muted-foreground">
            Estimá tus ingresos semanales y mensuales como profesional DocYa Pro.
          </p>
        </header>

        <div className="mt-10 md:mt-12 mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              <Card className="p-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Precio por consulta</Label>
                    <Input
                      type="number"
                      min={0}
                      value={precio}
                      onChange={(e) => setPrecio(Number(e.target.value || 0))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Bruto. Se descuenta comisión DocYa.</p>
                  </div>

                  <div>
                    <Label>Comisión DocYa (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={comision}
                      onChange={(e) => setComision(Number(e.target.value || 0))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Porcentaje.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Costo variable por consulta</Label>
                    <Input
                      type="number"
                      min={0}
                      value={costoVar}
                      onChange={(e) => setCostoVar(Number(e.target.value || 0))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Insumos/traslado (opcional).</p>
                  </div>

                  <div>
                    <Label>Costo fijo semanal</Label>
                    <Input
                      type="number"
                      min={0}
                      value={costoFijo}
                      onChange={(e) => setCostoFijo(Number(e.target.value || 0))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Abono/seguro (opcional).</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Retenciones aprox. (%)</Label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={retencion}
                      onChange={(e) => setRetencion(Number(e.target.value || 0))}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Estimación sobre el neto semanal (opcional).
                    </p>
                  </div>

                  <div>
                    <Label>Consultas por semana</Label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        min={0}
                        value={consultas}
                        onChange={(e) => setConsultas(Number(e.target.value || 0))}
                      />
                      <input
                        type="range"
                        min={0}
                        max={40}
                        value={consultas}
                        onChange={(e) => setConsultas(Number(e.target.value))}
                        className="mt-3 w-full accent-[var(--brand)]"
                      />
                      <div className="flex gap-2 mt-2">
                        {presets.map((p) => (
                          <button key={p.value} type="button" onClick={() => setConsultas(p.value)} className="badge">
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="glass border rounded-2xl p-4">
                <p className="text-sm text-muted-foreground">
                  Estos valores son estimaciones y pueden variar por zona, demanda y condiciones impositivas personales.
                  Para facturación se requiere monotributo.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <Card className="p-5">
                <h3 className="font-semibold">Resumen por consulta</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="text-muted-foreground">Bruto</div>
                  <div className="text-right font-medium">{ARS(precio)}</div>

                  <div className="text-muted-foreground">Comisión DocYa ({comision}%)</div>
                  <div className="text-right">− {ARS(precio - netoPorConsultaBruto)}</div>

                  <div className="text-muted-foreground">Costos variables</div>
                  <div className="text-right">− {ARS(costoVar)}</div>

                  <div className="col-span-2 border-t pt-2 flex items-center justify-between">
                    <span className="font-semibold">Neto por consulta</span>
                    <span className="font-semibold">{ARS(netoPorConsulta)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-semibold">Proyección</h3>
                <div className="mt-4 grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Neto semanal previo a retenciones</span>
                    <span className="font-medium">{ARS(semanalPrevioRet)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Retenciones aprox. ({retencion}%)</span>
                    <span className="font-medium">− {ARS(semanalRet)}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-2">
                    <span className="font-semibold">Neto semanal estimado</span>
                    <span className="font-semibold">{ARS(semanal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Neto mensual (×4)</span>
                    <span className="text-2xl font-bold">{ARS(mensual)}</span>
                  </div>
                </div>
              </Card>

              <div className="surface rounded-2xl p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">¿Querés empezar a recibir consultas?</p>
                  <p className="font-medium">Sumate a DocYa Pro como profesional</p>
                </div>
                <Link href="/registro" className="btn-primary whitespace-nowrap">
                  Registrarme
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
