import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Article.module.scss';
import H1 from './Mdx/H1';
import TableOfContents, { ITableOfContents } from './TableOfContents';

interface IArticle {
  children: React.ReactNode;
  lastUpdated: string;
  tableOfContents?: ITableOfContents;
  timeToRead: number;
  title: string;
}

const Article: React.FC<IArticle & React.HTMLProps<HTMLElement>> = (props) => {
  const {
    children,
    className,
    lastUpdated,
    tableOfContents,
    timeToRead,
    title,
    ...rest
  } = props;
  // TODO: Get current item based on scroll/anchor position
  const currentItem = '#data-warehousing-h3';

  const formattedLastUpdated = new Date(
    Date.parse(lastUpdated)
  );

  return (
    <article
      className={classNames(className, styles.article)}
      data-plugin-header="line-numbers"
      {...rest}
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
      {tableOfContents && tableOfContents.items?.length > 0 && (
        <aside
          className={styles.aside}
        >
          <TableOfContents
            className={styles.tableOfContents}
            currentItem={currentItem}
            items={tableOfContents.items}
          />
        </aside>
      )}
      <section
        className={styles.content}
      >
        {children}
      </section>
    </article>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  lastUpdated: PropTypes.string.isRequired,
  tableOfContents: PropTypes.any,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Article;
