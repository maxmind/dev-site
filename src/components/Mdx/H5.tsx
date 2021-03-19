import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FaLink } from 'react-icons/fa';

import * as styles from './H5.module.scss';

const H5: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h5
    className={classNames(className, styles.h5)}
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
  </h5>
);

H5.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default H5;
