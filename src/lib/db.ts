import "server-only";
import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import {
  SEED_REALISATIES,
  SEED_BLOG_POSTS,
} from "@/content/seed";

// ─── Types ──────────────────────────────────────────────────────────────────

export type Status = "draft" | "published" | "archived";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  cover_image: string | null;
  tags: string[];
  status: Status;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Realisatie = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  description_md: string;
  location: string | null;
  service_type: string | null;
  cover_image: string | null;
  gallery: string[];
  surface_m2: number | null;
  completed_on: string | null;
  status: Status;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Role = "admin" | "staff";

export type User = {
  id: number;
  email: string;
  name: string | null;
  password_hash: string;
  role: Role;
  created_at: string;
};

export type LeadStatus = "new" | "accepted" | "rejected";

export type Lead = {
  id: number;
  naam: string;
  email: string;
  tel: string | null;
  dienst: string | null;
  bericht: string;
  bron: string;
  status: LeadStatus;
  created_at: string;
};

// ─── Connection (singleton) ───────────────────────────────────────────────────

let _db: Database.Database | null = null;

function nowIso() {
  return new Date().toISOString();
}

export function getDb(): Database.Database {
  if (_db) return _db;

  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const db = new Database(join(dir, "sp.db"));
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      slug         TEXT UNIQUE NOT NULL,
      title        TEXT NOT NULL,
      excerpt      TEXT,
      content_md   TEXT NOT NULL DEFAULT '',
      cover_image  TEXT,
      tags         TEXT NOT NULL DEFAULT '[]',
      status       TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT,
      created_at   TEXT NOT NULL,
      updated_at   TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS realisaties (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      slug           TEXT UNIQUE NOT NULL,
      title          TEXT NOT NULL,
      summary        TEXT,
      description_md TEXT NOT NULL DEFAULT '',
      location       TEXT,
      service_type   TEXT,
      cover_image    TEXT,
      gallery        TEXT NOT NULL DEFAULT '[]',
      surface_m2     INTEGER,
      completed_on   TEXT,
      status         TEXT NOT NULL DEFAULT 'draft',
      published_at   TEXT,
      created_at     TEXT NOT NULL,
      updated_at     TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT UNIQUE NOT NULL,
      name          TEXT,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'staff',
      created_at    TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS leads (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      naam       TEXT NOT NULL,
      email      TEXT NOT NULL,
      tel        TEXT,
      dienst     TEXT,
      bericht    TEXT NOT NULL,
      bron       TEXT NOT NULL DEFAULT 'contact',
      status     TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL
    );
  `);

  seedIfEmpty(db);

  _db = db;
  return db;
}

function seedIfEmpty(db: Database.Database) {
  const blogCount = (db.prepare("SELECT COUNT(*) AS n FROM blog_posts").get() as { n: number }).n;
  if (blogCount === 0) {
    const insert = db.prepare(`
      INSERT INTO blog_posts (slug, title, excerpt, content_md, cover_image, tags, status, published_at, created_at, updated_at)
      VALUES (@slug, @title, @excerpt, @content_md, @cover_image, @tags, @status, @published_at, @created_at, @updated_at)
    `);
    const tx = db.transaction(() => {
      for (const p of SEED_BLOG_POSTS) {
        insert.run({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          content_md: p.content_md,
          cover_image: p.cover_image,
          tags: JSON.stringify(p.tags),
          status: p.status,
          published_at: p.published_at,
          created_at: p.published_at ?? nowIso(),
          updated_at: p.published_at ?? nowIso(),
        });
      }
    });
    tx();
  }

  const realCount = (db.prepare("SELECT COUNT(*) AS n FROM realisaties").get() as { n: number }).n;
  if (realCount === 0) {
    const insert = db.prepare(`
      INSERT INTO realisaties (slug, title, summary, description_md, location, service_type, cover_image, gallery, surface_m2, completed_on, status, published_at, created_at, updated_at)
      VALUES (@slug, @title, @summary, @description_md, @location, @service_type, @cover_image, @gallery, @surface_m2, @completed_on, @status, @published_at, @created_at, @updated_at)
    `);
    const tx = db.transaction(() => {
      for (const r of SEED_REALISATIES) {
        const ts = r.completed_on ? new Date(r.completed_on).toISOString() : nowIso();
        insert.run({
          slug: r.slug,
          title: r.title,
          summary: r.summary,
          description_md: r.description_md,
          location: r.location,
          service_type: r.service_type,
          cover_image: r.cover_image,
          gallery: JSON.stringify(r.gallery),
          surface_m2: r.surface_m2,
          completed_on: r.completed_on,
          status: r.status,
          published_at: r.status === "published" ? ts : null,
          created_at: ts,
          updated_at: ts,
        });
      }
    });
    tx();
  }
}

// ─── Row mappers ──────────────────────────────────────────────────────────────

type BlogRow = Omit<BlogPost, "tags"> & { tags: string };
type RealisatieRow = Omit<Realisatie, "gallery"> & { gallery: string };

function mapBlog(row: BlogRow): BlogPost {
  return { ...row, tags: safeArray(row.tags) };
}
function mapRealisatie(row: RealisatieRow): Realisatie {
  return { ...row, gallery: safeArray(row.gallery) };
}
function safeArray(s: string): string[] {
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

// ─── Blog queries ─────────────────────────────────────────────────────────────

export function listPublishedBlog(limit = 100): BlogPost[] {
  const rows = getDb()
    .prepare(
      `SELECT * FROM blog_posts WHERE status = 'published'
       ORDER BY (published_at IS NULL), published_at DESC, id DESC LIMIT ?`,
    )
    .all(limit) as BlogRow[];
  return rows.map(mapBlog);
}

export function getPublishedBlog(slug: string): BlogPost | null {
  const row = getDb()
    .prepare(`SELECT * FROM blog_posts WHERE slug = ? AND status = 'published'`)
    .get(slug) as BlogRow | undefined;
  return row ? mapBlog(row) : null;
}

export function listAllBlog(): BlogPost[] {
  const rows = getDb()
    .prepare(`SELECT * FROM blog_posts ORDER BY (published_at IS NULL) DESC, updated_at DESC, id DESC`)
    .all() as BlogRow[];
  return rows.map(mapBlog);
}

export function getBlogById(id: number): BlogPost | null {
  const row = getDb().prepare(`SELECT * FROM blog_posts WHERE id = ?`).get(id) as BlogRow | undefined;
  return row ? mapBlog(row) : null;
}

export type BlogInput = {
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  cover_image: string | null;
  tags: string[];
  status: Status;
};

export function createBlog(input: BlogInput): number {
  const ts = nowIso();
  const published_at = input.status === "published" ? ts : null;
  const info = getDb()
    .prepare(
      `INSERT INTO blog_posts (slug, title, excerpt, content_md, cover_image, tags, status, published_at, created_at, updated_at)
       VALUES (@slug, @title, @excerpt, @content_md, @cover_image, @tags, @status, @published_at, @created_at, @updated_at)`,
    )
    .run({
      ...input,
      tags: JSON.stringify(input.tags),
      published_at,
      created_at: ts,
      updated_at: ts,
    });
  return Number(info.lastInsertRowid);
}

export function updateBlog(id: number, input: BlogInput): void {
  const existing = getBlogById(id);
  if (!existing) throw new Error("Blogartikel niet gevonden.");
  const ts = nowIso();
  // Set published_at the first time it goes live; clear when back to draft.
  let published_at = existing.published_at;
  if (input.status === "published" && !existing.published_at) published_at = ts;
  if (input.status !== "published") published_at = input.status === "draft" ? null : existing.published_at;
  getDb()
    .prepare(
      `UPDATE blog_posts SET slug=@slug, title=@title, excerpt=@excerpt, content_md=@content_md,
       cover_image=@cover_image, tags=@tags, status=@status, published_at=@published_at, updated_at=@updated_at
       WHERE id=@id`,
    )
    .run({
      ...input,
      tags: JSON.stringify(input.tags),
      published_at,
      updated_at: ts,
      id,
    });
}

export function deleteBlog(id: number): void {
  getDb().prepare(`DELETE FROM blog_posts WHERE id = ?`).run(id);
}

// ─── Realisatie queries ─────────────────────────────────────────────────────

export function listPublishedRealisaties(opts: { serviceType?: string; limit?: number } = {}): Realisatie[] {
  let sql = `SELECT * FROM realisaties WHERE status = 'published'`;
  const params: (string | number)[] = [];
  if (opts.serviceType) {
    sql += ` AND service_type = ?`;
    params.push(opts.serviceType);
  }
  sql += ` ORDER BY (completed_on IS NULL), completed_on DESC, id DESC LIMIT ?`;
  params.push(opts.limit ?? 100);
  const rows = getDb().prepare(sql).all(...params) as RealisatieRow[];
  return rows.map(mapRealisatie);
}

export function getPublishedRealisatie(slug: string): Realisatie | null {
  const row = getDb()
    .prepare(`SELECT * FROM realisaties WHERE slug = ? AND status = 'published'`)
    .get(slug) as RealisatieRow | undefined;
  return row ? mapRealisatie(row) : null;
}

export function listAllRealisaties(): Realisatie[] {
  const rows = getDb()
    .prepare(`SELECT * FROM realisaties ORDER BY (completed_on IS NULL), completed_on DESC, id DESC`)
    .all() as RealisatieRow[];
  return rows.map(mapRealisatie);
}

export function getRealisatieById(id: number): Realisatie | null {
  const row = getDb().prepare(`SELECT * FROM realisaties WHERE id = ?`).get(id) as RealisatieRow | undefined;
  return row ? mapRealisatie(row) : null;
}

export type RealisatieInput = {
  slug: string;
  title: string;
  summary: string | null;
  description_md: string;
  location: string | null;
  service_type: string | null;
  cover_image: string | null;
  gallery: string[];
  surface_m2: number | null;
  completed_on: string | null;
  status: Status;
};

export function createRealisatie(input: RealisatieInput): number {
  const ts = nowIso();
  const published_at = input.status === "published" ? ts : null;
  const info = getDb()
    .prepare(
      `INSERT INTO realisaties (slug, title, summary, description_md, location, service_type, cover_image, gallery, surface_m2, completed_on, status, published_at, created_at, updated_at)
       VALUES (@slug, @title, @summary, @description_md, @location, @service_type, @cover_image, @gallery, @surface_m2, @completed_on, @status, @published_at, @created_at, @updated_at)`,
    )
    .run({
      ...input,
      gallery: JSON.stringify(input.gallery),
      published_at,
      created_at: ts,
      updated_at: ts,
    });
  return Number(info.lastInsertRowid);
}

export function updateRealisatie(id: number, input: RealisatieInput): void {
  const existing = getRealisatieById(id);
  if (!existing) throw new Error("Realisatie niet gevonden.");
  const ts = nowIso();
  let published_at = existing.published_at;
  if (input.status === "published" && !existing.published_at) published_at = ts;
  if (input.status === "draft") published_at = null;
  getDb()
    .prepare(
      `UPDATE realisaties SET slug=@slug, title=@title, summary=@summary, description_md=@description_md,
       location=@location, service_type=@service_type, cover_image=@cover_image, gallery=@gallery,
       surface_m2=@surface_m2, completed_on=@completed_on, status=@status, published_at=@published_at, updated_at=@updated_at
       WHERE id=@id`,
    )
    .run({
      ...input,
      gallery: JSON.stringify(input.gallery),
      published_at,
      updated_at: ts,
      id,
    });
}

export function deleteRealisatie(id: number): void {
  getDb().prepare(`DELETE FROM realisaties WHERE id = ?`).run(id);
}

// ─── Users (admin / personeel) ────────────────────────────────────────────────

export type CreateUserInput = {
  email: string;
  name: string | null;
  password_hash: string;
  role: Role;
};

export function createUser(input: CreateUserInput): number {
  const info = getDb()
    .prepare(
      `INSERT INTO users (email, name, password_hash, role, created_at)
       VALUES (@email, @name, @password_hash, @role, @created_at)`,
    )
    .run({ ...input, email: input.email.toLowerCase(), created_at: nowIso() });
  return Number(info.lastInsertRowid);
}

export function listUsers(): User[] {
  return getDb().prepare(`SELECT * FROM users ORDER BY role='admin' DESC, id ASC`).all() as User[];
}

export function getUserByEmail(email: string): User | null {
  return (
    (getDb().prepare(`SELECT * FROM users WHERE email = ?`).get(email.toLowerCase()) as User | undefined) ?? null
  );
}

export function getUserById(id: number): User | null {
  return (getDb().prepare(`SELECT * FROM users WHERE id = ?`).get(id) as User | undefined) ?? null;
}

export function updateUser(
  id: number,
  fields: { name: string | null; role: Role; password_hash?: string },
): void {
  const sets = ["name = @name", "role = @role"];
  const params: Record<string, unknown> = { id, name: fields.name, role: fields.role };
  if (fields.password_hash) {
    sets.push("password_hash = @password_hash");
    params.password_hash = fields.password_hash;
  }
  getDb().prepare(`UPDATE users SET ${sets.join(", ")} WHERE id = @id`).run(params);
}

export function deleteUser(id: number): void {
  getDb().prepare(`DELETE FROM users WHERE id = ?`).run(id);
}

// ─── Leads (contact/offerte aanvragen) ────────────────────────────────────────

export type LeadInput = {
  naam: string;
  email: string;
  tel: string | null;
  dienst: string | null;
  bericht: string;
  bron: string;
};

export function createLead(input: LeadInput): number {
  const info = getDb()
    .prepare(
      `INSERT INTO leads (naam, email, tel, dienst, bericht, bron, status, created_at)
       VALUES (@naam, @email, @tel, @dienst, @bericht, @bron, 'new', @created_at)`,
    )
    .run({ ...input, created_at: nowIso() });
  return Number(info.lastInsertRowid);
}

export function listLeads(): Lead[] {
  return getDb()
    .prepare(`SELECT * FROM leads ORDER BY id DESC`)
    .all() as Lead[];
}

export function getLeadById(id: number): Lead | null {
  return (getDb().prepare(`SELECT * FROM leads WHERE id = ?`).get(id) as Lead | undefined) ?? null;
}

export function setLeadStatus(id: number, status: LeadStatus): void {
  getDb().prepare(`UPDATE leads SET status = ? WHERE id = ?`).run(status, id);
}

export function deleteLead(id: number): void {
  getDb().prepare(`DELETE FROM leads WHERE id = ?`).run(id);
}

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export function getCounts() {
  const db = getDb();
  const c = (sql: string) => (db.prepare(sql).get() as { n: number }).n;
  return {
    blogPublished: c(`SELECT COUNT(*) AS n FROM blog_posts WHERE status='published'`),
    blogDrafts: c(`SELECT COUNT(*) AS n FROM blog_posts WHERE status!='published'`),
    realisatiesPublished: c(`SELECT COUNT(*) AS n FROM realisaties WHERE status='published'`),
    realisatiesDrafts: c(`SELECT COUNT(*) AS n FROM realisaties WHERE status!='published'`),
    leadsTotal: c(`SELECT COUNT(*) AS n FROM leads`),
    leadsNew: c(`SELECT COUNT(*) AS n FROM leads WHERE status='new'`),
  };
}
