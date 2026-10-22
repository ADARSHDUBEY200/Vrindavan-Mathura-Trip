import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Suspense } from "react";
import { SiteSchema } from "@/components/seo/SiteSchema";
import { sharedGraph } from "@/lib/schema/nodes";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lift transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <FloatingContact />
      {/* Skipped on pages with their own @graph (see OWN_GRAPH_PATHS). Suspense: usePathname can suspend on fallback-param routes. */}
      <Suspense fallback={null}>
        <SiteSchema graph={sharedGraph()} />
      </Suspense>
    </>
  );
}

