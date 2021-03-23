import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Del.module.scss';

const Del: React.FC<React.HTMLProps<HTMLElement>> = ({
  className,
  ...props
}) => (
  <del
    className={classNames(className, styles.del)}
    {...props}
  >
    {props.children}
  </del>
);

Del.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Del;
