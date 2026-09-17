/**
 * Checks that every retired release note year URL still leads somewhere useful.
 *
 * The year pages are gone, so their URLs have to reach the listing page and
 * carry the year forward for the anchor resolver. A year placeholder would also
 * swallow the listing's own pager URLs and the note pages themselves, so the
 * years are written out one by one.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-redirects.ts <product>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(currentDir, '..');

/** Years that had a release note page before the notes were split up. */
const RETIRED_YEARS: Record<string, string[]> = {
  minfraud: [
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
  ],
};

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

function check(product: string): void {
  const rules = readRules();
  const failures: string[] = [];

  // The years that had a page, written out because the pages themselves are
  // gone. A note published in a later year never had a year URL, so deriving
  // this from note dates would demand a redirect for a URL that never existed.
  const years = RETIRED_YEARS[product];
  if (years === undefined) {
    console.error(`FAIL no retired year pages recorded for ${product}`);
    process.exit(1);
  }

  const listing = `/${product}/release-notes/`;

  for (const year of years) {
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

  // A placeholder rule would capture these; explicit years do not.
  const mustNotRedirect = [
    `${listing}page/2/`,
    `${listing}2026-09-11-some-note/`,
    listing,
  ];
  for (const url of mustNotRedirect) {
    const rule = rules.find((candidate) => matches(candidate, url));
    if (rule !== undefined) {
      failures.push(
        `${url}: captured by rule on line ${rule.line} (${rule.from} -> ${rule.to})`
      );
    }
  }

  const hardcoded = rules.filter(
    (rule) =>
      rule.from.startsWith(`/${product}/release-notes`) &&
      /\/\d{4}\/?$/.test(rule.to)
  );
  for (const rule of hardcoded) {
    failures.push(
      `line ${rule.line}: still points at a hardcoded year (${rule.to})`
    );
  }

  const menu = fs.readFileSync(path.join(ROOT, 'hugo.toml'), 'utf8');
  const menuRef = new RegExp(`pageRef = '/${product}/release-notes/\\d{4}'`);
  if (menuRef.test(menu)) {
    failures.push(`hugo.toml: navigation still points at a hardcoded year`);
  }

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log(
    `OK ${years.length} year URLs redirect to the listing carrying their year`
  );
}

const [product] = process.argv.slice(2);
if (product === undefined) {
  console.error('usage: check-release-note-redirects.ts <product>');
  process.exit(2);
}
check(product);
