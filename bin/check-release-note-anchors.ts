/**
 * Exercises the legacy anchor resolver against the anchor map the site builds.
 *
 * Fragments are never sent to the server, so a redirect cannot route an old
 * year-page link like /minfraud/release-notes/2020/#some-anchor to the note it
 * names. The browser reattaches the fragment to the redirect target and a small
 * script on the listing page finishes the journey. This check proves every
 * published anchor still reaches its note.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-anchors.ts \
 *     <build-dir> <product>
 */

import fs from 'node:fs';
import path from 'node:path';

import {
  type AnchorEntry,
  resolveAnchor,
} from '../assets/js/release-note-anchors.ts';

/** Covers what the published map cannot reach: an unknown year, and an anchor
 *  that matches no note. */
function checkContract(): string[] {
  const failures: string[] = [];
  const entries: AnchorEntry[] = [
    {
      anchor: 'shared',
      year: '2025',
      date: '2025-06-01',
      url: '/notes/2025-06-01-newer/',
    },
    {
      anchor: 'shared',
      year: '2020',
      date: '2020-06-01',
      url: '/notes/2020-06-01-older/',
    },
    {
      anchor: 'sameyear',
      year: '2021',
      date: '2021-08-02',
      url: '/notes/2021-08-02-second/',
    },
    {
      anchor: 'sameyear',
      year: '2021',
      date: '2021-08-01',
      url: '/notes/2021-08-01-first/',
    },
    {
      anchor: 'unique',
      year: '2019',
      date: '2019-01-01',
      url: '/notes/2019-01-01-only/',
    },
  ];

  const expect = (
    label: string,
    actual: string | null,
    wanted: string | null
  ): void => {
    if (actual !== wanted)
      failures.push(`contract: ${label} gave ${actual}, expected ${wanted}`);
  };

  // The year is what separates two notes that share an anchor across years.
  expect(
    'older year',
    resolveAnchor(entries, 'shared', '2020'),
    '/notes/2020-06-01-older/'
  );
  expect(
    'newer year',
    resolveAnchor(entries, 'shared', '2025'),
    '/notes/2025-06-01-newer/'
  );
  // Without a year, or with one no note matches, the newest still wins.
  expect(
    'no year',
    resolveAnchor(entries, 'shared', null),
    '/notes/2025-06-01-newer/'
  );
  expect(
    'absent year',
    resolveAnchor(entries, 'shared', '1999'),
    '/notes/2025-06-01-newer/'
  );
  // A year cannot separate notes that share it, so the reader gets the note the
  // browser would have scrolled to.
  expect(
    'same year',
    resolveAnchor(entries, 'sameyear', '2021'),
    '/notes/2021-08-02-second/'
  );
  expect(
    'unique anchor',
    resolveAnchor(entries, 'unique', '2019'),
    '/notes/2019-01-01-only/'
  );
  expect(
    'wrong year, unique',
    resolveAnchor(entries, 'unique', '2020'),
    '/notes/2019-01-01-only/'
  );
  expect('unknown anchor', resolveAnchor(entries, 'missing', null), null);

  return failures;
}

/**
 * Anchor-and-year pairs that more than one note already shares. A legacy link
 * carries the product, the year and the anchor and nothing else, so the notes
 * in one of these groups cannot be told apart and the resolver sends the reader
 * to the most recent of them. The information needed to do better is gone, so
 * these cannot be fixed. The list may shrink; nothing should be added to it.
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

/** Distinct URLs are not enough. A new pair sharing an anchor and a year is
 *  the one part of this that can still be prevented. */
function ambiguousGroups(entries: AnchorEntry[], product: string): string[] {
  const known = new Set(KNOWN_AMBIGUOUS[product] ?? []);
  const byAnchorYear = new Map<string, AnchorEntry[]>();
  for (const entry of entries) {
    const key = `${entry.anchor} ${entry.year}`;
    byAnchorYear.set(key, [...(byAnchorYear.get(key) ?? []), entry]);
  }

  const failures: string[] = [];
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

function check(buildDir: string, product: string): void {
  const mapPath = path.join(buildDir, product, 'release-notes', 'anchors.json');
  if (!fs.existsSync(mapPath)) {
    console.error(`FAIL anchor map missing: ${mapPath}`);
    process.exit(1);
  }
  const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8')) as AnchorEntry[];
  const failures: string[] = checkContract();

  if (entries.length === 0) failures.push('anchor map is empty');

  // Newest first, so that the first match for a repeated anchor is the note a
  // browser would have scrolled to on the old year page.
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
    const resolved = resolveAnchor(entries, anchor, null);
    if (resolved === null) {
      failures.push(`${anchor}: does not resolve`);
      continue;
    }
    if (resolved !== matching[0].url) {
      failures.push(
        `${anchor}: resolved to ${resolved}, expected ${matching[0].url}`
      );
    }

    // An old link carried the year of the page it sat on, which is the only
    // thing separating notes that share an anchor across years.
    for (const year of new Set(matching.map((entry) => entry.year))) {
      const wanted = matching.find((entry) => entry.year === year);
      if (wanted === undefined) continue;
      const inYear = resolveAnchor(entries, anchor, year);
      if (inYear !== wanted.url) {
        failures.push(
          `${anchor} (${year}): resolved to ${inYear}, expected ${wanted.url}`
        );
      }
    }
  }

  if (resolveAnchor(entries, 'no-such-anchor-anywhere', null) !== null) {
    failures.push('an unknown anchor resolved to something');
  }

  failures.push(...ambiguousGroups(entries, product));

  const repeated = [...byAnchor.values()].filter(
    (matching) => matching.length > 1
  );
  for (const matching of repeated) {
    const distinct = new Set(matching.map((entry) => entry.url));
    if (distinct.size !== matching.length) {
      failures.push(
        `${matching[0].anchor}: notes sharing this anchor do not have distinct URLs`
      );
    }
  }

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.slice(0, 20).join('\n'));
    process.exit(1);
  }

  console.log(
    `OK ${entries.length} anchors resolve (${byAnchor.size} distinct, ${repeated.length} repeated)`
  );
}

const [buildDir, product] = process.argv.slice(2);
if (buildDir === undefined || product === undefined) {
  console.error('usage: check-release-note-anchors.ts <build-dir> <product>');
  process.exit(2);
}
check(buildDir, product);
