/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../fragments';
import { ITableOfContents } from './TableOfContents';

export type IPageContext = IBaseQuery & {
  readonly parent: {
    readonly modifiedTime: string;
  };
  readonly tableOfContents: ITableOfContents;
  readonly timeToRead: number;
}

const query: QueryFn<IPageContext> = (
  graphql: GraphqlFn
) => graphql<IPageContext>(`
  ${BaseQuery}

  query PageTemplateQuery {
    allMdx(filter: {fields: {layout: {eq: "pages"}}}) {
      nodes {
        ... BaseQuery
        tableOfContents(maxDepth: 3)
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
