#!/usr/bin/env node

import * as fs from 'fs';
import { glob } from 'glob';
import { HTMLElement, parse } from 'node-html-parser';
import TurndownService from 'turndown';
// @ts-expect-error - turndown-plugin-gfm doesn't have types
import { tables } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

turndownService.use(tables);

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
          const markdown = turndownService.turndown(pageContent.innerHTML);
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
