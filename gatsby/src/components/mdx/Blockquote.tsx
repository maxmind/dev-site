import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Blockquote.module.scss';

const Blockquote: React.FC<React.HTMLProps<HTMLQuoteElement>> = ({
  className,
  ...props
}) => (
  <blockquote
    className={classNames(className, styles.blockquote)}
    {...props}
  >
    {props.children}
  </blockquote>
);

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Blockquote;
