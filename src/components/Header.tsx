import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Header.module.scss';

interface IHeader {
  siteTitle: string;
}

const Header: React.FC<IHeader> = ({ siteTitle }) => (
  <header
    className={styles.wrapper}
  >
    <div
      className={styles.container}
    >
      <h1
        className={styles.heading}
      >
        <Link
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
          to="/"
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
