/**
 * Checks, for each product, that:
 *
 * - the built anchor map sends an old fragment link to its note
 * - the built listing carries every note
 * - static/_redirects sends every retired year to the listing
 * - the navigation in hugo.toml no longer points at a year page
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-build.ts
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  type AnchorEntry,
  resolveAnchor,
} from '../assets/js/release-note-anchors.ts';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(currentDir, '..');

const PRODUCTS = ['geoip', 'minfraud'];
const NOTE_FILE = /^\d{4}-\d{2}-\d{2}-.+\.md$/;
const PER_PAGE = 40;

/** A year with no notes, to test the fallback to the newest match. */
const ABSENT_YEAR = '1999';

/**
 * Anchor-and-year pairs that more than one note already shares. A legacy link
 * carries the product, the year and the anchor and nothing else, so the notes
 * in one of these groups cannot be told apart and the resolver sends the reader
 * to the most recent of them. The list may shrink, but nothing should be
 * added to it.
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

/**
 * Both products had a page for each year from 2013 to 2026. A note published
 * later never had a year URL, so deriving this from note dates would demand a
 * redirect for a URL that never existed.
 */
const RETIRED_YEARS = Array.from({ length: 14 }, (_, i) => String(2013 + i));

function build(): string | null {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-note-build-'));
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

function anchorFailures(buildDir: string, product: string): string[] {
  const mapPath = path.join(buildDir, product, 'release-notes', 'anchors.json');
  if (!fs.existsSync(mapPath)) return ['anchor map missing'];
  const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8')) as AnchorEntry[];
  if (entries.length === 0) return ['anchor map is empty'];
  const failures: string[] = [];

  // resolveAnchor takes the first match, so the map must stay newest first.
  entries.forEach((entry, index) => {
    const previous = entries[index - 1];
    if (previous !== undefined && previous.date < entry.date) {
      failures.push(
        `map order: ${entry.anchor} (${entry.date}) follows older ${previous.date}`
      );
    }
  });

  const byAnchor = new Map<string, AnchorEntry[]>();
  for (const entry of entries) {
    byAnchor.set(entry.anchor, [...(byAnchor.get(entry.anchor) ?? []), entry]);
  }

  for (const [anchor, matching] of byAnchor) {
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
    // An old link names a year page. That year is the only thing that separates
    // notes that share an anchor.
    for (const year of new Set(matching.map((entry) => entry.year))) {
      const wanted = matching.find((entry) => entry.year === year);
      if (wanted !== undefined) expect(year, wanted.url);
    }
    if (new Set(matching.map((entry) => entry.url)).size !== matching.length) {
      failures.push(`${anchor}: notes sharing this anchor share a URL`);
    }
  }

  if (resolveAnchor(entries, 'no-such-anchor-anywhere', null) !== null) {
    failures.push('an unknown anchor resolved to something');
  }

  const known = new Set(KNOWN_AMBIGUOUS[product] ?? []);
  const byAnchorYear = new Map<string, AnchorEntry[]>();
  for (const entry of entries) {
    const key = `${entry.anchor} ${entry.year}`;
    byAnchorYear.set(key, [...(byAnchorYear.get(key) ?? []), entry]);
  }
  for (const [key, group] of byAnchorYear) {
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

function listingFailures(buildDir: string, product: string): string[] {
  const failures: string[] = [];
  const notes: { title: string; href: string; date: string; page: number }[] =
    [];

  listingPages(buildDir, product).forEach((page, index) => {
    const html = fs.readFileSync(page, 'utf8');
    const blocks =
      html.match(
        /<div\s[^>]*class="release-note"[\s\S]*?<!-- end-release-note -->/g
      ) ?? [];
    for (const block of blocks) {
      const link = block.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
      const title = link === null ? '' : link[2].replace(/<[^>]+>/g, '').trim();
      const content = block.match(
        /<div class="release-note__content">([\s\S]*?)<!-- end-content -->/
      );
      if (content === null || content[1].trim() === '') {
        failures.push(`"${title}": listed without content`);
      }
      notes.push({
        title,
        href: link === null ? '' : link[1],
        date: block.match(/data-date="([^"]*)"/)?.[1] ?? '',
        page: index + 1,
      });
    }
  });

  const dir = path.join(ROOT, 'content', product, 'release-notes');
  const expected = fs
    .readdirSync(dir)
    .filter((name) => NOTE_FILE.test(name)).length;
  if (notes.length !== expected) {
    failures.push(`note count: expected ${expected}, got ${notes.length}`);
  }

  notes.forEach((note, index) => {
    const previous = notes[index - 1];
    if (previous !== undefined && previous.date < note.date) {
      failures.push(
        `order: "${note.title}" (${note.date}) follows older ` +
          `"${previous.title}" (${previous.date})`
      );
    }
    // The title has to reach the note's own page, not a same-page fragment.
    if (!/^\/[a-z]+\/release-notes\/\d{4}-\d{2}-\d{2}-/.test(note.href)) {
      failures.push(
        `"${note.title}": title links to ${note.href || '(nothing)'}, ` +
          'not its own page'
      );
    }
  });

  const pages = new Set(notes.map((note) => note.page));
  const expectedPages = Math.ceil(expected / PER_PAGE);
  if (pages.size !== expectedPages) {
    failures.push(
      `pager: expected ${expectedPages} pages of ${PER_PAGE}, got ${pages.size}`
    );
  }
  for (const page of pages) {
    const onPage = notes.filter((note) => note.page === page).length;
    if (page !== expectedPages && onPage !== PER_PAGE) {
      failures.push(
        `pager: page ${page} holds ${onPage} notes, expected ${PER_PAGE}`
      );
    }
  }

  const index = fs.readFileSync(
    path.join(buildDir, product, 'release-notes', 'index.html'),
    'utf8'
  );
  const banners = (index.match(/comms\.maxmind\.com/g) ?? []).length;
  if (banners !== 1) {
    failures.push(`signup banner appears ${banners} times, expected once`);
  }
  if (index.includes('page__release-note-archive')) {
    failures.push('year archive list is still rendered');
  }

  return failures;
}

interface Rule {
  from: string;
  to: string;
  status: string;
  line: number;
}

function readRules(): Rule[] {
  return fs
    .readFileSync(path.join(ROOT, 'static', '_redirects'), 'utf8')
    .split('\n')
    .map((text, index) => ({ text: text.trim(), line: index + 1 }))
    .filter(({ text }) => text !== '' && !text.startsWith('#'))
    .map(({ text, line }) => {
      const [from, to, status] = text.split(/\s+/);
      return { from: from ?? '', to: to ?? '', status: status ?? '', line };
    })
    .filter((rule) => rule.from !== '' && rule.to !== '');
}

/** Mirrors how a _redirects placeholder matches a path segment. */
function matches(rule: Rule, url: string): boolean {
  const pattern = rule.from
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[a-z]+/gi, '[^/]+')
    .replace(/\*/g, '.*');
  return new RegExp(`^${pattern}$`).test(url);
}

function redirectFailures(product: string): string[] {
  const rules = readRules();
  const failures: string[] = [];
  const listing = `/${product}/release-notes/`;

  for (const year of RETIRED_YEARS) {
    const yearURL = `${listing}${year}/`;
    const rule = rules.find((candidate) => matches(candidate, yearURL));
    if (rule === undefined) {
      failures.push(`${yearURL}: no redirect`);
      continue;
    }
    if (!rule.to.startsWith(listing)) {
      failures.push(
        `${yearURL}: redirects to ${rule.to}, not the listing page`
      );
    }
    // A 302 rather than a 301: browsers cache a permanent redirect
    // indefinitely, so a wrong target could not be taken back.
    if (rule.status !== '302') {
      failures.push(
        `${yearURL}: status ${rule.status || '(none)'}, expected a 302 redirect`
      );
    }
    if (!rule.to.includes(`year=${year}`)) {
      failures.push(
        `${yearURL}: redirects to ${rule.to}, which does not carry the year`
      );
    }
  }

  // A placeholder or splat rule would capture these; explicit years do not.
  for (const url of [
    `${listing}page/2/`,
    `${listing}2026-09-11-some-note/`,
    listing,
  ]) {
    const rule = rules.find((candidate) => matches(candidate, url));
    if (rule !== undefined) {
      failures.push(
        `${url}: captured by rule on line ${rule.line} (${rule.from} -> ${rule.to})`
      );
    }
  }

  for (const rule of rules) {
    if (rule.from.startsWith(listing) && /\/\d{4}\/?$/.test(rule.to)) {
      failures.push(
        `line ${rule.line}: still points at a hardcoded year (${rule.to})`
      );
    }
  }

  const menu = fs.readFileSync(path.join(ROOT, 'hugo.toml'), 'utf8');
  if (new RegExp(`pageRef = '/${product}/release-notes/\\d{4}'`).test(menu)) {
    failures.push('hugo.toml: navigation still points at a hardcoded year');
  }

  return failures;
}

function fail(failures: string[]): never {
  console.error(`FAIL ${failures.length} problem(s):\n`);
  console.error(failures.slice(0, 20).join('\n'));
  if (failures.length > 20)
    console.error(`... and ${failures.length - 20} more`);
  process.exit(1);
}

function check(): void {
  const buildDir = build();
  if (buildDir === null) fail(['the site does not build']);

  const failures: string[] = [];
  try {
    for (const product of PRODUCTS) {
      const found = [
        ...anchorFailures(buildDir, product),
        ...listingFailures(buildDir, product),
        ...redirectFailures(product),
      ];
      failures.push(...found.map((failure) => `${product}: ${failure}`));
    }
  } finally {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  if (failures.length > 0) fail(failures);
  console.log(
    'OK anchor map, listing and year redirects hold for both products'
  );
}

check();
