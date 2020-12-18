/* eslint-disable filenames/match-exported */
// import * as React from 'react';

import { BaseQuery, IBaseQuery } from '../../fragments';

export type IOverviewContext = IBaseQuery & {
  readonly frontmatter: {
    readonly icon: string;
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
          icon
        }
      }
    }
  }
`);

export default query;
