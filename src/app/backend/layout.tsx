import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getCounts } from "@/lib/db";
import { logout } from "@/app/login/actions";
import { SidebarNav } from "@/components/backend/SidebarNav";
import { LogOut, ExternalLink } from "@/components/ui/Icons";

export const metadata = {
  title: "Backend — SP-Projects",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function BackendLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const counts = getCounts();

  return (
    <div className="min-h-dvh flex bg-surface-2">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-ink text-white flex-col fixed inset-y-0 left-0">
        <div className="px-6 py-6 border-b border-white/10">
          <Link href="/backend" className="inline-flex">
            <Image src="/img/logo.png" alt="SP-Projects" width={783} height={418} className="h-9 w-auto" />
          </Link>
          <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-500">Backend</div>
        </div>
        <div className="flex-1 px-3 py-5 overflow-y-auto">
          <SidebarNav role={session.role} newLeads={counts.leadsNew} />
        </div>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-[3px] text-[14px] font-semibold text-white/65 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="h-[18px] w-[18px]" />
            Bekijk website
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[3px] text-[14px] font-semibold text-white/65 hover:text-white hover:bg-brand-500 transition-colors"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Uitloggen
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-ink text-white px-4 h-14">
          <Link href="/backend">
            <Image src="/img/logo.png" alt="SP-Projects" width={783} height={418} className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-0.5 text-[13px]">
            <Link href="/backend/aanvragen" className="px-2.5 py-1.5 rounded hover:bg-white/10">Aanvragen</Link>
            <Link href="/backend/realisaties" className="px-2.5 py-1.5 rounded hover:bg-white/10">Realisaties</Link>
            <Link href="/backend/blog" className="px-2.5 py-1.5 rounded hover:bg-white/10">Blog</Link>
            {session.role === "admin" && (
              <Link href="/backend/gebruikers" className="px-2.5 py-1.5 rounded hover:bg-white/10">Gebruikers</Link>
            )}
            <form action={logout}>
              <button type="submit" className="px-3 py-1.5 rounded hover:bg-brand-500" aria-label="Uitloggen">
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </div>
        </header>

        {/* Desktop topbar */}
        <header className="hidden lg:flex items-center justify-between bg-white border-b border-border px-8 h-16">
          <span className="text-sm text-ink-3">Ingelogd als <span className="font-semibold text-ink">{session.email}</span></span>
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
