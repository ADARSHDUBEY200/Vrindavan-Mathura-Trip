"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ImageOff, LayoutGrid, List, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { ADMIN_ROUTES, TABLES, type EditorType } from "@/lib/cms/config";
import { CATEGORY_LABEL, CATEGORY_OPTIONS } from "@/lib/cms/constants";
import { formatDate, titleCase } from "@/lib/cms/utils";
import { createClient } from "@/lib/supabase/client";
import { CMSLoading } from "./CMSLoading";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { inputClass } from "./CMS/ui";

type Row = {
  id: string;
  title: string | null;
  slug: string;
  status: "draft" | "published";
  created_at: string;
  category: string;
  image: string;
  author?: string;
  price?: string;
};

type Config = {
  title: string;
  subtitle: string;
  select: string;
  categoryColumn: "category" | "location";
  imageOf: (raw: Record<string, unknown>) => string;
  showAuthor?: boolean;
  showPrice?: boolean;
  api: (typeof adminApi)["blogs"];
};

const CONFIG: Record<EditorType, Config> = {
  Blog: {
    title: "Blogs",
    subtitle: "Articles for the travel guide.",
    select: "id,title,slug,status,created_at,category,image,author",
    categoryColumn: "category",
    imageOf: (r) => String(r.image ?? ""),
    showAuthor: true,
    api: adminApi.blogs,
  },
  Package: {
    title: "Tour Packages",
    subtitle: "Products shown on the tour packages pages.",
    select: "id,title,slug,status,created_at,category,heroimage,price",
    categoryColumn: "category",
    imageOf: (r) => String((r.heroimage as { image?: string } | null)?.image ?? ""),
    showPrice: true,
    api: adminApi.packages,
  },
  Temple: {
    title: "Temples",
    subtitle: "Temple guides across Braj.",
    select: "id,title,slug,status,created_at,location,image",
    categoryColumn: "location",
    imageOf: (r) => String(r.image ?? ""),
    api: adminApi.temples,
  },
};

function StatusBadge({ status }: { status: Row["status"] }) {
  return status === "published" ? (
    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-300">Published</span>
  ) : (
    <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">Draft</span>
  );
}

const formatPrice = (p?: string) => {
  if (!p) return "—";
  const n = Number(String(p).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) && n > 0 ? `₹${n.toLocaleString("en-IN")}` : p;
};

