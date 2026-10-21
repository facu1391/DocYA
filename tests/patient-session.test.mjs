import test from "node:test";
import assert from "node:assert/strict";
import { patientFetch, PatientSessionError, PATIENT_SESSION_INVALID, patientTokenExpired } from "../src/lib/pedir/session.ts";

const jwt = exp => `header.${Buffer.from(JSON.stringify({ exp })).toString("base64url")}.signature`;

test("patient session handling", async t => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const events = [];
  globalThis.window = { dispatchEvent: event => { events.push(event.type); return true; } };
  t.after(() => { globalThis.fetch = originalFetch; globalThis.window = originalWindow; });

  await t.test("expired JWT stops a payment request before reaching the server", async () => {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return new Response(); };
    const token = jwt(Math.floor(Date.now() / 1000) - 1);
    assert.equal(patientTokenExpired(token), true);
    await assert.rejects(patientFetch("https://api.example/consultas/crear_previa", {
      method: "POST", headers: { Authorization: `Bearer ${token}` }, body: "{}",
    }), PatientSessionError);
    assert.equal(calls, 0);
    assert.equal(events.at(-1), PATIENT_SESSION_INVALID);
  });

  await t.test("authenticated 401 requests login without replaying the operation", async () => {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return new Response("invalid token", { status: 401 }); };
    const init = { method: "POST", headers: new Headers({ Authorization: "Bearer rejected-session" }) };
    await assert.rejects(patientFetch("https://api.example/patient-family", init), PatientSessionError);
    await assert.rejects(patientFetch("https://api.example/patient-family", init), PatientSessionError);
    assert.equal(calls, 1);
  });

  await t.test("a new valid session sends the request and preserves its response", async () => {
    const response = new Response('{"consulta_id":123}', { status: 201 });
    let calls = 0;
    const init = { method: "POST", headers: { Authorization: `Bearer ${jwt(Math.floor(Date.now() / 1000) + 3600)}` }, body: "{}" };
    globalThis.fetch = async (input, options) => { calls++; assert.equal(options, init); return response; };
    assert.equal(await patientFetch("https://api.example/consultas/crear_previa", init), response);
    assert.equal(calls, 1);
  });

  await t.test("public 401 and authenticated 403/500 do not invalidate the session", async () => {
    const count = events.length;
    for (const status of [401, 403, 500]) {
      globalThis.fetch = async () => new Response(null, { status });
      const init = status === 401 ? undefined : { headers: [["Authorization", "Bearer valid-session"]] };
      assert.equal((await patientFetch("https://api.example/resource", init)).status, status);
    }
    assert.equal(events.length, count);
  });

  await t.test("network errors retain their original cause and do not request login", async () => {
    const error = new TypeError("Network unavailable");
    const count = events.length;
    globalThis.fetch = async () => { throw error; };
    await assert.rejects(patientFetch("https://api.example/resource", { headers: { Authorization: "Bearer network-session" } }), e => e === error);
    assert.equal(events.length, count);
  });

  await t.test("Request objects use their own authorization header", async () => {
    globalThis.fetch = async () => new Response(null, { status: 401 });
    await assert.rejects(patientFetch(new Request("https://api.example/resource", { headers: { Authorization: "Bearer request-session" } })), PatientSessionError);
  });
});
