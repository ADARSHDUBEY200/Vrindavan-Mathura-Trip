/** A block of long-form copy: a paragraph, a bulleted list, a sub-heading or a highlighted tip. */
export type RichBlock = string | { list: string[] } | { h3: string } | { tip: string };

export type Section = { heading: string; body: RichBlock[] };

export type Faq = { q: string; a: string };
