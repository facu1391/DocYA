"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  MapPin,
  FileText,
  Power,
  BellRing,
  User,
  CreditCard,
  Navigation,
  Stethoscope,
  ClipboardList,
  FileSignature,
  Flag,
  ArrowUp,
} from "lucide-react";

const steps = [
  { id: "paso-1", label: "Paso 1", title: "Activar disponibilidad" },
  { id: "paso-2", label: "Paso 2", title: "Recepción de una consulta" },
  { id: "paso-3", label: "Paso 3", title: "Profesional en camino" },
  { id: "paso-4", label: "Paso 4", title: "Iniciar y finalizar" },
  { id: "paso-5", label: "Paso 5", title: "No disponible" },
];

export default function ManualClient() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  const handleHashOnLoad = useMemo(() => {
    return () => {
      const hash = window.location.hash?.replace("#", "");
      if (!hash) return;
      setTimeout(() => goTo(hash), 150);
    };
  }, []);

  useEffect(() => {
    handleHashOnLoad();
  }, [handleHashOnLoad]);

  return (
    <div className="min-h-screen bg-[var(--nav-bg)] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* ================= HEADER ================= */}
        <div className="mx-auto flex max-w-5xl flex-col items-center space-y-4">
          <Image
            src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/DOCYAPRO_BLANCO_eerxi3.png"
            alt="DocYa Pro"
            width={160}
            height={60}
            priority
          />

          <h1 className="text-center text-3xl font-bold">
            Guía de uso para profesionales
          </h1>

          <p className="max-w-xl text-center leading-relaxed text-white/70">
            Este manual explica paso a paso cómo trabajar con DocYa, desde que te
            conectás hasta que finalizás una atención domiciliaria.
          </p>

          {/* ================= ÍNDICE ================= */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {steps.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  "border-white/10 text-white/80 hover:text-white hover:bg-white/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
                ].join(" ")}
              >
                <span className="text-[var(--brand)]">{s.label}</span>{" "}
                <span className="text-white/70">— {s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= PASOS ================= */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* PASO 1 */}
          <Card
            id="paso-1"
            className="scroll-mt-24 bg-black/30 border border-[var(--nav-border)] rounded-2xl"
          >
            <CardHeader>
              <span className="text-[var(--brand)] text-sm font-semibold">
                Paso 1
              </span>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Power className="w-5 h-5 text-[var(--brand)]" />
                Activar disponibilidad
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-white/80 text-sm">
              <Image
                src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767750885/Dise%C3%B1o_sin_t%C3%ADtulo_2_olwmsu.gif"
                alt="Disponibilidad"
                width={300}
                height={600}
                sizes="(max-width: 768px) 90vw, 320px"
                className="rounded-lg mx-auto"
              />

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Al ingresar a la app DocYa Pro, debés colocarte como{" "}
                    <b>Disponible</b>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <BellRing className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Solo cuando estás disponible el sistema puede asignarte
                    consultas de pacientes cercanos.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Una vez activado, podés bloquear el teléfono: la app queda
                    conectada y lista para recibir solicitudes.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PASO 2 */}
          <Card
            id="paso-2"
            className="scroll-mt-24 bg-black/30 border border-[var(--nav-border)] rounded-2xl"
          >
            <CardHeader>
              <span className="text-[var(--brand)] text-sm font-semibold">
                Paso 2
              </span>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <BellRing className="w-5 h-5 text-[var(--brand)]" />
                Recepción de una consulta
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-white/80 text-sm">
              <Image
                src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731025/consulta2_ju6290.png"
                alt="Consulta entrante"
                width={300}
                height={600}
                sizes="(max-width: 768px) 90vw, 320px"
                className="rounded-lg mx-auto"
              />

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Cuando un paciente solicita atención, recibís una consulta
                    entrante.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Dirección del domicilio y distancia estimada.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Tiempo limitado para aceptar o rechazar la consulta.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Flag className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Al aceptar, la atención queda asignada exclusivamente a vos.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PASO 3 */}
          <Card
            id="paso-3"
            className="scroll-mt-24 bg-black/30 border border-[var(--nav-border)] rounded-2xl"
          >
            <CardHeader>
              <span className="text-[var(--brand)] text-sm font-semibold">
                Paso 3
              </span>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-[var(--brand)]" />
                Profesional en camino
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-white/80 text-sm">
              <Image
                src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731109/encamino_vrzrjl.png"
                alt="Consulta aceptada"
                width={300}
                height={600}
                sizes="(max-width: 768px) 90vw, 320px"
                className="rounded-lg mx-auto"
              />

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <User className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>Datos completos del paciente.</span>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>Distancia en tiempo real al domicilio.</span>
                </li>

                <li className="flex items-start gap-3">
                  <Navigation className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>Acceso directo a Google Maps para navegación.</span>
                </li>

                <li className="flex items-start gap-3">
                  <Stethoscope className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>
                    El botón <b>“Iniciar consulta”</b> solo se habilita al
                    llegar al domicilio.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CreditCard className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                  <span>
                    Si el estado de cobro figura como{" "}
                    <b className="text-yellow-400">pendiente</b>, el profesional
                    debe cobrar al paciente.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PASO 4 */}
          <Card
            id="paso-4"
            className="scroll-mt-24 bg-black/30 border border-[var(--nav-border)] rounded-2xl"
          >
            <CardHeader>
              <span className="text-[var(--brand)] text-sm font-semibold">
                Paso 4
              </span>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-[var(--brand)]" />
                Iniciar y finalizar la consulta
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-white/80 text-sm">
              <Image
                src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731186/encasa_iq7psw.png"
                alt="Funciones médicas habilitadas"
                width={300}
                height={600}
                sizes="(max-width: 768px) 90vw, 320px"
                className="rounded-lg mx-auto"
              />

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>Historia clínica digital.</span>
                </li>

                <li className="flex items-start gap-3">
                  <FileSignature className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>Recetas y certificados médicos digitales.</span>
                </li>

                <li className="flex items-start gap-3">
                  <Flag className="w-4 h-4 text-[var(--brand)] mt-1 shrink-0" />
                  <span>
                    Presioná <b>“Finalizar consulta”</b> para cerrar
                    correctamente el servicio y completar la atención.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* PASO 5 */}
          <Card
            id="paso-5"
            className="scroll-mt-24 bg-black/30 border border-red-500/30 rounded-2xl md:col-span-2"
          >
            <CardHeader>
              <span className="text-red-400 text-sm font-semibold">
                Paso final – Importante
              </span>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Power className="w-5 h-5 text-red-400" />
                Ponerse como No disponible
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-white/80 text-sm">
              <Image
                src="https://res.cloudinary.com/df3cwd4ty/image/upload/v1767731257/notrabajo_g7if6h.png"
                alt="No disponible"
                width={300}
                height={600}
                sizes="(max-width: 768px) 90vw, 420px"
                className="rounded-lg mx-auto"
              />

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Flag className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Antes de cerrar la app o finalizar tu jornada, recordá
                    siempre colocarte como <b>No disponible</b>.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <BellRing className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Si permanecés disponible, el sistema puede seguir asignándote
                    consultas aunque ya no desees trabajar.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Las consultas no aceptadas afectan tu rendimiento y
                    disponibilidad dentro de la plataforma.
                  </span>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-red-400 mt-1 shrink-0" />
                  <span className="leading-relaxed">
                    Ponerte como <b>No disponible</b> asegura una mejor
                    experiencia tanto para vos como para los pacientes.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA final (opcional) */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <p className="text-white/60 text-sm">¿Te quedó alguna duda?</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a href="/faqs" className="btn-outline-primary h-10 px-4">
              Ver FAQs
            </a>
            <a href="/contacto" className="btn-primary h-10 px-4">
              Contacto
            </a>
          </div>
        </div>
      </div>

      {/* Volver arriba */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={[
            "fixed bottom-6 right-6 z-50",
            "rounded-full border px-4 h-11 flex items-center gap-2",
            "border-white/10 bg-black/30 text-white/90 hover:text-white hover:bg-white/10",
            "backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]",
          ].join(" ")}
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-4 w-4" />
          Arriba
        </button>
      )}
    </div>
  );
}
