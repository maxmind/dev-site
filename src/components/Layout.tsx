/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */



import { graphql,useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import Header from './Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
      />
      <div
        className={styles.container}
      >
        <main>{children}</main>
        <footer>
          ©
          {' '}
          {new Date().getFullYear()}
          , Built with
          {' '}
          <a
            href="https://www.gatsbyjs.org"
          >
            Gatsby
          </a>
        </footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
