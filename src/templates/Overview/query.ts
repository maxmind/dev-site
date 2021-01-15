/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../baseQuery';

export type IOverviewContext = Pick<IBaseQuery, 'frontmatter'> & {
  readonly frontmatter: {
    readonly icon: string;
    readonly subtitle: string;
  };
}

const query: QueryFn<IBaseQuery & IOverviewContext> = (
  graphql: GraphqlFn
) => graphql<IBaseQuery & IOverviewContext>(`
  ${BaseQuery}

  query OverviewTemplateQuery {
    allMdx(filter: {fields: {layout: {eq: "overviews"}}}) {
      nodes {
        ... BaseQuery
        frontmatter {
          subtitle
          icon
        }
      }
    }
  }
`);

export default query;
