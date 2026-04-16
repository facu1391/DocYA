"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMedico, getToken } from "@/lib/recetario/auth";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    const medico = getMedico();
    if (!token || !medico) {
      router.replace("/recetario/login");
      return;
    }
    if (!medico.perfil_completo) {
      router.replace("/recetario/completar-perfil");
      return;
    }
    if (!medico.validado || !medico.matricula_validada) {
      router.replace("/recetario/cuenta-en-revision");
      return;
    }
    router.replace("/recetario/dashboard");
  }, [router]);
  return null;
}
