"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  authenticate,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = (formData.get("email") || "").toString();
  const password = (formData.get("password") || "").toString();

  const session = authenticate(email, password);
  if (!session) {
    return { error: "E-mail of wachtwoord onjuist." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(session), sessionCookieOptions);
  redirect("/backend");
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}
