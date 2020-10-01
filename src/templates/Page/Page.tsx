import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../components/Layout/Layout';
import H1 from '../../components/Mdx/H1';
import styles from './Page.module.scss';
import TableOfContents, { ITableOfContents } from './TableOfContents';

interface IPage {
  children: React.ReactNode;
  pageContext: {
    readonly frontmatter: {
      readonly description: string;
      readonly keywords: string[];
      readonly title: string;
    };
    readonly itemTotal: number;
    readonly page: number;
    readonly pageTotal: number;
    readonly parent: {
      modifiedTime: string;
    };
    readonly prefix: string;
    readonly tableOfContents: ITableOfContents;
    readonly timeToRead: number;
  };
}

const Page: React.FC<IPage> = (props) => {
  const {
    frontmatter,
    parent,
    tableOfContents,
    timeToRead,
  } = props.pageContext;
  const location = useLocation();
  const { description, keywords, title } = frontmatter;
  const { modifiedTime } = parent;

  // TODO: Get current item based on scroll/anchor position
  const currentItem = '#data-warehousing-h3';

  const formattedLastUpdated = new Date(
    Date.parse(modifiedTime)
  );

  let type;

  if (location.pathname.startsWith('/minfraud')) {
    type = 'minfraud';
  }

  if (location.pathname.startsWith('/geoip2')) {
    type = 'geoip';
  }

  if (location.pathname.startsWith('/geolite2')) {
    type = 'geolite';
  }

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
      type={type as 'minfraud' | 'geoip'}
    >
      <article
        className={styles.article}
        data-plugin-header="line-numbers"
      >
        <header
          className={styles.header}
        >
          <H1
            className={styles.heading}
          >
            {title}
          </H1>
          <div
            className={styles.meta}
          >
            ~
            {timeToRead}
            {' '}
            minute read
            {' '}
            &bull;
            {' '}
            last updated
            {' '}
            {formattedLastUpdated.toLocaleDateString('en-US')}
          </div>
        </header>

        <aside
          className={styles.aside}
        >
          {tableOfContents && tableOfContents.items?.length > 0 && (
            <TableOfContents
              className={styles.tableOfContents}
              currentItem={currentItem}
              items={tableOfContents.items}
            />
          )}
        </aside>

        <section
          className={styles.content}
        >
          {props.children}
        </section>
      </article>
    </Layout>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Page;
