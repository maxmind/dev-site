/**
 * One-shot check that splitting a year file into individual notes changed no
 * note body. Compares the rendered HTML of every note on the year pages of a
 * pre-migration build against the rendered HTML of its own page in a
 * post-migration build.
 *
 * Notes are compared in publication order rather than by anchor, because a few
 * anchors repeat across notes. Those repeats are the broken links the
 * restructure exists to fix, so they must not collapse into one entry here.
 *
 * Delete this script once both products have migrated.
 *
 * Usage:
 *   node --experimental-strip-types bin/verify-release-note-migration.ts \
 *     <product> <before-dir> <after-dir>
 */
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(currentDir, '..', 'content');

interface Note {
  anchor: string;
  body: string;
  label: string;
  title: string;
  date: string;
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

/**
 * The shortcode rendered a single-paragraph note inline, so its body carried no
 * paragraph tags. A note page renders the same Markdown as a block and wraps it.
 * The text is identical, so the wrapper is removed from both sides before they
 * are compared. Any other markup difference still fails.
 */
function unwrapSingleParagraph(html: string): string {
  if (!html.startsWith('<p>') || !html.endsWith('</p>')) return html;
  const inner = html.slice(3, -4);
  return inner.includes('<p>') ? html : inner;
}

/**
 * Some notes began on the same line as the shortcode tag, so the formatter
 * rewraps their prose once they stand alone. Line breaks between words do not
 * reach the reader, so they are collapsed before comparison. Preformatted
 * blocks keep their whitespace, where a break does change what is shown.
 */
function collapseProseWhitespace(html: string): string {
  return html
    .split(/(<pre[\s\S]*?<\/pre>)/)
    .map((part, index) => (index % 2 === 1 ? part : part.replace(/\s+/g, ' ')))
    .join('')
    .trim();
}

function readYearPageNotes(beforeDir: string, product: string): Note[] {
  const sectionDir = path.join(beforeDir, product, 'release-notes');
  const years = fs
    .readdirSync(sectionDir)
    .filter((entry) => /^\d{4}$/.test(entry))
    .sort()
    .reverse();

  const notes: Note[] = [];

  for (const year of years) {
    const html = fs.readFileSync(
      path.join(sectionDir, year, 'index.html'),
      'utf8'
    );

    for (const block of html.split('<!-- end-release-note -->')) {
      const anchor = block.match(/data-anchor="([^"]*)"/);
      const date = block.match(/data-date="([^"]*)"/);
      const body = block.match(
        /<div class="release-note__content">([\s\S]*?)<!-- end-content -->/
      );
      const heading = block.match(
        /<a class="heading-anchor"[^>]*>([\s\S]*?)<\/a>/
      );
      const shown = block.match(
        /<em class="release-note__date">([\s\S]*?)<\/em>/
      );
      if (!anchor || !date || !body || !heading || !shown) continue;
      notes.push({
        anchor: anchor[1],
        body: collapseProseWhitespace(unwrapSingleParagraph(body[1].trim())),
        label: `${date[1]} ${anchor[1]}`,
        title: decodeEntities(heading[1].trim()),
        date: shown[1].trim(),
      });
    }
  }

  return notes;
}

function readMigratedNotes(
  afterDir: string,
  product: string,
  problems: string[]
): Note[] {
  const contentDir = path.join(CONTENT_DIR, product, 'release-notes');
  const dated: { date: string; note: Note }[] = [];

  for (const file of fs.readdirSync(contentDir)) {
    if (!file.endsWith('.md') || /^(\d{4}|_index)\.md$/.test(file)) continue;

    const source = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const anchor = source.match(/^legacy_anchor = '([^']*)'$/m);
    const date = source.match(/^date = (\S+)$/m);
    if (!anchor || !date) {
      problems.push(`Missing legacy_anchor or date in front matter: ${file}`);
      continue;
    }

    const slug = path.basename(file, '.md');
    const rendered = path.join(
      afterDir,
      product,
      'release-notes',
      slug,
      'index.html'
    );
    if (!fs.existsSync(rendered)) {
      problems.push(`Note is not reachable at its own URL: ${slug}`);
      continue;
    }

    const html = fs.readFileSync(rendered, 'utf8');
    const body = html.match(/<\/em>([\s\S]*?)\n {2}<\/div>\n<\/div>/);
    const heading = html.match(/<h1 class="page__title">([\s\S]*?)<\/h1>/);
    const shown = html.match(/<em class="release-note__date">([\s\S]*?)<\/em>/);
    if (!body || !heading || !shown) {
      problems.push(
        `Could not read the rendered heading, date or body of ${slug}`
      );
      continue;
    }

    dated.push({
      date: date[1],
      note: {
        anchor: anchor[1],
        body: collapseProseWhitespace(unwrapSingleParagraph(body[1].trim())),
        label: slug,
        title: decodeEntities(heading[1].trim()),
        date: shown[1].trim(),
      },
    });
  }

  dated.sort((a, b) => b.date.localeCompare(a.date));
  return dated.map((entry) => entry.note);
}

