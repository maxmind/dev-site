/**
 * Checks what the built site shows: the anchor map that sends an old fragment
 * link to its note.
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

function build(): string | null {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-note-site-'));
  try {
    execFileSync('hugo', ['--quiet', '--destination', dir], {
      cwd: ROOT,
      stdio: ['ignore', 'ignore', 'inherit'],
    });
    return dir;
  } catch {
    fs.rmSync(dir, { recursive: true, force: true });
    return null;
  }
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

function check(): void {
  let all: Note[] = [];
  try {
    all = readNotes();
  } catch (error) {
    finish([`the notes cannot be read: ${(error as Error).message}`], '');
  }
  if (all.length === 0) {
    finish(['no release notes were read'], '');
    return;
  }
  const notes = Map.groupBy(all, (note) => note.product);

  const buildDir = build();
  if (buildDir === null) {
    finish(['the site does not build'], '');
    return;
  }
  const failures: string[] = [];
  try {
    for (const product of PRODUCTS) {
      const own = notes.get(product) ?? [];
      const found = anchorFailures(buildDir, product, own);
      failures.push(...found.map((failure) => `${product}: ${failure}`));
    }
  } finally {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  finish(failures, 'OK anchor map holds for both products');
}

check();
