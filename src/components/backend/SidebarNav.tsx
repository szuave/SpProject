"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Inbox, Hammer, Newspaper, Users } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export function SidebarNav({ role, newLeads = 0 }: { role: "admin" | "staff"; newLeads?: number }) {
  const pathname = usePathname();

  const links = [
    { href: "/backend", label: "Dashboard", icon: Grid, exact: true, badge: 0 },
    { href: "/backend/aanvragen", label: "Aanvragen", icon: Inbox, badge: newLeads },
    { href: "/backend/realisaties", label: "Realisaties", icon: Hammer, badge: 0 },
    { href: "/backend/blog", label: "Blog", icon: Newspaper, badge: 0 },
    ...(role === "admin"
      ? [{ href: "/backend/gebruikers", label: "Gebruikers", icon: Users, badge: 0 }]
      : []),
  ];

  return (
    <nav className="space-y-1">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        const Icon = l.icon;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-3 px-3.5 py-2.5 rounded-[3px] text-[14px] font-semibold transition-colors",
              active ? "bg-brand-500 text-white" : "text-white/65 hover:text-white hover:bg-white/10",
            )}
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="flex-1">{l.label}</span>
            {l.badge > 0 && (
              <span className={cn(
                "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-[3px] text-[11px] font-bold",
                active ? "bg-white text-brand-600" : "bg-brand-500 text-white",
              )}>
                {l.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
