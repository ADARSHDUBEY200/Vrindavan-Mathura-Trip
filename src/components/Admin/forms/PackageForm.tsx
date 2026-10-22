"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { CMSActions } from "@/components/Admin/CMS/CMSActions";
import { CMSHeader, RestoreBanner } from "@/components/Admin/CMS/CMSHeader";
import { CMSMediaSection } from "@/components/Admin/CMS/CMSMediaSection";
import { CMSMetaSection } from "@/components/Admin/CMS/CMSMetaSection";
import { CMSSchema } from "@/components/Admin/CMS/CMSSchema";
import { CMSSeoSection, type MetaValue } from "@/components/Admin/CMS/CMSSeoSection";
import { FaqHandler, type Faq } from "@/components/Admin/CMS/FaqHandler";
import { ImageDropzone } from "@/components/Admin/CMS/ImageDropzone";
import { PasteTableEditor } from "@/components/Admin/CMS/PasteTableEditor";
import { EditorShell, RichTextSection } from "@/components/Admin/CMS/RichTextSection";
import { Field, ListEditor, Section, TextArea, TextInput, Toggle } from "@/components/Admin/CMS/ui";
import { useEditorController } from "@/components/Admin/CMS/useEditorController";
import { CMSLoading } from "@/components/Admin/CMSLoading";
import { ADMIN_ROUTES } from "@/lib/cms/config";
import { SOURCE_CITIES } from "@/lib/cms/constants";
import { asArray, asObject, asString, isBlankHtml, stripEmpty, uid, withIds } from "@/lib/cms/utils";

type DescItem = { id: string; description: string };
type Policy = { id: string; title: string; description: string };
type ChildImage = { id: string; image: string; alt: string };
type Testimonial = { id: string; name: string; description: string; rating: string };
type ItineraryDay = { id: string; day: string; title: string; description: string };
type Breakdown = { id: string; days: string; place: string };
type Segment = { id: string; from: string; to: string };
type TempleTiming = { id: string; temple: string; morningOpens: string; afternoonCloses: string; eveningOpens: string; entry: string };
type SeniorRow = { id: string; location: string; stepsWalking: string; seniorExperience: string; emiApproach: string };
type ReachRow = { id: string; city: string; mode: string; travelTime: string; service: string };
type GroundTruth = { id: string; heading: string; points: string[] };
type Recommendation = { id: string; condition: string; recommendation: string; linkLabel: string; linkHref: string };

type PackageSeo = {
  shortDescription: string;
  templeTitle: string;
  templeNote: string;
  templeTimings: TempleTiming[];
  seniorNote: string;
  seniorGuide: SeniorRow[];
  howToReach: ReachRow[];
  groundTruth: GroundTruth[];
  recommendations: Recommendation[];
  groupPricing: { group2: string; group4: string; group6: string };
  videoId: string;
  videoDuration: string;
  videoUploadDate: string;
  videoOverlayTitle: string;
  guideBio: string;
};

export type PackageFormState = {
  title: string;
  category: string;
  slug: string;
  price: string;
  day: string;
  night: string;
  duration: string;
  destination: string;
  reviews: string;
  rating: string;
  overview: string;
  heroimage: { image: string; alt: string };
  meta: MetaValue;
  schema: MetaValue;
  policies: Policy[];
  childImage: ChildImage[];
  faqs: Faq[];
  testimonials: Testimonial[];
  highlights: DescItem[];
  inclusions: DescItem[];
  exclusions: DescItem[];
  documents: DescItem[];
  itinerary: ItineraryDay[];
  durationbreakdown: Breakdown[];
  destroutes: { source: string; destination: string; segments: Segment[] };
  breakfast_included: boolean;
  stay_included: boolean;
  transfer_included: boolean;
  sightseeing_included: boolean;
  available_src: string[];
  seo: PackageSeo;
};

const POLICY_TITLES = ["Refund Policy", "Cancellation Policy", "Confirmation Policy", "Payment Policy"];
const CHILD_SLOTS = 4;

