import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import * as React from 'react';

const queryString = '?lang=en';

const addQueryString = (path: string) => {
  if (path.includes(queryString)) {
    return path;
  }
  if (path.includes('#')) {
    const hashIdx = path.lastIndexOf('#');
    return path.substring(0, hashIdx) + queryString + path.substring(hashIdx);
  }

  return path + '?lang=en';
};

const Link: React.FC<Omit<GatsbyLinkProps<Record<string, unknown>>,'ref'>> =
  props => {
    return (
      <GatsbyLink
        {...props}
        // eslint-disable-next-line react/prop-types
        to={addQueryString(props.to)}
      />
    );
  };

export default Link;
