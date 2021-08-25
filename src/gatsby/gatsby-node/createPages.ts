import { CreatePagesArgs, GatsbyNode } from 'gatsby';

import createMdxPages from './pages/createMdxPages';

export const createPages: GatsbyNode['createPages'] = async (
  props: CreatePagesArgs
) => {
  await Promise.all([
    createMdxPages(props),
  ]);
};
