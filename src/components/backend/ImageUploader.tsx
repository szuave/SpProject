"use client";

import { useRef, useState } from "react";
import { Plus, Trash } from "@/components/ui/Icons";

export function ImageUploader({
  name,
  multiple = false,
  initial = [],
}: {
  name: string;
  multiple?: boolean;
  initial?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(initial.filter(Boolean));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(fileList).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload mislukt.");
      setUrls((prev) => (multiple ? [...prev, ...data.urls] : data.urls.slice(-1)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload mislukt.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    setUrls((prev) => prev.filter((u) => u !== url));
  }

  return (
    <div>
      {/* Hidden inputs — dit wordt mee verstuurd met het formulier */}
      {urls.length > 0
        ? urls.map((u) => <input key={u} type="hidden" name={name} value={u} />)
        : <input type="hidden" name={name} value="" />}

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {urls.map((u) => (
          <div key={u} className="relative group aspect-square rounded-[3px] overflow-hidden border border-border bg-surface-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(u)}
              aria-label="Verwijder afbeelding"
              className="absolute top-1 right-1 inline-flex h-7 w-7 items-center justify-center rounded-[3px] bg-ink/70 text-white opacity-0 group-hover:opacity-100 hover:bg-brand-500 transition"
            >
              <Trash className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {(multiple || urls.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-[3px] border-2 border-dashed border-border hover:border-brand-400 hover:bg-brand-50/40 flex flex-col items-center justify-center gap-1.5 text-ink-3 hover:text-brand-600 transition disabled:opacity-60"
          >
            <Plus className="h-5 w-5" />
            <span className="text-[11px] font-semibold">{uploading ? "Bezig…" : "Kies foto"}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {error && <p className="mt-2 text-xs text-brand-600 font-medium">{error}</p>}
      <p className="mt-2 text-xs text-ink-3">
        {multiple ? "Meerdere foto's mogelijk · " : ""}PNG, JPG, WEBP of GIF · max 10 MB per foto.
      </p>
    </div>
  );
}
