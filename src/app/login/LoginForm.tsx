"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const field =
  "w-full h-12 rounded-[3px] border border-border bg-white px-4 text-[15px] text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-colors";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="block text-sm font-semibold mb-1.5">E-mail</label>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue="" className={field} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold mb-1.5">Wachtwoord</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={field} />
      </div>

      {state.error && (
        <div className="rounded-[3px] bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-12 rounded-[3px] bg-brand-500 hover:bg-brand-600 text-white font-bold uppercase tracking-[0.08em] text-[13px] transition-colors disabled:opacity-60"
      >
        {pending ? "Bezig met inloggen…" : "Inloggen"}
      </button>
    </form>
  );
}
