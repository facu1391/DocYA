"use client";

import Image from "next/image";
import { Calendar, Camera, FileText, FlaskConical, Pill, Video } from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";

const APP_CARDS = [
  { icon: Calendar, label: "Próximos turnos" },
  { icon: FileText, label: "Historia clínica" },
  { icon: Pill, label: "Recetas" },
  { icon: FlaskConical, label: "Estudios médicos" },
  { icon: Camera, label: "Subir estudios antes de la consulta" },
  { icon: Video, label: "Teleconsultas" },
];

export default function DocYaAppSection() {
  return (
    <section className="dark-section py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <span className="badge-trusted">DocYa App</span>
            <h2 className="section-title mt-4 text-white">
              Tus pacientes también forman parte del ecosistema
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Mientras el médico usa <strong className="text-white">DocYa Clinic</strong>, el paciente usa{" "}
              <strong className="text-white">DocYa App</strong>. Toda la información se sincroniza
              automáticamente entre las dos plataformas, sin que nadie tenga que hacer nada.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3">
              {APP_CARDS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-white/70">
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
                  {label}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="relative mx-auto flex justify-center py-2 lg:py-0">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ background: "rgba(0, 179, 166, 0.16)" }}
              aria-hidden="true"
            />
            <Image
              src="/images/clinic/docya-patient-app.webp"
              alt="Portal de pacientes de DocYa Clinic en un iPhone"
              width={1200}
              height={2364}
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
              className="relative h-auto w-[280px] drop-shadow-[0_34px_55px_rgba(0,0,0,0.42)] sm:w-[320px] lg:w-[350px]"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
