/* eslint-disable filenames/match-exported */
import { BaseQuery, IBaseQuery } from '../../fragments';

export type IHomeContext = IBaseQuery;

const query: QueryFn<IHomeContext> = (
  graphql: GraphqlFn
) => graphql<IHomeContext>(`
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
