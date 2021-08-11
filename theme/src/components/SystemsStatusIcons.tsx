import React from 'react';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
} from 'react-icons/fa';

import * as styles from './SystemsStatusIcons.module.scss';

export const OperationalIcon: React.FC = () => (
  <FaCheckCircle
    className={styles.operational}
  />
);

export const DegradedPerformanceIcon: React.FC = () => (
  <FaExclamationTriangle
    className={styles.degradedPerformance}
  />
);

export const PartialServiceDisruptionIcon: React.FC = () => (
  <FaExclamationTriangle
    className={styles.partialServiceDisruption}
  />
);

export const ServiceDisruptionIcon: React.FC = () => (
  <FaExclamationTriangle
    className={styles.serviceDisruption}
  />
);

export const SecurityEventIcon: React.FC = () => (
  <FaShieldAlt
    className={styles.securityEvent}
  />
);
