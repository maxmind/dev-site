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

function check(buildDir: string, product: string): void {
  const mapPath = path.join(buildDir, product, 'release-notes', 'anchors.json');
  if (!fs.existsSync(mapPath)) {
    console.error(`FAIL anchor map missing: ${mapPath}`);
    process.exit(1);
  }
  const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8')) as AnchorEntry[];
  const failures: string[] = [];

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
    const year = matching[0].year;
    const resolved = resolveAnchor(entries, anchor, year);
    if (resolved === null) {
      failures.push(`${anchor}: does not resolve`);
      continue;
    }
    // A repeated anchor goes to the most recent note sharing it, which is what
    // the browser did when both ids sat on one year page.
    if (resolved !== matching[0].url) {
      failures.push(
        `${anchor}: resolved to ${resolved}, expected ${matching[0].url}`
      );
    }
    // The year is carried by the redirect but must not be required.
    if (resolveAnchor(entries, anchor, null) !== resolved) {
      failures.push(`${anchor}: resolves differently without the year`);
    }
  }

  if (resolveAnchor(entries, 'no-such-anchor-anywhere', null) !== null) {
    failures.push('an unknown anchor resolved to something');
  }

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
