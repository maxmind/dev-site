export interface IBaseQuery {
  fields: {
    slug: string;
  };
  fileAbsolutePath: string;
  frontmatter: {
    description: string;
    draft: boolean;
    image: string;
    keywords: string[];
    title: string;
  };
}

export const BaseQuery = `
  fragment BaseQuery on Mdx {
    fields {
      slug
    }
    fileAbsolutePath
    frontmatter {
      title
      description
      image
      keywords
      draft
    }
  }
`;
