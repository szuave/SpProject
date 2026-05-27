"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { ChevronDown, Menu, Close, ArrowRight } from "@/components/ui/Icons";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trackedPath, setTrackedPath] = useState(pathname);

  if (pathname !== trackedPath) {
    setTrackedPath(pathname);
    setMobileOpen(false);
    setOpenDropdown(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white transition-shadow",
          scrolled
            ? "border-b border-border shadow-elev-1"
            : "border-b border-border/0",
        )}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] lg:h-[80px] items-center justify-between gap-6">
            <Logo />

            <nav className="hidden lg:flex items-center" aria-label="Hoofdnavigatie">
              {nav.primary.map((item) => {
                const href = item.href as string;
                const active = pathname === href || pathname.startsWith(href + "/");
                if ("children" in item && item.children) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(item.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative inline-flex items-center gap-1 px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors",
                          active ? "text-ink" : "text-ink-2 hover:text-ink",
                        )}
                      >
                        {item.label}
                        <ChevronDown className="h-3.5 w-3.5" />
                        <span
                          aria-hidden
                          className={cn(
                            "absolute left-4 right-4 -bottom-px h-[3px] bg-brand-500 origin-left transition-transform duration-300",
                            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                      <div
                        className={cn(
                          "absolute left-0 top-full pt-2 transition-opacity",
                          openDropdown === item.href
                            ? "pointer-events-auto opacity-100"
                            : "pointer-events-none opacity-0",
                        )}
                      >
                        <div className="w-[260px] bg-ink text-white shadow-elev-3 py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-[14px] hover:bg-brand-500 hover:text-white transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative px-4 py-3 text-[13px] font-bold uppercase tracking-[0.08em] transition-colors",
                      active ? "text-ink" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute left-4 right-4 -bottom-px h-[3px] bg-brand-500 origin-left transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 h-11 px-5 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em] transition-colors"
            >
              Offerte
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              aria-label="Menu openen"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center h-11 w-11 text-ink hover:bg-surface-2 transition-colors"
            >
              {mobileOpen ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileOpen(false)} />
        <div className="absolute top-[68px] left-0 right-0 bg-white border-t border-border max-h-[calc(100vh-68px)] overflow-y-auto">
          <nav className="px-4 py-2" aria-label="Mobiele navigatie">
            {nav.primary.map((item) => (
              <div key={item.href} className="border-b border-border last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-[15px] font-bold uppercase tracking-[0.06em] text-ink"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-ink-3" />
                </Link>
                {"children" in item && item.children && (
                  <div className="pb-3 pl-3 -mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-[14px] text-ink-2 hover:text-brand-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="mt-4 mb-3 inline-flex w-full items-center justify-center gap-2 h-12 bg-brand-500 hover:bg-brand-600 text-white text-[13px] font-bold uppercase tracking-[0.08em]"
            >
              Offerte aanvragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
