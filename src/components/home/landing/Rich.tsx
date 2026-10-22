import { Fragment, type ReactNode } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_E164, SITE_URL } from "@/config/site";
import { INLINE_MARKS } from "@/lib/rich-text";

/**
 * Renders the inline markup used in content/home.ts: `**bold**` → <strong>, `*italic*` → <em>.
 * The phone number, email address and website URL become links wherever they appear.
 */

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const LINKS = new RegExp(`(${escape(PHONE_DISPLAY)}|${escape(EMAIL)}|${escape(SITE_URL)}/?)`, "g");

const linkClass = "font-medium text-ember-deep underline decoration-orange-300 underline-offset-4 hover:decoration-ember-deep";

function linkify(text: string, keyPrefix: string): ReactNode[] {
  return text.split(LINKS).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part === PHONE_DISPLAY)
      return (
        <a key={key} href={`tel:${PHONE_E164}`} className={linkClass}>
          {part}
        </a>
      );
    if (part === EMAIL)
      return (
        <a key={key} href={`mailto:${EMAIL}`} className={`${linkClass} break-all`}>
          {part}
        </a>
      );
    if (part.startsWith(SITE_URL))
      return (
        <a key={key} href={part} className={`${linkClass} break-all`}>
          {part}
        </a>
      );
    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE_MARKS).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
          return (
            <strong key={i} className="font-semibold text-ink">
              {linkify(part.slice(2, -2), String(i))}
            </strong>
          );
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{linkify(part.slice(1, -1), String(i))}</em>;
        return <Fragment key={i}>{linkify(part, String(i))}</Fragment>;
      })}
    </>
  );
}

