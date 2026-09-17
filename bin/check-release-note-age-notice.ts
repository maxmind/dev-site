/**
 * Checks the age notice that warns a reader off a stale release note.
 *
 * Every note stays published and indexed, so a search result can drop a reader
 * onto an announcement from years ago with nothing but a date to warn them. A
 * missing notice is invisible: the page still builds and still lints.
 *
 * Each build sets Hugo's --clock, so the result does not depend on the day the
 * check runs.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-age-notice.ts
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(currentDir, '..');

const PRODUCTS = ['geoip', 'minfraud'];
const NOTE_FILE = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

/**
 * Two clocks, to show that the threshold follows the build month. Both come
 * from the newest note, because Hugo does not build a note dated after the
 * clock.
 */
function clocks(): string[] {
  const { year, month } = monthAfterNewestNote();
  const later = month + 5;
  const stamp = (y: number, m: number): string =>
    `${y}-${String(m).padStart(2, '0')}-15T12:00:00Z`;
  return [
    stamp(year, month),
    stamp(year + Math.floor((later - 1) / 12), ((later - 1) % 12) + 1),
  ];
}

/** The rendered notice, located by its own marker rather than by its wording. */
const NOTICE = /<div[^>]*\bdata-age-notice\b[^>]*>([\s\S]*?)<\/div>/;

interface Note {
  product: string;
  date: string;
  slug: string;
}

function notes(product: string): Note[] {
  const dir = path.join(ROOT, 'content', product, 'release-notes');
  return fs
    .readdirSync(dir)
    .flatMap((name) => {
      const match = NOTE_FILE.exec(name);
      return match === null
        ? []
        : [{ product, date: match[1], slug: `${match[1]}-${match[2]}` }];
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

function build(clock: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'age-notice-'));
  try {
    execFileSync('hugo', ['--quiet', '--clock', clock, '--destination', dir], {
      cwd: ROOT,
      stdio: ['ignore', 'ignore', 'inherit'],
    });
  } catch {
    fs.rmSync(dir, { recursive: true, force: true });
    console.error(`FAIL the site does not build at ${clock}`);
    process.exit(1);
  }
  return dir;
}

/** Null when Hugo did not build the note, for example a draft. */
function notePage(buildDir: string, note: Note): string | null {
  const page = path.join(
    buildDir,
    note.product,
    'release-notes',
    note.slug,
    'index.html'
  );
  return fs.existsSync(page) ? fs.readFileSync(page, 'utf8') : null;
}

/**
 * The notice earns its place only if it says why the reader should hesitate and
 * offers somewhere current to go instead.
 */
function noticeWording(product: string, note: Note, body: string): string[] {
  const failures: string[] = [];
  const text = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!/no longer reflect/i.test(text)) {
    failures.push(
      `${product}: the notice on ${note.slug} does not say the note may no ` +
        `longer reflect current behavior: "${text}"`
    );
  }
  const listing = `/${product}/release-notes/`;
  const links = [...body.matchAll(/<a[^>]*href="([^"]*)"/g)].map(
    (match) => match[1]
  );
  if (!links.includes(listing)) {
    failures.push(
      `${product}: the notice on ${note.slug} does not link to ${listing} ` +
        `(links: ${links.join(', ') || 'none'})`
    );
  }
  return failures;
}

/**
 * Mirrors `$monthStart.AddDate 0 -24 0` in
 * layouts/partials/release-note-age-notice.html.
 */
function thresholdFor(clock: string): string {
  const [year, month] = clock.split('-');
  return `${Number(year) - 2}-${month}-01`;
}

/**
 * The listing is a reverse chronological history where age is already plain
 * from position and date, so a notice on every old entry would be noise.
 */
function listingIsClean(buildDir: string, product: string): string[] {
  const root = path.join(buildDir, product, 'release-notes');
  const pages = [path.join(root, 'index.html')];
  for (let n = 2; ; n += 1) {
    const pager = path.join(root, 'page', String(n), 'index.html');
    if (!fs.existsSync(pager)) break;
    pages.push(pager);
  }
  return pages.flatMap((page, index) =>
    NOTICE.test(fs.readFileSync(page, 'utf8'))
      ? [`${product} listing page ${index + 1} carries an age notice`]
      : []
  );
}

function monthAfterNewestNote(): { year: number; month: number } {
  const newest = PRODUCTS.flatMap((product) => notes(product))
    .map((note) => note.date)
    .sort()
    .reverse()[0];
  const [year, month] = newest.split('-').map(Number);
  return month === 12
    ? { year: year + 1, month: 1 }
    : { year, month: month + 1 };
}

function checkAt(clock: string): string[] {
  const failures: string[] = [];
  const threshold = thresholdFor(clock);
  const buildDir = build(clock);

  try {
    for (const product of PRODUCTS) {
      for (const note of notes(product)) {
        const page = notePage(buildDir, note);
        if (page === null) {
          failures.push(`${product}: ${note.slug} has no built page`);
          continue;
        }
        const notice = NOTICE.exec(page);
        const wanted = note.date < threshold;
        if (wanted && notice === null) {
          failures.push(
            `${product}: ${note.slug} (${note.date}) predates ${threshold} ` +
              'but carries no age notice'
          );
        }
        if (!wanted && notice !== null) {
          failures.push(
            `${product}: ${note.slug} (${note.date}) is not older than ` +
              `${threshold} but carries an age notice`
          );
        }
        if (wanted && notice !== null) {
          failures.push(...noticeWording(product, note, notice[1]));
        }
      }
      failures.push(...listingIsClean(buildDir, product));
    }
  } finally {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }

  return failures.map((failure) => `built at ${clock}: ${failure}`);
}

function check(): void {
  const built = clocks();
  const failures = built.flatMap(checkAt);

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.slice(0, 20).join('\n'));
    if (failures.length > 20) {
      console.error(`... and ${failures.length - 20} more`);
    }
    process.exit(1);
  }

  console.log(
    `OK age notices track the build month across ${built.length} build months`
  );
}

check();
