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

interface Rule {
  from: string;
  to: string;
  line: number;
}

function readRules(): Rule[] {
  return fs
    .readFileSync(path.join(ROOT, 'static', '_redirects'), 'utf8')
    .split('\n')
    .map((text, index) => ({ text: text.trim(), line: index + 1 }))
    .filter(({ text }) => text !== '' && !text.startsWith('#'))
    .map(({ text, line }) => {
      const [from, to] = text.split(/\s+/);
      return { from, to, line };
    });
}

/** Mirrors how a _redirects placeholder matches a path segment. */
function matches(rule: Rule, url: string): boolean {
  const pattern = rule.from
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/:[a-z]+/gi, '[^/]+');
  return new RegExp(`^${pattern}$`).test(url);
}

function check(product: string): void {
  const rules = readRules();
  const failures: string[] = [];

  // Taken from the notes rather than the year files, which this work deletes.
  const years = [
    ...new Set(
      fs
        .readdirSync(path.join(ROOT, 'content', product, 'release-notes'))
        .map((name) => name.match(/^(\d{4})-\d{2}-\d{2}-/))
        .filter((matched) => matched !== null)
        .map((matched) => matched[1])
    ),
  ].sort();
  if (years.length === 0) {
    console.error(`FAIL no notes found for ${product}`);
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
