import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Ol.module.scss';

// Using React.HTMLProps<HTMLOListElement> throws an error
const Ol: React.FC<React.HTMLAttributes<HTMLOListElement>> = ({
  className,
  ...props
}) => (
  <ol
    className={classNames(className, styles.ol)}
    {...props}
  >
    {props.children}
  </ol>
);

Ol.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Ol;
