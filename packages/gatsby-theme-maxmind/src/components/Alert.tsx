import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { IconType } from 'react-icons';
import {
  FaCheck,
  FaExclamation,
  FaInfo,
  FaTimes,
} from 'react-icons/fa';

// eslint-disable-next-line css-modules/no-unused-class
import * as styles from './Alert.module.scss';

interface IAlert {
  children: React.ReactNode,
  type: 'error' | 'info' | 'success' | 'warning',
}

const Alert: React.FC<IAlert> = (props) => {
  const { children, type } = props;
  let Icon: IconType;

  switch(type) {
  case 'error':
    Icon = FaTimes;
    break;
  case 'success':
    Icon = FaCheck;
    break;
  case 'warning':
    Icon = FaExclamation;
    break;
  case 'info':
    Icon = FaInfo;
    break;
  }

  return (
    <div
      className={classNames(
        styles.alert,
        // eslint-disable-next-line security/detect-object-injection
        type && styles[type],
      )}
    >
      <div
        className={styles.iconWrapper}
      >
        <Icon
          className={styles.icon}
        />
      </div>
      <div
        className={styles.content}
      >
        {children}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  type: 'info',
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf([
    'error',
    'info',
    'success',
    'warning',
  ] as const).isRequired,
};

export default Alert;
