"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveRealisatie, type RealisatieFormState } from "@/app/backend/realisaties/actions";
import { Field, Card, inputCls } from "./FormKit";
import { ImageUploader } from "./ImageUploader";
import { slugify } from "@/lib/slugify";
import type { Realisatie } from "@/lib/db";

const SERVICE_OPTIONS = [
  { value: "dakwerken", label: "Dakwerken" },
  { value: "gevelwerken", label: "Gevelwerken" },
  { value: "renovatie", label: "Renovatie" },
];

export function RealisatieEditor({ realisatie }: { realisatie?: Realisatie }) {
  const [state, action, pending] = useActionState<RealisatieFormState, FormData>(saveRealisatie, {});
  const [title, setTitle] = useState(realisatie?.title ?? "");
  const [slug, setSlug] = useState(realisatie?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(realisatie?.slug));
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="max-w-4xl mx-auto space-y-6">
      {realisatie && <input type="hidden" name="id" value={realisatie.id} />}

      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/backend/realisaties" className="text-sm text-ink-3 hover:text-brand-600">← Realisaties</Link>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            {realisatie ? "Realisatie bewerken" : "Nieuwe realisatie"}
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <SubmitButtons pending={pending} />
        </div>
      </div>

      {state.error && (
        <div className="rounded-[3px] bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-700">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <div className="space-y-6">
          <Card title="Inhoud">
            <Field label="Titel" htmlFor="title" error={fe.title}>
              <input
                id="title" name="title" required value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugTouched) setSlug(slugify(e.target.value));
                }}
                className={inputCls} placeholder="Bv. Gevelrenovatie Gentbrugge"
              />
            </Field>
            <Field label="Slug (URL)" htmlFor="slug" hint="Wordt automatisch gemaakt op basis van de titel." error={fe.slug}>
              <input
                id="slug" name="slug" value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                className={inputCls} placeholder="gevelrenovatie-gentbrugge"
              />
            </Field>
            <Field label="Korte samenvatting" htmlFor="summary" hint="1 zin — verschijnt in de lijst." >
              <input id="summary" name="summary" defaultValue={realisatie?.summary ?? ""} className={inputCls} />
            </Field>
            <Field label="Beschrijving" htmlFor="description_md" hint="Ondersteunt Markdown (## kop, **vet**, lijstjes).">
              <textarea id="description_md" name="description_md" rows={10} defaultValue={realisatie?.description_md ?? ""} className={inputCls + " resize-y font-mono text-[13.5px]"} />
            </Field>
          </Card>

          <Card title="Afbeeldingen">
            <Field label="Hoofdafbeelding" hint="De cover die in de lijst en bovenaan de pagina verschijnt.">
              <ImageUploader name="cover_image" initial={realisatie?.cover_image ? [realisatie.cover_image] : []} />
            </Field>
            <Field label="Galerij (optioneel)" hint="Extra foto's onderaan de projectpagina.">
              <ImageUploader name="gallery" multiple initial={realisatie?.gallery ?? []} />
            </Field>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card title="Publicatie">
            <Field label="Status" htmlFor="status">
              <select id="status" name="status" defaultValue={realisatie?.status ?? "published"} className={inputCls}>
                <option value="published">Gepubliceerd</option>
                <option value="draft">Concept</option>
              </select>
            </Field>
            <Field label="Categorie" htmlFor="service_type" error={fe.service_type}>
              <select id="service_type" name="service_type" defaultValue={realisatie?.service_type ?? "renovatie"} className={inputCls}>
                {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="Locatie" htmlFor="location">
              <input id="location" name="location" defaultValue={realisatie?.location ?? ""} className={inputCls} placeholder="Gent" />
            </Field>
            <Field label="Oppervlakte (m²)" htmlFor="surface_m2" error={fe.surface_m2}>
              <input id="surface_m2" name="surface_m2" inputMode="numeric" defaultValue={realisatie?.surface_m2 ?? ""} className={inputCls} />
            </Field>
            <Field label="Opgeleverd op" htmlFor="completed_on">
              <input id="completed_on" name="completed_on" type="date" defaultValue={realisatie?.completed_on ?? ""} className={inputCls} />
            </Field>
          </Card>
          <div className="sm:hidden">
            <SubmitButtons pending={pending} stacked />
          </div>
        </div>
      </div>
    </form>
  );
}

function SubmitButtons({ pending, stacked }: { pending: boolean; stacked?: boolean }) {
  return (
    <div className={stacked ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center h-11 px-6 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em] rounded-[3px] transition-colors disabled:opacity-60"
      >
        {pending ? "Opslaan…" : "Opslaan"}
      </button>
      <Link
        href="/backend/realisaties"
        className="inline-flex items-center justify-center h-11 px-6 border border-border hover:border-ink text-ink text-[13px] font-bold uppercase tracking-[0.08em] rounded-[3px] transition-colors"
      >
        Annuleren
      </Link>
    </div>
  );
}
