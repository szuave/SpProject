import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import { getSession } from "@/lib/auth";
import { UPLOADS_DIR } from "@/lib/storage";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per bestand
const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Ongeldige upload." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (files.length === 0) {
    return NextResponse.json({ error: "Geen bestanden ontvangen." }, { status: 400 });
  }

  if (!existsSync(UPLOADS_DIR)) await mkdir(UPLOADS_DIR, { recursive: true });

  const urls: string[] = [];
  for (const file of files) {
    const ext = EXT_BY_MIME[file.type];
    if (!ext) {
      return NextResponse.json({ error: `Niet-ondersteund bestandstype: ${file.type || "onbekend"}.` }, { status: 415 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `Bestand te groot (max 10 MB): ${file.name}.` }, { status: 413 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const name = `${Date.now()}-${randomBytes(5).toString("hex")}.${ext}`;
    await writeFile(join(UPLOADS_DIR, name), buffer);
    urls.push(`/uploads/${name}`);
  }

  return NextResponse.json({ urls });
}
