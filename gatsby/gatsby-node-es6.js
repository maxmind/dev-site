/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import path from 'path';

export const onCreateWebpackConfig = ({ actions, stage }) => {
  /**
   * In the development environment, we want eslint to parse files on change and
   * output any issues to console.
   */
  if (stage === 'develop') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            exclude: /(node_modules|cache|public)/,
            test: /\.(js|json|md|mdx|ts|tsx)$/,
            use: [
              {
                loader: 'eslint-loader',
              },
            ],
          },
        ],
      },
    });
  }

  /**
   * Ensure that correct packages are resolved when running Gatsby. This happens
   * because this project uses Yarn workspaces. Some packages that have
   * dependencies on others try to resolve them in the wrong places. The module
   * resolution below makes the dependency paths explicit rather than implicit.
   */
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@mdx-js/react': path.resolve(
          __dirname,
          './node_modules/@mdx-js/react'
        ),
        react: path.resolve(__dirname, './node_modules/react'),
      },
    },
  });
};

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              description
              keywords
            }
            id
            tableOfContents
            parent {
              id
              ... on File {
                id
                name
                relativeDirectory
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }) => {
    createPage({
      component: node.fileAbsolutePath,
      context: {
        id: node.id,
      },
      path: `${node.parent.relativeDirectory}/${node.parent.name}`,
    });
  });
};
