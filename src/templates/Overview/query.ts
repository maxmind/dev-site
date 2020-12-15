/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../fragments';

export type IOverviewContext = IBaseQuery & {
  readonly frontmatter: {
    readonly subtitle: string;
  };
}

const query: QueryFn<IOverviewContext> = (
  graphql: GraphqlFn
) => graphql<IOverviewContext>(`
  ${BaseQuery}

  query OverviewTemplateQuery {
    allMdx(filter: {fields: {layout: {eq: "overviews"}}}) {
      nodes {
        ... BaseQuery
        frontmatter {
          subtitle
        }
      }
    }
  }
`);

export default query;
