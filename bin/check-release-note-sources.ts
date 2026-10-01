/**
 * Checks the release note sources, without building the site:
 *
 * - each note's front matter and URL as Hugo reads them, note files that Hugo
 *   drops, and note files with no date in their name
 * - links in content to an anchor on a retired year page
 * - the year redirects in static/_redirects and the menu in hugo.toml
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-sources.ts
 */

import fs from 'node:fs';
import path from 'node:path';

import {
  finish,
  type Note,
  NOTE_PATH,
  PRODUCTS,
  readNotes,
  ROOT,
} from './_release-notes.ts';

const YEAR_FRAGMENT = /\/(geoip|minfraud)\/release-notes\/(\d{4})\/?#([\w-]+)/g;

/**
 * Both products had a page for each year from 2013 to 2026. A note published
 * later never had a year URL, so deriving this from note dates would demand a
 * redirect for a URL that never existed.
 */
const RETIRED_YEARS = Array.from({ length: 14 }, (_, i) => String(2013 + i));

/**
 * The newest note migrated from a year page. A later note was never on a year
 * page. A legacy anchor on it would give its feed item a year-page guid and add
 * it to the anchor map.
 */
const LAST_MIGRATED = '2026-09-30';

function frontMatterFailures(notes: Note[]): string[] {
  const failures: string[] = [];

  for (const note of notes) {
    if (note.title === '') failures.push(`${note.path}: no title`);
    if (note.draft) {
      failures.push(`${note.path}: marked as a draft, so it is not published`);
    }
    // Hugo reads a date with no time as midnight. The time is what orders
    // notes published on the same day.
    if (note.date.startsWith('0001-')) {
      failures.push(`${note.path}: no date`);
    } else if (note.date.includes('T00:00:00')) {
      failures.push(`${note.path}: date ${note.date} has no time`);
    } else if (note.date.slice(0, 10) !== note.fileDate) {
      failures.push(
        `${note.path}: filename says ${note.fileDate}, ` +
          `front matter says ${note.date.slice(0, 10)}`
      );
    }
    // A slug or url in front matter moves the note away from its filename.
    const slug = path.basename(note.path, '.md').toLowerCase();
    const wanted = `/${note.product}/release-notes/${slug}/`;
    if (note.permalink !== wanted) {
      failures.push(
        `${note.path}: builds to ${note.permalink}, expected ${wanted}. ` +
          'Remove slug or url from its front matter.'
      );
    }
    if (note.legacyAnchor !== null && note.fileDate > LAST_MIGRATED) {
      failures.push(
        `${note.path}: only a note migrated from a year page may set ` +
          'legacy_anchor'
      );
    }
  }

  // Two notes with one slug build to one URL. Hugo does not warn by default,
  // and which note it publishes changes from build to build.
  for (const [permalink, group] of Map.groupBy(notes, (n) => n.permalink)) {
    if (group.length > 1) {
      failures.push(
        `${group.length} notes build to ${permalink}:\n  ` +
          group.map((note) => note.path).join('\n  ')
      );
    }
  }

  // A shared time leaves the order of those notes to Hugo. A cross-posted note
  // repeats its time in the other product, so each product is compared alone.
  const dated = notes.filter((note) => !note.date.startsWith('0001-'));
  for (const group of Map.groupBy(
    dated,
    (note) => `${note.product} ${Date.parse(note.date)}`
  ).values()) {
    if (group.length > 1) {
      failures.push(
        `${group.length} notes share the time ${group[0].date}, so their ` +
          `order is arbitrary:\n  ${group.map((note) => note.path).join('\n  ')}`
      );
    }
  }

  return failures;
}

/**
 * Hugo keeps only one of two files whose names differ only in case, and drops
 * the other without a warning. A note file that Hugo does not list is lost.
 */
function unlistedNotes(notes: Note[]): string[] {
  const listed = new Set(notes.map((note) => note.path));
  return PRODUCTS.flatMap((product) => {
    const dir = path.join('content', product, 'release-notes');
    return fs
      .readdirSync(path.join(ROOT, dir))
      .map((name) => path.posix.join(dir, name))
      .filter((file) => NOTE_PATH.test(file) && !listed.has(file))
      .map((file) => `${file}: Hugo does not build this note`);
  });
}

/**
 * Both checks find notes by the date in the file name. A note file without
 * it is still published, so it would skip every check.
 */
