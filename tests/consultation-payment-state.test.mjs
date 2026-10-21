import test from "node:test";
import assert from "node:assert/strict";
import { consultationPaymentState } from "../src/lib/pedir/consultationPaymentState.ts";

test("rejected payment #1489 is not displayed as processing or searching", () => {
  const state = consultationPaymentState({ estado: "preparando_pago", mp_status: "rejected" });
  assert.equal(state.kind, "rejected");
  assert.equal(state.title, "El pago no fue aprobado");
});

test("pending payment never invites a second payment", () => {
  for (const mp_status of [undefined, "pending", "in_process"]) {
    const state = consultationPaymentState({ estado: "preparando_pago", mp_status });
    assert.equal(state.kind, "pending");
    assert.match(state.description, /no lo repitas/);
  }
});

test("confirmed payment takes precedence over a stale rejected status", () => {
  const state = consultationPaymentState({ estado: "pago_pendiente", mp_status: "rejected", mp_preautorizado: true });
  assert.equal(state.kind, "approved");
  assert.match(state.description, /no vuelvas a pagar/);
});

test("normal consultation states keep their existing presentation", () => {
  for (const estado of ["buscando_medico", "asignada", "en_videollamada", "finalizada", "cancelada_sin_medico"]) {
    assert.equal(consultationPaymentState({ estado, mp_status: "approved" }), null);
  }
  assert.equal(consultationPaymentState(null), null);
});
