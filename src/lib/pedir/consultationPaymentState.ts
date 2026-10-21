type PaymentStateInput = { estado?: string; mp_status?: string; mp_preautorizado?: boolean; mp_capturado?: boolean };

/** El pago pendiente nunca debe presentarse como una búsqueda de médico. */
export function consultationPaymentState(data: PaymentStateInput | null) {
  if (!data || !["preparando_pago", "pago_pendiente"].includes(data.estado ?? "")) return null;
  const status = (data.mp_status ?? "").toLowerCase();
  if (data.mp_preautorizado || data.mp_capturado || ["approved", "authorized", "preautorizado", "approved_manual_transfer", "approved_referral_reward"].includes(status)) {
    return { kind: "approved", title: "Tu pago fue confirmado", description: "La solicitud todavía no comenzó a buscar un médico. Contactanos para ayudarte a continuar; no vuelvas a pagar." } as const;
  }
  if (["rejected", "cancelled", "canceled"].includes(status)) {
    return { kind: "rejected", title: "El pago no fue aprobado", description: "No se inició la búsqueda de un médico. Podés volver a solicitar la atención y elegir otro medio de pago." } as const;
  }
  if (["refunded", "charged_back"].includes(status)) {
    return { kind: "returned", title: "El pago fue devuelto o revertido", description: "Esta solicitud no está buscando un médico. Contactanos si necesitás ayuda con el pago." } as const;
  }
  return { kind: "pending", title: "Esperando confirmación del pago", description: "Todavía no comenzó la búsqueda de un médico. Estamos verificando el estado del pago; si ya pagaste, no lo repitas." } as const;
}