function misnamedNotes(): string[] {
  return PRODUCTS.flatMap((product) => {
    const dir = path.join('content', product, 'release-notes');
    return fs
      .readdirSync(path.join(ROOT, dir), { withFileTypes: true })
      .filter((entry) => entry.isDirectory() || entry.name.endsWith('.md'))
      .filter(
        (entry) =>
          entry.name !== '_index.md' && !/^\d{4}-\d{2}-\d{2}-./.test(entry.name)
      )
      .map(
        (entry) =>
          `${path.posix.join(dir, entry.name)}: no date in the name. Rename ` +
          `it to YYYY-MM-DD-<slug>${entry.isDirectory() ? '' : '.md'}, with ` +
          'the publication date'
      );
  });
}

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return contentFiles(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

/**
 * An old year link reaches its note only through a redirect and a script. The
 * build fails only on a root-relative Markdown link, so this scans the text
 * for an absolute URL or a raw HTML link too.
 */
function yearFragmentLinks(): string[] {
  return contentFiles(path.join(ROOT, 'content')).flatMap((file) =>
    [...fs.readFileSync(file, 'utf8').matchAll(YEAR_FRAGMENT)].map(
      (match) =>
        `${path.relative(ROOT, file)}: links to the retired year page ` +
        `${match[0]}. Link to the note itself.`
    )
  );
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

/**
 * Approximates Cloudflare Pages rule matching: a placeholder matches one path
 * segment, and a splat matches the rest.
 */
function matches(rule: Rule, url: string): boolean {
  const pattern = rule.from
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[a-z]+/gi, '[^/]+')
    .replace(/\*/g, '.*');
  return new RegExp(`^${pattern}$`).test(url);
}

function redirectFailures(
  product: string,
  rules: Rule[],
  menu: string
): string[] {
  const failures: string[] = [];
  const section = `/${product}/release-notes`;
  const listing = `${section}/`;

  for (const year of RETIRED_YEARS) {
    for (const yearURL of [`${listing}${year}`, `${listing}${year}/`]) {
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
      // 302, not 301: a browser caches a permanent redirect, so a wrong target
      // is hard to take back.
      if (rule.status !== '302') {
        failures.push(
          `${yearURL}: status ${rule.status || '(none)'}, expected 302`
        );
      }
      if (!rule.to.includes(`year=${year}`)) {
        failures.push(
          `${yearURL}: redirects to ${rule.to}, which does not carry the year`
        );
      }
    }
  }

  // Year rules are listed one by one. A placeholder or splat rule could also
  // capture the URLs below. anchors.json is one of them, and the anchor script
  // fetches it to resolve old fragment links.
  for (const url of [
    section,
    listing,
    `${listing}page/2/`,
    `${listing}2026-09-11-some-note`,
    `${listing}2026-09-11-some-note/`,
    `${listing}anchors.json`,
  ]) {
    const rule = rules.find((candidate) => matches(candidate, url));
    if (rule !== undefined) {
      failures.push(
        `${url}: captured by rule on line ${rule.line} ` +
          `(${rule.from} -> ${rule.to})`
      );
    }
  }

  for (const rule of rules) {
    if (rule.from.startsWith(section) && /\/\d{4}\/?$/.test(rule.to)) {
      failures.push(
        `line ${rule.line}: still points at a hardcoded year (${rule.to})`
      );
    }
  }

  if (new RegExp(`pageRef\\s*=\\s*['"]${section}/\\d{4}/?['"]`).test(menu)) {
    failures.push('hugo.toml: navigation still points at a hardcoded year');
  }

  return failures;
}

function check(): void {
  let notes: Note[] = [];
  try {
    notes = readNotes();
  } catch (error) {
    finish([`the notes cannot be read: ${(error as Error).message}`], '');
  }
  const rules = readRules();
  const menu = fs.readFileSync(path.join(ROOT, 'hugo.toml'), 'utf8');

  finish(
    [
      // No notes means the read failed, not that all is well.
      ...(notes.length === 0 ? ['no release notes were read'] : []),
      ...frontMatterFailures(notes),
      ...unlistedNotes(notes),
      ...misnamedNotes(),
      ...yearFragmentLinks(),
      ...PRODUCTS.flatMap((product) => redirectFailures(product, rules, menu)),
    ],
    `OK ${notes.length} notes, content links and year redirects are valid`
  );
}

check();
