import React from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

import * as styles from './SystemsStatusIcons.module.scss';

export const OperationalIcon: React.FC = () => (
  <FaCheckCircle
    className={styles.operational}
  />
);

export const WarningIcon: React.FC = () => (
  <FaExclamationTriangle
    className={styles.warning}
  />
);
