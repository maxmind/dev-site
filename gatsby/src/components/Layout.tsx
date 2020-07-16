/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import 'normalize.css';
import 'typeface-montserrat';
import 'typeface-roboto';
import 'typeface-source-code-pro';

import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import SEO from '../components/Seo';
import styles from './Layout.module.scss';
import { ITableOfContents } from './TableOfContents';

interface ILayout {
  children: React.ReactNode;
  className?: string;
  description?: string;
  keywords?: string[];
  tableOfContents?: ITableOfContents;
  title: string;
}

const Layout: React.FC<ILayout> = (props) => {
  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(false);

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <SEO
        bodyAttributes={{
          class: props.className,
        }}
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

      <header
        className={styles.header}
      >
        <button
          aria-label={isSidebarOpen ? 'Open menu' : 'Close menu'}
          className={styles.toggle}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <FaArrowLeft
              aria-hidden="true"
            />
          ) : (
            <FaArrowRight
              aria-hidden="true"
            />
          )}
        </button>
      </header>

      <main
        className={classNames(
          styles.main,
          !isSidebarOpen ? styles['sidebar--hidden'] : ''
        )}
      >
        <section
          className={styles.sidebar}
        >
          <nav
            className={styles.sidebarNav}
          >
            <ul>
              <li
                className={styles.sidebarNavItem}
              >
                <Link
                  className={styles.sidebarNavLink}
                  to="pages/longform-example"
                >
                  Longform Example
                </Link>
              </li>
              <li
                className={styles.sidebarNavItem}
              >
                <Link
                  className={styles.sidebarNavLink}
                  to="api-reference/minfraud"
                >
                  minFraud Api Reference
                </Link>
              </li>
              <li
                className={styles.sidebarNavItem}
              >
                <Link
                  className={styles.sidebarNavLink}
                  to="api-reference/geoip"
                >
                  GeoIP Api Reference
                </Link>
              </li>
              <li
                className={styles.sidebarNavItem}
              >
                <Link
                  className={styles.sidebarNavLink}
                  to="api-reference/other"
                >
                  Other page
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        <div
          className={styles.content}
        >
          {props.children}
        </div>
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
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.array,
  tableOfContents: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default Layout;
