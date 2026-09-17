/**
 * Compares a generated release note feed against a reference feed captured
 * from production before the notes were split into individual pages.
 *
 * This is a one-time, manual check of that migration. No lint command runs it,
 * and it fails once a newer note is published.
 *
 * Subscribers must not see an already-published note as new. HubSpot names both
 * the GUID and the link as duplicate-prevention fields and warns that a changed
 * publish date can pull a post into a send, so every pre-migration item has to
 * render exactly as it did before. Comparing all four identity fields avoids
 * guessing which one HubSpot keys on.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-feed.ts \
 *     <reference-feed.xml> <generated-feed.xml>
 */

import fs from 'node:fs';

interface Item {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
}

/** Every field HubSpot might use to detect a repeat item. */
const IDENTITY_FIELDS: (keyof Item)[] = ['title', 'link', 'pubDate', 'guid'];

function tagValue(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (match === null) {
    throw new Error(`feed item is missing <${tag}>:\n${block.slice(0, 200)}`);
  }
  return match[1].trim();
}

function readItems(feedPath: string): Item[] {
  const xml = fs.readFileSync(feedPath, 'utf8');
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return blocks.map((block) => ({
    title: tagValue(block, 'title'),
    link: tagValue(block, 'link'),
    pubDate: tagValue(block, 'pubDate'),
    guid: tagValue(block, 'guid'),
  }));
}

function check(referencePath: string, generatedPath: string): void {
  const reference = readItems(referencePath);
  const generated = readItems(generatedPath);
  const failures: string[] = [];

  if (reference.length === 0) {
    throw new Error(`reference feed ${referencePath} has no items`);
  }

  // Match on title: the link is exactly what the migration puts at risk, so it
  // cannot also be the key used to pair items up.
  const generatedByTitle = new Map<string, Item[]>();
  for (const item of generated) {
    generatedByTitle.set(item.title, [
      ...(generatedByTitle.get(item.title) ?? []),
      item,
    ]);
  }

  reference.forEach((expected, index) => {
    const candidates = generatedByTitle.get(expected.title) ?? [];
    if (candidates.length === 0) {
      failures.push(
        `item ${index} "${expected.title}": missing from generated feed`
      );
      return;
    }
    // A title can repeat across years, so prefer the same pubDate.
    const actual =
      candidates.find((candidate) => candidate.pubDate === expected.pubDate) ??
      candidates[0];

    for (const field of IDENTITY_FIELDS) {
      if (actual[field] !== expected[field]) {
        failures.push(
          `item ${index} "${expected.title}": ${field}\n` +
            `  expected: ${expected[field]}\n` +
            `  actual:   ${actual[field]}`
        );
      }
    }
  });

  // Ordering decides which items a reader shows first and which the feed drops
  // at the limit, so it is part of the contract.
  reference.forEach((expected, index) => {
    if (
      generated[index] !== undefined &&
      generated[index].title !== expected.title
    ) {
      failures.push(
        `position ${index}: expected "${expected.title}", got "${generated[index].title}"`
      );
    }
  });

  if (generated.length !== reference.length) {
    failures.push(
      `item count: expected ${reference.length}, got ${generated.length}`
    );
  }

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log(
    `OK ${reference.length} feed items identical in ${IDENTITY_FIELDS.join(', ')}`
  );
}

const [referencePath, generatedPath] = process.argv.slice(2);
if (referencePath === undefined || generatedPath === undefined) {
  console.error(
    'usage: check-release-note-feed.ts <reference-feed.xml> <generated-feed.xml>'
  );
  process.exit(2);
}
check(referencePath, generatedPath);
