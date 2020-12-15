import { MDXProvider } from '@mdx-js/react';
import MDX from '@mdx-js/runtime';
import React from 'react';

import * as components from '../components/Mdx';

export const renderMarkdown = (
  content: React.ReactNode
): React.ReactElement => {
  return (
    <MDXProvider
      components={components}
    >
      <MDX>
        {content}
      </MDX>
    </MDXProvider>
  );
};
