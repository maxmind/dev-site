import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import styles from './A.module.scss';

const A: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  className,
  children,
  href,
  ...props
}) => {
  // remark-external-links sets target='_blank'
  const isExternal = props.target === '_blank';

  return (
    <>
      { isExternal &&
        <a
          className={classNames(className, styles.a)}
          href={href}
          {...props}
        >
          {children}
          <FaExternalLinkAlt
            className={styles.icon}
          />
        </a>
      }
      { !isExternal &&
        <Link
          className={classNames(className, styles.a)}
          to={href || '#'}
        >
          {children}
        </Link>
      }
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
