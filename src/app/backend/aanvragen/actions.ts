"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { setLeadStatus, deleteLead, type LeadStatus } from "@/lib/db";

const VALID: LeadStatus[] = ["new", "accepted", "rejected"];

export async function updateLeadStatus(formData: FormData) {
  if (!(await getSession())) return;
  const id = Number((formData.get("id") || "").toString());
  const status = (formData.get("status") || "").toString() as LeadStatus;
  if (!id || !VALID.includes(status)) return;
  setLeadStatus(id, status);
  revalidatePath("/backend/aanvragen");
  revalidatePath("/backend");
}

export async function deleteLeadAction(formData: FormData) {
  if (!(await getSession())) return;
  const id = Number((formData.get("id") || "").toString());
  if (!id) return;
  deleteLead(id);
  revalidatePath("/backend/aanvragen");
  revalidatePath("/backend");
}
