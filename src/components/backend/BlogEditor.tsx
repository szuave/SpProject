"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { saveBlogPost, type BlogFormState } from "@/app/backend/blog/actions";
import { Field, Card, inputCls } from "./FormKit";
import { ImageUploader } from "./ImageUploader";
import { slugify } from "@/lib/slugify";
import type { BlogPost } from "@/lib/db";

export function BlogEditor({ post }: { post?: BlogPost }) {
  const [state, action, pending] = useActionState<BlogFormState, FormData>(saveBlogPost, {});
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="max-w-4xl mx-auto space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/backend/blog" className="text-sm text-ink-3 hover:text-brand-600">← Blog</Link>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            {post ? "Artikel bewerken" : "Nieuw blogartikel"}
          </h1>
        </div>
        <div className="hidden sm:block">
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
          <Card title="Artikel">
            <Field label="Titel" htmlFor="title" error={fe.title}>
              <input
                id="title" name="title" required value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugTouched) setSlug(slugify(e.target.value));
                }}
                className={inputCls} placeholder="Bv. EPDM of roofing: welk plat dak kiezen?"
              />
            </Field>
            <Field label="Slug (URL)" htmlFor="slug" hint="Automatisch op basis van de titel." error={fe.slug}>
              <input
                id="slug" name="slug" value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
                className={inputCls}
              />
            </Field>
            <Field label="Intro / samenvatting" htmlFor="excerpt" hint="Verschijnt in de bloglijst en previews.">
              <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt ?? ""} className={inputCls + " resize-y"} />
            </Field>
            <Field label="Inhoud" htmlFor="content_md" hint="Markdown: ## kop, **vet**, - lijst, [link](/contact).">
              <textarea id="content_md" name="content_md" rows={16} defaultValue={post?.content_md ?? ""} className={inputCls + " resize-y font-mono text-[13.5px]"} />
            </Field>
          </Card>
        </div>

        <div className="space-y-6 lg:sticky lg:top-6">
          <Card title="Publicatie">
            <Field label="Status" htmlFor="status">
              <select id="status" name="status" defaultValue={post?.status ?? "published"} className={inputCls}>
                <option value="published">Gepubliceerd</option>
                <option value="draft">Concept</option>
              </select>
            </Field>
            <Field label="Hoofdafbeelding" hint="Verschijnt bovenaan het artikel en in de lijst.">
              <ImageUploader name="cover_image" initial={post?.cover_image ? [post.cover_image] : []} />
            </Field>
            <Field label="Tags" htmlFor="tags" hint="Gescheiden door komma's.">
              <input id="tags" name="tags" defaultValue={(post?.tags ?? []).join(", ")} className={inputCls} placeholder="dakwerken, isolatie" />
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
        href="/backend/blog"
        className="inline-flex items-center justify-center h-11 px-6 border border-border hover:border-ink text-ink text-[13px] font-bold uppercase tracking-[0.08em] rounded-[3px] transition-colors"
      >
        Annuleren
      </Link>
    </div>
  );
}
