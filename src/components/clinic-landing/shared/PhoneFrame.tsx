// src/components/clinic-landing/shared/PhoneFrame.tsx
interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = "" }: Props) {
  return (
    <div
      className={`relative aspect-[9/19] w-[240px] shrink-0 rounded-[2.5rem] border-[6px] border-[#0a272c] bg-[#0a272c] shadow-2xl md:w-[280px] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-white to-slate-100">
        {children}
      </div>
    </div>
  );
}
