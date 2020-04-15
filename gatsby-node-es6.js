
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

export const onCreateWebpackConfig = ({ actions, stage }) => {
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
              seo {
                description
                keywords
              }
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
