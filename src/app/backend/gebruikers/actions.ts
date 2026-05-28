"use server";

import { revalidatePath } from "next/cache";
import { getSession, hashPassword } from "@/lib/auth";
import { createUser, getUserByEmail, deleteUser, getUserById, updateUser, type Role } from "@/lib/db";

export type UserFormState = { error?: string; ok?: boolean };

export async function createUserAction(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  const session = await getSession();
  if (!session || session.role !== "admin") return { error: "Geen toegang." };

  const email = (formData.get("email") || "").toString().trim().toLowerCase();
  const name = (formData.get("name") || "").toString().trim() || null;
  const password = (formData.get("password") || "").toString();
  const role = ((formData.get("role") || "staff").toString()) as Role;

  if (!email.includes("@")) return { error: "Geef een geldig e-mailadres in." };
  if (password.length < 6) return { error: "Wachtwoord moet minstens 6 tekens zijn." };
  if (!["admin", "staff"].includes(role)) return { error: "Ongeldige rol." };

  const ownerEmail = (process.env.SP_ADMIN_EMAIL || "info@sp-projects.be").toLowerCase();
  if (email === ownerEmail) return { error: "Dit e-mailadres is het hoofdaccount." };
  if (getUserByEmail(email)) return { error: "Er bestaat al een gebruiker met dit e-mailadres." };

  createUser({ email, name, password_hash: hashPassword(password), role });
  revalidatePath("/backend/gebruikers");
  return { ok: true };
}

export async function updateUserAction(_prev: UserFormState, formData: FormData): Promise<UserFormState> {
  const session = await getSession();
  if (!session || session.role !== "admin") return { error: "Geen toegang." };

  const id = Number((formData.get("id") || "").toString());
  const target = id ? getUserById(id) : null;
  if (!target) return { error: "Gebruiker niet gevonden." };

  const name = (formData.get("name") || "").toString().trim() || null;
  const role = ((formData.get("role") || "staff").toString()) as Role;
  const password = (formData.get("password") || "").toString();

  if (!["admin", "staff"].includes(role)) return { error: "Ongeldige rol." };
  if (password && password.length < 6) return { error: "Wachtwoord moet minstens 6 tekens zijn." };

  // Voorkom dat je jezelf uit admin haalt (zou je toegang afnemen).
  const finalRole: Role = target.email === session.email ? "admin" : role;

  updateUser(id, {
    name,
    role: finalRole,
    password_hash: password ? hashPassword(password) : undefined,
  });
  revalidatePath("/backend/gebruikers");
  return { ok: true };
}

export async function deleteUserAction(formData: FormData) {
  const session = await getSession();
  if (!session || session.role !== "admin") return;

  const id = Number((formData.get("id") || "").toString());
  if (!id) return;

  const target = getUserById(id);
  if (target && target.email === session.email) return; // niet jezelf verwijderen

  deleteUser(id);
  revalidatePath("/backend/gebruikers");
}
