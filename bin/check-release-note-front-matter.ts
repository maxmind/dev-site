/**
 * Validates the front matter of every release note.
 *
 * The filename sets a note's URL. The front matter sets its title and its
 * position in the listing and the feed. A wrong value does not fail the build:
 * a note with no title renders a blank heading, and a date that disagrees with
 * the filename sorts the note away from where an author expects.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-front-matter.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(currentDir, '..', 'content');

const PRODUCTS = ['geoip', 'minfraud'];
const NOTE_FILE = /^\d{4}-\d{2}-\d{2}-.+\.md$/;

interface Note {
  file: string;
  name: string;
  source: string;
}

function readNotes(product: string): Note[] {
  const dir = path.join(CONTENT_DIR, product, 'release-notes');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => NOTE_FILE.test(name))
    .map((name) => ({
      file: path.join('content', product, 'release-notes', name),
      name: name.replace(/\.md$/, ''),
      source: fs.readFileSync(path.join(dir, name), 'utf8'),
    }));
}

function field(source: string, key: string): string | null {
  const match = source.match(new RegExp(`^${key} = (.*)$`, 'm'));
  if (match === null) return null;
  return match[1]
    .trim()
    .replace(/^'(.*)'$/, '$1')
    .replace(/^"(.*)"$/, '$1');
}

function check(): void {
  const failures: string[] = [];

  for (const product of PRODUCTS) {
    // Hugo lowercases the slug, or the filename when there is none, to build
    // the URL. Two notes landing on the same one pass without warning and the
    // second overwrites the first.
    const bySlug = new Map<string, string[]>();

    for (const note of readNotes(product)) {
      const slug = (field(note.source, 'slug') ?? note.name).toLowerCase();
      bySlug.set(slug, [...(bySlug.get(slug) ?? []), note.file]);

      const title = field(note.source, 'title');
      if (title === null || title === '') {
        failures.push(`${note.file}: no title`);
      }

      // The hour is what orders notes published on the same day, so a date
      // without one silently reorders the listing and the feed.
      const date = field(note.source, 'date');
      if (date === null) {
        failures.push(`${note.file}: no date`);
      } else if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(date)) {
        failures.push(`${note.file}: date ${date} carries no time component`);
      } else if (Number.isNaN(Date.parse(date))) {
        failures.push(`${note.file}: date ${date} does not parse`);
      } else if (!date.startsWith(note.name.slice(0, 10))) {
        // The filename date sets the URL and the front matter date sets the
        // order, so the two must agree.
        failures.push(
          `${note.file}: filename says ${note.name.slice(0, 10)}, front matter says ${date.slice(0, 10)}`
        );
      }
    }

    for (const [slug, files] of bySlug) {
      if (files.length > 1) {
        failures.push(
          `${product}: ${files.length} notes share the URL ${slug}\n  ` +
            files.join('\n  ')
        );
      }
    }
  }

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log('OK release note front matter is valid');
}

check();
