/* eslint-disable filenames/match-exported */
import { CreatePagesArgs } from 'gatsby';

import { IBaseQuery } from '../../../baseQuery';
import homeQuery from '../../../templates/Home/query';
import overviewQuery from '../../../templates/Overview/query';
import pageQuery from '../../../templates/Page/query';

const queries = [
  homeQuery,
  overviewQuery,
  pageQuery,
];

const createMdxPages = async (args: CreatePagesArgs): Promise<any> => {
  const { actions, graphql, reporter } = args;
  const { createPage } = actions;

  return Promise.all(
    queries.map(async (query) => {
      const result = await query(graphql);

      if (result.errors) {
        reporter.panicOnBuild('🚨 ERROR: error!');
        console.log(result.errors);
        throw new Error(`🚨 ERROR: Loading "${query.name}" query`);
      }

      if (!result.data) {
        reporter.panicOnBuild('🚨 ERROR: No data!');
        throw new Error('🚨 ERROR: No data!');
      }

      result.data.allMdx.nodes.forEach((node: IBaseQuery) => {
        if (
          process.env.gatsby_executing_command === 'develop'
          || !node.frontmatter.draft
        ) {
          createPage({
            component: node.fileAbsolutePath,
            context: node,
            path: node.fields.slug,
          });
        }
      });
    })
  );
};

export default createMdxPages;
