import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import logo from "@/assets/brand/mathura-vrindavan-trip-logo.png";

/** Brand logo image. Meant for light surfaces: the dark-brown lettering disappears on dark ones. */
export const LOGO_SRC = logo;

/** Compact lotus mark, kept for small spaces on dark surfaces (admin sidebar). */
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

type LogoProps = {
  className?: string;
  /** Size classes for the image. Widths are 1.2× the natural aspect ratio (a deliberate horizontal stretch). */
  imageClassName?: string;
  /** Load straight away (the header logo is always above the fold). */
  eager?: boolean;
};

export function Logo({ className = "", imageClassName = "h-[3.25rem] w-[5.25rem] sm:h-[3.75rem] sm:w-[6rem]", eager = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center rounded-xl ${className}`} aria-label={`${site.name} — home`}>
      <Image src={logo} alt="" sizes="(min-width: 640px) 96px, 84px" loading={eager ? "eager" : "lazy"} className={`object-fill ${imageClassName}`} />
    </Link>
  );
}
