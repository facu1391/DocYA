// src/components/landing-public/nueva-landing/CoberturaDynamic.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function CoberturaDynamic() {
  return (
    <motion.div
      className="floating-card absolute"
      style={{ bottom: "1rem", right: "1rem", zIndex: 10 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <MapPin size={18} style={{ color: "var(--primary)" }} />
      <span>Geolocalización</span>
    </motion.div>
  );
}