import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../assets/svgs/open-in-new-window.svg';
import styles from './A.module.scss';

const A: React.FC<React.HTMLProps<HTMLAnchorElement>> = ({
  className,
  ...props
}) => (
  <a
    className={classNames(className, styles.a)}
    {...props}
  >
    {props.children}
    {props.target === '_blank' && (
      <Icon />
    )}
  </a>
);

A.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
};

export default A;
