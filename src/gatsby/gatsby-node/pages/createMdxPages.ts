/* eslint-disable filenames/match-exported */
import { CreatePagesArgs } from 'gatsby';

interface INode {
  fileAbsolutePath: string;
  frontmatter: {
    description: string;
    draft: boolean;
    keywords: string[];
    title: string;
  };
  id: string;
  // TODO: Properly type parent object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parent: any;
  // TODO: Properly type table of contents object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableOfContents: any;
}

interface IQueryResult {
  allMdx: {
    edges: {
        node: INode;
    }[];
  };
}

const createMdxPages = async ( props: CreatePagesArgs): Promise<void> => {
  const { createPage } = props.actions;
  const result = await props.graphql<IQueryResult>(`
    query {
      allMdx {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              description
              keywords
              draft
            }
            id
            tableOfContents(maxDepth: 3)
            timeToRead
            parent {
              id
              ... on File {
                id
                modifiedTime(formatString: "MMMM D, YYYY", locale: "en-US")
                name
                relativeDirectory
                relativePath
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    props.reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
  }

  if (!result.data) {
    props.reporter.panicOnBuild('🚨 ERROR: Loading "createPages" query');
    throw new Error('🚨 ERROR: Loading "createPages" query');
  }

  const posts = result.data.allMdx.edges;

  posts.forEach(({ node }) => {
    if (
      process.env.gatsby_executing_command === 'develop'
      || !node.frontmatter.draft
    ) {
      const path = (node.parent.name === 'index')
        ? node.parent.relativeDirectory
        : `${node.parent.relativeDirectory}/${node.parent.name}`;

      createPage({
        component: node.fileAbsolutePath,
        context: node,
        path,
      });
    }
  });
};

export default createMdxPages;
