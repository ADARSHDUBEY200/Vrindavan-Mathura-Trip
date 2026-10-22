#!/usr/bin/env node
/**
 * JSON-LD self-check for a rendered page.
 *   node scripts/check-schema.mjs .next/server/app/index.html
 *   node scripts/check-schema.mjs http://localhost:3000/
 *
 * Checks: every block is valid JSON · no @id defined twice · every same-page @id reference resolves ·
 * FAQ questions/answers are non-empty and appear in the visible text · exactly one <h1>.
 */
import { readFile } from "node:fs/promises";

const target = process.argv[2] ?? ".next/server/app/index.html";
const html = /^https?:\/\//.test(target) ? await (await fetch(target)).text() : await readFile(target, "utf8");

const problems = [];
const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m, i) => {
  try {
    return JSON.parse(m[1]);
  } catch (err) {
    problems.push(`block ${i + 1}: invalid JSON (${err.message})`);
    return null;
  }
});

const defined = new Map();
const refs = [];
const types = {};
function walk(node, path) {
  if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`));
  if (!node || typeof node !== "object") return;
  const keys = Object.keys(node);
  if (node["@id"] && keys.length === 1) refs.push({ id: node["@id"], path });
  else if (node["@id"]) {
    if (defined.has(node["@id"])) problems.push(`duplicate @id ${node["@id"]} (${defined.get(node["@id"])} and ${path})`);
    defined.set(node["@id"], path);
  }
  if (node["@type"]) for (const t of [].concat(node["@type"])) types[t] = (types[t] ?? 0) + 1;
  for (const k of keys) if (k !== "@id") walk(node[k], `${path}.${k}`);
}
blocks.forEach((b, i) => b && walk(b, `block${i + 1}`));

const origin = (() => {
  const site = blocks.flatMap((b) => b?.["@graph"] ?? [b]).find((n) => n?.["@type"] === "WebSite");
  return site?.url?.replace(/\/$/, "");
})();
const external = [];
for (const r of refs) {
  if (defined.has(r.id)) continue;
  // References to entities defined on another page (e.g. /about#webpage) are allowed but listed.
  if (origin && !r.id.startsWith(`${origin}/#`)) external.push(r.id);
  else problems.push(`unresolved reference ${r.id} at ${r.path}`);
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const visible = decode(
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, ""),
).replace(/\s+/g, " ");

const faqs = blocks.filter((b) => b?.["@type"] === "FAQPage").flatMap((b) => b.mainEntity);
for (const q of faqs) {
  const a = q?.acceptedAnswer?.text;
  if (!q?.name || !a) problems.push(`empty FAQ item: ${JSON.stringify(q)}`);
  else {
    if (!visible.includes(q.name)) problems.push(`FAQ question not visible: ${q.name}`);
    if (!visible.includes(a)) problems.push(`FAQ answer not visible: ${a.slice(0, 80)}…`);
  }
}

const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
if (h1 !== 1) problems.push(`expected exactly one <h1>, found ${h1}`);

console.log(`JSON-LD blocks: ${blocks.length} (all valid JSON: ${blocks.every(Boolean)})`);
console.log(`Entities with @id: ${defined.size} · references: ${refs.length} · cross-page refs: ${[...new Set(external)].join(", ") || "none"}`);
console.log(`Types: ${Object.entries(types).map(([t, n]) => `${t}×${n}`).join(", ")}`);
console.log(`FAQ items: ${faqs.length} · <h1> count: ${h1}`);
if (problems.length) {
  console.log(`\n✗ ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("\n✓ No duplicate @id, every same-page reference resolves, FAQ matches visible text.");
