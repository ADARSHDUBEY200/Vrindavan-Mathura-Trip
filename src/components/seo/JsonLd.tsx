type Props = { data: Record<string, unknown> | (Record<string, unknown> | undefined)[] | undefined };

/** Renders JSON-LD, escaping `<` so content can never break out of the script tag. */
export function JsonLd({ data }: Props) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;
  return (
    <>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }} />
      ))}
    </>
  );
}
