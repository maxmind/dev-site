/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import 'normalize.css';

import PropTypes from 'prop-types';
import React from 'react';

import SEO from '../components/Seo';
import Header from './Header';
import styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
  description?: string;
  keywords?: string[];
  title: string;
}

const Layout: React.FC<ILayout> = (props) => (
  <>
    <SEO
      description={props.description}
      meta={[
        ...(props.keywords ? [
          {
            content: props.keywords.join(', '),
            name: 'keywords',
          },
        ] : []),
      ]}
      title={props.title}
    />

    <Header />

    <main
      className={styles.main}
    >
      <h1>{props.title}</h1>
      {props.children}
    </main>

    <footer
      className={styles.footer}
    >
      &copy; 2012-
      {new Date().getFullYear()}
      {' '}
      MaxMind, Inc. All Rights Reserved.
    </footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default Layout;
