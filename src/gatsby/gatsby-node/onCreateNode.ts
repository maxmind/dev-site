import { CreateNodeArgs, GatsbyNode } from 'gatsby';
import { createFilePath } from 'gatsby-source-filesystem';

const addLayoutField = (args: CreateNodeArgs): void => {
  const { actions, getNode, node } = args;
  const { createNodeField } = actions;

  if (node?.internal?.type === 'Mdx') {
    const parentId = node?.parent;

    if (!parentId) {
      return;
    }

    const parentNode = getNode(parentId);

    createNodeField({
      name: 'layout',
      node,
      value: parentNode.sourceInstanceName,
    });
  }
};

const addSlugField = (args: CreateNodeArgs): void => {
  const { actions, getNode, node } = args;
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({
      getNode,
      node,
      trailingSlash: false,
    });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
  }

};

export const onCreateNode: GatsbyNode['onCreateNode'] = (
  args: CreateNodeArgs,
) => {
  addLayoutField(args);
  addSlugField(args);
};
