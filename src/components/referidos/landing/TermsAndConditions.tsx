// src/components/referidos/landing/TermsAndConditions.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Shield, AlertTriangle, Scale } from "lucide-react";
import Reveal from "@/components/referidos/common/Reveal";

const sections = [
  {
    number: "1",
    title: "Objeto",
    icon: FileText,
    content:
      "El presente documento regula la participación en el programa de referidos de DocYa, mediante el cual los usuarios podrán obtener recompensas económicas por referir nuevos pacientes a la plataforma.",
  },
  {
    number: "2",
    title: "Definiciones",
    icon: FileText,
    content:
      "Referente: usuario registrado que comparte su enlace o código de referido. Referido: nuevo usuario que se registra en DocYa a través del enlace o código del referente. Consulta válida: atención médica efectivamente realizada y abonada a través de la plataforma.",
  },
  {
    number: "3",
    title: "Condiciones del programa",
    icon: Shield,
    content:
      "El referente recibirá una recompensa de $1.000 ARS por cada consulta válida realizada por un usuario referido, siempre que el registro, la consulta y el pago estén correctamente confirmados.",
  },
  {
    number: "4",
    title: "Duración del beneficio",
    icon: FileText,
    content:
      "El referente percibirá la recompensa por las consultas realizadas por el referido durante un período de 12 meses contados desde la fecha de registro del referido.",
  },
  {
    number: "5",
    title: "Liquidación y pagos",
    icon: FileText,
    content:
      "Las recompensas se acumularán en la cuenta del referente y DocYa podrá realizar pagos mediante transferencia bancaria, billeteras virtuales u otros medios definidos operativamente.",
  },
  {
    number: "6",
    title: "Prohibiciones y uso indebido",
    icon: AlertTriangle,
    content:
      "Queda prohibido autoreferirse, crear cuentas falsas, utilizar datos de terceros sin consentimiento o generar actividad fraudulenta para obtener beneficios. DocYa podrá retener recompensas y suspender cuentas.",
  },
  {
    number: "7",
    title: "Modificaciones del programa",
    icon: FileText,
    content:
      "DocYa podrá modificar el monto de las recompensas, cambiar condiciones o suspender el programa en cualquier momento.",
  },
  {
    number: "8",
    title: "Responsabilidad",
    icon: Shield,
    content:
      "DocYa no garantiza un nivel mínimo de ingresos ni una cantidad determinada de consultas por referido.",
  },
  {
    number: "9",
    title: "Relación entre las partes",
    icon: FileText,
    content:
      "La participación no implica relación laboral, societaria ni de representación entre DocYa y el referente.",
  },
  {
    number: "10",
    title: "Impuestos",
    icon: FileText,
    content:
      "Cada participante será responsable de declarar y abonar los impuestos que pudieran corresponder según la normativa vigente.",
  },
  {
    number: "11",
    title: "Cancelación de cuentas",
    icon: AlertTriangle,
    content:
      "DocYa podrá suspender o cancelar la cuenta del usuario en caso de incumplimiento de estos términos o ante actividad sospechosa o fraudulenta.",
  },
  {
    number: "12",
    title: "Aceptación",
    icon: Shield,
    content:
      "Al participar en el programa de referidos, el usuario declara haber leído, comprendido y aceptado los presentes términos y condiciones.",
  },
  {
    number: "13",
    title: "Jurisdicción",
    icon: Scale,
    content:
      "Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a los tribunales competentes de la Ciudad Autónoma de Buenos Aires.",
  },
];

export default function TermsAndConditions() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Términos y Condiciones
          </h2>
          <p className="text-slate-400 text-lg">
            Información legal básica del programa de referidos.
          </p>
        </Reveal>

        <div className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isOpen = openIndex === index;

            return (
              <Reveal key={section.number} delay={index * 0.03}>
                <div
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "border-teal-500/30 bg-teal-500/[0.04]"
                      : "border-white/[0.08] bg-white/[0.03]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full px-5 md:px-6 py-5 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                          Sección {section.number}
                        </p>
                        <h3 className="text-lg md:text-xl font-bold text-white">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 md:px-6 pb-6 text-slate-300 leading-relaxed">
                          {section.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}