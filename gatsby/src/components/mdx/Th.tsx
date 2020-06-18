import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Th.module.scss';

const Th: React.FC<React.HTMLProps<HTMLTableDataCellElement>> = ({
  className,
  ...props
}) => (
  <th
    className={classNames(className, styles.th)}
    {...props}
  >
    {props.children}
  </th>
);

Th.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Th;
