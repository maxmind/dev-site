import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './H1.module.scss';

const H1: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h1
    className={classNames(className, styles.h1)}
    {...props}
  >
    {props.children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default H1;
