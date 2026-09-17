/**
 * One-shot split of a product's release note year files into one content file
 * per note.
 *
 * Anchors are read from a rendered build rather than recomputed from the title,
 * because Hugo's anchor generation transforms punctuation in ways that are hard
 * to reproduce: an em dash, for instance, is removed without leaving a
 * separator. The recorded anchor is what keeps years of published fragment
 * links working.
 *
 * Year files are left in place. Removing them is the cutover, not this step.
 *
 * Delete this script once both products have migrated.
 *
 * Usage:
 *   node --experimental-strip-types bin/migrate-release-notes.ts <product> <rendered-dir>
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(currentDir, '..', 'content');

/** The first note published on a date keeps the hour the legacy feed stamped. */
const LATEST_HOUR = 16;

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

interface SourceNote {
  date: string;
  title: string;
  body: string;
}

const NOTE_PATTERN =
  /\{\{<\s*release-note\s+date="([^"]+)"\s+title="([^"]*)"\s*>\}\}([\s\S]*?)\{\{<\/\s*release-note\s*>\}\}/g;

function readSourceNotes(file: string): SourceNote[] {
  const source = fs.readFileSync(file, 'utf8');
  const notes: SourceNote[] = [];

  for (const match of source.matchAll(NOTE_PATTERN)) {
    notes.push({ date: match[1], title: match[2], body: match[3].trim() });
  }

  return notes;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code))
    )
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function readRenderedNotes(
  renderedDir: string,
  product: string,
  year: string
): SourceNote[] {
  const file = path.join(
    renderedDir,
    product,
    'release-notes',
    year,
    'index.html'
  );
  const html = fs.readFileSync(file, 'utf8');
  const notes: SourceNote[] = [];

  for (const block of html.split('<!-- end-release-note -->')) {
    const anchor = block.match(/data-anchor="([^"]*)"/);
    const title = block.match(/data-title="([^"]*)"/);
    const date = block.match(/data-date="([^"]*)"/);
    if (!anchor || !title || !date) continue;
    // The anchor rides in the body field; this shape is only used for pairing.
    notes.push({
      date: date[1],
      title: decodeEntities(title[1]),
      body: anchor[1],
    });
  }

  return notes;
}

function slugify(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[‘’“”]/g, '')
    .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function tomlString(value: string): string {
  if (!value.includes("'")) return `'${value}'`;
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/**
 * Year files are in strict descending date order, so the note that appears
 * first in a same-date group is the most recent and takes the latest hour.
 */
function timestamp(date: string, positionInDay: number): string {
  const hour = LATEST_HOUR - positionInDay;
  if (hour < 0)
    throw new Error(`Too many notes on ${date} to keep them within one day`);
  return `${date}T${String(hour).padStart(2, '0')}:00:00Z`;
}

interface PreparedNote {
  name: string;
  title: string;
  date: string;
  anchor: string;
  body: string;
  timestamp: string;
}

function prepareNotes(
  product: string,
  contentDir: string,
  renderedDir: string
): PreparedNote[] {
  const years = fs
    .readdirSync(contentDir)
    .filter((file) => /^\d{4}\.md$/.test(file))
    .sort()
    .reverse();

  const prepared: PreparedNote[] = [];
  const names = new Set<string>();

  for (const yearFile of years) {
    const year = path.basename(yearFile, '.md');
    const sourceNotes = readSourceNotes(path.join(contentDir, yearFile));
    const renderedNotes = readRenderedNotes(renderedDir, product, year);

    if (sourceNotes.length !== renderedNotes.length) {
      fail(
        `${yearFile}: ${sourceNotes.length} notes in source, ` +
          `${renderedNotes.length} in the rendered page`
      );
    }

    let positionInDay = 0;

    for (const [index, note] of sourceNotes.entries()) {
      const rendered = renderedNotes[index];
      if (rendered.title !== note.title || rendered.date !== note.date) {
        fail(
          `${yearFile}: note ${index} does not pair with the rendered page ` +
            `(${note.date} "${note.title}" against ${rendered.date} "${rendered.title}")`
        );
      }

      if (!note.date.startsWith(`${year}-`)) {
        fail(`${yearFile}: note dated ${note.date} does not belong to ${year}`);
      }

      // Same-day times are read off the file order, which only carries meaning
      // while the file runs newest first.
      const previous = sourceNotes[index - 1];
      if (previous && previous.date < note.date) {
        fail(
          `${yearFile}: ${note.date} follows the older ${previous.date}, ` +
            'so file order cannot be used to order notes published on one day'
        );
      }

      positionInDay =
        previous && previous.date === note.date ? positionInDay + 1 : 0;

      const name = `${note.date}-${slugify(note.title)}`;
      if (names.has(name)) fail(`Duplicate slug within ${product}: ${name}`);
      names.add(name);

      prepared.push({
        name,
        title: note.title,
        date: note.date,
        anchor: rendered.body,
        body: note.body,
        timestamp: timestamp(note.date, positionInDay),
      });
    }
  }

  return prepared;
}

/**
 * A note that cross-referenced another note on the same year page linked to its
 * anchor. Once each note is its own page that anchor resolves to nothing, so the
 * link is rewritten to the note it names.
 */
function rewriteCrossReferences(
  notes: PreparedNote[],
  product: string
): number {
  const byAnchor = new Map<string, PreparedNote[]>();
  for (const note of notes) {
    byAnchor.set(note.anchor, [...(byAnchor.get(note.anchor) ?? []), note]);
  }

  let rewritten = 0;

  for (const note of notes) {
    note.body = note.body.replace(
      /\]\(#([^)]+)\)/g,
      (match, anchor: string) => {
        const targets = byAnchor.get(anchor);
        if (!targets) return match;
        if (targets.length > 1) {
          fail(
            `${note.name}: the link to #${anchor} names ${targets.length} notes`
          );
        }
        rewritten++;
        return `](/${product}/release-notes/${targets[0].name}/)`;
      }
    );
  }

  return rewritten;
}

function migrate(): void {
  const [product, renderedDir] = process.argv.slice(2);
  if (!product || !renderedDir) {
    console.error('Usage: migrate-release-notes.ts <product> <rendered-dir>');
    process.exit(1);
  }

  const contentDir = path.join(CONTENT_DIR, product, 'release-notes');
  const notes = prepareNotes(product, contentDir, renderedDir);
  const rewritten = rewriteCrossReferences(notes, product);

  for (const note of notes) {
    const file = [
      '+++',
      `title = ${tomlString(note.title)}`,
      `date = ${note.timestamp}`,
      'draft = false',
      `legacy_anchor = ${tomlString(note.anchor)}`,
      '[build]',
      // Removed at cutover. Until then the year pages serve the listing and
      // the feed, and a note is reachable only at its own URL.
      "  list = 'never'",
      '+++',
      '',
      note.body,
      '',
    ].join('\n');

    fs.writeFileSync(path.join(contentDir, `${note.name}.md`), file);
  }

  console.log(
    `Wrote ${notes.length} ${product} release notes to ${contentDir}`
  );
  console.log(`Rewrote ${rewritten} cross-references to direct note URLs`);
}

migrate();
