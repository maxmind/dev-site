import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Thead.module.scss';

const Thead: React.FC<React.HTMLProps<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => (
  <thead
    className={classNames(className, styles.thead)}
    {...props}
  >
    {props.children}
  </thead>
);

Thead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Thead;
