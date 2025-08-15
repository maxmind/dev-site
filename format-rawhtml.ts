import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

// HTML tags to match inside .md files
const tags = [
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'div',
  'section',
  'article',
  'ul',
  'ol',
  'li',
  'p',
  'a',
];

const htmlBlockRegex = new RegExp(
  `<(${tags.join('|')})([^>]*)>[\\s\\S]*?<\\/\\1>`,
  'gi'
);

// Format HTML blocks using Prettier
const formatHtmlBlocks = async (content: string) => {
  const matches: { block: string; index: number }[] = [];
  let match: RegExpExecArray | null;
  const regex = new RegExp(htmlBlockRegex.source, htmlBlockRegex.flags);

  while ((match = regex.exec(content)) !== null) {
    matches.push({ block: match[0], index: match.index });
  }

  let formattedContent = content;
  for (let i = matches.length - 1; i >= 0; i--) {
    const { block, index } = matches[i];
    let formattedBlock: string;
    try {
      formattedBlock = (
        await prettier.format(block, { parser: 'html' })
      ).trim();
    } catch (e: any) {
      console.warn(`⚠️ Failed to format block:\n${block}\nError: ${e.message}`);
      formattedBlock = block;
    }

    formattedContent =
      formattedContent.slice(0, index) +
      formattedBlock +
      formattedContent.slice(index + block.length);
  }

  return formattedContent;
};

// Format a single file
const formatFile = async (filePath: string) => {
  const raw = fs.readFileSync(filePath, 'utf8');
  const formatted = await formatHtmlBlocks(raw);

  if (formatted !== raw) {
    fs.writeFileSync(filePath, formatted, 'utf8');
    console.log(`✅ Formatted: ${filePath}`);
    return true;
  } else {
    console.log(`✅ No changes needed: ${filePath}`);
    return false;
  }
};

const main = async () => {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    console.error('❌ No input files provided.');
    console.error('Usage:');
    console.error('node dist/format-rawhtml.js <file1.md> <file2.md> ...');
    process.exit(1);
  }

  let changed = false;

  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.warn(`⚠️ File does not exist: ${file}`);
      continue;
    }
    const didChange = await formatFile(file);
    changed ||= didChange;
  }

  process.exit(0);
};

main();
