"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icons";

const fieldBase =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-ink placeholder:text-ink-4 focus:border-brand-500 focus:outline-none transition-colors";
const labelBase = "block text-sm font-semibold text-ink mb-1.5";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setState("ok");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-2xl border border-border bg-surface-2 p-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink">Bedankt voor uw aanvraag!</h3>
        <p className="mt-2 text-ink-2">
          We nemen doorgaans binnen 1 à 2 werkdagen contact met u op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={labelBase}>Naam</label>
          <input id="naam" name="naam" type="text" required placeholder="Uw naam" className={fieldBase} />
        </div>
        <div>
          <label htmlFor="tel" className={labelBase}>Telefoon</label>
          <input id="tel" name="tel" type="tel" required placeholder="0486 ..." className={fieldBase} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={labelBase}>E-mail</label>
        <input id="email" name="email" type="email" required placeholder="naam@voorbeeld.be" className={fieldBase} />
      </div>
      <div>
        <label htmlFor="dienst" className={labelBase}>Type werk</label>
        <select id="dienst" name="dienst" className={fieldBase}>
          <option>Algemene vraag</option>
          <option>Dakwerken</option>
          <option>Gevelwerken</option>
          <option>Algemene renovatiewerken</option>
          <option>Andere werken</option>
        </select>
      </div>
      <div>
        <label htmlFor="bericht" className={labelBase}>Uw bericht</label>
        <textarea
          id="bericht"
          name="bericht"
          required
          rows={5}
          placeholder="Beschrijf kort uw project, locatie en gewenste timing..."
          className={fieldBase + " resize-y"}
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-brand-600">
          Er ging iets mis. Bel ons gerust rechtstreeks of probeer opnieuw.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={state === "sending"}
        iconRight={<ArrowRight className="h-5 w-5" />}
      >
        {state === "sending" ? "Versturen..." : "Verstuur aanvraag"}
      </Button>
      <p className="text-sm text-ink-3">
        Uw gegevens worden enkel gebruikt om uw aanvraag te behandelen.
      </p>
    </form>
  );
}
