"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { ADMIN_BASE } from "@/lib/cms/config";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-5 text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-sky-500";

  return (
    <div className="grid min-h-dvh place-items-center bg-[#040421] px-4 text-white">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-linear-to-br from-[#0b1220]/80 via-[#0e1a2f]/80 to-[#0a1020]/80 p-8 shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)] backdrop-blur-xl"
      >
        <div className="flex flex-col items-center text-center">
          <LogoMark className="size-12" />
          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
          <p className="mt-1 text-sm text-white/55">Sign in to manage blogs, packages and temples.</p>
        </div>

        <div className="mt-8 space-y-4">
          <label className="relative block">
            <span className="sr-only">Email</span>
            <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="email" required autoComplete="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </label>
          <label className="relative block">
            <span className="sr-only">Password</span>
            <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </label>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-sky-600 py-3 font-semibold transition hover:bg-sky-500 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
