import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Code.module.scss';

const Code: React.FC<React.HTMLProps<HTMLElement>> = ({
  className,
  ...props
}) => (
  <code
    className={classNames(className, styles.code)}
    {...props}
  >
    {props.children}
  </code>
);

Code.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Code;
