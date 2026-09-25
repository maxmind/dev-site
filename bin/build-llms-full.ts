/**
 * Concatenate the Markdown output of every page into public/llms-full.txt,
 * one fetch for the whole site. See https://llmstxt.org/.
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

// Order by directory, so a section page comes before its children. The home
// page's directory is "./", and "." sorts before every letter.
const dir = (file: string) => path.dirname(file) + '/';
const pages = fs
  .readdirSync(PUBLIC_DIR, { recursive: true, encoding: 'utf8' })
  .filter((file) => path.basename(file) === 'index.md')
  .sort((a, b) => (dir(a) < dir(b) ? -1 : dir(a) > dir(b) ? 1 : 0));

if (pages.length === 0) {
  console.error(`❌ No index.md files under ${PUBLIC_DIR}. Run hugo first.`);
  process.exit(1);
}

const parts: string[] = [];
for (const page of pages) {
  const file = path.join(PUBLIC_DIR, page);
  const markdown = fs.readFileSync(file, 'utf8');
  for (const { pattern, reason } of BROKEN) {
    const broken = markdown.match(pattern);
    if (broken) {
      console.error(`❌ ${file}: ${reason}: ${broken[0]}`);
      process.exit(1);
    }
  }
  parts.push(markdown.trimEnd());
}

fs.writeFileSync(OUTPUT, parts.join('\n\n') + '\n');
console.log(`Wrote ${OUTPUT} from ${pages.length} pages.`);