const emptyPolicies = (): Policy[] => POLICY_TITLES.map((title) => ({ id: uid(), title, description: "" }));
const emptyChildImages = (): ChildImage[] => Array.from({ length: CHILD_SLOTS }, () => ({ id: uid(), image: "", alt: "" }));

const EMPTY_SEO: PackageSeo = {
  shortDescription: "",
  templeTitle: "",
  templeNote: "",
  templeTimings: [],
  seniorNote: "",
  seniorGuide: [],
  howToReach: [],
  groundTruth: [],
  recommendations: [],
  groupPricing: { group2: "", group4: "", group6: "" },
  videoId: "",
  videoDuration: "",
  videoUploadDate: "",
  videoOverlayTitle: "",
  guideBio: "",
};

// Fixed ids so the untouched initial form serialises identically on every mount
// (the autosave hook never stores the initial empty form).
const EMPTY: PackageFormState = {
  title: "",
  category: "",
  slug: "",
  price: "",
  day: "",
  night: "",
  duration: "",
  destination: "",
  reviews: "",
  rating: "",
  overview: "",
  heroimage: { image: "", alt: "" },
  meta: { title: "", description: "" },
  schema: { title: "", description: "" },
  policies: POLICY_TITLES.map((title, i) => ({ id: `policy-${i}`, title, description: "" })),
  childImage: Array.from({ length: CHILD_SLOTS }, (_, i) => ({ id: `child-${i}`, image: "", alt: "" })),
  faqs: [],
  testimonials: [],
  highlights: [],
  inclusions: [],
  exclusions: [],
  documents: [],
  itinerary: [],
  durationbreakdown: [],
  destroutes: { source: "", destination: "", segments: [] },
  breakfast_included: false,
  stay_included: false,
  transfer_included: false,
  sightseeing_included: false,
  available_src: [],
  seo: EMPTY_SEO,
};

function fromRow(row: Record<string, unknown>): PackageFormState {
  const seo = asObject<Record<string, unknown>>(row.seoContent, {});
  const routes = asObject<Record<string, unknown>>(row.destroutes, {});
  const policies = withIds<Policy>(row.policies);
  const children = withIds<ChildImage>(row.childImage);
  return {
    title: asString(row.title),
    category: asString(row.category),
    slug: asString(row.slug),
    price: asString(row.price),
    day: asString(row.day),
    night: asString(row.night),
    duration: asString(row.duration),
    destination: asString(row.destination),
    reviews: asString(row.reviews),
    rating: asString(row.rating),
    overview: asString(row.overview),
    heroimage: asObject(row.heroimage, { image: "", alt: "" }),
    meta: asObject(row.meta, { title: "", description: "" }),
    schema: asObject(row.schema, { title: "", description: "" }),
    // Always four policies, in order, matched by title when possible.
    policies: emptyPolicies().map((p, i) => policies.find((x) => x.title === p.title) ?? policies[i] ?? p),
    childImage: emptyChildImages().map((slot, i) => children[i] ?? slot),
    faqs: withIds<Faq>(row.faqs),
    testimonials: withIds<Testimonial>(row.testimonials).map((t) => ({ ...t, rating: asString(t.rating) })),
    highlights: withIds<DescItem>(row.highlights),
    inclusions: withIds<DescItem>(row.inclusions),
    exclusions: withIds<DescItem>(row.exclusions),
    documents: withIds<DescItem>(row.documents),
    itinerary: withIds<ItineraryDay>(row.itinerary).map((d) => ({ ...d, day: asString(d.day) })),
    durationbreakdown: withIds<Breakdown>(row.durationbreakdown).map((d) => ({ ...d, days: asString(d.days) })),
    destroutes: { source: asString(routes.source), destination: asString(routes.destination), segments: withIds<Segment>(routes.segments) },
    breakfast_included: Boolean(row.breakfast_included),
    stay_included: Boolean(row.stay_included),
    transfer_included: Boolean(row.transfer_included),
    sightseeing_included: Boolean(row.sightseeing_included),
    available_src: asArray<string>(row.available_src),
    seo: {
      shortDescription: asString(seo.shortDescription),
      templeTitle: asString(seo.templeTitle),
      templeNote: asString(seo.templeNote),
      templeTimings: withIds<TempleTiming>(seo.templeTimings),
      seniorNote: asString(seo.seniorNote),
      seniorGuide: withIds<SeniorRow>(seo.seniorGuide),
      howToReach: withIds<ReachRow>(seo.howToReach),
      groundTruth: withIds<GroundTruth>(seo.groundTruth).map((g) => ({ ...g, points: asArray<string>(g.points) })),
      recommendations: withIds<Recommendation>(seo.recommendations),
      groupPricing: asObject(seo.groupPricing, { group2: "", group4: "", group6: "" }),
      videoId: asString(seo.videoId),
      videoDuration: asString(seo.videoDuration),
      videoUploadDate: asString(seo.videoUploadDate),
      videoOverlayTitle: asString(seo.videoOverlayTitle),
      guideBio: asString(seo.guideBio),
    },
  };
}

