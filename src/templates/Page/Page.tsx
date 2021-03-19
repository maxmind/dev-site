import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

import Layout from '../../components/Layout/Layout';
import { h1 as H1, p as P } from '../../components/Mdx';
import { getNextPage, getPreviousPage } from '../../utils/pagination';
import { IPageContext } from './query';
import ReleaseNotesArchiveList from './ReleaseNotesArchiveList';
import TableOfContents from './TableOfContents';

import * as styles from './Page.module.scss';

interface IPage {
  children: React.ReactNode;
  pageContext: IPageContext;
}

const Page: React.FC<IPage> = (props) => {
  const {
    frontmatter,
    parent,
    customTableOfContents: tableOfContents,
  } = props.pageContext;
  const location = useLocation();
  const { description, keywords, title } = frontmatter;
  const { modifiedTime } = parent || {};

  let type;

  if (location.pathname.startsWith('/minfraud')) {
    type = 'minfraud';
  }

  if (location.pathname.startsWith('/geoip')) {
    type = 'geoip';
  }

  let isReleaseNotesPage = false;

  if (location.pathname.split('/')[2] === 'release-notes' && type) {
    isReleaseNotesPage = true;
  }

  const nextPage = getNextPage(location.pathname);
  const previousPage = getPreviousPage(location.pathname);

  return (
    <Layout
      description={description}
      keywords={keywords}
      title={title}
      type={type as 'minfraud' | 'geoip'}
    >
      <article
        className={classNames(styles.article, {
          [styles.releaseNotes]: isReleaseNotesPage,
        })}
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
        </header>

        <aside
          className={styles.aside}
        >
          { !isReleaseNotesPage &&
            tableOfContents &&
            tableOfContents.items?.length > 0 &&
            (
              <TableOfContents
                className={styles.tableOfContents}
                items={tableOfContents.items}
              />
            )}
          { isReleaseNotesPage &&
            <ReleaseNotesArchiveList
              className={styles.tableOfContents}
              type={type as 'minfraud' | 'geoip'}
            />
          }
        </aside>

        <section
          className={styles.content}
        >
          {props.children}

          {modifiedTime && (
            <P
              className={styles['last-updated']}
            >
              This page was last updated on
              {' '}
              {modifiedTime}
              .
            </P>
          )}
        </section>

        {(previousPage || nextPage) && (
          <footer
            className={styles.footer}
          >
            {previousPage && (
              <Link
                className={styles['footer-previous']}
                to={previousPage.to}
              >
                <FaArrowLeft
                  className={styles['footer-arrow']}
                />
                <span
                  className={styles['footer-direction']}
                >
                  Previous
                </span>
                <span
                  className={styles['footer-title']}
                >
                  {previousPage.title}
                </span>
              </Link>
            )}

            {nextPage && (
              <Link
                className={styles['footer-next']}
                to={nextPage.to}
              >
                <FaArrowRight
                  className={styles['footer-arrow']}
                />
                <span
                  className={styles['footer-direction']}
                >
                  Next
                </span>
                <span
                  className={styles['footer-title']}
                >
                  {nextPage.title}
                </span>
              </Link>
            )}
          </footer>
        )}
      </article>
    </Layout>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.any,
};

export default Page;
