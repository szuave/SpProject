import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "node:crypto";
import { getUserByEmail, type Role } from "@/lib/db";

export const SESSION_COOKIE = "sp_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 dagen

function secret() {
  return process.env.SP_SESSION_SECRET || "sp-projects-dev-secret-change-me";
}
function adminEmail() {
  return (process.env.SP_ADMIN_EMAIL || "info@sp-projects.be").toLowerCase();
}
function adminPassword() {
  return process.env.SP_ADMIN_PASSWORD || "sp-projects";
}

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}
function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}
function constantEquals(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// ─── Password hashing (scrypt — geen externe dependency) ──────────────────────

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, salt, expected.length);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

// ─── Session ──────────────────────────────────────────────────────────────────

export type Session = { email: string; role: Role };

/**
 * Controleer inloggegevens. Eerst tegen de gebruikers-tabel, daarna tegen het
 * ingebouwde eigenaar-account uit de environment (altijd admin).
 */
export function authenticate(email: string, password: string): Session | null {
  const e = email.trim().toLowerCase();

  const user = getUserByEmail(e);
  if (user) {
    return verifyPassword(password, user.password_hash) ? { email: e, role: user.role } : null;
  }

  if (e === adminEmail() && constantEquals(password, adminPassword())) {
    return { email: e, role: "admin" };
  }

  return null;
}

export function createSessionToken(session: Session): string {
  const payload = b64url(JSON.stringify({ ...session, exp: Date.now() + MAX_AGE * 1000 }));
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): Session | null {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof data.exp !== "number" || data.exp < Date.now()) return null;
    if (typeof data.email !== "string") return null;
    // Alleen een expliciete 'staff'-rol = personeel. Ontbrekende rol (oude
    // sessies van vóór het rollensysteem) horen bij de eigenaar → admin.
    const role: Role = data.role === "staff" ? "staff" : "admin";
    return { email: data.email, role };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};
