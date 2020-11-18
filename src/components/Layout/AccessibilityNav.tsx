import * as React from 'react';

import styles from './AccessibilityNav.module.scss';

const AccessibilityNav: React.FC = () => (
  <div
    className={styles.container}
  >
    <ul
      aria-label="Accessibility Navigation"
    >
      <li>
        <a
          className={styles.link}
          href="#content"
        >
          Skip to content
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          href="#navigation"
        >
          Skip to navigation
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          href="#search"
        >
          Skip to search
        </a>
      </li>
      <li>
        <a
          className={styles.link}
          href="#footer"
        >
          Skip to footer
        </a>
      </li>
    </ul>
  </div>
);

export default AccessibilityNav;
