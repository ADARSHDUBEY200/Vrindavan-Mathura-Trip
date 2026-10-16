import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Flute, Mandala } from "@/components/svg/Ornaments";

export const metadata = { title: "Page not found", robots: { index: false } };

const suggestions = [
  { label: "Tour packages", href: "/tour-packages" },
  { label: "Temples of Braj", href: "/temples" },
  { label: "Vrindavan guide", href: "/vrindavan" },
  { label: "Travel guide", href: "/travel-guide" },
];

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="bg-hero relative overflow-hidden pb-24 pt-36">
      <Mandala className="spin-slow pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 text-saffron/15" />
      <div className="container-x relative text-center">
        <Flute className="mx-auto size-28" />
        <p className="eyebrow mt-6 justify-center">Error 404</p>
        <h1 id="nf-title" className="display-1 mx-auto mt-4 max-w-2xl">
          This path has wandered off into the kunj
        </h1>
        <p className="lede mx-auto mt-5 max-w-xl">The page you’re looking for doesn’t exist or has moved. Let’s get you back on the parikrama.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home <ArrowRight size={18} aria-hidden="true" className="btn-arrow" />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="chip">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
