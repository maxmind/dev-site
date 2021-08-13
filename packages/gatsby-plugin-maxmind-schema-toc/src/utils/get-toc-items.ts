import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-unresolved
import { Parent } from 'unist';

/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line max-len
const getTableOfContents = require('gatsby-plugin-mdx/utils/get-table-of-content');
const generateTOC = require('mdast-util-toc');
const parse = require('remark-parse');
const mdx = require('remark-mdx');
const stringify = require('remark-stringify');
const unified = require('unified');
const map = require('unist-util-map');
const find = require('unist-util-find');
const findBefore = require('unist-util-find-before');
const visitParents = require('unist-util-visit-parents');

/**
 * To get the add `Schema` component names to the table of contents, the
 * abstract syntax tree (AST) needs to be modified so that `mdast-util-toc`
 * and `gatsby-plugin-mdx/utils/get-table-of-content` think `Schema` nodes are
 * heading nodes.
 *
 * This code searches for AST nodes of direct `Schema` usage (node name of
 * `Schema`) or indirect Schema usage (node name of `Schemas.*`), gets the
 * `name` attribute value, and then replaces the node with a heading node that
 * is one deeper than the closest heading.
 */

/* eslint-disable security/detect-non-literal-fs-filename */
export const createImportPathMap = (
  schemaDir: string
): Record<string, string> =>
  fs.readdirSync(schemaDir).reduce((acc, file) => {
    if (fs.lstatSync(path.resolve(schemaDir, file)).isDirectory()) {
      return acc;
    }

    return {
      ...acc,
      [`Schemas.${path.basename(file, '.mdx')}`]: path.resolve(
        schemaDir,
        file
      ),
    };
  }, {});
/* eslint-enable security/detect-non-literal-fs-filename */

export default (
  sourceTree: any,
  importPathMap: Record<string, string>,
): any => {
  const newTree = map(
    sourceTree,
    (node: any) => {
      if (
        node.type !== 'mdxBlockElement'
        || !(node.name as string).startsWith('Schema')
      ) {
        return node;
      }

      let schemaNode: any = node;

      /**
       * Schema component instances can either be used directly in an MDX file,
       * or indirectly via an imported MDX file. Indirect instances require
       * additional processing to find the imported MDX file and create it's own
       * abstract syntax tree.
       *
       */
      if ((node.name as string).startsWith('Schemas')) {
        const importedComponentName = node.name as string;

        // eslint-disable-next-line security/detect-object-injection
        const importedFilePath = importPathMap[importedComponentName];

        if (importedFilePath) {
          let importedComponentTree;

          // eslint-disable-next-line security/detect-non-literal-fs-filename
          const fileContents = fs.readFileSync(importedFilePath);

          unified()
            .use(parse, {
              position: false,
            })
            .use(stringify)
            .use(mdx)
            .use(() => (node: any) => {
              importedComponentTree = node;
            })
            .processSync(fileContents);

          if (importedComponentTree) {
            const foundNode = find(
              importedComponentTree,
              (node: any) => node.name
                && (node.name as string).endsWith('Schema')
            );

            if (foundNode) {
              schemaNode = foundNode;
            }
          }
        }
      }

      const schemaHeadingName = (schemaNode as any).attributes.find(
        (attr: any) => attr.name === 'name'
      )?.value;

      if (!schemaHeadingName) {
        return;
      }

      let closestHeadingNode;

      visitParents(
        sourceTree,
        node,
        (node: any, ancestors: Parent[]) => {
          ancestors.forEach((ancestor: Parent) => {
            closestHeadingNode = findBefore(ancestor, node, 'heading');
          });
        }
      );

      node = {
        ...node,
        data: {
          hProperties: {
            id: `schema--${schemaHeadingName}`,
          },
        },
        depth: closestHeadingNode ? (closestHeadingNode as any).depth + 1 : 1,
        type: 'heading',
        value: schemaHeadingName.split(' | ')
          .map((part: string) => part.trim())
          .join(' › '),
      };

      return node;
    }
  );

  const toc = generateTOC(newTree, {
    maxDepth: 6,
  });

  return getTableOfContents(toc.map, {});
};
