import Link from "next/link";
import { site } from "@/config/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-sun" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#logo-sun)" />
      <path d="M24 37 C 18 31, 18 20, 24 11 C 30 20, 30 31, 24 37 Z" fill="#fff" />
      <path d="M24 37 C 16 36, 10 29, 10 21 C 18 22, 23 28, 24 37 Z" fill="#fff" opacity="0.85" />
      <path d="M24 37 C 32 36, 38 29, 38 21 C 30 22, 25 28, 24 37 Z" fill="#fff" opacity="0.85" />
      <circle cx="24" cy="20" r="2.6" fill="#1e5b8c" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 rounded-full ${className}`} aria-label={`${site.name} — home`}>
      <LogoMark className="size-9 shrink-0 sm:size-10" />
      <span className="flex flex-col whitespace-nowrap leading-none">
        <span className={`text-[0.98rem] font-bold tracking-tight sm:text-lg xl:text-[1.05rem] ${light ? "text-white" : "text-ink"}`}>{site.name}</span>
        <span className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${light ? "text-saffron-soft" : "text-ember-deep"}`}>
          Vrindavan · Mathura
        </span>
      </span>
    </Link>
  );
}
