import { Link } from 'gatsby';
import React from 'react';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <section
      className={styles.sidebar}
    >
      <nav
        className={styles.nav}
      >
        <ul>
          <li
            className={styles.navItem}
          >
            <Link
              className={styles.navItemLink}
              to="/pages/longform-example"
            >
              Longform Example
            </Link>
          </li>
          <li
            className={styles.navItem}
          >
            <Link
              className={styles.navItemLink}
              to="/api-reference/minfraud"
            >
              minFraud Api Reference
            </Link>
          </li>
          <li
            className={styles.navItem}
          >
            <Link
              className={styles.navItemLink}
              to="/api-reference/geoip"
            >
              GeoIP Api Reference
            </Link>
          </li>
          <li
            className={styles.navItem}
          >
            <Link
              className={styles.navItemLink}
              to="/api-reference/other"
            >
              Other page
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
