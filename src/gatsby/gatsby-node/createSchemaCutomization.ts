import { CreatePagesArgs, GatsbyNode } from 'gatsby';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  async ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter!
    }
    type MdxFrontmatter {
      image: String
    }
  `;
    createTypes(typeDefs);
  };
