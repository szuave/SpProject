import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { listUsers } from "@/lib/db";
import { AddUserForm } from "@/components/backend/AddUserForm";
import { UserListItem } from "@/components/backend/UserListItem";
import { Card } from "@/components/backend/FormKit";
import { Users } from "@/components/ui/Icons";

export const dynamic = "force-dynamic";

export default async function GebruikersPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/backend");

  const users = listUsers();
  const ownerEmail = (process.env.SP_ADMIN_EMAIL || "info@sp-projects.be").toLowerCase();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <div className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
          <span aria-hidden className="h-2 w-2 bg-brand-500" />
          Gebruikers
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">Gebruikers</h1>
        <p className="mt-1 text-ink-3 text-sm">
          Voeg personeel of admins toe. Iedereen ziet dezelfde backend; enkel admins kunnen gebruikers beheren.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
        {/* Lijst */}
        <div className="rounded-[4px] border border-border bg-white overflow-hidden divide-y divide-border">
          {/* Hoofdaccount (uit environment) */}
          <div className="flex items-center gap-4 p-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] bg-ink text-white">
              <Users className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold truncate">{ownerEmail}</span>
                <RoleBadge role="admin" />
                <span className="text-[11px] text-ink-3">hoofdaccount</span>
              </div>
              <div className="mt-0.5 text-sm text-ink-3">Beheerd via serverinstellingen</div>
            </div>
          </div>

          {users.map((u) => (
            <UserListItem key={u.id} user={u} isSelf={u.email === session.email} />
          ))}
        </div>

        {/* Toevoegen */}
        <Card title="Nieuwe gebruiker">
          <AddUserForm />
        </Card>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: "admin" | "staff" }) {
  return (
    <span className={`inline-flex items-center h-5 px-2 rounded-[3px] text-[10px] font-bold uppercase tracking-wide ${role === "admin" ? "bg-brand-50 text-brand-700" : "bg-surface-3 text-ink-2"}`}>
      {role === "admin" ? "Admin" : "Personeel"}
    </span>
  );
}
