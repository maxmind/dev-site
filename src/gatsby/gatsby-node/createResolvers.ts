/* eslint-disable @typescript-eslint/no-var-requires */
import {
  CreateResolversArgs,
  GatsbyNode,
} from 'gatsby';

const genMDX = require('gatsby-plugin-mdx/utils/gen-mdx');

import generateTableOfContents from '../../utils/get-toc-items';

export const createResolvers: GatsbyNode['createResolvers'] = async(
  args: CreateResolversArgs,
): Promise<any> => {
  const {
    createResolvers,
    store,
  } = args;

  const plugins = store.getState().flattenedPlugins;

  const mdxPlugin = plugins.find(
    (plugin: any) => plugin.name === 'gatsby-plugin-mdx'
  );

  const processMDX = ({ node }: any) =>
    genMDX({
      ...args,
      node,
      options: mdxPlugin.pluginOptions,
    });

  createResolvers({
    Mdx: {
      customTableOfContents: {
        args: {
          maxDepth: {
            default: 6,
            type: 'Int',
          },
        },
        async resolve(mdxNode: any) {
          const { mdast } = await processMDX({
            node: mdxNode,
          });

          return generateTableOfContents(mdast);
        },
        type: 'JSON',
      },
    },
  });
};
