"use client";

import { useActionState, useEffect, useRef } from "react";
import { createUserAction, type UserFormState } from "@/app/backend/gebruikers/actions";
import { Field, inputCls } from "./FormKit";

export function AddUserForm() {
  const [state, action, pending] = useActionState<UserFormState, FormData>(createUserAction, {});
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" htmlFor="name">
          <input id="name" name="name" className={inputCls} placeholder="Voor- en achternaam" />
        </Field>
        <Field label="Rol" htmlFor="role">
          <select id="role" name="role" defaultValue="staff" className={inputCls}>
            <option value="staff">Personeel</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
      </div>
      <Field label="E-mail" htmlFor="email">
        <input id="email" name="email" type="email" required className={inputCls} placeholder="naam@sp-projects.be" />
      </Field>
      <Field label="Wachtwoord" htmlFor="password" hint="Minstens 6 tekens. Geef dit door aan de gebruiker.">
        <input id="password" name="password" type="text" required className={inputCls} placeholder="Tijdelijk wachtwoord" />
      </Field>

      {state.error && (
        <div className="rounded-[3px] bg-brand-50 border border-brand-200 px-4 py-2.5 text-sm text-brand-700">{state.error}</div>
      )}
      {state.ok && (
        <div className="rounded-[3px] bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm text-emerald-700">
          Gebruiker toegevoegd — ze kunnen nu inloggen.
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="h-11 px-6 rounded-[3px] bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em] transition-colors disabled:opacity-60"
      >
        {pending ? "Toevoegen…" : "Gebruiker toevoegen"}
      </button>
    </form>
  );
}
