import { CreateNodeArgs, GatsbyNode } from 'gatsby';

export const onCreateNode: GatsbyNode['onCreateNode'] = (
  args: CreateNodeArgs,
) => {
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
