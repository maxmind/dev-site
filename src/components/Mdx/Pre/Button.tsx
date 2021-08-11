import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Button.module.scss';

interface IButton {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

const Button: React.FC<
  IButton & React.HTMLProps<HTMLButtonElement>
> = (props) => {
  const { children, className, isActive, ...rest } = props;

  return (
    <button
      className={classNames(
        className,
        styles.button,
        {
          [styles.active]: isActive,
        },
      )}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

export default Button;