export function CMSListPage({ editorType }: { editorType: EditorType }) {
  const cfg = CONFIG[editorType];
  const base = ADMIN_ROUTES[editorType];
  const categoryLabel = CATEGORY_LABEL[editorType];

  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"" | Row["status"]>("");
  const [author, setAuthor] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [toDelete, setToDelete] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    createClient()
      .from(TABLES[editorType])
      .select(cfg.select)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) toast.error(`Could not load: ${error.message}`);
        const mapped = ((data ?? []) as unknown as Record<string, unknown>[]).map((r) => ({
          id: String(r.id),
          title: (r.title as string) ?? "",
          slug: String(r.slug ?? ""),
          status: r.status === "published" ? "published" : "draft",
          created_at: String(r.created_at ?? ""),
          category: String(r[cfg.categoryColumn] ?? ""),
          image: cfg.imageOf(r),
          author: r.author ? titleCase(String(r.author)) : undefined,
          price: r.price ? String(r.price) : undefined,
        })) as Row[];
        setRows(mapped);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [editorType, cfg]);

  const authors = useMemo(() => Array.from(new Set(rows.map((r) => r.author).filter(Boolean) as string[])).sort(), [rows]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = rows.filter(
      (r) =>
        (!q || (r.title ?? "").toLowerCase().includes(q)) &&
        (!category || r.category === category) &&
        (!status || r.status === status) &&
        (!author || r.author === author),
    );
    return sort === "latest" ? list : [...list].reverse();
  }, [rows, query, category, status, author, sort]);

  const published = rows.filter((r) => r.status === "published").length;

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    const { error } = await cfg.api.delete(toDelete.id);
    setDeleting(false);
    if (error) {
      toast.error(`Delete failed: ${error}`);
      return;
    }
    setRows((rs) => rs.filter((r) => r.id !== toDelete.id));
    toast.success("Deleted");
    setToDelete(null);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">{cfg.title}</h1>
          <p className="mt-1 text-sm text-white/55">{cfg.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-white/5 px-3 py-1 text-white/70">Total {rows.length}</span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">Published {published}</span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-300">Drafts {rows.length - published}</span>
          </div>
        </div>
        <Link href={`${base}/create`} className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold hover:bg-sky-500">
          <Plus size={16} /> Create New
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-[#0f172a]/60 p-4">
        <label className="relative min-w-56 flex-1">
          <span className="sr-only">Search by title</span>
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title…" className={`${inputClass} pl-10`} />
        </label>
        <select aria-label={categoryLabel} value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} w-auto`}>
          <option value="">All {categoryLabel === "Location" ? "locations" : "categories"}</option>
          {CATEGORY_OPTIONS[editorType].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {cfg.showAuthor && (
          <select aria-label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className={`${inputClass} w-auto`}>
            <option value="">All authors</option>
            {authors.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        )}
        <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={`${inputClass} w-auto`}>
          <option value="">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${inputClass} w-auto`}>
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
        <div className="flex overflow-hidden rounded-xl border border-white/10" role="group" aria-label="View">
          <button type="button" aria-pressed={view === "cards"} onClick={() => setView("cards")} className={`px-3 ${view === "cards" ? "bg-sky-600" : "hover:bg-white/5"}`} title="Cards view">
            <LayoutGrid size={18} />
          </button>
          <button type="button" aria-pressed={view === "table"} onClick={() => setView("table")} className={`px-3 ${view === "table" ? "bg-sky-600" : "hover:bg-white/5"}`} title="Table view">
            <List size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <CMSLoading />
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-white/10 py-16 text-center text-white/50">{rows.length ? "No items match these filters." : "Nothing here yet. Create the first one."}</p>
      ) : view === "cards" ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((r) => (
            <article key={r.id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/70">
              <div className="relative aspect-video bg-white/5">
                {r.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- Supabase storage URL; not in next/image remotePatterns
                  <img src={r.image} alt="" className="size-full object-cover" loading="lazy" />
                ) : (
                  <span className="grid size-full place-items-center text-white/25">
                    <ImageOff size={28} />
                  </span>
                )}
                <span className="absolute left-3 top-3">
                  <StatusBadge status={r.status} />
                </span>
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs text-white/45">{r.category || "Uncategorised"}</p>
                <h2 className="line-clamp-2 font-semibold">{r.title || "Untitled"}</h2>
                <p className="text-xs text-white/45">
                  {[cfg.showAuthor && r.author, cfg.showPrice && formatPrice(r.price), formatDate(r.created_at)].filter(Boolean).join(" · ")}
                </p>
                <div className="flex gap-2 pt-2">
                  <Link href={`${base}/edit/${r.id}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/10 py-2 text-sm hover:bg-white/5">
                    <Pencil size={14} /> Edit
                  </Link>
                  <button type="button" onClick={() => setToDelete(r)} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 px-3 py-2 text-sm text-rose-300 hover:bg-rose-500/10">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0f172a]/70">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-white/5 text-left text-white/55">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">{categoryLabel}</th>
                {cfg.showAuthor && <th className="px-4 py-3 font-medium">Author</th>}
                {cfg.showPrice && <th className="px-4 py-3 font-medium">Price</th>}
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="max-w-xs truncate px-4 py-3 font-medium">{r.title || "Untitled"}</td>
                  <td className="px-4 py-3 text-white/60">{r.category || "—"}</td>
                  {cfg.showAuthor && <td className="px-4 py-3 text-white/60">{r.author || "—"}</td>}
                  {cfg.showPrice && <td className="px-4 py-3 text-white/60">{formatPrice(r.price)}</td>}
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3 text-white/60">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`${base}/edit/${r.id}`} aria-label={`Edit ${r.title}`} className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white">
                        <Pencil size={15} />
                      </Link>
                      <button type="button" onClick={() => setToDelete(r)} aria-label={`Delete ${r.title}`} className="rounded-lg p-2 text-rose-300 hover:bg-rose-500/10">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteConfirmModal open={Boolean(toDelete)} itemName={toDelete?.title ?? undefined} deleting={deleting} onCancel={() => setToDelete(null)} onConfirm={confirmDelete} />
    </div>
  );
}
