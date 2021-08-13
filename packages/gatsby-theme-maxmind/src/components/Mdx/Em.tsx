import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Em.module.scss';

const Em: React.FC<React.HTMLProps<HTMLElement>> = ({
  className,
  ...props
}) => (
  <em
    className={classNames(className, styles.em)}
    {...props}
  >
    {props.children}
  </em>
);

Em.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Em;
