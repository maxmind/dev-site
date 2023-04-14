import { GatsbyLinkProps, Link as GatsbyLink } from 'gatsby';
import * as React from 'react';

type ILink = Omit<GatsbyLinkProps<Record<string, unknown>>,'ref'>

const Link: React.FC<ILink> = (props) => {
  const { to, ...rest } = props;

  return (
    <GatsbyLink
      {...rest}
      to={to}
    />
  );
};

export default Link;
