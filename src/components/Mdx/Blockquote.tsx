import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Blockquote.module.scss';

const Blockquote: React.FC<React.HTMLProps<HTMLQuoteElement>> = ({
  className,
  ...props
}) => (
  <div
    className={styles.wrapper}
  >
    <blockquote
      className={classNames(className, styles.blockquote)}
      {...props}
    >
      {props.children}
    </blockquote>
  </div>
);

Blockquote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Blockquote;
