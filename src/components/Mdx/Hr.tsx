import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Hr.module.scss';

const Hr: React.FC<React.HTMLProps<HTMLHRElement>> = ({
  className,
  ...props
}) => (
  <hr
    className={classNames(className, styles.hr)}
    {...props}
  />
);

Hr.propTypes = {
  className: PropTypes.string,
};

export default Hr;
