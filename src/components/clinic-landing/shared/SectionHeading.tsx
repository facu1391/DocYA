// src/components/clinic-landing/shared/SectionHeading.tsx
import ScrollReveal from "./ScrollReveal";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: Props) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <ScrollReveal className={`max-w-2xl ${alignCls}`}>
      {eyebrow && <span className="badge-trusted">{eyebrow}</span>}
      <h2 className={`section-title mt-4 ${dark ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-text-muted"}`}>
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
