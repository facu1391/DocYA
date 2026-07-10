// src/components/clinic-landing/EcosystemSection.tsx
"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Calendar,
  ClipboardList,
  Cloud,
  FileCheck2,
  FileText,
  MessageCircle,
  Pill,
  Smartphone,
  Stethoscope,
  User,
  Video,
  Wallet,
} from "lucide-react";
import ScrollReveal from "./shared/ScrollReveal";
import SectionHeading from "./shared/SectionHeading";

const CENTRAL_NODES = [
  { key: "paciente", label: "Paciente", icon: User, x: 6, y: 50, size: "h-14 w-14" },
  { key: "app", label: "DocYa App", icon: Smartphone, x: 27, y: 50, size: "h-12 w-12" },
  { key: "cloud", label: "Cloud", icon: Cloud, x: 50, y: 50, size: "h-16 w-16" },
  { key: "clinic", label: "DocYa Clinic", icon: Stethoscope, x: 73, y: 50, size: "h-12 w-12" },
  { key: "ia", label: "IA", icon: Bot, x: 94, y: 50, size: "h-14 w-14" },
] as const;

const PERIPHERAL_NODES = [
  { label: "WhatsApp", icon: MessageCircle, x: 30, y: 14 },
  { label: "Teleconsulta", icon: Video, x: 44, y: 14 },
  { label: "Recetas", icon: Pill, x: 58, y: 14 },
  { label: "Certificados", icon: FileCheck2, x: 72, y: 14 },
  { label: "Órdenes médicas", icon: ClipboardList, x: 30, y: 86 },
  { label: "Historia clínica", icon: FileText, x: 44, y: 86 },
  { label: "Agenda", icon: Calendar, x: 58, y: 86 },
  { label: "Contabilidad", icon: Wallet, x: 72, y: 86 },
];

const CHAIN_LINKS: [string, string][] = [
  ["paciente", "app"],
  ["app", "cloud"],
  ["cloud", "clinic"],
  ["clinic", "ia"],
];

function nodeCoord(key: string) {
  const node = CENTRAL_NODES.find((n) => n.key === key)!;
  return { x: node.x, y: node.y };
}

export default function EcosystemSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Ecosistema"
          title="Un ecosistema conectado, no un software más"
          subtitle="Paciente, aplicación, nube, consultorio e inteligencia artificial, trabajando en tiempo real."
        />

        {/* Desktop: diagrama radial */}
        <ScrollReveal className="relative mt-16 hidden aspect-[2.1/1] w-full md:block">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            {CHAIN_LINKS.map(([a, b], i) => {
              const from = nodeCoord(a);
              const to = nodeCoord(b);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="var(--brand)"
                  strokeWidth={0.4}
                  strokeOpacity={0.5}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12 }}
                />
              );
            })}
            {PERIPHERAL_NODES.map((node, i) => (
              <motion.line
                key={node.label}
                x1={node.x}
                y1={node.y}
                x2={50}
                y2={50}
                stroke="var(--border)"
                strokeWidth={0.25}
                strokeOpacity={0.6}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.06 }}
              />
            ))}
          </svg>

          {CENTRAL_NODES.map((node, i) => {
            const Icon = node.icon;
            const isCloud = node.key === "cloud";
            return (
              <motion.div
                key={node.key}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border-2 ${node.size}`}
                  style={{
                    borderColor: isCloud ? "var(--brand)" : "var(--glass-border)",
                    background: isCloud ? "var(--brand)" : "var(--card)",
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: isCloud ? "#fff" : "var(--brand)" }} />
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-foreground">{node.label}</span>
              </motion.div>
            );
          })}

          {PERIPHERAL_NODES.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, y: node.y < 50 ? -8 : 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--border)", background: "var(--card)" }}
                >
                  <Icon className="h-4 w-4 text-text-muted" />
                </div>
                <span className="whitespace-nowrap text-[11px] font-medium text-text-muted">{node.label}</span>
              </motion.div>
            );
          })}
        </ScrollReveal>

        {/* Mobile: flujo vertical simplificado, sin lineas SVG */}
        <div className="mt-14 md:hidden">
          {CENTRAL_NODES.map((node, i) => {
            const Icon = node.icon;
            const isCloud = node.key === "cloud";
            return (
              <div key={node.key} className="flex flex-col items-center">
                <ScrollReveal delay={i * 0.05} className="flex flex-col items-center gap-2">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: isCloud ? "var(--brand)" : "var(--glass-border)",
                      background: isCloud ? "var(--brand)" : "var(--card)",
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: isCloud ? "#fff" : "var(--brand)" }} />
                  </div>
                  <span className="text-xs font-semibold text-foreground">{node.label}</span>
                </ScrollReveal>
                {i < CENTRAL_NODES.length - 1 && (
                  <div
                    className="my-2 h-6 w-0.5"
                    style={{ background: "color-mix(in srgb, var(--brand) 30%, transparent)" }}
                  />
                )}
              </div>
            );
          })}

          <div className="grid grid-cols-2 gap-3 pt-8">
            {PERIPHERAL_NODES.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.label}
                  className="flex items-center gap-2 rounded-xl border p-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  <Icon className="h-4 w-4 shrink-0" style={{ color: "var(--brand)" }} />
                  <span className="text-xs font-medium text-text-muted">{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
