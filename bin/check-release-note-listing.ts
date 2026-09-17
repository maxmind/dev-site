/**
 * Checks the rendered release note listing for a product.
 *
 * The listing replaces the year pages, so it has to carry every note the year
 * pages carried, in the same order, with the full text of each. Anything less
 * silently drops published announcements from the site.
 *
 * Usage:
 *   node --experimental-strip-types bin/check-release-note-listing.ts \
 *     <build-dir> <product> <expected-note-count>
 */

import fs from 'node:fs';
import path from 'node:path';

interface ListedNote {
  title: string;
  href: string;
  date: string;
  contentLength: number;
  page: number;
}

const PER_PAGE = 40;

function pagePaths(buildDir: string, product: string): string[] {
  const root = path.join(buildDir, product, 'release-notes');
  const paths = [path.join(root, 'index.html')];
  for (let n = 2; ; n += 1) {
    const pagerPath = path.join(root, 'page', String(n), 'index.html');
    if (!fs.existsSync(pagerPath)) break;
    paths.push(pagerPath);
  }
  return paths;
}

function readNotes(buildDir: string, product: string): ListedNote[] {
  const notes: ListedNote[] = [];
  pagePaths(buildDir, product).forEach((pagePath, index) => {
    const html = fs.readFileSync(pagePath, 'utf8');
    const blocks =
      html.match(
        /<div\s[^>]*class="release-note"[\s\S]*?<!-- end-release-note -->/g
      ) ?? [];
    for (const block of blocks) {
      const link = block.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
      const date = block.match(/data-date="([^"]*)"/);
      const content = block.match(
        /<div class="release-note__content">([\s\S]*?)<!-- end-content -->/
      );
      notes.push({
        title: link === null ? '' : link[2].replace(/<[^>]+>/g, '').trim(),
        href: link === null ? '' : link[1],
        date: date === null ? '' : date[1],
        contentLength: content === null ? 0 : content[1].trim().length,
        page: index + 1,
      });
    }
  });
  return notes;
}

function check(buildDir: string, product: string, expectedCount: number): void {
  const notes = readNotes(buildDir, product);
  const failures: string[] = [];

  if (notes.length !== expectedCount) {
    failures.push(`note count: expected ${expectedCount}, got ${notes.length}`);
  }

  for (const [index, note] of notes.entries()) {
    const previous = notes[index - 1];
    if (previous !== undefined && previous.date < note.date) {
      failures.push(
        `order: "${note.title}" (${note.date}) follows older "${previous.title}" (${previous.date})`
      );
    }
    if (note.contentLength === 0) {
      failures.push(`"${note.title}": listed without content`);
    }
    // The title has to reach the note's own page, not a same-page fragment.
    if (!/^\/[a-z]+\/release-notes\/\d{4}-\d{2}-\d{2}-/.test(note.href)) {
      failures.push(
        `"${note.title}": title links to ${note.href || '(nothing)'}, not its own page`
      );
    }
  }

  const pages = new Set(notes.map((note) => note.page));
  const expectedPages = Math.ceil(expectedCount / PER_PAGE);
  if (pages.size !== expectedPages) {
    failures.push(
      `pager: expected ${expectedPages} pages of ${PER_PAGE}, got ${pages.size}`
    );
  }
  for (const page of pages) {
    const onPage = notes.filter((note) => note.page === page).length;
    const isLast = page === expectedPages;
    if (!isLast && onPage !== PER_PAGE) {
      failures.push(
        `pager: page ${page} holds ${onPage} notes, expected ${PER_PAGE}`
      );
    }
  }

  const indexHTML = fs.readFileSync(
    path.join(buildDir, product, 'release-notes', 'index.html'),
    'utf8'
  );
  const banners = indexHTML.match(/comms\.maxmind\.com/g) ?? [];
  if (banners.length !== 1) {
    failures.push(
      `signup banner: appears ${banners.length} times on the section index, expected 1`
    );
  }
  if (indexHTML.includes('page__release-note-archive')) {
    failures.push('year archive list is still rendered');
  }

  if (failures.length > 0) {
    console.error(`FAIL ${failures.length} problem(s):\n`);
    console.error(failures.slice(0, 20).join('\n'));
    if (failures.length > 20)
      console.error(`... and ${failures.length - 20} more`);
    process.exit(1);
  }

  console.log(
    `OK ${notes.length} notes listed newest first across ${pages.size} pages`
  );
}

const [buildDir, product, count] = process.argv.slice(2);
if (buildDir === undefined || product === undefined || count === undefined) {
  console.error(
    'usage: check-release-note-listing.ts <build-dir> <product> <expected-note-count>'
  );
  process.exit(2);
}
check(buildDir, product, Number(count));
