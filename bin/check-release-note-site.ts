/**
 * Checks the built site:
 *
 * - the anchor map, which sends an old year-page anchor to its note
 * - the year map, which sends a year link to the newest note of that year
 * - the wiring that loads the script on each listing page
 * - the RSS feed
 * - the age notice on old notes
 *
 * It builds at two clocks five months apart, so a notice that ignores the
 * build month fails. Both clocks fall after the newest note, because Hugo does
 * not build a note dated after the clock. Only the age notice depends on the
 * clock, so only the first build checks the rest.
 *
 * The builds use an absolute base URL, as production does, and add one test
 * note per product from a temporary folder. The repository does not change.
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
  resolveTarget,
  type YearMap,
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

/**
 * services.rss.limit in hugo.toml. A larger limit lets HubSpot mail more old
 * notes if their guids ever change, so a change here must be deliberate.
 */
const FEED_LIMIT = 50;

/**
 * Production builds with an absolute base URL, so the feed guids are absolute
 * there. With a relative base, a switch to relative guids would pass.
 */
const BASE_URL = 'https://example.test/';

/** The RFC 822 form that the feed template writes for pubDate. */
const RSS_DATE =
  /^[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} \d{2}:\d{2}:\d{2} [+-]\d{4}$/;

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

/**
 * Every real note was migrated from a year page, so the feed has no newer note
 * to check. This one is dated the day after the newest note, with a negative
 * UTC offset, which still falls before the first clock.
 */
function testNote(product: string, newest: string): Note {
  const [year, month, day] = newest.split('-').map(Number);
  const fileDate = new Date(Date.UTC(year, month - 1, day + 1))
    .toISOString()
    .slice(0, 10);
  const name = `${fileDate}-feed-check-note`;
  return {
    path: `(test note) ${product}/${name}.md`,
    product,
    title: 'Feed check note',
    date: `${fileDate}T09:30:00-04:00`,
    draft: false,
    permalink: `/${product}/release-notes/${name}/`,
    fileDate,
    legacyAnchor: null,
  };
}

/**
 * Writes the test notes and a config that mounts them into the release note
 * folders. The config is hugo.toml plus the mounts, because a second config
 * file would replace the mounts that hugo.toml defines.
 */
function writeFixtures(dir: string, notes: Note[]): string {
  const mounts = [
    '[[module.mounts]]\n  source = "content"\n  target = "content"',
  ];
  for (const note of notes) {
    const folder = path.join(dir, note.product);
    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(
      path.join(folder, `${path.basename(note.permalink)}.md`),
      `+++\ntitle = '${note.title}'\ndate = ${note.date}\ndraft = false\n+++\n\n` +
        'This note exists only in the release note site check.\n'
    );
    mounts.push(
      `[[module.mounts]]\n  source = ${JSON.stringify(folder)}\n` +
        `  target = "content/${note.product}/release-notes"`
    );
  }
  const config = path.join(dir, 'hugo.toml');
  fs.writeFileSync(
    config,
    `${fs.readFileSync(path.join(ROOT, 'hugo.toml'), 'utf8')}\n${mounts.join('\n')}\n`
  );
  return config;
}

function build(clock: string, config: string): string | null {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-note-site-'));
  try {
    execFileSync(
      'hugo',
      [
        '--quiet',
        '--clock',
        clock,
        '--baseURL',
        BASE_URL,
        '--config',
        config,
        '--destination',
        dir,
      ],
      { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] }
    );
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

/**
 * The anchor script runs only on a page marked as a listing, and only if the
 * page loads it. Without both, an old link stops on the listing page.
 */
function wiringFailures(buildDir: string, product: string): string[] {
  return listingPages(buildDir, product).flatMap((page, index) => {
    const where = `listing page ${index + 1}`;
    const html = fs.readFileSync(page, 'utf8');
    if (!html.includes('data-release-note-listing')) {
      return [`${where}: no data-release-note-listing attribute`];
    }
    const loadsScript = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].some(
      ([, src]) => {
        const file = path.join(buildDir, src);
        if (!fs.existsSync(file)) return false;
        const js = fs.readFileSync(file, 'utf8');
        return (
          js.includes('data-release-note-listing') &&
          js.includes('releaseNoteYears') &&
          js.includes('anchors.json')
        );
      }
    );
    return loadsScript ? [] : [`${where}: does not load the anchor script`];
  });
}

/** Decodes the entities that Go's html/template writes in an attribute. */
function decodeAttribute(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(+code))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

/**
 * A year link with no fragment must reach the newest note of that year on the
 * listing. The newest note of all is the top of the listing, so it gets no
 * fragment.
 */
