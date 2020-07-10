import React from 'react';
import ReactMarkdown from 'react-markdown';

import { a } from '../mdx';

const renderers = {
  link: a,
};

export const getRefAnchorLink = (ref: string): React.ReactElement => {
  const link = ref.replace('#/components/schemas/', '');
  console.log('1111', link);

  return (
    <a
      href={`#${link}`}
    >
      {link}
    </a>
  );
};

export const renderMarkdownElement = (content: string): React.ReactElement => {
  return (
    <ReactMarkdown
      renderers={renderers}
    >
      {content}
    </ReactMarkdown>
  );
};