function restoreCrossReferences(
  html: string,
  product: string,
  byName: Map<string, string>
): string {
  return html.replace(
    new RegExp(`/${product}/release-notes/([^/"]+)/`, 'g'),
    (match, name: string) => {
      const anchor = byName.get(name);
      return anchor === undefined ? match : `#${anchor}`;
    }
  );
}

function verify(): void {
  const [product, beforeDir, afterDir] = process.argv.slice(2);
  if (!product || !beforeDir || !afterDir) {
    console.error(
      'Usage: verify-release-note-migration.ts <product> <before-dir> <after-dir>'
    );
    process.exit(1);
  }

  const problems: string[] = [];
  const before = readYearPageNotes(beforeDir, product);
  const after = readMigratedNotes(afterDir, product, problems);

  const byName = new Map(after.map((note) => [note.label, note.anchor]));
  const rewritten: string[] = [];
  for (const note of after) {
    const restored = restoreCrossReferences(note.body, product, byName);
    if (restored !== note.body) rewritten.push(note.label);
    note.body = restored;
  }

  console.log(`Notes on the year pages: ${before.length}`);
  console.log(`Migrated notes rendered at their own URL: ${after.length}`);

  if (before.length !== after.length) {
    problems.push(
      `Expected ${before.length} migrated notes, found ${after.length}`
    );
  }

  for (let i = 0; i < Math.min(before.length, after.length); i++) {
    if (before[i].anchor !== after[i].anchor) {
      problems.push(
        `Order or anchor mismatch at position ${i}: ` +
          `year page has ${before[i].label}, migrated note is ${after[i].label}`
      );
    } else {
      if (before[i].title !== after[i].title) {
        problems.push(
          `Title changed: ${after[i].label} ` +
            `("${before[i].title}" became "${after[i].title}")`
        );
      }
      if (before[i].date !== after[i].date) {
        problems.push(
          `Displayed date changed: ${after[i].label} ` +
            `(${before[i].date} became ${after[i].date})`
        );
      }
      if (before[i].body !== after[i].body) {
        problems.push(`Body changed: ${after[i].label}`);
      }
    }
  }

  const repeated = new Map<string, string[]>();
  for (const note of after) {
    repeated.set(note.anchor, [
      ...(repeated.get(note.anchor) ?? []),
      note.label,
    ]);
  }
  for (const [anchor, labels] of repeated) {
    if (labels.length > 1) {
      console.log(
        `Anchor shared by ${labels.length} notes, now distinct pages: ${anchor}`
      );
      for (const label of labels) console.log(`  ${label}`);
    }
  }

  for (const problem of problems) console.error(problem);

  if (problems.length) {
    console.error('\nMigration verification failed.');
    process.exit(1);
  }

  // A rewritten cross-reference is the one body change the migration makes on
  // purpose, and the comparison above normalizes it away. Naming those notes
  // keeps the result honest about what "unchanged" covers.
  console.log(`\n${after.length - rewritten.length} notes migrated verbatim.`);
  if (rewritten.length) {
    console.log(
      `${rewritten.length} notes migrated with cross-references rewritten to note URLs:`
    );
    for (const label of rewritten) console.log(`  ${label}`);
  }
}

verify();
