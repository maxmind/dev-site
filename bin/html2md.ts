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
import type { Node } from 'unist';
import type {
  Root,
  TableCell,
  Code,
  Text,
  ListItem,
  PhrasingContent,
  RootContent,
} from 'mdast';

// Create a unified processor for HTML to Markdown conversion
const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  .use(remarkGfm)
  .use(() => {
    // Custom transformer to clean up table cells
    return (tree: Root) => {
      visit(tree, 'tableCell', (node: Node) => {
        const tableCell = node as TableCell;
        // Process each child of the table cell
        if (tableCell.children) {
          // Flatten nested paragraphs, lists, and clean up whitespace
          const flattenedChildren: PhrasingContent[] = [];

          // Note: Table cells can contain block content during processing,
          // but we're flattening them to phrasing content
          (tableCell.children as unknown as RootContent[]).forEach(
            (child: RootContent) => {
              if (child.type === 'paragraph') {
                // Add paragraph children directly (without the paragraph wrapper)
                flattenedChildren.push(...child.children);
                // Add a space between paragraphs
                if (flattenedChildren.length > 0) {
                  flattenedChildren.push({ type: 'text', value: ' ' });
                }
              } else if (child.type === 'list') {
                // Add a space before the list if there's content before it
                if (flattenedChildren.length > 0) {
                  flattenedChildren.push({ type: 'text', value: ' ' });
                }

                // Convert list items to inline format with commas
                child.children.forEach((listItem: ListItem, index: number) => {
                  if (index > 0) {
                    // Add separator between list items
                    flattenedChildren.push({ type: 'text', value: ', ' });
                  }

                  // Process list item children
                  if (listItem.children) {
                    listItem.children.forEach((listItemChild: RootContent) => {
                      if (listItemChild.type === 'paragraph') {
                        flattenedChildren.push(...listItemChild.children);
                      } else if (
                        listItemChild.type === 'text' ||
                        listItemChild.type === 'emphasis' ||
                        listItemChild.type === 'strong' ||
                        listItemChild.type === 'link' ||
                        listItemChild.type === 'inlineCode'
                      ) {
                        flattenedChildren.push(
                          listItemChild as PhrasingContent
                        );
                      }
                    });
                  }
                });
              } else if (
                child.type === 'text' ||
                child.type === 'emphasis' ||
                child.type === 'strong' ||
                child.type === 'link' ||
                child.type === 'inlineCode' ||
                child.type === 'delete' ||
                child.type === 'linkReference' ||
                child.type === 'break' ||
                child.type === 'image' ||
                child.type === 'imageReference'
              ) {
                flattenedChildren.push(child as PhrasingContent);
              }
            }
          );

          // Clean up the flattened content
          tableCell.children = flattenedChildren.filter(
            (child: PhrasingContent, index: number) => {
              // Remove duplicate spaces
              if (
                child.type === 'text' &&
                child.value === ' ' &&
                index > 0 &&
                flattenedChildren[index - 1].type === 'text' &&
                (flattenedChildren[index - 1] as Text).value === ' '
              ) {
                return false;
              }
              return true;
            }
          );

          // Merge adjacent text nodes
          const mergedChildren: PhrasingContent[] = [];
          tableCell.children.forEach((child: PhrasingContent) => {
            if (
              child.type === 'text' &&
              mergedChildren.length > 0 &&
              mergedChildren[mergedChildren.length - 1].type === 'text'
            ) {
              (mergedChildren[mergedChildren.length - 1] as Text).value +=
                child.value;
            } else {
              mergedChildren.push(child);
            }
          });

          tableCell.children = mergedChildren;

          // Clean up text content in the cell
          tableCell.children.forEach((child: PhrasingContent) => {
            if (child.type === 'text') {
              // Replace multiple spaces and newlines with single space
              child.value = child.value.replace(/\s+/g, ' ').trim();
            }
          });
        }
      });

      // Also handle code blocks to remove line numbers
      visit(tree, 'code', (node: Code) => {
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
          // Pattern: &#x[hex]; corrupting text (not just at end of italic markers)
          markdown = markdown.replace(
            /&#x([0-9A-Fa-f]{1,4});/g,
            (_, hexCode) => {
              // Convert hex to character
              return String.fromCharCode(parseInt(hexCode, 16));
            }
          );

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
