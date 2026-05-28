"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import {
  createRealisatie,
  updateRealisatie,
  deleteRealisatie,
  type RealisatieInput,
  type Status,
} from "@/lib/db";

export type RealisatieFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

const SERVICE_TYPES = ["dakwerken", "gevelwerken", "renovatie"];

function revalidateRealisaties(slug: string) {
  revalidatePath("/backend/realisaties");
  revalidatePath("/realisaties");
  revalidatePath(`/realisaties/${slug}`);
  revalidatePath("/");
}

export async function saveRealisatie(
  _prev: RealisatieFormState,
  formData: FormData,
): Promise<RealisatieFormState> {
  if (!(await getSession())) return { error: "Niet ingelogd." };

  const idRaw = (formData.get("id") || "").toString().trim();
  const id = idRaw ? Number(idRaw) : null;

  const title = (formData.get("title") || "").toString().trim();
  const slugRaw = (formData.get("slug") || "").toString().trim();
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);
  const status = ((formData.get("status") || "draft").toString()) as Status;
  const service_type = (formData.get("service_type") || "").toString().trim() || null;
  const surfaceRaw = (formData.get("surface_m2") || "").toString().trim();

  const fieldErrors: Record<string, string> = {};
  if (title.length < 2) fieldErrors.title = "Titel is verplicht.";
  if (!slug) fieldErrors.slug = "Slug is verplicht.";
  if (service_type && !SERVICE_TYPES.includes(service_type)) fieldErrors.service_type = "Ongeldige categorie.";
  if (surfaceRaw && !/^\d+$/.test(surfaceRaw)) fieldErrors.surface_m2 = "Geef een getal in (m²).";
  if (Object.keys(fieldErrors).length) return { error: "Controleer de gemarkeerde velden.", fieldErrors };

  const input: RealisatieInput = {
    slug,
    title,
    summary: (formData.get("summary") || "").toString().trim() || null,
    description_md: (formData.get("description_md") || "").toString(),
    location: (formData.get("location") || "").toString().trim() || null,
    service_type,
    cover_image: (formData.get("cover_image") || "").toString().trim() || null,
    gallery: formData
      .getAll("gallery")
      .map((v) => v.toString().trim())
      .filter(Boolean),
    surface_m2: surfaceRaw ? Number(surfaceRaw) : null,
    completed_on: (formData.get("completed_on") || "").toString().trim() || null,
    status,
  };

  try {
    if (id) updateRealisatie(id, input);
    else createRealisatie(input);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Onbekende fout.";
    if (msg.includes("UNIQUE")) return { error: "Deze slug bestaat al — kies een andere.", fieldErrors: { slug: "Bestaat al." } };
    return { error: msg };
  }

  revalidateRealisaties(slug);
  redirect("/backend/realisaties");
}

export async function deleteRealisatieAction(formData: FormData) {
  if (!(await getSession())) return;
  const id = Number((formData.get("id") || "").toString());
  if (!id) return;
  deleteRealisatie(id);
  revalidatePath("/backend/realisaties");
  revalidatePath("/realisaties");
  revalidatePath("/");
}
