/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../baseQuery';
import { ITableOfContents } from './TableOfContents';

export type IPageContext = IBaseQuery & {
  readonly customTableOfContents: ITableOfContents;
  readonly parent: {
    readonly modifiedTime: string;
  };
  readonly timeToRead: number;
};

const query: QueryFn<IPageContext> = (graphql: GraphqlFn) =>
  graphql<IPageContext>(`
    ${BaseQuery}

    query PageTemplateQuery {
      allMdx(filter: { fields: { layout: { eq: "pages" } } }) {
        nodes {
          ...BaseQuery
          customTableOfContents(maxDepth: 4)
          timeToRead
          parent {
            ... on File {
              modifiedTime(formatString: "MMMM D, YYYY", locale: "en-US")
            }
          }
        }
      }
    }
  `);

export default query;
