import type { LucideIcon } from "lucide-react";

const VARIANTS = {
  blue: { card: "from-sky-500/15 to-blue-600/5", orb: "bg-sky-500/40", icon: "bg-sky-500/20 text-sky-300" },
  green: { card: "from-emerald-500/15 to-green-600/5", orb: "bg-emerald-500/40", icon: "bg-emerald-500/20 text-emerald-300" },
  purple: { card: "from-violet-500/15 to-purple-600/5", orb: "bg-violet-500/40", icon: "bg-violet-500/20 text-violet-300" },
  amber: { card: "from-amber-500/15 to-orange-600/5", orb: "bg-amber-500/40", icon: "bg-amber-500/20 text-amber-300" },
};

type Props = {
  title: string;
  value: number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: keyof typeof VARIANTS;
  loading?: boolean;
};

export function StatsCard({ title, value, subtitle, icon: Icon, variant = "blue", loading = false }: Props) {
  const v = VARIANTS[variant];
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br ${v.card} p-5`}>
      <span aria-hidden="true" className={`pointer-events-none absolute -right-8 -top-8 size-32 rounded-full blur-3xl ${v.orb}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">{title}</p>
          {loading ? (
            <span className="mt-2 block h-8 w-16 animate-pulse rounded-lg bg-white/10" />
          ) : (
            <p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
          )}
          {loading ? (
            <span className="mt-2 block h-3 w-24 animate-pulse rounded bg-white/10" />
          ) : (
            subtitle && <p className="mt-1 text-xs text-white/45">{subtitle}</p>
          )}
        </div>
        <span className={`grid size-11 place-items-center rounded-xl ${v.icon}`}>
          <Icon size={20} />
        </span>
      </div>
    </div>
  );
}
