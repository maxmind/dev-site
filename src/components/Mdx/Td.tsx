import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Td.module.scss';

const Td: React.FC<React.HTMLProps<HTMLTableDataCellElement>> = ({
  className,
  ...props
}) => (
  <td
    className={classNames(className, styles.td)}
    {...props}
  >
    {props.children}
  </td>
);

Td.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Td;
