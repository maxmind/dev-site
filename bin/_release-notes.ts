/**
 * Shared by the release note source and site checks: how Hugo reads each note,
 * and how a check reports its result.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
export const PRODUCTS = ['geoip', 'minfraud'];
export const NOTE_PATH =
  /^content\/(geoip|minfraud)\/release-notes\/(\d{4}-\d{2}-\d{2})-.+\.md$/;

export interface Note {
  path: string;
  product: string;
  title: string;
  /** As Hugo read it, with its UTC offset. */
  date: string;
  draft: boolean;
  /** The URL Hugo builds the note at, which lowercases the filename. */
  permalink: string;
  fileDate: string;
  legacyAnchor: string | null;
}

/** `hugo list all` prints CSV, and a title with a comma arrives quoted. */
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted && c === '"' && text[i + 1] === '"') {
      cell += '"';
      i += 1;
    } else if (c === '"') {
      quoted = !quoted;
    } else if (!quoted && c === ',') {
      row.push(cell);
      cell = '';
    } else if (!quoted && c === '\n') {
      rows.push([...row, cell]);
      row = [];
      cell = '';
    } else {
      cell += c;
    }
  }
  if (cell !== '' || row.length > 0) rows.push([...row, cell]);
  return rows;
}

/**
 * Every note as Hugo reads it. Hugo's list has no custom parameters, so the
 * legacy anchor comes from the note's own front matter.
 */
export function readNotes(): Note[] {
  const csv = execFileSync('hugo', ['list', 'all'], {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  const [header = [], ...rows] = parseCSV(csv);
  return rows.flatMap((cells) => {
    const page = Object.fromEntries(
      header.map((name, i) => [name, cells[i] ?? ''])
    );
    const match = NOTE_PATH.exec(page.path ?? '');
    if (match === null) return [];
    const frontMatter =
      fs.readFileSync(path.join(ROOT, page.path), 'utf8').split('+++')[1] ?? '';
    return [
      {
        path: page.path,
        product: match[1],
        title: page.title ?? '',
        date: page.date ?? '',
        draft: page.draft !== 'false',
        permalink: page.permalink ?? '',
        fileDate: match[2],
        legacyAnchor:
          /^legacy_anchor = ['"](.*)['"]$/m.exec(frontMatter)?.[1] ?? null,
      },
    ];
  });
}

export function finish(failures: string[], ok: string): void {
  if (failures.length === 0) {
    console.log(ok);
    return;
  }
  console.error(`FAIL ${failures.length} problem(s):\n`);
  console.error(failures.slice(0, 20).join('\n'));
  if (failures.length > 20) {
    console.error(`... and ${failures.length - 20} more`);
  }
  process.exit(1);
}
