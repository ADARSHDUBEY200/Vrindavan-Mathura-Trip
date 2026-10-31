"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Church, FileText, Landmark, LayoutDashboard, LogOut, Menu, Package, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { ADMIN_BASE, ADMIN_LOGIN, ADMIN_TEMPLES_PAGE, ADMIN_TOUR_PACKAGES_PAGE } from "@/lib/cms/config";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Dashboard", href: ADMIN_BASE, icon: LayoutDashboard },
  { label: "Blog Editor", href: `${ADMIN_BASE}/blogs`, icon: BookOpen },
  { label: "Product Editor", href: `${ADMIN_BASE}/products`, icon: Package },
  { label: "Tour Packages Page", href: ADMIN_TOUR_PACKAGES_PAGE, icon: FileText },
  { label: "Temple Editor", href: `${ADMIN_BASE}/temples`, icon: Landmark },
  { label: "Temples Page", href: ADMIN_TEMPLES_PAGE, icon: Church },
];

function isActive(pathname: string, href: string) {
  if (href === ADMIN_BASE) return pathname === ADMIN_BASE;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  // `open` drives the mobile drawer; `collapsed` the icon-only desktop rail.
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const current = NAV.find((n) => isActive(pathname, n.href));

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    // The drawer is mobile-only; growing to the desktop rail closes it (and releases the scroll lock).
    const desktop = window.matchMedia("(min-width: 64rem)");
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  async function logout() {
    await createClient().auth.signOut();
    router.push(ADMIN_LOGIN);
    router.refresh();
  }

  const railWidth = collapsed ? "lg:w-[4.5rem]" : "lg:w-60";
  const contentOffset = collapsed ? "lg:pl-[4.5rem]" : "lg:pl-60";
  const hideWhenCollapsed = collapsed ? "lg:sr-only" : "";

  return (
    <div className="cms-admin min-h-dvh bg-[#040421] text-white">
      {/* Mobile drawer overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Sidebar: drawer below lg, fixed rail from lg up */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0b1220] transition-[transform,width] duration-300 lg:translate-x-0 ${railWidth} ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
        aria-label="Admin navigation"
      >
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/10 px-3">
          <Link href={ADMIN_BASE} onClick={() => setOpen(false)} className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-lg p-1 ${collapsed ? "lg:justify-center" : ""}`}>
            <LogoMark className="size-8 shrink-0" />
            <span className={`min-w-0 leading-tight ${hideWhenCollapsed}`}>
              <span className="block truncate text-sm font-semibold text-white">Mathura Vrindavan</span>
              <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-300">Admin CMS</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                title={collapsed ? label : undefined}
                className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${collapsed ? "lg:justify-center lg:px-0" : ""} ${
                  active ? "bg-sky-500/15 text-sky-200 ring-1 ring-inset ring-sky-500/30" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className={`truncate ${hideWhenCollapsed}`}>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Extra bottom room in development keeps Logout clear of the Next.js dev indicator. */}
        <div className={`shrink-0 border-t border-white/10 p-3 ${process.env.NODE_ENV === "development" ? "pb-16" : ""}`}>
          <button
            type="button"
            onClick={logout}
            title={collapsed ? "Logout" : undefined}
            className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200 ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={hideWhenCollapsed}>Logout</span>
          </button>
        </div>
      </aside>

      <div className={`transition-[padding] duration-300 ${contentOffset}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-[#0b1220]/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            className="hidden size-9 place-items-center rounded-lg text-slate-300 transition hover:bg-white/10 hover:text-white lg:grid"
          >
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
          <span className="truncate text-sm font-semibold text-white">{current?.label ?? "Admin"}</span>
          <div className="ml-auto flex items-center gap-2.5">
            <span className="hidden text-sm text-slate-300 sm:inline">Admin</span>
            <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-sky-500 to-indigo-600 text-sm font-semibold">A</span>
          </div>
        </header>

        <main className="px-4 pb-12 pt-5 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
