"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Eye, EyeOff, Landmark, Loader2, Lock, Mail, Package, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { ADMIN_BASE } from "@/lib/cms/config";
import { createClient } from "@/lib/supabase/client";

const MANAGES = [
  { icon: BookOpen, label: "Blogs & travel guides" },
  { icon: Package, label: "Tour packages" },
  { icon: Landmark, label: "Temple pages" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    let signInError: unknown = null;
    try {
      ({ error: signInError } = await createClient().auth.signInWithPassword({ email: email.trim(), password }));
    } catch (err) {
      // Thrown when the Supabase env vars are missing.
      signInError = err;
    }
    if (signInError) {
      setError("Invalid admin credentials");
      setLoading(false);
      return;
    }
    router.push(ADMIN_BASE);
    router.refresh();
  }

  const input =
    "w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2.5 pl-10 pr-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30";

  return (
    <div className="cms-admin grid min-h-dvh place-items-center bg-[#040421] bg-[radial-gradient(ellipse_at_top,rgba(14,165,233,0.12),transparent_60%)] px-4 py-10 text-white">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220] shadow-2xl shadow-black/40 md:grid-cols-[1fr_1.1fr]">
        {/* Brand panel */}
        <aside className="relative hidden flex-col justify-between gap-10 border-r border-slate-800 bg-linear-to-br from-sky-950/60 via-[#0b1220] to-indigo-950/50 p-10 md:flex">
          <div className="flex items-center gap-3">
            <LogoMark className="size-10 shrink-0" />
            <div className="leading-tight">
              <p className="font-semibold text-white">Mathura Vrindavan Trips</p>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300">Content Studio</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold leading-snug text-white">Publish and maintain every page of the travel guide.</h2>
            <ul className="mt-6 space-y-3">
              {MANAGES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="grid size-8 place-items-center rounded-lg bg-white/5 text-sky-300 ring-1 ring-white/10">
                    <Icon size={16} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-slate-400">Drafts stay private until you publish them.</p>
        </aside>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col justify-center p-7 sm:p-10">
          <div className="mb-6 flex items-center gap-3 md:hidden">
            <LogoMark className="size-9 shrink-0" />
            <p className="font-semibold text-white">Mathura Vrindavan Trips</p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in to the CMS</h1>
          <p className="mt-1.5 text-sm text-slate-300">Use your administrator account to continue.</p>

          <div className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-200">Email address</span>
              <span className="relative block">
                <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required autoComplete="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              </span>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-200">Password</span>
              <span className="relative block">
                <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${input} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </span>
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3.5 py-2.5 text-sm text-rose-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220] disabled:cursor-not-allowed disabled:bg-sky-700"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} className="shrink-0 text-emerald-400" />
            Restricted area. Access is limited to authorised administrators.
          </p>
        </form>
      </div>
    </div>
  );
}
