// src/components/referidos/dashboard/DashboardShell.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  DollarSign,
  LinkIcon,
  LogOut,
  ChevronRight,
  Menu,
  Loader2,
  TriangleAlert,
} from "lucide-react";
import {
  Referente,
  TIPO_LABEL,
  clearReferidosSession,
  getStoredReferente,
  getStoredToken,
  setStoredReferente,
  initials,
} from "@/lib/referidos";

const API = process.env.NEXT_PUBLIC_API_BASE!;

const NAV = [
  { icon: BarChart3, label: "Mi Panel", href: "/referidos/panel" },
  { icon: Users, label: "Mis Referidos", href: "/referidos/mis-referidos" },
  { icon: DollarSign, label: "Cobros", href: "/referidos/cobros" },
  { icon: LinkIcon, label: "Mi Link", href: "/referidos/link" },
];

function ConfirmLogoutModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#08111c] p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <TriangleAlert className="h-6 w-6" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-xl font-black text-white">
                    ¿Cerrar sesión?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Vas a salir del panel de referidos y tendrás que volver a
                    iniciar sesión para ingresar nuevamente.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600"
                >
                  Sí, cerrar sesión
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [referente, setReferente] = useState<Referente | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    const stored = getStoredReferente();

    if (!token || !stored) {
      router.replace("/referidos/login");
      return;
    }

    setReferente(stored);

    // Sincronizar código y link con el backend (puede haber cambiado desde admin)
    fetch(`${API}/referidos/${stored.id}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data) return;
        if (
          data.codigo_referido !== stored.codigo_referido ||
          data.link_referido !== stored.link_referido
        ) {
          const updated: Referente = {
            ...stored,
            codigo_referido: data.codigo_referido,
            link_referido: data.link_referido,
          };
          setStoredReferente(updated);
          setReferente(updated);
        }
      })
      .catch(() => {});
  }, [router]);

  const handleLogout = () => {
    clearReferidosSession();
    router.push("/referidos/login");
  };

  const requestLogout = () => {
    setSidebarOpen(false);
    setLogoutModalOpen(true);
  };

  if (!referente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070d14] text-white">
        <Loader2 className="w-8 h-8 text-teal-400 animate-spin" />
      </div>
    );
  }

  const ini = initials(referente.full_name);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6 mb-2">
        <Image
          src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
          alt="DocYa"
          width={100}
          height={32}
          className="h-8 w-auto object-contain"
          unoptimized
        />
      </div>

      <nav className="flex flex-col gap-1 px-3 flex-1">
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-teal-500/10 text-white border border-teal-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${
                  active ? "text-teal-400" : "text-slate-500"
                }`}
              />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3 h-3 text-teal-400" />}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06] mt-auto">
        <div className="flex items-center gap-3 px-2 mb-3">
          <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {ini}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {referente.full_name}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {TIPO_LABEL[referente.tipo] ?? referente.tipo}
            </p>
          </div>
        </div>

        <button
          onClick={requestLogout}
          className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen flex bg-[#070d14] text-white">
        <aside className="hidden md:flex w-64 flex-shrink-0 flex-col border-r border-white/[0.06] bg-black/20 backdrop-blur-xl">
          <SidebarContent />
        </aside>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              />

              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", damping: 28, stiffness: 260 }}
                className="md:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#08111c] border-r border-white/[0.06]"
              >
                <SidebarContent />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 min-w-0">
          <header className="md:hidden sticky top-0 z-30 border-b border-white/[0.06] bg-[#070d14]/80 backdrop-blur-xl">
            <div className="px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
                aria-label="Abrir menú"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>

              <Image
                src="https://res.cloudinary.com/dqsacd9ez/image/upload/v1757197807/logoblanco_1_qdlnog.png"
                alt="DocYa"
                width={90}
                height={28}
                className="h-7 w-auto object-contain"
                unoptimized
              />

              <button
                onClick={requestLogout}
                className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </header>

          {children}
        </div>
      </div>

      <ConfirmLogoutModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}