import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Article.module.scss';
import H1 from './mdx/H1';
import TableOfContents, { ITableOfContents } from './TableOfContents';

interface IArticle {
  children: React.ReactNode;
  tableOfContents?: ITableOfContents;
  title: string;
}

const Article: React.FC<IArticle & React.HTMLProps<HTMLElement>> = (props) => {
  const { children, className, tableOfContents, title, ...rest } = props;
  // TODO: Get current item based on scroll/anchor position
  const currentItem = '#redshift-is-hard';
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
      </header>
      {tableOfContents && (
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
  tableOfContents: PropTypes.any,
  title: PropTypes.string.isRequired,
};

export default Article;
