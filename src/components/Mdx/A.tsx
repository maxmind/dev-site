import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import Link from '../Link';

import * as styles from './A.module.scss';

const A: React.FC<React.HTMLProps<HTMLAnchorElement>> = (props) => {
  const { className, children, href, target, ...rest } = props;
  let isEmail = false;
  let targetHref = href;

  // remark-external-links sets target='_blank'
  const isExternal = target === '_blank';

  if (targetHref) {
    isEmail = targetHref.startsWith('mailto');

    // Get rid of trailing non-alpha characters like commas and periods.
    if (isEmail && targetHref.slice(targetHref.length -1).match(/[^a-z]/i)) {
      targetHref = targetHref.slice(0, -1);
    }
  }

  return (
    <>
      { (isExternal || isEmail) &&
        <a
          className={classNames(className, styles.a)}
          href={targetHref}
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
          to={targetHref || '#'}
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
