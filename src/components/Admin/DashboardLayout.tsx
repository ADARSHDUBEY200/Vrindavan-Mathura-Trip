"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Landmark, LayoutDashboard, LogOut, Menu, Package, Search, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ADMIN_BASE, ADMIN_LOGIN } from "@/lib/cms/config";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Dashboard", href: ADMIN_BASE, icon: LayoutDashboard },
  { label: "Blog Editor", href: `${ADMIN_BASE}/blogs`, icon: BookOpen },
  { label: "Product Editor", href: `${ADMIN_BASE}/products`, icon: Package },
  { label: "Temple Editor", href: `${ADMIN_BASE}/temples`, icon: Landmark },
];

function isActive(pathname: string, href: string) {
  if (href === ADMIN_BASE) return pathname === ADMIN_BASE;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await createClient().auth.signOut();
    router.push(ADMIN_LOGIN);
    router.refresh();
  }

  return (
    <div className="min-h-dvh bg-[#040421] text-white">
      {/* Topbar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-3 border-b border-white/10 bg-[#0f172a] px-4 shadow-lg shadow-indigo-300/10 md:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="grid size-10 place-items-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <Menu size={22} />
        </button>
        <label className="relative hidden max-w-md flex-1 sm:block">
          <span className="sr-only">Search</span>
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            type="search"
            placeholder="Search…"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-sky-500"
          />
        </label>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-sm text-white/70 sm:inline">Admin</span>
          <span className="grid size-9 place-items-center rounded-full bg-linear-to-br from-sky-500 to-indigo-600 text-sm font-semibold">A</span>
        </div>
      </header>

      {/* Sidebar overlay */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0f172a] shadow-xl shadow-indigo-300/10 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Admin navigation"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Logo light className="[&_span]:text-sm" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active ? "bg-sky-500/15 text-sky-300 ring-1 ring-sky-500/30" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-rose-300 transition hover:bg-rose-500/10">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="px-4 pb-16 pt-20 md:px-8">{children}</main>
    </div>
  );
}
