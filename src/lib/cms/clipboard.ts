/**
 * Turns a clipboard paste from Word, Google Sheets or Excel into a grid of cell strings.
 * Prefers the HTML flavour (keeps cells that contain line breaks), falls back to TSV.
 */
export function parseClipboardTable(data: DataTransfer): string[][] {
  const html = data.getData("text/html");
  if (html && /<table/i.test(html)) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = Array.from(doc.querySelectorAll("tr")).map((tr) =>
      Array.from(tr.querySelectorAll("th, td")).map((cell) => (cell.textContent ?? "").replace(/\s+/g, " ").trim()),
    );
    const filtered = rows.filter((r) => r.some(Boolean));
    if (filtered.length) return filtered;
  }

  const text = data.getData("text/plain");
  return parseTsv(text);
}

export function parseTsv(text: string): string[][] {
  return text
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.split("\t").map((c) => c.trim()))
    .filter((cells) => cells.some(Boolean));
}

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Builds a clean <table> (first row as the header) from a grid. No source styles survive. */
export function gridToHtmlTable(grid: string[][]): string {
  if (!grid.length) return "";
  const [head, ...body] = grid;
  const width = Math.max(...grid.map((r) => r.length));
  const pad = (r: string[]) => Array.from({ length: width }, (_, i) => escapeHtml(r[i] ?? ""));
  const thead = `<thead><tr>${pad(head)
    .map((c) => `<th>${c}</th>`)
    .join("")}</tr></thead>`;
  const tbody = body.length
    ? `<tbody>${body
        .map(
          (r) =>
            `<tr>${pad(r)
              .map((c) => `<td>${c}</td>`)
              .join("")}</tr>`,
        )
        .join("")}</tbody>`
    : "";
  return `<table>${thead}${tbody}</table>`;
}
