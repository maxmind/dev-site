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

import styles from './Alert.module.scss';

interface IAlert {
  children: React.ReactNode,
  type: 'error' | 'info' | 'success' | 'warning',
}

const Alert: React.FC<IAlert> = (props) => {
  let Icon: IconType;

  switch(props.type) {
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
        props.type && styles[props.type],
      )}
    >
      <div
        className={styles['icon-wrapper']}
      >
        <Icon
          className={styles.icon}
        />
      </div>
      <div
        className={styles.content}
      >
        {props.children}
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
