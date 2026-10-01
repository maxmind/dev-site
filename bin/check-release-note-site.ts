/**
 * Checks what the built site shows: the anchor map that sends an old fragment
 * link to its note, and the age notice on old notes.
 *
 * It builds at two clocks five months apart, so a notice that ignores the
 * build month fails. Both clocks fall after the newest note, because Hugo does
 * not build a note dated after the clock. The anchor map does not depend on
 * the clock, so only the first build checks it.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-site.ts
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  type AnchorEntry,
  resolveAnchor,
} from '../assets/js/release-note-anchors.ts';
import {
  finish,
  type Note,
  PRODUCTS,
  readNotes,
  ROOT,
} from './_release-notes.ts';

/** A year with no notes, to test the fallback to the newest match. */
const ABSENT_YEAR = '1999';

/**
 * Anchor-and-year pairs that more than one note shares. An old link cannot tell
 * them apart, so it reaches only the newest. Do not add to this list.
 */
const KNOWN_AMBIGUOUS: Record<string, string[]> = {
  geoip: [
    'subdivision-city-and-postal-fields-blanked-in-additional-countries 2025',
    'upcoming-changes-to-isp-names 2024',
  ],
  minfraud: [
    'ip-address-optional-in-minfraud-score-insights-and-factors-services 2020',
    'subdivision-city-and-postal-fields-blanked-in-additional-countries 2025',
  ],
};

const NOTICE = /<div[^>]*\bdata-age-notice\b[^>]*>([\s\S]*?)<\/div>/;

/** The text of the blockquote in a Markdown page that holds the age notice. */
function markdownNotice(text: string): string | null {
  const quote = text
    .split(/\n\s*\n/)
    .find(
      (block) =>
        block.split('\n').every((line) => line.startsWith('>')) &&
        block.includes('two years old')
    );
  return quote === undefined ? null : quote.replace(/^>\s?/gm, '');
}

/** Two clocks five months apart, the first in the month after `newest`. */
function clocks(newest: string): string[] {
  const [year, month] = newest.split('-').map(Number);
  return [1, 6].map((ahead) =>
    new Date(Date.UTC(year, month - 1 + ahead, 15, 12)).toISOString()
  );
}

function build(clock: string): string | null {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-note-site-'));
  try {
    execFileSync('hugo', ['--quiet', '--clock', clock, '--destination', dir], {
      cwd: ROOT,
      stdio: ['ignore', 'ignore', 'inherit'],
    });
    return dir;
  } catch {
    fs.rmSync(dir, { recursive: true, force: true });
    return null;
  }
}

function listingPages(buildDir: string, product: string): string[] {
  const root = path.join(buildDir, product, 'release-notes');
  const pages = [path.join(root, 'index.html')];
  for (let n = 2; ; n += 1) {
    const pager = path.join(root, 'page', String(n), 'index.html');
    if (!fs.existsSync(pager)) break;
    pages.push(pager);
  }
  return pages;
}

function pageFile(buildDir: string, url: string): string {
  return path.join(buildDir, url, 'index.html');
}

function anchorFailures(
  buildDir: string,
  product: string,
  notes: Note[]
): string[] {
  const mapPath = path.join(buildDir, product, 'release-notes', 'anchors.json');
  if (!fs.existsSync(mapPath)) return ['anchor map missing'];
  const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8')) as AnchorEntry[];
  const failures: string[] = [];

  // One entry per note with a legacy anchor, naming that note's own page.
  const anchored = notes.filter((note) => note.legacyAnchor !== null);
  if (entries.length !== anchored.length) {
    failures.push(
      `anchor map has ${entries.length} entries, but ${anchored.length} ` +
        'notes have a legacy anchor'
    );
  }
  for (const note of anchored) {
    const found = entries.some(
      (entry) =>
        entry.anchor === note.legacyAnchor && entry.url === note.permalink
    );
    if (!found) {
      failures.push(
        `${note.permalink}: legacy anchor "${note.legacyAnchor}" is not in ` +
          'the map'
      );
    }
  }
  for (const entry of entries) {
    if (!fs.existsSync(pageFile(buildDir, entry.url))) {
      failures.push(`anchor map names ${entry.url}, which was not built`);
    }
  }

  // resolveAnchor takes the first match, so the map must stay newest first.
  entries.forEach((entry, index) => {
    const previous = entries[index - 1];
    if (previous !== undefined && previous.date < entry.date) {
      failures.push(
        `map order: ${entry.anchor} (${entry.date}) follows older ` +
          previous.date
      );
    }
  });

  for (const [anchor, matching] of Map.groupBy(entries, (e) => e.anchor)) {
    const expect = (year: string | null, wanted: string): void => {
      const actual = resolveAnchor(entries, anchor, year);
      if (actual !== wanted) {
        failures.push(
          `${anchor} (${year ?? 'no year'}): resolved to ${actual}, ` +
            `expected ${wanted}`
        );
      }
    };
    expect(null, matching[0].url);
    expect(ABSENT_YEAR, matching[0].url);
    // Each year must reach the newest note of that year.
    for (const year of new Set(matching.map((entry) => entry.year))) {
      const wanted = matching.find((entry) => entry.year === year);
      if (wanted !== undefined) expect(year, wanted.url);
    }
  }
  if (resolveAnchor(entries, 'no-such-anchor-anywhere', null) !== null) {
    failures.push('an unknown anchor resolved to something');
  }

  const known = new Set(KNOWN_AMBIGUOUS[product] ?? []);
  for (const [key, group] of Map.groupBy(
    entries,
    (entry) => `${entry.anchor} ${entry.year}`
  )) {
    if (group.length > 1 && !known.has(key)) {
      failures.push(
        `${key}: ${group.length} notes share this anchor and year ` +
          `(${group.map((entry) => entry.date).join(', ')}), so a link naming ` +
          'it cannot reach any but the most recent'
      );
    }
  }

  return failures;
}

