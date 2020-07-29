import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => (
  <footer
    className={styles.footer}
  >
    &copy; 2012-
    {new Date().getFullYear()}
    {' '}
    MaxMind, Inc. All Rights Reserved.
  </footer>
);

export default Footer;
