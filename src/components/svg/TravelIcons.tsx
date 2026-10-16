import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
    ...props,
  } as const;
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Clay diya with a flame. */
export function DiyaIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <path d="M12 3c1.6 1.8 2.2 3.3 1.6 4.6-.4.9-1.3 1.4-1.6 1.4s-1.2-.5-1.6-1.4C9.8 6.3 10.4 4.8 12 3Z" />
      <path d="M3 13h18c-.6 3.8-4.4 6-9 6s-8.4-2.2-9-6Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

/** North-Indian temple shikhara. */
export function TempleIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <path d="M12 2v2" />
      <path d="M8 21V12c0-3.5 2-6.5 4-8 2 1.5 4 4.5 4 8v9" />
      <path d="M3 21h18" />
      <path d="M4 21v-6h4M20 21v-6h-4" />
      <path d="M10.5 21v-3.5a1.5 1.5 0 0 1 3 0V21" />
    </svg>
  );
}

/** A guide with a flag — local know-how. */
export function GuideIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <circle cx="9" cy="5.5" r="2.5" />
      <path d="M4.5 21v-6.5A4.5 4.5 0 0 1 9 10a4.5 4.5 0 0 1 4.5 4.5V21" />
      <path d="M17 21V4l4 2-4 2" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15V3Z" />
    </svg>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base(props)} {...stroke}>
      <path d="M21.5 8.2a2.7 2.7 0 0 0-1.9-1.9C17.9 5.8 12 5.8 12 5.8s-5.9 0-7.6.5a2.7 2.7 0 0 0-1.9 1.9C2 9.9 2 12 2 12s0 2.1.5 3.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-3.8.5-3.8s0-2.1-.5-3.8Z" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}
