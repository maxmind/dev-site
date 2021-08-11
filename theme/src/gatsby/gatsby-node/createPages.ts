import { CreatePagesArgs, GatsbyNode } from 'gatsby';

import createApiSpecPages from './pages/createApiSpecPages';
import createMdxPages from './pages/createMdxPages';

export const createPages: GatsbyNode['createPages'] = async (
  props: CreatePagesArgs
) => {
  await Promise.all([
    createMdxPages(props),
    createApiSpecPages(props),
  ]);
};
