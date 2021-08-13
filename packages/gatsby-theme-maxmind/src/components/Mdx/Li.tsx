import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Li.module.scss';

const Li: React.FC<React.HTMLAttributes<HTMLLIElement>> = ({
  className,
  ...props
}) => (
  <li
    className={classNames(className, styles.li)}
    {...props}
  >
    {props.children}
  </li>
);

Li.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Li;
