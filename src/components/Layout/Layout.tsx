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

import Footer from './Footer';
import Header from './Header';
import styles from './Layout.module.scss';
import SEO from './Seo';
import Sidebar from './Sidebar';

interface ILayout {
  children: React.ReactNode;
  className?: string;
  description?: string;
  keywords?: string[];
  // TODO - Add proper typing for `tableOfContents'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableOfContents?: any;
  title: string;
  type?: 'geoip' | 'geolite' | 'minfraud';
}

const Layout: React.FC<ILayout> = (props) => {
  const [
    isSidebarOpen,
    setIsSidebarOpen,
  ] = useState(false);

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  const className: string | undefined = [
    'geoip',
    'geolite',
    'minfraud',
  ].includes(props.type as string)
    ? `page-type--${props.type}`
    : undefined;

  return (
    <>
      <SEO
        bodyAttributes={{
          class: className,
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
  type: PropTypes.oneOf([
    'geoip',
    'geolite',
    'minfraud',
  ]),
};

export default Layout;
