import React from 'react';
import ReactMarkdown from 'react-markdown';

import { a } from '../../../components/Mdx';

const components = {
  link: a,
};

const NameRegex = new RegExp('\\.', 'g');

export const getRefAnchorLink = (ref: string): React.ReactElement => {
  const link = ref.replace('#/components/schemas/', '');
  const id = link.replace(NameRegex, '_');

  return (
    <a
      href={`#${id}`}
    >
      {link}
    </a>
  );
};

export const renderMarkdownElement = (content: string): React.ReactElement => {
  return (
    <ReactMarkdown
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};
