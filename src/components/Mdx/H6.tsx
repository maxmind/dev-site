import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaLink } from 'react-icons/fa';

import * as styles from './H6.module.scss';

const H6: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h6
    className={classNames(className, styles.h6)}
    {...props}
  >
    <a
      // eslint-disable-next-line css-modules/no-undef-class
      className={styles.link}
      href={`#${props.id}`}
    >
      {props.children}
      <FaLink
        // eslint-disable-next-line css-modules/no-undef-class
        className={styles.icon}
      />
    </a>
  </h6>
);

H6.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default H6;
