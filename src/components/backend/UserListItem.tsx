"use client";

import { useActionState, useEffect, useState } from "react";
import { updateUserAction, deleteUserAction, type UserFormState } from "@/app/backend/gebruikers/actions";
import { inputCls } from "./FormKit";
import { Pencil, Trash } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import type { User } from "@/lib/db";

const fmt = new Intl.DateTimeFormat("nl-BE", { day: "numeric", month: "short", year: "numeric" });

export function UserListItem({ user, isSelf }: { user: User; isSelf: boolean }) {
  const [editing, setEditing] = useState(false);
  const [state, action, pending] = useActionState<UserFormState, FormData>(updateUserAction, {});

  useEffect(() => {
    if (state.ok) setEditing(false);
  }, [state.ok]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-10 w-10 items-center justify-center bg-surface-3 text-ink-2 font-bold">
          {(user.name || user.email).charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold truncate">{user.name || user.email}</span>
            <RoleBadge role={user.role} />
            {isSelf && <span className="text-[11px] text-ink-3">jij</span>}
          </div>
          <div className="mt-0.5 text-sm text-ink-3 truncate">
            {user.email} · sinds {fmt.format(new Date(user.created_at))}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            aria-label="Bewerk gebruiker"
            className="inline-flex h-9 w-9 items-center justify-center text-ink-3 hover:text-ink hover:bg-surface-2 transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {!isSelf && (
            <form action={deleteUserAction}>
              <input type="hidden" name="id" value={user.id} />
              <button aria-label="Verwijder gebruiker" className="inline-flex h-9 w-9 items-center justify-center text-ink-3 hover:text-white hover:bg-brand-500 transition-colors">
                <Trash className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {editing && (
        <form action={action} className="mt-4 border-t border-border pt-4 space-y-4">
          <input type="hidden" name="id" value={user.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-[0.08em] text-ink-2 mb-1.5">Naam</label>
              <input name="name" defaultValue={user.name ?? ""} className={inputCls} />
            </div>
            <div>
              <label className="block text-[12px] font-bold uppercase tracking-[0.08em] text-ink-2 mb-1.5">Rol</label>
              <select name="role" defaultValue={user.role} disabled={isSelf} className={cn(inputCls, isSelf && "opacity-60")}>
                <option value="staff">Personeel</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-bold uppercase tracking-[0.08em] text-ink-2 mb-1.5">Nieuw wachtwoord</label>
            <input name="password" type="text" placeholder="Laat leeg om ongewijzigd te laten" className={inputCls} />
          </div>
          {state.error && <p className="text-sm text-brand-600 font-medium">{state.error}</p>}
          <div className="flex items-center gap-2">
            <button type="submit" disabled={pending} className="h-10 px-5 bg-brand-500 hover:bg-brand-600 text-white text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors disabled:opacity-60">
              {pending ? "Opslaan…" : "Opslaan"}
            </button>
            <button type="button" onClick={() => setEditing(false)} className="h-10 px-5 border border-border hover:border-ink text-ink text-[12.5px] font-bold uppercase tracking-[0.08em] transition-colors">
              Annuleren
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function RoleBadge({ role }: { role: "admin" | "staff" }) {
  return (
    <span className={cn(
      "inline-flex items-center h-5 px-2 text-[10px] font-bold uppercase tracking-wide",
      role === "admin" ? "bg-brand-50 text-brand-700" : "bg-surface-3 text-ink-2",
    )}>
      {role === "admin" ? "Admin" : "Personeel"}
    </span>
  );
}