/**
 * Checks one rendering of a note: the notice is there only when the note is
 * old, says the note may be out of date, and links to the listing.
 */
function noticeFailures(
  page: string,
  threshold: string,
  wanted: boolean,
  notice: string | null,
  listingLink: string
): string[] {
  if (wanted && notice === null) {
    return [`${page}: predates ${threshold} but has no age notice`];
  }
  if (!wanted && notice !== null) {
    return [`${page}: not older than ${threshold} but has one`];
  }
  if (notice === null) return [];
  const failures: string[] = [];
  if (!/no longer reflect/i.test(notice.replace(/\s+/g, ' '))) {
    failures.push(`${page}: notice does not say it may be out of date`);
  }
  if (!notice.includes(listingLink)) {
    failures.push(`${page}: notice does not link to the listing`);
  }
  return failures;
}

/** Mirrors `$monthStart.AddDate 0 -24 0` in release-note-is-old.html. */
function thresholdFor(clock: string): string {
  const [year, month] = clock.split('-');
  return `${Number(year) - 2}-${month}-01`;
}

function ageNoticeFailures(
  buildDir: string,
  clock: string,
  product: string,
  notes: Note[]
): string[] {
  const failures: string[] = [];
  const threshold = thresholdFor(clock);
  // The partial compares the note's exact time, not its calendar date, so a
  // late evening with a negative offset counts as the next UTC day.
  const cutoff = Date.parse(`${threshold}T00:00:00Z`);
  const listing = `/${product}/release-notes/`;

  for (const note of notes) {
    const file = pageFile(buildDir, note.permalink);
    if (!fs.existsSync(file)) {
      failures.push(`${note.permalink}: no built page`);
      continue;
    }
    const wanted = Date.parse(note.date) < cutoff;
    const html = NOTICE.exec(fs.readFileSync(file, 'utf8'))?.[1] ?? null;
    failures.push(
      ...noticeFailures(
        note.permalink,
        threshold,
        wanted,
        html,
        `href="${listing}"`
      )
    );

    // LLM tools and readers who copy the Markdown need the notice too.
    const markdown = path.join(buildDir, note.permalink, 'index.md');
    if (!fs.existsSync(markdown)) {
      failures.push(`${note.permalink}: no built Markdown page`);
      continue;
    }
    failures.push(
      ...noticeFailures(
        `${note.permalink}index.md`,
        threshold,
        wanted,
        markdownNotice(fs.readFileSync(markdown, 'utf8')),
        `](${listing})`
      )
    );
  }

  listingPages(buildDir, product).forEach((page, index) => {
    if (NOTICE.test(fs.readFileSync(page, 'utf8'))) {
      failures.push(`listing page ${index + 1} has an age notice`);
    }
  });

  return failures.map((failure) => `built at ${clock}: ${failure}`);
}

function check(): void {
  let all: Note[] = [];
  try {
    all = readNotes();
  } catch (error) {
    finish([`the notes cannot be read: ${(error as Error).message}`], '');
  }
  const newest = all
    .map((note) => note.fileDate)
    .sort()
    .at(-1);
  if (newest === undefined) {
    finish(['no release notes were read'], '');
    return;
  }
  const notes = Map.groupBy(all, (note) => note.product);

  const failures: string[] = [];
  clocks(newest).forEach((clock, index) => {
    const buildDir = build(clock);
    if (buildDir === null) {
      failures.push(`the site does not build at ${clock}`);
      return;
    }
    try {
      for (const product of PRODUCTS) {
        const own = notes.get(product) ?? [];
        const found = [
          ...(index === 0 ? anchorFailures(buildDir, product, own) : []),
          ...ageNoticeFailures(buildDir, clock, product, own),
        ];
        failures.push(...found.map((failure) => `${product}: ${failure}`));
      }
    } finally {
      fs.rmSync(buildDir, { recursive: true, force: true });
    }
  });

  finish(failures, 'OK anchor map and age notices hold for both products');
}

check();