const filled = (items: DescItem[]) => items.filter((i) => i.description.trim());

function toRow(f: PackageFormState, status: "draft" | "published") {
  const seo = f.seo;
  const seoContent = stripEmpty({
    ...seo,
    shortDescription: isBlankHtml(seo.shortDescription) ? "" : seo.shortDescription,
    groundTruth: seo.groundTruth.map((g) => ({ ...g, points: g.points.map((p) => p.trim()).filter(Boolean) })),
  });
  return {
    title: f.title.trim(),
    category: f.category,
    slug: f.slug.trim(),
    price: f.price.trim(),
    day: f.day.trim(),
    night: f.night.trim(),
    duration: f.duration.trim(),
    destination: f.destination.trim(),
    reviews: f.reviews.trim(),
    rating: f.rating.trim(),
    overview: f.overview,
    heroimage: f.heroimage,
    meta: f.meta,
    schema: f.schema,
    policies: f.policies,
    childImage: f.childImage.filter((c) => c.image),
    faqs: f.faqs.filter((q) => q.question.trim() || q.answer.trim()),
    testimonials: f.testimonials
      .filter((t) => t.name.trim() || t.description.trim())
      .map((t) => ({ ...t, rating: t.rating === "" ? null : Number(t.rating) })),
    highlights: filled(f.highlights),
    inclusions: filled(f.inclusions),
    exclusions: filled(f.exclusions),
    documents: filled(f.documents),
    itinerary: f.itinerary.map((d, i) => ({ ...d, day: i + 1 })),
    durationbreakdown: f.durationbreakdown.filter((d) => d.place.trim() || d.days.trim()),
    destroutes: { ...f.destroutes, segments: f.destroutes.segments.filter((s) => s.from.trim() || s.to.trim()) },
    breakfast_included: f.breakfast_included,
    stay_included: f.stay_included,
    transfer_included: f.transfer_included,
    sightseeing_included: f.sightseeing_included,
    available_src: f.available_src,
    seoContent: seoContent ?? {},
    status,
  };
}

function validatePublish(f: PackageFormState) {
  if (!f.category) return "Choose a category";
  if (!f.heroimage.image) return "Upload a hero image";
  const missing = f.childImage.filter((c) => !c.image).length;
  if (missing) return `Upload all ${CHILD_SLOTS} child images (${missing} missing)`;
  return null;
}

function validateDraft(f: PackageFormState) {
  if (!f.title.trim()) return "A draft needs a title";
  if (!f.category) return "A draft needs a category";
  if (!f.heroimage.image) return "A draft needs a hero image";
  return null;
}

function DescriptionList({ items, onChange, label, placeholder }: { items: DescItem[]; onChange: (items: DescItem[]) => void; label: string; placeholder?: string }) {
  return (
    <ListEditor
      items={items}
      onChange={onChange}
      create={() => ({ id: uid(), description: "" })}
      addLabel={`Add ${label.toLowerCase()}`}
      itemLabel={label}
      reorder
      renderItem={(item, update) => <TextInput value={item.description} placeholder={placeholder} onChange={(description) => update({ description })} aria-label={label} />}
    />
  );
}

