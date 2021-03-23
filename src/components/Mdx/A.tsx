import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import * as styles from './A.module.scss';

const A: React.FC<React.HTMLProps<HTMLAnchorElement>> = (props) => {
  const { className, children, href, target, ...rest } = props;
  let isEmail = false;

  // remark-external-links sets target='_blank'
  const isExternal = target === '_blank';

  if (href) {
    isEmail = href.startsWith('mailto');
  }

  return (
    <>
      { (isExternal || isEmail) &&
        <a
          className={classNames(className, styles.a)}
          href={href}
          target={target}
          {...rest}
        >
          {children}

          {!isEmail && (
            <FaExternalLinkAlt
              className={styles.icon}
            />
          )}
        </a>
      }
      { !isExternal && !isEmail && (
        <Link
          className={classNames(className, styles.a)}
          to={href || '#'}
        >
          {children}
        </Link>
      )}
    </>
  );
};

A.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
};

export default A;
