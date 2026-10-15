/**
 * Concatenate the Markdown output of the home page and of every page that
 * llms.txt lists, in llms.txt order, into public/llms-full.txt: one fetch
 * for the documentation. llms.txt leaves out single release notes, which
 * would add about a third to the size. See https://llmstxt.org/.
 *
 * Runs after Hugo. Fails when a page holds Markdown that a reader would see
 * broken: a link inside an HTML block, which never renders, or source
 * markup that a template failed to turn into Markdown.
 */

import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_DIR = 'public';
const OUTPUT = path.join(PUBLIC_DIR, 'llms-full.txt');
const BROKEN = [
  {
    // Only a block-level tag starts an HTML block. Inline tags such as <em>
    // leave Markdown parsing on, and a blank line ends the block.
    pattern:
      /<(?:blockquote|dd|details|div|dl|dt|h[1-6]|li|ol|p|section|summary|table|tbody|td|th|thead|tr|ul)(?:\s[^>]*)?>[^\S\n]*\n?[^\S\n]*\[[^\]]+\]\(/i,
    reason: 'Markdown link inside an HTML block never renders',
  },
  {
    pattern: /\{\{[<%]/,
    reason: 'Hugo shortcode left unrendered',
  },
  {
    pattern: /<!-- prettier-ignore/,
    reason: 'Prettier marker left in output',
  },
];

const INDEX = path.join(PUBLIC_DIR, 'llms.txt');
const FRONT_MATTER = /^---\n([\s\S]*?)\n---\n+(# .*\n)/;

// Check every page, release notes too, though only some go in the output.
const all = fs
  .readdirSync(PUBLIC_DIR, { recursive: true, encoding: 'utf8' })
  .filter((file) => path.basename(file) === 'index.md');
if (all.length === 0) {
  console.error(`❌ No index.md files under ${PUBLIC_DIR}. Run hugo first.`);
  process.exit(1);
}
for (const page of all) {
  const file = path.join(PUBLIC_DIR, page);
  const markdown = fs.readFileSync(file, 'utf8');
  for (const { pattern, reason } of BROKEN) {
    const broken = markdown.match(pattern);
    if (broken) {
      console.error(`❌ ${file}: ${reason}: ${broken[0]}`);
      process.exit(1);
    }
  }
}

// llms.txt links each page as "- [Title](<URL>index.md)". The URL is
// absolute in production and root-relative in a local build.
const linked = fs
  .readFileSync(INDEX, 'utf8')
  .split('\n')
  .flatMap((line) => line.match(/^- \[.*\]\((\S+)\)$/)?.[1] ?? [])
  .map((url) => new URL(url, 'http://localhost/').pathname.slice(1));
if (linked.length === 0) {
  console.error(`❌ No page links in ${INDEX}.`);
  process.exit(1);
}

const parts: string[] = [];
for (const page of ['index.md', ...linked]) {
  const file = path.join(PUBLIC_DIR, page);
  if (!all.includes(page)) {
    console.error(`❌ ${INDEX} links ${page}, which is not in ${PUBLIC_DIR}.`);
    process.exit(1);
  }
  const markdown = fs.readFileSync(file, 'utf8');
  // Front matter after the first page reads as a thematic break and a
  // setext heading. Give the page URL as a line under the H1 instead.
  const frontMatter = markdown.match(FRONT_MATTER);
  const source = frontMatter?.[1].match(/^source: (".*")$/m)?.[1];
  if (!frontMatter || !source) {
    console.error(`❌ ${file}: no front matter with a source, then an H1`);
    process.exit(1);
  }
  // A fragment-only link would resolve against llms-full.txt, which holds
  // the headings of every page. Point it at the Markdown of its own page,
  // as the other internal links are.
  const url = JSON.parse(source);
  const body = markdown
    .slice(frontMatter[0].length)
    .replaceAll('](#', `](/${page}#`);
  parts.push(`${frontMatter[2]}\nSource: ${url}\n\n${body.trim()}`);
}

fs.writeFileSync(OUTPUT, parts.join('\n\n') + '\n');
console.log(`Wrote ${OUTPUT} from ${parts.length} pages.`);
