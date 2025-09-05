#!/usr/bin/env node

import * as fs from 'fs';
import { glob } from 'glob';
import { HTMLElement, parse } from 'node-html-parser';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

// Create a unified processor for HTML to Markdown conversion
const processor = unified()
  .use(rehypeParse, {
    fragment: true,
  })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(remarkStringify, {
    bullet: '*',
    fences: true,
    emphasis: '_',
    strong: '*',
  });

async function convertHtmlToMarkdown(): Promise<void> {
  try {
    const htmlFiles = await glob('./public/**/*.html', {
      nodir: true,
    });

    for (const htmlFile of htmlFiles) {
      const mdFile = htmlFile.replace(/\.html$/, '.md');

      console.log(`Converting: ${htmlFile} -> ${mdFile}`);

      try {
        const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
        const root = parse(htmlContent);
        const pageContent: HTMLElement | null =
          root.querySelector('.page__content');

        if (pageContent) {
          let html = pageContent.innerHTML;

          // Pre-process code blocks to remove line number spans
          // Since node-html-parser might have issues with complex selectors,
          // let's use a simple but effective approach

          // First, remove all spans that contain just numbers and have user-select:none
          // This regex is safe because it's very specific to the line number pattern
          html = html.replace(
            /<span[^>]*user-select:\s*none[^>]*>\s*\d+\s*<\/span>/gi,
            ''
          );

          // Alternative: If the above doesn't work, parse and manipulate
          if (
            html.includes('user-select:none') ||
            html.includes('user-select: none')
          ) {
            const doc = parse(html);
            const spans = doc.getElementsByTagName('span');

            // Work backwards to avoid index issues when removing elements
            for (let i = spans.length - 1; i >= 0; i--) {
              const span = spans[i];
              const style = span.getAttribute('style') || '';
              const content = span.innerHTML || '';

              // Check if this looks like a line number span
              if (
                (style.includes('user-select:none') ||
                  style.includes('user-select: none')) &&
                /^\s*\d+\s*$/.test(content)
              ) {
                span.remove();
              }
            }

            html = doc.toString();
          }

          // Extract and store tables with unique IDs
          const tables = new Map<string, string>();
          let tableCounter = 0;

          html = html.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
            // Parse the table and strip attributes
            const tableDoc = parse(match);

            // Remove all attributes from table-related elements and code tags
            tableDoc
              .querySelectorAll('table, tr, td, th, thead, tbody, tfoot, code')
              .forEach((el) => {
                el.removeAttribute('class');
                el.removeAttribute('style');
                el.removeAttribute('id');
                // Remove all attributes by setting to empty
                el.rawAttrs = '';
              });

            const id = `PRESERVEDTABLE${tableCounter++}END`;
            tables.set(id, tableDoc.toString());
            // Return a simple text placeholder that won't be escaped
            return `\n${id}\n`;
          });

          // Process the HTML without tables
          const file = await processor.process(html);
          let markdown = String(file);

          // Restore the tables
          tables.forEach((tableHtml, id) => {
            // The placeholder might have been wrapped in a paragraph
            markdown = markdown.replace(
              new RegExp(`(?:^|\\n)${id}(?:\\n|$)`, 'gm'),
              `\n\n${tableHtml}\n\n`
            );
            // Also try without line breaks in case it got inlined
            markdown = markdown.replace(
              new RegExp(id, 'g'),
              `\n\n${tableHtml}\n\n`
            );
          });

          // Fix corrupted HTML entities that appear when text contains certain characters
          // This is a known bug in rehype-remark/remark-stringify
          markdown = markdown.replace(
            /&#x([0-9A-Fa-f]{1,4});/g,
            (_, hexCode) => {
              // Validate and convert hex to character
              const codePoint = parseInt(hexCode, 16);
              // Check for valid Unicode code points
              if (!isNaN(codePoint) && codePoint >= 0 && codePoint <= 0x10FFFF) {
                return String.fromCharCode(codePoint);
              }
              // Return the original string if invalid
              return `&#x${hexCode};`;
            }
          );

          // Also fix &#xNAN; which appears to be related to the same bug
          markdown = markdown.replace(/&#xNAN;/g, '');

          // Remove extra blank lines
          markdown = markdown.replace(/\n{2,}/g, '\n\n');

          fs.writeFileSync(mdFile, markdown);
        } else {
          console.warn(`  Warning: No .page__content found in ${htmlFile}`);
        }
      } catch (fileError) {
        console.error(
          `  Error processing ${htmlFile}:`,
          (fileError as Error).message
        );
      }
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

convertHtmlToMarkdown();
