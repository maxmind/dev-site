/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../baseQuery';

export type IHomeContext = Pick<IBaseQuery, 'frontmatter'>;

const query: QueryFn<IBaseQuery & IHomeContext> = (
  graphql: GraphqlFn
) => graphql<IBaseQuery & IHomeContext>(`
  ${BaseQuery}

  query PageTemplateQuery {
    allMdx(filter: {fields: {layout: {eq: "home"}}}) {
      nodes {
        ... BaseQuery
      }
    }
  }
`);

export default query;
