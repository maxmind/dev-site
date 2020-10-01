import { CreatePagesArgs, GatsbyNode } from 'gatsby';

import createApiSpecPages from './pages/createApiSpecPages';
import createMdxPages from './pages/createMdxPages';

export const createPages: GatsbyNode['createPages'] = async (
  props: CreatePagesArgs
) => {
  await createMdxPages(props);
  await createApiSpecPages(props);
};
