import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { IconType } from 'react-icons';

import * as styles from './Button.module.scss';

interface IButton {
  icon: IconType;
  title: string;
}

const Button: React.FC<
  IButton & React.HTMLProps<HTMLButtonElement>
> = (props) => {
  const { className, icon: Icon, ...rest } = props;

  return (
    <button
      className={classNames(
        className,
        styles.button,
      )}
      {...rest}
      type="button"
    >
      <Icon />
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
