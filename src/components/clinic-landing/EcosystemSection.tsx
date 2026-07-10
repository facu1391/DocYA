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

const MOBILE_GROUP_1 = PERIPHERAL_NODES.filter((n) =>
  ["WhatsApp", "Teleconsulta", "Órdenes médicas", "Historia clínica"].includes(n.label)
);
const MOBILE_GROUP_2 = PERIPHERAL_NODES.filter((n) =>
  ["Recetas", "Certificados", "Agenda", "Contabilidad"].includes(n.label)
);

function MobileCentralNode({ node, index }: { node: (typeof CENTRAL_NODES)[number]; index: number }) {
  const Icon = node.icon;
  const isCloud = node.key === "cloud";
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
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
      <span className="text-xs font-semibold text-foreground">{node.label}</span>
    </motion.div>
  );
}

function MobileConnector({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-8 w-px origin-top"
      style={{ background: "var(--border)" }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    />
  );
}

function MobileClusterGrid({ nodes, delay = 0 }: { nodes: typeof PERIPHERAL_NODES; delay?: number }) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-x-10 gap-y-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      {nodes.map((node) => {
        const Icon = node.icon;
        return (
          <div key={node.label} className="flex flex-col items-center gap-1.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <Icon className="h-4 w-4 text-text-muted" />
            </div>
            <span className="whitespace-nowrap text-[11px] font-medium text-text-muted">{node.label}</span>
          </div>
        );
      })}
    </motion.div>
  );
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

        {/* Mobile: timeline vertical, más legible en pantallas angostas que el diagrama radial */}
        <div className="mt-10 flex flex-col items-center sm:hidden">
          <MobileCentralNode node={CENTRAL_NODES[0]} index={0} />
          <MobileConnector delay={0.1} />
          <MobileCentralNode node={CENTRAL_NODES[1]} index={1} />
          <MobileConnector delay={0.2} />
          <MobileClusterGrid nodes={MOBILE_GROUP_1} delay={0.3} />
          <MobileConnector delay={0.4} />
          <MobileCentralNode node={CENTRAL_NODES[2]} index={2} />
          <MobileConnector delay={0.5} />
          <MobileClusterGrid nodes={MOBILE_GROUP_2} delay={0.6} />
          <MobileConnector delay={0.7} />
          <MobileCentralNode node={CENTRAL_NODES[3]} index={3} />
          <MobileConnector delay={0.8} />
          <MobileCentralNode node={CENTRAL_NODES[4]} index={4} />
        </div>

        {/* Desktop: diagrama radial */}
        <ScrollReveal className="mt-16 hidden sm:block">
        <div className="relative aspect-[2.1/1] w-full">
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
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
