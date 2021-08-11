import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Strong.module.scss';

const Strong: React.FC<React.HTMLProps<HTMLElement>> = ({
  className,
  ...props
}) => (
  <strong
    className={classNames(className, styles.strong)}
    {...props}
  >
    {props.children}
  </strong>
);

Strong.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Strong;
