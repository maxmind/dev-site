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
  hasSidebar?: boolean,
  isSidebarOpen?: boolean;
  keywords?: string[];
  title: string;
  type?: 'geoip' | 'minfraud';
}

const Layout: React.FC<ILayout> = (props) => {
  const {
    className,
    children,
    description,
    hasSidebar,
    isSidebarOpen: sidebarState,
    keywords,
    title,
    type,
  } = props;

  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(sidebarState);

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  const pageTypeClass: string | undefined = [
    'geoip',
    'minfraud',
  ].includes(type as string)
    ? `page-type--${type}`
    : undefined;

  return (
    <div
      className={classNames(
        styles.container,
        className,
      )}
    >
      <SEO
        bodyAttributes={{
          class: classNames(
            pageTypeClass,
          ),
        }}
        description={description}
        meta={[
          ...(keywords ? [
            {
              content: keywords.join(', '),
              name: 'keywords',
            },
          ] : []),
        ]}
        title={title}
      />

      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className={classNames(
          styles.main,
          isSidebarOpen ? styles['sidebar__open'] : styles['sidebar__hidden'],
          {
            [styles['main__hasSidebar']]: hasSidebar,
          }
        )}
      >
        <Sidebar />

        <main
          className={styles.content}
          id="content"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>

      <Footer
        id="footer"
      />
    </div>
  );
};

Layout.defaultProps = {
  hasSidebar: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  description: PropTypes.string,
  hasSidebar: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  keywords: PropTypes.array,
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'geoip',
    'minfraud',
  ]),
};

export default Layout;
