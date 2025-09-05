#!/usr/bin/env node

import * as fs from 'fs';
import { glob } from 'glob';
import { HTMLElement, parse } from 'node-html-parser';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

// Create a unified processor for HTML to Markdown conversion
const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(() => {
    // Custom transformer to clean up table cells
    return (tree: any) => {
      visit(tree, 'tableCell', (node: any) => {
        // Process each child of the table cell
        if (node.children) {
          // Flatten nested paragraphs and clean up whitespace
          const flattenedChildren: any[] = [];
          
          node.children.forEach((child: any) => {
            if (child.type === 'paragraph' && child.children) {
              // Add paragraph children directly (without the paragraph wrapper)
              flattenedChildren.push(...child.children);
              // Add a space between paragraphs
              if (flattenedChildren.length > 0) {
                flattenedChildren.push({ type: 'text', value: ' ' });
              }
            } else {
              flattenedChildren.push(child);
            }
          });
          
          // Clean up the flattened content
          node.children = flattenedChildren.filter((child: any, index: number) => {
            // Remove duplicate spaces
            if (
              child.type === 'text' &&
              child.value === ' ' &&
              index > 0 &&
              flattenedChildren[index - 1].type === 'text' &&
              flattenedChildren[index - 1].value === ' '
            ) {
              return false;
            }
            return true;
          });
          
          // Merge adjacent text nodes
          const mergedChildren: any[] = [];
          node.children.forEach((child: any) => {
            if (
              child.type === 'text' &&
              mergedChildren.length > 0 &&
              mergedChildren[mergedChildren.length - 1].type === 'text'
            ) {
              mergedChildren[mergedChildren.length - 1].value += child.value;
            } else {
              mergedChildren.push(child);
            }
          });
          
          node.children = mergedChildren;
          
          // Clean up text content in the cell
          node.children.forEach((child: any) => {
            if (child.type === 'text') {
              // Replace multiple spaces and newlines with single space
              child.value = child.value.replace(/\s+/g, ' ').trim();
            }
          });
        }
      });
      
      // Also handle code blocks to remove line numbers
      visit(tree, 'code', (node: any) => {
        if (node.value) {
          // Remove line numbers at the beginning of lines
          node.value = node.value
            .split('\n')
            .map((line: string) => {
              // Remove line numbers which may have leading spaces for alignment
              return line.replace(/^\s*\d+/, '');
            })
            .join('\n')
            .trim();
        }
      });
    };
  })
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
          const file = await processor.process(pageContent.innerHTML);
          let markdown = String(file);
          
          // Fix corrupted HTML entities that appear when italic text ends with numbers
          // This is a known bug in rehype-remark/remark-stringify
          // Pattern: &#x[hex]; at the end of italic markers
          markdown = markdown.replace(/&#x([0-9A-Fa-f]+);(_+)/g, (match, hexCode, underscores) => {
            // Convert hex to character
            const char = String.fromCharCode(parseInt(hexCode, 16));
            return char + underscores;
          });
          
          // Also fix &#xNAN; which appears to be related to the same bug
          markdown = markdown.replace(/&#xNAN;/g, '');
          
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
