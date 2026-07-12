// src/components/seo/SeoContentSection.tsx
import ScrollReveal from "@/components/landing-public/nueva-landing/ScrollReveal";

interface SeoContentSectionProps {
  id?: string;
  heading: string;
  paragraphs: string[];
}

export default function SeoContentSection({ id, heading, paragraphs }: SeoContentSectionProps) {
  return (
    <section id={id} className="py-10 md:py-14">
      <div className="mx-auto w-full max-w-3xl px-6">
        <ScrollReveal>
          <h2 className="section-title text-2xl md:text-3xl mb-5">{heading}</h2>
          <div className="space-y-4 text-text-muted text-base md:text-lg leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
