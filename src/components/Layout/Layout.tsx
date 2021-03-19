/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Footer from './Footer';
import Header from './Header';
import SEO from './Seo';
import Sidebar from './Sidebar';

import * as styles from './Layout.module.scss';

interface ILayout {
  children: React.ReactNode;
  className?: string;
  description?: string;
  isSidebarOpen?: boolean;
  keywords?: string[];
  // TODO - Add proper typing for `tableOfContents'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableOfContents?: any;
  title: string;
  type?: 'geoip' | 'minfraud';
}

const Layout: React.FC<ILayout> = (props) => {
  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(props.isSidebarOpen);

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  const pageTypeClass: string | undefined = [
    'geoip',
    'minfraud',
  ].includes(props.type as string)
    ? `page-type--${props.type}`
    : undefined;

  return (
    <>
      <SEO
        bodyAttributes={{
          class: classNames(
            pageTypeClass,
            styles.layout,
          ),
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
          isSidebarOpen ? styles['sidebar--open'] : styles['sidebar--hidden']
        )}
      >
        <Sidebar />

        <main
          className={styles.content}
          id="content"
          tabIndex={-1}
        >
          {props.children}
        </main>
      </div>

      <Footer
        id="footer"
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  isSidebarOpen: PropTypes.bool,
  keywords: PropTypes.array,
  tableOfContents: PropTypes.any,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'geoip',
    'minfraud',
  ]),
};

export default Layout;
