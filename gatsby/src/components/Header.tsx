import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
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
            className={styles.headingLink}
            to="/"
          >
            {data.site.siteMetadata.title}
          </Link>
        </h1>

        <nav
          className={styles.nav}
        >
          <Link
            className={styles.link}
            to="/pages/hello-world"
          >
            Hello World
          </Link>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
