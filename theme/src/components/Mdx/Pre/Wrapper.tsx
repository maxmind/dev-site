import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Wrapper.module.scss';

interface IWrapper {
  children?: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<IWrapper> = (props) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={classNames(
        className,
        styles.wrapper,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Wrapper;
