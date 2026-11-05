import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Clock } from "lucide-react";
import { Rich } from "@/components/home/landing/Rich";
import { Fact, Tip } from "@/components/destination/kit";
import { picUrl, type Pic } from "@/content/vrindavan";

const INTERNAL_LINK = /(\[[^\]]+\]\([^)]+\))/g;

/** `Rich`, plus `[label](/href)` internal links. */
export function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split(INTERNAL_LINK).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link key={i} href={link[2]} className="dg-link">
            {link[1]}
          </Link>
        ) : (
          <Fragment key={i}>
            <Rich text={part} />
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * `fill` image; the parent sets the box and its background colour stands in while the frame loads.
 * Only the preloaded hero keeps a blur: across 40 frames the base64 alone adds some 45 KB to the page.
 */
export function Shot({ pic, sizes, className = "object-cover", preload = false }: { pic: Pic; sizes: string; className?: string; preload?: boolean }) {
  return <Image src={preload ? pic.src : picUrl(pic)} alt={pic.alt} fill sizes={sizes} preload={preload} className={className} placeholder={preload && typeof pic.src !== "string" ? "blur" : "empty"} />;
}

/** A guide's note over a list of tips. */
export function LocalTips({ label, items, className = "" }: { label: string; items: string[]; className?: string }) {
  return (
    <Tip label={label} className={className}>
      <ul className="dg-bullets">
        {items.map((t) => (
          <li key={t}>
            <Prose text={t} />
          </li>
        ))}
      </ul>
    </Tip>
  );
}

const LEADING_LABEL = /^\*\*([^*]+?):\*\*\s*/;

/** A single-paragraph tip. Its bold lead ("Harsh Sharma's local tip:") becomes the label. */
export function TipLine({ text, className = "" }: { text: string; className?: string }) {
  const label = text.match(LEADING_LABEL)?.[1] ?? "Local tip";
  return (
    <Tip label={label} className={className}>
      <p>
        <Prose text={text.replace(LEADING_LABEL, "")} />
      </p>
    </Tip>
  );
}

/** Timings line: label and clock icon over the text. */
export function TimingLine({ text, className = "" }: { text: string; className?: string }) {
  const [, label, rest] = text.match(/^\*\*([^*]+?):\*\*\s*([\s\S]*)$/) ?? [null, "Timings", text];
  return (
    <div className={className}>
      <Fact icon={Clock} label={label}>
        <Prose text={rest} />
      </Fact>
    </div>
  );
}
