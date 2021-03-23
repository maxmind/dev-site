import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Table.module.scss';

const Table: React.FC<React.HTMLProps<HTMLTableElement>> = ({
  className,
  ...props
}) => (
  <div
    className={styles.wrapper}
  >
    <div
      className={styles.container}
    >
      <table
        className={classNames(className, styles.table)}
        {...props}
      >
        {props.children}
      </table>
    </div>
  </div>
);

Table.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Table;
