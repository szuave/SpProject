import { readFile } from "node:fs/promises";
import { join, normalize, extname } from "node:path";
import { UPLOADS_DIR } from "@/lib/storage";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  // Plat bestand verwachten; verhinder path-traversal.
  const rel = normalize(path.join("/")).replace(/^(\.\.(\/|\\|$))+/, "");
  const full = join(UPLOADS_DIR, rel);
  if (!full.startsWith(UPLOADS_DIR)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const file = await readFile(full);
    const type = TYPES[extname(full).toLowerCase()] ?? "application/octet-stream";
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
