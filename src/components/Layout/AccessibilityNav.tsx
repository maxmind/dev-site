import * as React from 'react';

import styles from './AccessibilityNav.module.scss';

const AccessibilityNav: React.FC = () => (
  <div
    className={styles.container}
  >
    <nav
      aria-label="Accessibility Navigation"
      className={styles.nav}
    >
      <a
        className={styles.link}
        href="#content"
      >
        Skip to content
      </a>

      <a
        className={styles.link}
        href="#navigation"
      >
        Skip to navigation
      </a>

      <a
        className={styles.link}
        href="#search"
      >
        Skip to search
      </a>

      <a
        className={styles.link}
        href="#footer"
      >
        Skip to footer
      </a>
    </nav>
  </div>
);

export default AccessibilityNav;
