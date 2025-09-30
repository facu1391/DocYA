
export default function Footer() {
  return (
    <footer className=" border-t bg-[var(--footer-bg)] border-[var(--footer-border)]">
      <div className="container py-8 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} DocYa Pro — Todos los derechos reservados.
      </div>
    </footer>
  );
}
