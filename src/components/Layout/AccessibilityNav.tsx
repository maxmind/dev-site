import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from './AccessibilityNav.module.scss';

const AccessibilityNav: React.FC<React.HTMLProps<HTMLElement>> = (props) => (
  // eslint-disable-next-line jsx-a11y/no-access-key
  <section
    accessKey="/"
    aria-label="Page nagivation"
    className={classNames(
      styles.container,
      props.className,
    )}
    tabIndex={-1}
  >
    <ul
      aria-label="Page navigation menu"
      className={styles.list}
    >
      <li
        className={styles.listItem}
      >
        <a
          className={styles.link}
          href="#content"
        >
          Skip to content
        </a>
      </li>
      <li
        className={styles.listItem}
      >
        <a
          className={styles.link}
          href="#navigation"
        >
          Skip to navigation
        </a>
      </li>
      <li
        className={styles.listItem}
      >
        <a
          className={styles.link}
          href="#search"
        >
          Skip to search
        </a>
      </li>
      <li
        className={styles.listItem}
      >
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
