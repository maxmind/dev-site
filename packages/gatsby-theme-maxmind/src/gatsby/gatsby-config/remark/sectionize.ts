import GithubSlugger from 'github-slugger';
import toString from 'mdast-util-to-string';
// eslint-disable-next-line import/no-unresolved
import { Parent } from 'unist';
import visitParents, { Visitor } from 'unist-util-visit-parents';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const findAfter = require('unist-util-find-after');

const MAX_HEADING_DEPTH = 6;

const slugger = new GithubSlugger();

type TransformFn = (tree: any) => void;

const transform: TransformFn = (tree: any) => {
  slugger.reset();

  for (let depth = MAX_HEADING_DEPTH; depth > 0; depth--) {
    visitParents(
      tree,
      (node: any) => node.type === 'heading' && node.depth === depth,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      visitor as Visitor<any>,
    );
  }
};

const visitor = (node: any, ancestors: Parent[]) => {
  const data = node.data || (node.data = {});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = data.hProperties || (data.hProperties = {}) as any;

  props.id = props.id
    ? slugger.slug(props.id, true)
    : slugger.slug(toString(node));

  const start = node;
  const depth = start.depth as number;
  const parent = ancestors[ancestors.length - 1];

  const isEnd = (node: any) => node.type === 'heading'
    && (node.depth as number) <= depth || node.type === 'export';

  const end = findAfter(parent, start, isEnd);

  const startIndex = parent.children.indexOf(start);
  const endIndex = parent.children.indexOf(end);

  const section = {
    children: parent.children.slice(
      startIndex,
      endIndex > 0 ? endIndex : undefined
    ),
    data: {
      hName: 'div',
      hProperties: {
        id: `toc-${props.id}`,
      },
    },
    depth: depth,
    type: 'div',
  };

  parent.children.splice(startIndex, section.children.length, section);
};

export default (): TransformFn => transform;
