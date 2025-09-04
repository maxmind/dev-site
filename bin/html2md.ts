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

// Custom rule to handle code blocks with line numbers
turndownService.addRule('codeWithLineNumbers', {
  filter: function (node: Node) {
    return (
      node.nodeName === 'PRE' &&
      (node as Element).querySelector('code') !== null
    );
  },
  replacement: function (content: string, node: Node) {
    const element = node as Element;
    const codeElement = element.querySelector('code');
    if (!codeElement) return content;

    const language =
      codeElement.getAttribute('data-lang') ||
      codeElement.className.replace('language-', '') ||
      '';

    // Get the text content, removing line numbers
    let cleanedCode = codeElement.textContent || '';

    // Remove line numbers at the beginning of lines
    cleanedCode = cleanedCode
      .split('\n')
      .map((line) => {
        // Remove line numbers which may have leading spaces for alignment (e.g., " 1", " 2", "10")
        // This regex matches optional spaces followed by digits at the start of the line
        return line.replace(/^\s*\d+/, '');
      })
      .join('\n');

    return '\n\n```' + language + '\n' + cleanedCode.trim() + '\n```\n\n';
  },
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
