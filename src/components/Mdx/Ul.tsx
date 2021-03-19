import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Ul.module.scss';

const Ul: React.FC<React.HTMLProps<HTMLUListElement>> = ({
  className,
  ...props
}) => (
  <ul
    className={classNames(className, styles.ul)}
    {...props}
  >
    {props.children}
  </ul>
);

Ul.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Ul;
