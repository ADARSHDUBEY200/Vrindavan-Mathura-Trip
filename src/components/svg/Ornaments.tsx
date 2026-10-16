import type { SVGProps } from "react";

type SvgProps = SVGProps<SVGSVGElement>;

const decorative = { "aria-hidden": true, focusable: false } as const;

/** Layered lotus-petal mandala. Use with `spin-slow` for a slow rotation. */
export function Mandala(props: SvgProps) {
  const outer = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const inner = Array.from({ length: 12 }, (_, i) => i * 30 + 15);
  const dots = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={0.7} {...decorative} {...props}>
      <circle cx="100" cy="100" r="97" />
      <circle cx="100" cy="100" r="92" strokeDasharray="1 3" />
      {dots.map((a) => (
        <circle key={a} cx="100" cy="11" r="1.1" fill="currentColor" stroke="none" transform={`rotate(${a} 100 100)`} />
      ))}
      {outer.map((a) => (
        <path key={a} d="M100 100 C 90 78, 90 42, 100 18 C 110 42, 110 78, 100 100 Z" transform={`rotate(${a} 100 100)`} />
      ))}
      {inner.map((a) => (
        <path key={a} d="M100 100 C 94 86, 94 64, 100 48 C 106 64, 106 86, 100 100 Z" transform={`rotate(${a} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="22" strokeDasharray="2 2.5" />
      <circle cx="100" cy="100" r="8" />
    </svg>
  );
}

/** A simple lotus mark. */
export function Lotus(props: SvgProps) {
  return (
    <svg viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" {...decorative} {...props}>
      <path d="M32 36 C 24 28, 24 14, 32 4 C 40 14, 40 28, 32 36 Z" />
      <path d="M32 36 C 22 34, 14 24, 14 12 C 24 14, 30 22, 32 36 Z" />
      <path d="M32 36 C 42 34, 50 24, 50 12 C 40 14, 34 22, 32 36 Z" />
      <path d="M32 36 C 20 37, 8 32, 2 24 C 14 22, 26 28, 32 36 Z" />
      <path d="M32 36 C 44 37, 56 32, 62 24 C 50 22, 38 28, 32 36 Z" />
    </svg>
  );
}

/** Hand-drawn underline used inside `.text-highlight`. */
export function Swash(props: SvgProps) {
  return (
    <svg viewBox="0 0 300 24" fill="none" preserveAspectRatio="none" {...decorative} {...props}>
      <path
        className="draw-path"
        pathLength={1}
        d="M4 15 C 60 6, 130 4, 200 8 C 238 10, 270 13, 296 9 M40 19 C 110 13, 190 13, 262 17"
        stroke="currentColor"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Door garland (toran): marigold strands and mango leaves along the top edge of a section. */
export function Toran({ units = 48, ...props }: SvgProps & { units?: number }) {
  const w = 40;
  return (
    <svg
      viewBox={`0 0 ${units * w} 46`}
      preserveAspectRatio="xMidYMin slice"
      {...decorative}
      {...props}
    >
      <path d={`M0 4 ${Array.from({ length: units }, (_, i) => `Q ${i * w + w / 2} 16 ${(i + 1) * w} 4`).join(" ")}`} fill="none" stroke="#c2410c" strokeWidth={1.5} />
      {Array.from({ length: units }, (_, i) => {
        const x = i * w + w / 2;
        const leaf = i % 2 === 0;
        return leaf ? (
          <path key={i} d={`M${x} 10 C ${x - 7} 20, ${x - 4} 32, ${x} 40 C ${x + 4} 32, ${x + 7} 20, ${x} 10 Z`} fill="#0f766e" opacity={0.85} />
        ) : (
          <g key={i}>
            <circle cx={x} cy={14} r={4.5} fill="#f58220" />
            <circle cx={x} cy={23} r={4} fill="#fbbf24" />
            <circle cx={x} cy={31} r={3.5} fill="#f58220" />
          </g>
        );
      })}
    </svg>
  );
}

function spire(x: number, w: number, h: number, base: number): string {
  const l = x - w / 2;
  const r = x + w / 2;
  const top = base - h;
  return [
    `M${l} ${base}`,
    `L${l} ${base - h * 0.28}`,
    `C ${l + w * 0.04} ${top + h * 0.35}, ${x - w * 0.18} ${top + h * 0.12}, ${x - w * 0.06} ${top + 6}`,
    `L${x - 2} ${top}`,
    `L${x - 2} ${top - 8}`,
    `A 3 3 0 1 1 ${x + 2} ${top - 8}`,
    `L${x + 2} ${top}`,
    `L${x + w * 0.06} ${top + 6}`,
    `C ${x + w * 0.18} ${top + h * 0.12}, ${r - w * 0.04} ${top + h * 0.35}, ${r} ${base - h * 0.28}`,
    `L${r} ${base}`,
    "Z",
  ].join(" ");
}

function dome(x: number, w: number, base: number): string {
  const r = w / 2;
  return `M${x - r} ${base} L${x - r} ${base - 10} A ${r} ${r * 0.9} 0 0 1 ${x + r} ${base - 10} L${x + r} ${base} Z M${x - 1.5} ${base - 10 - r * 0.9} l0 -8 l3 0 l0 8 Z`;
}

const SKYLINE_PATH = [
  `M0 160 L0 128 L1440 128 L1440 160 Z`,
  dome(70, 54, 128),
  spire(160, 70, 92, 128),
  dome(240, 40, 128),
  spire(330, 96, 130, 128),
  spire(410, 56, 74, 128),
  dome(480, 60, 128),
  spire(560, 80, 108, 128),
  spire(650, 52, 70, 128),
  spire(720, 120, 150, 128),
  spire(800, 52, 70, 128),
  dome(870, 64, 128),
  spire(950, 84, 112, 128),
  spire(1030, 50, 66, 128),
  dome(1100, 46, 128),
  spire(1180, 98, 128, 128),
  spire(1265, 60, 80, 128),
  dome(1340, 56, 128),
  spire(1400, 50, 64, 128),
].join(" ");

/** Silhouette of Braj temple spires for section edges. */
export function TempleSkyline(props: SvgProps) {
  return (
    <svg viewBox="0 0 1440 160" preserveAspectRatio="xMidYMax slice" fill="currentColor" {...decorative} {...props}>
      <path d={SKYLINE_PATH} />
    </svg>
  );
}

/** Small centred ornament: rule – diamond – lotus – diamond – rule. */
export function OrnamentDivider({ className, ...props }: SvgProps) {
  return (
    <div className={`gold-rule ${className ?? ""}`} aria-hidden="true">
      <svg viewBox="0 0 96 24" width="96" height="24" fill="none" stroke="currentColor" strokeWidth={1.4} {...decorative} {...props}>
        <path d="M14 12 l5 -5 l5 5 l-5 5 Z" fill="currentColor" stroke="none" opacity={0.6} />
        <path d="M72 12 l5 -5 l5 5 l-5 5 Z" fill="currentColor" stroke="none" opacity={0.6} />
        <path d="M48 21 C 42 16, 42 8, 48 2 C 54 8, 54 16, 48 21 Z" />
        <path d="M48 21 C 41 20, 35 15, 34 9 C 41 10, 46 14, 48 21 Z" />
        <path d="M48 21 C 55 20, 61 15, 62 9 C 55 10, 50 14, 48 21 Z" />
      </svg>
    </div>
  );
}

/** Outlined temple-doorway arch. */
export function ArchOutline(props: SvgProps) {
  return (
    <svg viewBox="0 0 200 250" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth={1.4} {...decorative} {...props}>
      <path vectorEffect="non-scaling-stroke" d="M1 249 L1 100 C 1 45, 45 1, 100 1 C 155 1, 199 45, 199 100 L199 249" />
      <path vectorEffect="non-scaling-stroke" d="M12 249 L12 104 C 12 56, 52 12, 100 12 C 148 12, 188 56, 188 104 L188 249" strokeDasharray="2 5" />
    </svg>
  );
}

/** Bansuri (flute) with a small peacock feather tied on. */
export function Flute(props: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" {...decorative} {...props}>
      <g transform="rotate(-38 60 60)">
        <rect x="8" y="55" width="104" height="10" rx="5" fill="#c2410c" />
        <rect x="8" y="55" width="104" height="10" rx="5" fill="url(#flute-sheen)" />
        <rect x="26" y="54" width="3" height="12" fill="#fbbf24" />
        <rect x="92" y="54" width="3" height="12" fill="#fbbf24" />
        {[40, 50, 60, 70, 80].map((x) => (
          <circle key={x} cx={x} cy="60" r="1.9" fill="#3a1a07" />
        ))}
        <path d="M100 56 C 104 40, 116 34, 118 22 C 106 28, 98 40, 100 56 Z" fill="#0f766e" />
        <ellipse cx="111" cy="31" rx="3.6" ry="5" transform="rotate(30 111 31)" fill="#1e5b8c" />
        <circle cx="111" cy="31" r="1.6" fill="#fbbf24" />
      </g>
      <defs>
        <linearGradient id="flute-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Peacock feather in Krishna blue and teal. Pass a unique `gid` if used more than once per page. */
export function PeacockFeather({ gid = "pf", ...props }: SvgProps & { gid?: string }) {
  return (
    <svg viewBox="0 0 60 160" fill="none" {...decorative} {...props}>
      <defs>
        <radialGradient id={`${gid}-eye`} cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#1e3a8a" />
          <stop offset="0.35" stopColor="#1e5b8c" />
          <stop offset="0.6" stopColor="#0f766e" />
          <stop offset="0.82" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#65a30d" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <path d="M30 158 C 30 120, 30 80, 30 30" stroke="#a16207" strokeWidth="1.6" strokeLinecap="round" />
      {Array.from({ length: 22 }, (_, i) => {
        const y = 40 + i * 5;
        const spread = 24 - i * 0.7;
        return <path key={i} d={`M30 ${y} Q ${30 - spread / 2} ${y - 6} ${30 - spread} ${y - 12} M30 ${y} Q ${30 + spread / 2} ${y - 6} ${30 + spread} ${y - 12}`} stroke="#0f766e" strokeOpacity={0.55} strokeWidth="0.8" />;
      })}
      <ellipse cx="30" cy="30" rx="20" ry="27" fill={`url(#${gid}-eye)`} />
      <ellipse cx="30" cy="27" rx="7" ry="10" fill="#172554" />
      <ellipse cx="30" cy="25" rx="3.6" ry="5.4" fill="#1e5b8c" />
    </svg>
  );
}
