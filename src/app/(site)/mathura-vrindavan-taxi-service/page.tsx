import "@/components/taxi/taxi.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { StickyBookBar, TaxiBookingProvider } from "@/components/taxi/TaxiBooking";
import { BookInstantly, Fleet, HonestPricing, Included, Packages, TaxiFaqs, TaxiHero, TaxiStats, WhyLocal, WhyUs } from "@/components/taxi/TaxiSections";
import { photos } from "@/content/images";
import { TAXI_PATH, taxiMeta } from "@/content/taxi";
import { taxiCrumbs, taxiGraph } from "@/lib/schema/taxi";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: taxiMeta.title,
  description: taxiMeta.description,
  path: TAXI_PATH,
  image: photos["taxi-innova"].src,
  imageAlt: taxiMeta.imageAlt,
  absoluteTitle: true,
  largeImagePreview: true,
});

export default function TaxiServicePage() {
  return (
    <div className="tx">
      <TaxiBookingProvider>
        <TaxiHero crumbs={taxiCrumbs} />
        <TaxiStats />
        <WhyLocal />
        <Fleet />
        <HonestPricing />
        <Packages />
        <WhyUs />
        <Included />
        <TaxiFaqs />
        <BookInstantly />
        <StickyBookBar watchId="taxi-hero" />
      </TaxiBookingProvider>
      <JsonLd data={taxiGraph()} />
    </div>
  );
}
