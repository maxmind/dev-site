import { MDXProvider } from '@mdx-js/react';
import React from 'react';

import * as components from '../components/Mdx';

export const renderMarkdown = (
  content: React.ReactNode
): React.ReactElement => {
  return (
    <MDXProvider
      components={components}
    >
      {content}
    </MDXProvider>
  );
};
