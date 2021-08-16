/* eslint-disable @typescript-eslint/no-var-requires */
import {
  CreateResolversArgs,
  GatsbyNode,
} from 'gatsby';

const genMDX = require('gatsby-plugin-mdx/utils/gen-mdx');

// eslint-disable-next-line max-len
import generateTableOfContents, { createImportPathMap } from './utils/get-toc-items';

const geoipImportPathMap = createImportPathMap(
  `${process.cwd()}/content/geoip/docs/web-services/_schemas`
);

const minFraudImportPathMap = createImportPathMap(
  `${process.cwd()}/content/minfraud/api-documentation/_schemas`
);

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
      tableOfContents: {
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

          if (mdxNode.fields.slug.startsWith('/minfraud')) {
            return generateTableOfContents(mdast, minFraudImportPathMap);
          }

          if (mdxNode.fields.slug.startsWith('/geoip')) {
            return generateTableOfContents(mdast, geoipImportPathMap);
          }

          return;
        },
        type: 'JSON',
      },
    },
  });
};
