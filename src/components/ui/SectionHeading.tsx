import type { ReactNode } from "react";

export function Eyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${className}`}>{children}</p>;
}

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  action?: ReactNode;
  /** Centre the heading (and its action) on phones; left-aligned from `sm` up. */
  centerOnMobile?: boolean;
  className?: string;
};

/** Eyebrow + heading + lede. The heading `id` is used by the section's `aria-labelledby`. */
export function SectionHeading({ id, eyebrow, title, lede, align = "left", light = false, as: Tag = "h2", action, centerOnMobile = false, className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  const textAlign = centered ? "mx-auto text-center" : centerOnMobile ? "mx-auto text-center sm:mx-0 sm:text-left" : "";
  return (
    <div className={`flex flex-col gap-4 ${action ? "sm:flex-row sm:items-end sm:justify-between sm:gap-8" : ""} ${className}`}>
      <div className={`max-w-2xl ${textAlign}`}>
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <Tag id={id} className={`display-2 mt-2.5 ${light ? "text-white" : ""}`}>
          {title}
        </Tag>
        {lede && <p className={`lede mt-3 ${light ? "text-white/80" : ""}`}>{lede}</p>}
      </div>
      {action && <div className={`shrink-0 ${centerOnMobile ? "self-center sm:self-auto" : ""}`}>{action}</div>}
    </div>
  );
}
