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
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import SEO from '../Seo';
import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';
import Sidebar from './Sidebar';

interface ILayout {
  children: React.ReactNode;
  className?: string;
  description?: string;
  keywords?: string[];
  tableOfContents?: any;
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

      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={classNames(
          styles.main,
          !isSidebarOpen ? styles['sidebar--hidden'] : ''
        )}
      >
        <Sidebar />

        <main
          className={styles.content}
        >
          {props.children}
        </main>
      </div>

      <Footer />
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
