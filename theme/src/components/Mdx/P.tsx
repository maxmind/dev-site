import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './P.module.scss';

const P: React.FC<React.HTMLProps<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={classNames(className, styles.p)}
    {...props}
  >
    {props.children}
  </p>
);

P.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default P;
