import "server-only";
import { join } from "node:path";

/**
 * Persistente opslag. Op Railway mount je één volume en zet je
 * DATA_DIR naar dat mountpad (bv. /app/data) — dan blijven de database
 * én de geüploade foto's bewaard over deploys heen.
 * Lokaal valt het terug op ./data.
 */
export const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), "data");
export const UPLOADS_DIR = join(DATA_DIR, "uploads");
