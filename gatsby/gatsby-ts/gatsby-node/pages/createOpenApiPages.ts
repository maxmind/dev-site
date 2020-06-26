/* eslint-disable filenames/match-exported */
import { CreatePagesArgs } from 'gatsby';
import path from 'path';

const createOpenApiPages = async (props: CreatePagesArgs): Promise<void> => {
  props.actions.createPage({
    component: path.resolve('src/templates/OpenApi.tsx'),
    context: {
    },
    path: 'openapi',
  });
};

export default createOpenApiPages;
