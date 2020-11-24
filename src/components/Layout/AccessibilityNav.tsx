import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import styles from './AccessibilityNav.module.scss';

const AccessibilityNav: React.FC<React.HTMLProps<HTMLElement>> = (props) => (
  <section
    aria-label="Page nagivation"
    className={classNames(
      styles.container,
      props.className,
    )}
  >
    <ul
      aria-label="Page navigation menu"
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
  </section>
);

AccessibilityNav.propTypes = {
  className: PropTypes.string,
};

export default AccessibilityNav;
