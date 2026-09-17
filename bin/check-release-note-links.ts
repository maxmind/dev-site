/**
 * Checks release note links:
 *
 * - no content file links to an anchor on a retired year page
 * - no two notes on a listing page share a heading id
 * - every anchor map entry points at a built page
 * - every legacy_anchor is in the anchor map
 *
 * It builds the site to check the real anchor map and headings, not a
 * reimplementation of the templates that make them.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-links.ts
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(currentDir, '..');

const PRODUCTS = ['geoip', 'minfraud'];
const NOTE_FILE = /^\d{4}-\d{2}-\d{2}-.+\.md$/;

interface AnchorEntry {
  anchor: string;
  year: string;
  date: string;
  url: string;
}

function build(): string | null {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'release-note-links-'));
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

function contentFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return contentFiles(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

const YEAR_FRAGMENT = /\/(geoip|minfraud)\/release-notes\/(\d{4})\/?#([\w-]+)/g;

/**
 * A year-page link reaches its note only through a redirect and a script, and
 * content can name the note directly. The build fails only on a root-relative
 * Markdown link to a retired year. An absolute URL or a raw HTML link passes
 * the build, so this scans the text.
 */
function yearFragmentLinks(): string[] {
  const failures: string[] = [];
  for (const file of contentFiles(path.join(ROOT, 'content'))) {
    const relative = path.relative(ROOT, file);
    for (const match of fs.readFileSync(file, 'utf8').matchAll(YEAR_FRAGMENT)) {
      failures.push(
        `${relative}: links to the retired year page ${match[0]}; ` +
          'link to the note itself instead'
      );
    }
  }
  return failures;
}

/**
 * Anchors that already appear twice on one listing page, from notes published
 * before the notes were split up. Their ids come from the titles they were
 * given, which cannot be changed now without breaking the links those titles
 * generated. The list may shrink; nothing should be added to it.
 */
const KNOWN_REPEATED_IDS: Record<string, string[]> = {
  geoip: [
    'a-number-of-geoip-databases-not-released-as-scheduled-yesterday',
    'subdivision-city-and-postal-fields-blanked-in-additional-countries',
    'upcoming-changes-to-isp-names',
  ],
  minfraud: [
    'ip-address-optional-in-minfraud-score-insights-and-factors-services',
    'subdivision-city-and-postal-fields-blanked-in-additional-countries',
  ],
};

const HEADING_ID = /<h2 class="release-note__title" id="([^"]*)"/g;

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

/**
 * Two headings sharing an id is invalid HTML, and it sends a browser following
 * a fragment to whichever comes first rather than to the note meant. A new note
 * takes its id from its filename, so any new collision here is a mistake.
 */
function repeatedHeadingIds(buildDir: string, product: string): string[] {
  const grandfathered = new Set(KNOWN_REPEATED_IDS[product] ?? []);
  const failures: string[] = [];

  listingPages(buildDir, product).forEach((page, index) => {
    const counts = new Map<string, number>();
    for (const match of fs.readFileSync(page, 'utf8').matchAll(HEADING_ID)) {
      counts.set(match[1], (counts.get(match[1]) ?? 0) + 1);
    }
    for (const [id, count] of counts) {
      if (count > 1 && !grandfathered.has(id)) {
        failures.push(
          `${product} listing page ${index + 1}: ${count} notes share the ` +
            `heading id "${id}"`
        );
      }
    }
  });

  return failures;
}

function noteFiles(product: string): string[] {
  const dir = path.join(ROOT, 'content', product, 'release-notes');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => NOTE_FILE.test(name));
}

function legacyAnchor(product: string, file: string): string | null {
  const source = fs.readFileSync(
    path.join(ROOT, 'content', product, 'release-notes', file),
    'utf8'
  );
  const match = source.match(/^legacy_anchor = (.*)$/m);
  if (match === null) return null;
  return match[1]
    .trim()
    .replace(/^'(.*)'$/, '$1')
    .replace(/^"(.*)"$/, '$1');
}

function fail(failures: string[]): never {
  console.error(`FAIL ${failures.length} problem(s):\n`);
  console.error(failures.join('\n'));
  process.exit(1);
}

function check(): void {
  const stale = yearFragmentLinks();
  if (stale.length > 0) fail(stale);

  const buildDir = build();
  if (buildDir === null) {
    fail(['the site does not build, so the anchor map cannot be checked']);
  }
  const failures: string[] = [];

  try {
    for (const product of PRODUCTS) {
      const mapPath = path.join(
        buildDir,
        product,
        'release-notes',
        'anchors.json'
      );
      if (!fs.existsSync(mapPath)) {
        failures.push(`${product}: no anchor map was generated`);
        continue;
      }
      const entries = JSON.parse(
        fs.readFileSync(mapPath, 'utf8')
      ) as AnchorEntry[];
      const mapped = new Set(entries.map((entry) => entry.anchor));

      failures.push(...repeatedHeadingIds(buildDir, product));

      // The resolver sends the reader wherever the map says, so an entry
      // naming a page that was never built is a link into nothing.
      for (const entry of entries) {
        const page = path.join(buildDir, entry.url, 'index.html');
        if (!fs.existsSync(page)) {
          failures.push(
            `${product} anchor map: "${entry.anchor}" points at ` +
              `${entry.url}, which is not a page on this site`
          );
        }
      }

      // Every anchor an author recorded has to reach the reader. One missing
      // from the map is a published link that now resolves to nothing.
      for (const file of noteFiles(product)) {
        const anchor = legacyAnchor(product, file);
        if (anchor !== null && !mapped.has(anchor)) {
          failures.push(
            `content/${product}/release-notes/${file}: legacy anchor ` +
              `"${anchor}" is missing from the generated anchor map`
          );
        }
      }
    }

    if (failures.length > 0) fail(failures);

    console.log('OK release note links are intact');
  } finally {
    fs.rmSync(buildDir, { recursive: true, force: true });
  }
}

check();