export default function PackageForm({ mode, id }: { mode: "create" | "edit"; id?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const c = useEditorController({
    formRef,
    editorType: "Package",
    mode,
    id,
    empty: EMPTY,
    listHref: ADMIN_ROUTES.Package,
    fromRow,
    toRow,
    validatePublish,
    validateDraft,
  });
  const { form, patch, ready, editorKey } = c;
  const setSeo = (p: Partial<PackageSeo>) => c.setForm((f) => ({ ...f, seo: { ...f.seo, ...p } }));
  const setRoutes = (p: Partial<PackageFormState["destroutes"]>) => c.setForm((f) => ({ ...f, destroutes: { ...f.destroutes, ...p } }));

  if (!ready && !c.loadError) return <CMSLoading label="Loading package…" />;

  const toggleCity = (city: string) =>
    patch({ available_src: form.available_src.includes(city) ? form.available_src.filter((x) => x !== city) : [...form.available_src, city] });

  return (
    <EditorShell loadError={c.loadError} ready={ready}>
      <CMSHeader editorType="Package" mode={mode} backHref={ADMIN_ROUTES.Package} lastSaved={c.lastSaved} />
      {c.showRestoreBanner && <RestoreBanner onRestore={c.restoreDraft} onDismiss={c.discardDraft} />}

      <form ref={formRef} onSubmit={c.onSubmit} noValidate className="space-y-6">
        <CMSMetaSection editorType="Package" title={form.title} category={form.category} slug={form.slug} onChange={patch} autoSlug={mode === "create"} />

        <Section title="Package Details" helper="Price, duration label, review count, rating and group pricing.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Price (₹)" required>
              <TextInput required inputMode="numeric" value={form.price} placeholder="4999" onChange={(price) => patch({ price })} />
            </Field>
            <Field label="Duration" required>
              <TextInput required value={form.duration} placeholder="2 Days / 1 Night" onChange={(duration) => patch({ duration })} />
            </Field>
            <Field label="Reviews">
              <TextInput inputMode="numeric" value={form.reviews} placeholder="320" onChange={(reviews) => patch({ reviews })} />
            </Field>
            <Field label="Rating">
              <TextInput type="number" min={0} max={5} step={0.1} value={form.rating} placeholder="4.8" onChange={(rating) => patch({ rating })} />
            </Field>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {(["group2", "group4", "group6"] as const).map((g) => (
              <Field key={g} label={`Group of ${g.slice(5)} (₹ per person)`}>
                <TextInput inputMode="numeric" value={form.seo.groupPricing[g]} onChange={(v) => setSeo({ groupPricing: { ...form.seo.groupPricing, [g]: v } })} />
              </Field>
            ))}
          </div>
        </Section>

        <RichTextSection
          title="Quick Answer"
          helper="Short description shown at the top of the package page."
          editorType="Package"
          value={form.seo.shortDescription}
          onChange={(shortDescription) => setSeo({ shortDescription })}
          ready={ready}
          editorKey={editorKey}
          height="180px"
        />

        <Section title="Source Cities" helper="Cities this package can start from.">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Source cities">
            {SOURCE_CITIES.map((city) => {
              const on = form.available_src.includes(city);
              return (
                <button
                  key={city}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleCity(city)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition ${on ? "border-sky-500 bg-sky-500/20 text-sky-200" : "border-white/15 text-white/60 hover:bg-white/5"}`}
                >
                  {on && <Check size={14} />}
                  {city}
                </button>
              );
            })}
          </div>
        </Section>

        <Section title="Destination" helper="Main destination(s) covered.">
          <Field label="Destination" required>
            <TextInput required value={form.destination} placeholder="Vrindavan, Mathura, Govardhan" onChange={(destination) => patch({ destination })} />
          </Field>
        </Section>

        <CMSSeoSection editorType="Package" value={form.meta} onChange={(meta) => patch({ meta })} />
        <CMSSchema editorType="Package" value={form.schema} onChange={(schema) => patch({ schema })} />

        <Section title="Inclusions at a glance" helper="Icons shown on the package card.">
          <div className="grid gap-3 md:grid-cols-2">
            <Toggle label="Breakfast included" checked={form.breakfast_included} onChange={(breakfast_included) => patch({ breakfast_included })} />
            <Toggle label="Stay included" checked={form.stay_included} onChange={(stay_included) => patch({ stay_included })} />
            <Toggle label="Transfers included" checked={form.transfer_included} onChange={(transfer_included) => patch({ transfer_included })} />
            <Toggle label="Sightseeing included" checked={form.sightseeing_included} onChange={(sightseeing_included) => patch({ sightseeing_included })} />
          </div>
        </Section>

        <Section title="Duration" helper="Days and nights, plus how many days are spent where.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Days" required>
              <TextInput required type="number" min={1} value={form.day} onChange={(day) => patch({ day })} />
            </Field>
            <Field label="Nights" required>
              <TextInput required type="number" min={0} value={form.night} onChange={(night) => patch({ night })} />
            </Field>
          </div>
          <ListEditor
            items={form.durationbreakdown}
            onChange={(durationbreakdown) => patch({ durationbreakdown })}
            create={() => ({ id: uid(), days: "", place: "" })}
            addLabel="Add place"
            itemLabel="Stop"
            renderItem={(d, update) => (
              <div className="grid gap-3 md:grid-cols-[8rem_1fr]">
                <Field label="Days">
                  <TextInput type="number" min={0} step="any" value={d.days} onChange={(days) => update({ days })} />
                </Field>
                <Field label="Place">
                  <TextInput value={d.place} placeholder="Vrindavan" onChange={(place) => update({ place })} />
                </Field>
              </div>
            )}
          />
        </Section>

        <Section title="Destination Route" helper="Start and end points, and each leg of the route.">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Source">
              <TextInput value={form.destroutes.source} placeholder="Delhi" onChange={(source) => setRoutes({ source })} />
            </Field>
            <Field label="Destination">
              <TextInput value={form.destroutes.destination} placeholder="Vrindavan" onChange={(destination) => setRoutes({ destination })} />
            </Field>
          </div>
          <ListEditor
            items={form.destroutes.segments}
            onChange={(segments) => setRoutes({ segments })}
            create={() => ({ id: uid(), from: "", to: "" })}
            addLabel="Add segment"
            itemLabel="Segment"
            reorder
            renderItem={(s, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="From">
                  <TextInput value={s.from} onChange={(from) => update({ from })} />
                </Field>
                <Field label="To">
                  <TextInput value={s.to} onChange={(to) => update({ to })} />
                </Field>
              </div>
            )}
          />
        </Section>

        <Section title="Overview" helper="A paragraph or two describing the trip.">
          <Field label="Overview" required>
            <TextArea required rows={6} value={form.overview} onChange={(overview) => patch({ overview })} />
          </Field>
        </Section>

        <Section title="Itinerary" helper="Day-by-day plan. Days renumber automatically." defaultOpen={false}>
          <ListEditor
            items={form.itinerary}
            onChange={(itinerary) => patch({ itinerary: itinerary.map((d, i) => ({ ...d, day: String(i + 1) })) })}
            create={() => ({ id: uid(), day: String(form.itinerary.length + 1), title: "", description: "" })}
            addLabel="Add day"
            itemLabel="Day"
            reorder
            renderItem={(d, update) => (
              <>
                <Field label="Title">
                  <TextInput value={d.title} placeholder="Arrival & Banke Bihari darshan" onChange={(title) => update({ title })} />
                </Field>
                <Field label="Description">
                  <TextArea rows={3} value={d.description} onChange={(description) => update({ description })} />
                </Field>
              </>
            )}
          />
        </Section>

        <FaqHandler editorType="Package" faqs={form.faqs} onChange={(faqs) => patch({ faqs })} />

        <Section title="Trip Highlights" helper="Short bullet points." defaultOpen={false}>
          <DescriptionList items={form.highlights} onChange={(highlights) => patch({ highlights })} label="Highlight" />
        </Section>
        <Section title="Inclusions" helper="What the price covers." defaultOpen={false}>
          <DescriptionList items={form.inclusions} onChange={(inclusions) => patch({ inclusions })} label="Inclusion" />
        </Section>
        <Section title="Exclusions" helper="What the price does not cover." defaultOpen={false}>
          <DescriptionList items={form.exclusions} onChange={(exclusions) => patch({ exclusions })} label="Exclusion" />
        </Section>

        <Section title="Testimonials" helper="Guest quotes with a 1–5 rating." defaultOpen={false}>
          <ListEditor
            items={form.testimonials}
            onChange={(testimonials) => patch({ testimonials })}
            create={() => ({ id: uid(), name: "", description: "", rating: "5" })}
            addLabel="Add testimonial"
            itemLabel="Testimonial"
            renderItem={(t, update) => (
              <>
                <div className="grid gap-3 md:grid-cols-[1fr_8rem]">
                  <Field label="Name">
                    <TextInput value={t.name} onChange={(name) => update({ name })} />
                  </Field>
                  <Field label="Rating">
                    <TextInput type="number" min={1} max={5} step={0.5} value={t.rating} onChange={(rating) => update({ rating })} />
                  </Field>
                </div>
                <Field label="Testimonial">
                  <TextArea rows={3} value={t.description} onChange={(description) => update({ description })} />
                </Field>
              </>
            )}
          />
        </Section>

        <Section title="Documents" helper="Documents guests should carry." defaultOpen={false}>
          <DescriptionList items={form.documents} onChange={(documents) => patch({ documents })} label="Document" placeholder="Government photo ID" />
        </Section>

        <Section title="Policies" helper="Refund, cancellation, confirmation and payment terms." defaultOpen={false}>
          {form.policies.map((p) => (
            <Field key={p.id} label={p.title}>
              <TextArea rows={3} value={p.description} onChange={(description) => patch({ policies: form.policies.map((x) => (x.id === p.id ? { ...x, description } : x)) })} />
            </Field>
          ))}
        </Section>

        <CMSMediaSection
          editorType="Package"
          title="Hero Media"
          helper="Main package image (.webp, 2 MB max)."
          image={form.heroimage.image}
          alt={form.heroimage.alt}
          onImageChange={(image) => patch({ heroimage: { ...form.heroimage, image } })}
          onAltChange={(alt) => patch({ heroimage: { ...form.heroimage, alt } })}
        />

        <Section title="Child Images" helper={`Exactly ${CHILD_SLOTS} gallery images are required to publish.`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {form.childImage.map((slot, i) => {
              const setSlot = (p: Partial<ChildImage>) => patch({ childImage: form.childImage.map((x) => (x.id === slot.id ? { ...x, ...p } : x)) });
              return (
                <div key={slot.id} className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/40">Image {i + 1}</p>
                  <ImageDropzone editorType="Package" compact value={slot.image} onChange={(image) => setSlot({ image })} label="Add .webp" />
                  <TextInput value={slot.alt} placeholder="Alt text" aria-label={`Image ${i + 1} alt text`} onChange={(alt) => setSlot({ alt })} />
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Temple Timings" helper="Paste a timings table from Word or Sheets." defaultOpen={false}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Title">
              <TextInput value={form.seo.templeTitle} placeholder="Temple timings in Vrindavan" onChange={(templeTitle) => setSeo({ templeTitle })} />
            </Field>
            <Field label="Note">
              <TextInput value={form.seo.templeNote} onChange={(templeNote) => setSeo({ templeNote })} />
            </Field>
          </div>
          <PasteTableEditor<TempleTiming>
            columns={[
              { key: "temple", label: "Temple" },
              { key: "morningOpens", label: "Morning Opens" },
              { key: "afternoonCloses", label: "Afternoon Closes" },
              { key: "eveningOpens", label: "Evening Opens" },
              { key: "entry", label: "Entry" },
            ]}
            rows={form.seo.templeTimings}
            onChange={(templeTimings) => setSeo({ templeTimings })}
          />
        </Section>

        <Section title="Senior Citizen Accessibility" helper="Walking effort and how we handle each stop for elderly guests." defaultOpen={false}>
          <Field label="Note">
            <TextArea rows={2} value={form.seo.seniorNote} onChange={(seniorNote) => setSeo({ seniorNote })} />
          </Field>
          <PasteTableEditor<SeniorRow>
            columns={[
              { key: "location", label: "Location" },
              { key: "stepsWalking", label: "Steps / Walking" },
              { key: "seniorExperience", label: "Senior Experience" },
              { key: "emiApproach", label: "Our Approach" },
            ]}
            rows={form.seo.seniorGuide}
            onChange={(seniorGuide) => setSeo({ seniorGuide })}
          />
        </Section>

        <Section title="How to Reach" helper="Travel options from major cities." defaultOpen={false}>
          <PasteTableEditor<ReachRow>
            columns={[
              { key: "city", label: "City" },
              { key: "mode", label: "Mode" },
              { key: "travelTime", label: "Travel Time" },
              { key: "service", label: "Service" },
            ]}
            rows={form.seo.howToReach}
            onChange={(howToReach) => setSeo({ howToReach })}
          />
        </Section>

        <Section title="Ground Truth" helper="Honest, on-the-ground notes. Add as many blocks as needed; one point per line." defaultOpen={false}>
          <ListEditor
            items={form.seo.groundTruth}
            onChange={(groundTruth) => setSeo({ groundTruth })}
            create={() => ({ id: uid(), heading: "", points: [] })}
            addLabel="Add block"
            itemLabel="Block"
            reorder
            renderItem={(g, update) => (
              <>
                <Field label="Heading">
                  <TextInput value={g.heading} onChange={(heading) => update({ heading })} />
                </Field>
                <Field label="Points (one per line)">
                  <TextArea rows={4} value={g.points.join("\n")} onChange={(v) => update({ points: v.split("\n") })} />
                </Field>
              </>
            )}
          />
        </Section>

        <Section title="Our Recommendations" helper="If this applies to you → we recommend this, with a link." defaultOpen={false}>
          <ListEditor
            items={form.seo.recommendations}
            onChange={(recommendations) => setSeo({ recommendations })}
            create={() => ({ id: uid(), condition: "", recommendation: "", linkLabel: "", linkHref: "" })}
            addLabel="Add recommendation"
            itemLabel="Recommendation"
            renderItem={(r, update) => (
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Condition">
                  <TextInput value={r.condition} placeholder="Travelling with elderly parents" onChange={(condition) => update({ condition })} />
                </Field>
                <Field label="Recommendation">
                  <TextInput value={r.recommendation} onChange={(recommendation) => update({ recommendation })} />
                </Field>
                <Field label="Link label">
                  <TextInput value={r.linkLabel} onChange={(linkLabel) => update({ linkLabel })} />
                </Field>
                <Field label="Link href">
                  <TextInput value={r.linkHref} placeholder="/tour-packages/…" onChange={(linkHref) => update({ linkHref })} />
                </Field>
              </div>
            )}
          />
        </Section>

        <Section title="YouTube Video & Guide" helper="Video details for VideoObject schema, plus the guide bio." defaultOpen={false}>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="YouTube video ID">
              <TextInput value={form.seo.videoId} placeholder="dQw4w9WgXcQ" onChange={(videoId) => setSeo({ videoId })} />
            </Field>
            <Field label="Duration (minutes)">
              <TextInput type="number" min={0} step="any" value={form.seo.videoDuration} onChange={(videoDuration) => setSeo({ videoDuration })} />
            </Field>
            <Field label="Upload date">
              <TextInput type="date" value={form.seo.videoUploadDate} onChange={(videoUploadDate) => setSeo({ videoUploadDate })} />
            </Field>
            <Field label="Overlay title">
              <TextInput value={form.seo.videoOverlayTitle} onChange={(videoOverlayTitle) => setSeo({ videoOverlayTitle })} />
            </Field>
          </div>
          <Field label="Guide bio">
            <TextArea rows={3} value={form.seo.guideBio} onChange={(guideBio) => setSeo({ guideBio })} />
          </Field>
        </Section>

        <CMSActions mode={mode} editingLabel={`Package · ${form.title}`} saving={c.saving} onDraft={c.onDraft} />
      </form>
    </EditorShell>
  );
}
