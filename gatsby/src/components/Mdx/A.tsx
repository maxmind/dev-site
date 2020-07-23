import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './A.module.scss';

const A: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  className,
  ...props
}) => (
  <a
    className={classNames(className, styles.a)}
    {...props}
  >
    {props.children}
  </a>
);

A.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default A;
