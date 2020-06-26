import { CreatePagesArgs, GatsbyNode } from 'gatsby';

import createMdxPages from './pages/createMdxPages';
import createOpenApiPages from './pages/createOpenApiPages';

export const createPages: GatsbyNode['createPages'] = async (
  props: CreatePagesArgs
) => {
  await createMdxPages(props);
  await createOpenApiPages(props);
};
