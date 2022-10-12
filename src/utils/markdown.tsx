import { MDXProvider } from '@mdx-js/react';
import MDX from '@mdx-js/runtime';
import React from 'react';

import * as components from '../components/Mdx';

export const renderMarkdown = (
  content: any
): React.ReactElement => {
  return (
    /* eslint-disable-next-line max-len */
    /* @ts-expect-error: @type for @mdx-js/react has implicit children which is incompat with react 18 */
    <MDXProvider
      components={components}
    >
      <MDX>
        {content}
      </MDX>
    </MDXProvider>
  );
};
