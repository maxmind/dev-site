import React from 'react';

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
