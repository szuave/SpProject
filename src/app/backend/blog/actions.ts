"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { createBlog, updateBlog, deleteBlog, type BlogInput, type Status } from "@/lib/db";

export type BlogFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function revalidateBlog(slug: string) {
  revalidatePath("/backend/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}

export async function saveBlogPost(
  _prev: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  if (!(await getSession())) return { error: "Niet ingelogd." };

  const idRaw = (formData.get("id") || "").toString().trim();
  const id = idRaw ? Number(idRaw) : null;

  const title = (formData.get("title") || "").toString().trim();
  const slugRaw = (formData.get("slug") || "").toString().trim();
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);
  const status = ((formData.get("status") || "draft").toString()) as Status;

  const fieldErrors: Record<string, string> = {};
  if (title.length < 2) fieldErrors.title = "Titel is verplicht.";
  if (!slug) fieldErrors.slug = "Slug is verplicht.";
  if (Object.keys(fieldErrors).length) return { error: "Controleer de gemarkeerde velden.", fieldErrors };

  const input: BlogInput = {
    slug,
    title,
    excerpt: (formData.get("excerpt") || "").toString().trim() || null,
    content_md: (formData.get("content_md") || "").toString(),
    cover_image: (formData.get("cover_image") || "").toString().trim() || null,
    tags: (formData.get("tags") || "")
      .toString()
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    status,
  };

  try {
    if (id) updateBlog(id, input);
    else createBlog(input);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Onbekende fout.";
    if (msg.includes("UNIQUE")) return { error: "Deze slug bestaat al — kies een andere.", fieldErrors: { slug: "Bestaat al." } };
    return { error: msg };
  }

  revalidateBlog(slug);
  redirect("/backend/blog");
}

export async function deleteBlogPostAction(formData: FormData) {
  if (!(await getSession())) return;
  const id = Number((formData.get("id") || "").toString());
  if (!id) return;
  deleteBlog(id);
  revalidatePath("/backend/blog");
  revalidatePath("/blog");
  revalidatePath("/");
}
