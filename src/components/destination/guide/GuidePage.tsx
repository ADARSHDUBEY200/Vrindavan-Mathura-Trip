import "@/components/destination/guide.css";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { DestinationHero, FaqBlock, LinkCards } from "@/components/destination/kit";
import { JsonLd } from "@/components/seo/JsonLd";
import { EnquireButton } from "@/components/tour-packages/EnquireButton";
import { EnquiryButtons } from "@/components/ui/EnquiryButtons";
import { SectionNav } from "@/components/vrindavan/SectionNav";
import { FOUNDER, FOUNDED, PILGRIMS, RATING } from "@/config/site";
import { price } from "@/content/braj/common";
import type { BrajGuide } from "@/content/braj/types";
import { photos } from "@/content/images";
import { brajGuideSchema, guideCrumbs } from "@/lib/schema/braj-guide";
import { Rich } from "./parts";
import { BestTime, Book, Callout, Intro, Places, Plan, Reach, Stay, Story, Things } from "./Sections";

/** A Braj destination guide, built from one content object. `afterStory` holds a chapter only one guide has. */
export function GuidePage({ g, afterStory }: { g: BrajGuide; afterStory?: ReactNode }) {
  return (
    <div className="dg">
      <DestinationHero
        crumbs={guideCrumbs(g)}
        photo={{ src: photos[g.hero.image].src, alt: g.meta.imageAlt }}
        objectPosition={g.hero.imagePosition}
        badge={
          <>
            <span lang="hi" className="font-semibold text-[var(--dg-o300)]">
              {g.hero.scriptWord}
            </span>
            <span aria-hidden="true" className="text-white/50">
              ·
            </span>
            A local guide by {FOUNDER.name}
          </>
        }
        place={g.name}
        lead="Travel Guide"
        sub={g.hero.sub}
        lede={<Rich text={g.hero.lede} />}
        actions={
          <>
            <EnquireButton className="btn btn-primary">
              Plan my {g.name} trip
              <ArrowRight size={17} aria-hidden="true" className="btn-arrow" />
            </EnquireButton>
            <EnquiryButtons message={g.hero.whatsappMessage} showPhone={false} light />
          </>
        }
        stats={[
          { value: FOUNDED, label: "Serving pilgrims since" },
          { value: `${RATING}`, label: "Star rated" },
          { value: PILGRIMS, label: "Pilgrims guided" },
          { value: price, label: "Packages from" },
        ]}
      />
      <SectionNav items={[...g.nav]} prefix="dg" />
      <Intro g={g} />
      <Story g={g} />
      <Callout g={g} />
      {afterStory}
      <Places g={g} />
      <Things g={g} />
      <BestTime g={g} />
      <Reach g={g} />
      <Plan g={g} />
      <Stay g={g} />
      <FaqBlock title={g.faqTitle} items={g.faqs} whatsappMessage={g.hero.whatsappMessage} className="dg-cream" />
      <Book g={g} />
      <LinkCards id="continue-title" title="Continue planning your Braj yatra" items={g.continuePlanning} />
      <JsonLd data={brajGuideSchema(g)} />
    </div>
  );
}
