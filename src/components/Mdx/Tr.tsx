import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Tr.module.scss';

const Tr: React.FC<React.HTMLProps<HTMLTableRowElement>> = ({
  className,
  ...props
}) => (
  <tr
    className={classNames(className, styles.tr)}
    {...props}
  >
    {props.children}
  </tr>
);

Tr.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Tr;