function yearFailures(buildDir: string, product: string): string[] {
  const listing = `/${product}/release-notes/`;
  const wanted = new Map<string, string>();
  const maps = new Set<string>();
  listingPages(buildDir, product).forEach((page, index) => {
    const url = index === 0 ? listing : `${listing}page/${index + 1}/`;
    const html = fs.readFileSync(page, 'utf8');
    const attribute = /data-release-note-years="([^"]*)"/.exec(html);
    maps.add(attribute === null ? '' : decodeAttribute(attribute[1]));
    for (const [, id] of html.matchAll(
      /class="release-note__title" id="(\d{4}-[^"]+)"/g
    )) {
      const year = id.slice(0, 4);
      if (!wanted.has(year)) {
        wanted.set(year, wanted.size === 0 ? listing : `${url}#${id}`);
      }
    }
  });
  if (wanted.size === 0) return ['no note headings found on the listing'];
  if (maps.size !== 1 || maps.has('')) {
    return ['every listing page must carry the same year map'];
  }
  let years: YearMap;
  try {
    years = JSON.parse([...maps][0]) as YearMap;
  } catch {
    return ['the year map is not JSON'];
  }

  const failures: string[] = [];
  const expect = (year: string | null, url: string | null) => {
    const actual = resolveTarget([], years, {
      anchor: '',
      year,
      onPage: false,
    });
    if (actual !== url) {
      failures.push(
        `year ${year ?? '(none)'}: resolved to ${actual}, expected ${url}`
      );
    }
  };
  for (const [year, url] of wanted) expect(year, url);
  for (const year of Object.keys(years)) {
    if (!wanted.has(year)) {
      failures.push(`year map names ${year}, which has no note on the listing`);
    }
  }
  for (const year of [ABSENT_YEAR, '', '__proto__', 'toString', null]) {
    expect(year, null);
  }

  const [year] = [...wanted.keys()];
  const link = { anchor: 'a-heading-here', year, onPage: true };
  if (resolveTarget([], years, link) !== null) {
    failures.push(`a heading on the page in ${year} resolved to something`);
  }
  return failures;
}

function anchorFailures(
  buildDir: string,
  product: string,
  notes: Note[]
): string[] {
  const mapPath = path.join(buildDir, product, 'release-notes', 'anchors.json');
  if (!fs.existsSync(mapPath)) return ['anchor map missing'];
  const parsed: unknown = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  if (!Array.isArray(parsed)) return ['anchor map is not an array'];
  const entries = parsed as AnchorEntry[];
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

  // A year map entry for every year, so a known anchor must win over it.
  const years: YearMap = Object.fromEntries(
    [...entries.map((entry) => entry.year), ABSENT_YEAR].map((year) => [
      year,
      `/year-map/${year}/`,
    ])
  );
  for (const [anchor, matching] of Map.groupBy(entries, (e) => e.anchor)) {
    const expect = (year: string | null, wanted: string): void => {
      const link = { anchor, year, onPage: false };
      const actual = resolveTarget(entries, years, link);
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

interface FeedItem {
  link: string;
  guid: string;
  pubDate: string;
}

function readFeed(file: string): FeedItem[] {
  const xml = fs.readFileSync(file, 'utf8');
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => {
    const field = (tag: string): string =>
      new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(item)?.[1].trim() ?? '';
    return {
      link: field('link'),
      guid: field('guid'),
      pubDate: field('pubDate'),
    };
  });
}

/**
 * HubSpot mails a feed item again when its guid or pubDate changes. A migrated
 * note must keep the guid and 16:00Z pubDate that the year-page feed gave it.
 */
function feedFailures(
  buildDir: string,
  product: string,
  notes: Note[]
): string[] {
  const file = path.join(buildDir, product, 'release-notes', 'index.xml');
  if (!fs.existsSync(file)) return ['feed missing'];
  const items = readFeed(file);
  const failures: string[] = [];

  const expected = notes
    .toSorted((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, FEED_LIMIT);
  if (items.length !== expected.length) {
    failures.push(
      `feed has ${items.length} items, expected ${expected.length}`
    );
  }

  expected.forEach((note, index) => {
    const item = items.at(index);
    if (item === undefined) return;
    const where = `feed item ${index + 1}`;
    const link = new URL(note.permalink, BASE_URL).href;
    if (item.link !== link) {
      failures.push(`${where}: link is ${item.link}, expected ${link}`);
      return;
    }
    const legacy = note.legacyAnchor !== null;
    const guid = legacy
      ? new URL(
          `/${product}/release-notes/${note.fileDate.slice(0, 4)}/#${note.legacyAnchor}`,
          BASE_URL
        ).href
      : link;
    const published = legacy
      ? Date.parse(`${note.fileDate}T16:00:00Z`)
      : Date.parse(note.date);
    if (item.guid !== guid) {
      failures.push(`${where}: guid is ${item.guid}, expected ${guid}`);
    }
    if (!RSS_DATE.test(item.pubDate)) {
      failures.push(`${where}: pubDate "${item.pubDate}" is not RFC 822`);
    } else if (Date.parse(item.pubDate) !== published) {
      failures.push(
        `${where}: pubDate is ${item.pubDate}, expected ` +
          new Date(published).toUTCString()
      );
    }
  });

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
  const tests = PRODUCTS.map((product) => testNote(product, newest));
  const fixtures = fs.mkdtempSync(
    path.join(os.tmpdir(), 'release-note-fixtures-')
  );
  const config = writeFixtures(fixtures, tests);

  const failures: string[] = [];
  try {
    clocks(newest).forEach((clock, index) => {
      const buildDir = build(clock, config);
      if (buildDir === null) {
        failures.push(`the site does not build at ${clock}`);
        return;
      }
      try {
        for (const product of PRODUCTS) {
          const own = notes.get(product) ?? [];
          const found = [
            ...(index === 0
              ? [
                  ...wiringFailures(buildDir, product),
                  ...yearFailures(buildDir, product),
                  ...anchorFailures(buildDir, product, own),
                  ...feedFailures(buildDir, product, [
                    ...own,
                    ...tests.filter((note) => note.product === product),
                  ]),
                ]
              : []),
            ...ageNoticeFailures(buildDir, clock, product, own),
          ];
          failures.push(...found.map((failure) => `${product}: ${failure}`));
        }
      } finally {
        fs.rmSync(buildDir, { recursive: true, force: true });
      }
    });
  } finally {
    fs.rmSync(fixtures, { recursive: true, force: true });
  }

  finish(
    failures,
    'OK anchor map, year map, feed, and age notices hold for both products'
  );
}

check();
