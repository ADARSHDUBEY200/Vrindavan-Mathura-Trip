import type { SVGProps } from "react";

/*
 * Static line drawing of a Braj temple front: a curvilinear Nagara shikhara with amalaka, kalash
 * and flag over a mandapa of three cusped arches, flanked by domed chhatris, on temple steps above
 * the Yamuna. Drawn in hairlines (`currentColor`); the central sanctum carries a soft lamp glow.
 */

const CX = 260;

/** Cusped (multifoil) arch opening centred on `cx`, from the floor at y=364. */
function cuspedArch(cx: number): string {
  const p = [
    [cx - 22, 312],
    [cx - 17, 300],
    [cx - 9, 290],
    [cx, 284],
    [cx + 9, 290],
    [cx + 17, 300],
    [cx + 22, 312],
  ];
  const lobes = p
    .slice(1)
    .map(([x, y]) => `A 7.5 7.5 0 0 1 ${x} ${y}`)
    .join(" ");
  return `M${cx - 22} 364 V312 ${lobes} V364`;
}

/** Small domed pavilion (chhatri) centred on `cx`, standing on y=364. */
function chhatri(cx: number) {
  return (
    <g key={cx}>
      <path d={`M${cx - 18} 364 V318 M${cx - 14} 364 V318 M${cx + 14} 364 V318 M${cx + 18} 364 V318`} />
      <path d={`M${cx - 10} 364 V340 Q ${cx} 326 ${cx + 10} 340 V364`} />
      <path d={`M${cx - 26} 318 L${cx - 20} 310 L${cx + 20} 310 L${cx + 26} 318 Z`} />
      <path d={`M${cx - 17} 310 C ${cx - 17} 292, ${cx - 8} 284, ${cx} 280 C ${cx + 8} 284, ${cx + 17} 292, ${cx + 17} 310`} />
      <path d={`M${cx} 280 V268`} />
      <circle cx={cx} cy={266} r={2} />
    </g>
  );
}

/** Miniature roof dome at a mandapa corner, sitting on y=236. */
function cornerDome(cx: number): string {
  return `M${cx - 10} 236 C ${cx - 10} 226, ${cx - 4} 221, ${cx} 219 C ${cx + 4} 221, ${cx + 10} 226, ${cx + 10} 236 M${cx} 219 V211`;
}

const SHIKHARA = `M205 236 C 205 180, 222 132, 236 110 L284 110 C 298 132, 315 180, 315 236 Z`;

export function TempleLineArt({ gid = "tla", ...props }: SVGProps<SVGSVGElement> & { gid?: string }) {
  return (
    <svg viewBox="0 0 520 440" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <clipPath id={`${gid}-shikhara`}>
          <path d={SHIKHARA} />
        </clipPath>
        <radialGradient id={`${gid}-lamp`} cx="0.5" cy="0.85" r="0.75">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#f97316" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g>
        {/* Shikhara: body, rib projections and horizontal courses */}
        <path d={SHIKHARA} fill="currentColor" fillOpacity={0.06} />
        <g clipPath={`url(#${gid}-shikhara)`} strokeOpacity={0.55}>
          {[216, 196, 178, 161, 146, 132, 120].map((y) => (
            <path key={y} d={`M200 ${y} H320`} />
          ))}
          <path d="M245 236 C 245 190, 249 140, 252 110 M275 236 C 275 190, 271 140, 268 110" />
          <path d={`M${CX} 236 V110`} strokeOpacity={0.35} />
        </g>

        {/* Amalaka, kalash and dhvaja */}
        <ellipse cx={CX} cy={103} rx={28} ry={7} fill="currentColor" fillOpacity={0.08} />
        <path d="M242 97.6 V108.4 M251 96.4 V109.6 M260 96 V110 M269 96.4 V109.6 M278 97.6 V108.4" strokeOpacity={0.5} />
        <ellipse cx={CX} cy={92} rx={14} ry={4} />
        <path d="M252 88 C 244 84, 246 72, 254 70 L266 70 C 274 72, 276 84, 268 88 Z" fill="currentColor" fillOpacity={0.12} />
        <path d="M255 70 V66 H265 V70" />
        <path d={`M${CX} 66 V20`} />
        <path d={`M${CX} 21 L289 28 L${CX} 36 Z`} fill="currentColor" fillOpacity={0.35} />

        {/* Roof: parapet with balusters, corner domes */}
        <path d="M150 236 H370 V244 H150 Z" />
        <path d={Array.from({ length: 21 }, (_, i) => `M${160 + i * 10} 237.5 V242.5`).join(" ")} strokeOpacity={0.5} />
        <path d={`${cornerDome(166)} ${cornerDome(354)}`} />

        {/* Mandapa: eave, walls, string course, framed cusped arches */}
        <path d="M140 252 L150 244 H370 L380 252 Z" fill="currentColor" fillOpacity={0.06} />
        <path d="M150 252 V364 M370 252 V364" />
        <path d="M150 264 H370" strokeOpacity={0.55} />
        {[200, CX, 320].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 28} 364 V276 H${cx + 28} V364`} strokeOpacity={0.55} />
            {cx === CX && <path d={cuspedArch(cx)} fill={`url(#${gid}-lamp)`} stroke="none" />}
            <path d={cuspedArch(cx)} fill={cx === CX ? "none" : "currentColor"} fillOpacity={0.05} />
          </g>
        ))}

        {/* Wing walls and chhatris */}
        <path d="M128 364 V332 H150 M370 332 H392 V364" />
        <path d="M126 332 H152 M368 332 H394" strokeOpacity={0.55} />
        {chhatri(102)}
        {chhatri(418)}

        {/* Steps */}
        <path d="M70 364 H450 V376 H70 Z M55 376 H465 V388 H55 Z M40 388 H480 V400 H40 Z" />

        {/* Yamuna */}
        <path d="M90 414 H430" strokeOpacity={0.4} />
        <path d="M150 424 H370" strokeOpacity={0.28} />
        <path d="M210 434 H310" strokeOpacity={0.16} />
      </g>
    </svg>
  );
}
