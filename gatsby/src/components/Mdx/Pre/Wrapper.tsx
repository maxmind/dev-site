import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Wrapper.module.scss';

interface IWrapper {
  children?: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<IWrapper> = (props) => {
  return (
    <div
      className={classNames(
        props.className,
        styles.wrapper,
      )}
    >
      {props.children}
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Wrapper;
