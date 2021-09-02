import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import * as React from 'react';

interface ILink extends Omit<GatsbyLinkProps<Record<string, unknown>>,'ref'> {
  omitLangQuery?: boolean;
}

const queryString = '?lang=en';

const addQueryString = (path: string, omitLangQuery?: boolean) => {
  if (path.includes(queryString) || omitLangQuery) {
    return path;
  }
  if (path.includes('#')) {
    const hashIdx = path.lastIndexOf('#');
    return path.substring(0, hashIdx) + queryString + path.substring(hashIdx);
  }

  return path + '?lang=en';
};

const Link: React.FC<ILink> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { omitLangQuery, to, ...rest } = props;
  return (
    <GatsbyLink
      {...rest}
      // eslint-disable-next-line react/prop-types
      to={addQueryString(to, omitLangQuery)}
    />
  );
};

export default Link;
