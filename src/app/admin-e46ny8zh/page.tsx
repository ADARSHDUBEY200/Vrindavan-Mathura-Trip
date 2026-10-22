"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { BookOpen, FileCheck2, Landmark, Package, Pencil, Plus } from "lucide-react";
import { StatsCard } from "@/components/Admin/StatsCard";
import { ADMIN_ROUTES } from "@/lib/cms/config";
import { formatDate } from "@/lib/cms/utils";
import { createClient } from "@/lib/supabase/client";

type Item = { id: string; title: string | null; status: string; created_at: string; category?: string | null; price?: string | null; author?: string | null };
type Data = { blogs: Item[]; packages: Item[]; temples: Item[] };

const noopSubscribe = () => () => {};

function greeting(hour: number | null) {
  if (hour === null) return "Welcome";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function RecentPanel({ title, items, loading, href, meta }: { title: string; items: Item[]; loading: boolean; href: string; meta: (i: Item) => string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0f172a]/70 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <Link href={href} className="text-sm text-sky-300 hover:text-sky-200">
          View all →
        </Link>
      </div>
      {loading ? (
        <ul className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <li key={i} className="h-12 animate-pulse rounded-xl bg-white/5" />
          ))}
        </ul>
      ) : items.length === 0 ? (
        <p className="py-8 text-center text-sm text-white/40">Nothing yet.</p>
      ) : (
        <ul className="divide-y divide-white/5">
          {items.slice(0, 6).map((i) => (
            <li key={i.id} className="group flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{i.title || "Untitled"}</p>
                <p className="truncate text-xs text-white/45">{meta(i)}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs ${i.status === "published" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}
              >
                {i.status === "published" ? "Published" : "Draft"}
              </span>
              <Link
                href={`${href}/edit/${i.id}`}
                aria-label={`Edit ${i.title ?? "item"}`}
                className="rounded-lg p-1.5 text-white/60 opacity-0 transition hover:bg-white/10 hover:text-white focus:opacity-100 group-hover:opacity-100"
              >
                <Pencil size={15} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const QUICK_ACTIONS = [
  { label: "New Blog", href: `${ADMIN_ROUTES.Blog}/create`, icon: BookOpen, tone: "from-sky-500/25 to-blue-600/10 text-sky-200" },
  { label: "New Package", href: `${ADMIN_ROUTES.Package}/create`, icon: Package, tone: "from-violet-500/25 to-purple-600/10 text-violet-200" },
  { label: "New Temple", href: `${ADMIN_ROUTES.Temple}/create`, icon: Landmark, tone: "from-amber-500/25 to-orange-600/10 text-amber-200" },
];

export default function AdminDashboardPage() {
  const [data, setData] = useState<Data>({ blogs: [], packages: [], temples: [] });
  const [loading, setLoading] = useState(true);
  // Client clock only: the server's time zone would greet with the wrong time of day.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    () => "",
  );
  const hour = useSyncExternalStore(noopSubscribe, () => new Date().getHours(), () => null);

  useEffect(() => {
    const supabase = createClient();
    const fetchAll = (table: string, cols: string) => supabase.from(table).select(cols).order("created_at", { ascending: false });
    Promise.all([
      fetchAll("Blog", "id,title,status,created_at,category,author"),
      fetchAll("Package", "id,title,status,created_at,category,price"),
      fetchAll("Temple", "id,title,status,created_at,location"),
    ]).then(([b, p, t]) => {
      const err = b.error ?? p.error ?? t.error;
      if (err) toast.error(`Could not load dashboard: ${err.message}`);
      setData({
        blogs: (b.data ?? []) as unknown as Item[],
        packages: (p.data ?? []) as unknown as Item[],
        temples: ((t.data ?? []) as unknown as (Item & { location?: string })[]).map((x) => ({ ...x, category: x.location })),
      });
      setLoading(false);
    });
  }, []);

  const published = (items: Item[]) => items.filter((i) => i.status === "published").length;
  const drafts = (items: Item[]) => items.length - published(items);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="min-h-5 text-sm text-white/50">{today}</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{greeting(hour)}, Admin</h1>
        </div>
        <Link href={`${ADMIN_ROUTES.Blog}/create`} className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold hover:bg-sky-500">
          <Plus size={16} /> New Blog
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total Blogs" value={data.blogs.length} subtitle={`${drafts(data.blogs)} drafts`} icon={BookOpen} variant="blue" loading={loading} />
        <StatsCard title="Published Blogs" value={published(data.blogs)} subtitle={`${drafts(data.blogs)} still in draft`} icon={FileCheck2} variant="green" loading={loading} />
        <StatsCard title="Tour Packages" value={data.packages.length} subtitle={`${drafts(data.packages)} drafts`} icon={Package} variant="purple" loading={loading} />
        <StatsCard title="Temples" value={data.temples.length} subtitle={`${drafts(data.temples)} drafts`} icon={Landmark} variant="amber" loading={loading} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentPanel
          title="Recent Blogs"
          items={data.blogs}
          loading={loading}
          href={ADMIN_ROUTES.Blog}
          meta={(i) => [i.category, i.author, formatDate(i.created_at)].filter(Boolean).join(" · ")}
        />
        <RecentPanel
          title="Recent Packages"
          items={data.packages}
          loading={loading}
          href={ADMIN_ROUTES.Package}
          meta={(i) => [i.category, i.price && `₹${i.price}`, formatDate(i.created_at)].filter(Boolean).join(" · ")}
        />
      </div>

      <section>
        <h2 className="mb-4 font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon, tone }) => (
            <Link key={href} href={href} className={`flex items-center gap-4 rounded-2xl border border-white/10 bg-linear-to-br ${tone} p-5 transition hover:-translate-y-0.5 hover:border-white/20`}>
              <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                <Icon size={20} />
              </span>
              <span className="font-semibold text-white">{label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
