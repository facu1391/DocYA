// src/components/software-landing/shared/SectionHeading.tsx
import ScrollReveal from "@/components/clinic-landing/shared/ScrollReveal";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <ScrollReveal className={`flex max-w-2xl flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wider text-[var(--sw-teal)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--sw-text)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-[var(--sw-subtle)]">{description}</p>
      )}
    </ScrollReveal>
  );
}
