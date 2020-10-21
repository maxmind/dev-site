import classNames from 'classnames';
import React from 'react';

import Layout from '../components/Layout/Layout';
import H1 from '../components/Mdx/H1';
import SearchResult from '../components/SearchResult';
import styles from './search-results.module.scss';

const results = [
  {
    cacheId: 'foo',
    htmlSnippet: 'this is a snippet',
    htmlTitle: 'this is a title',
    link: 'https://www.maxmind.com',
  },
  {
    cacheId: 'foo1',
    htmlSnippet: 'this is a snippet1',
    htmlTitle: 'this is a title1',
    link: 'https://www.maxmind.com/1',
  },
];

const SearchResultsPage: React.FC = () => {
  const query = new URLSearchParams(window.location.search).get('q');

  return (
    <Layout
      className={styles.layout}
      title="Search Results"
    >
      <div
        className={styles.wrapper}
      >
        <header
          className={styles.header}
        >
          {query && query.length > 0 &&
          <>
            <H1
              className={styles.heading}
            >
              Search results for
              {' '}
              <strong
                className={styles.query}
              >
                {query}
              </strong>
            </H1>
            <small
              className={styles.count}
            >
              Displaying results 21-30 of 100
            </small>
          </>
          }
          {
            !query &&
            <>
              <H1
                className={styles.heading}
              >
                Please enter a search query
              </H1>
            </>
          }
        </header>
        <div
          className={styles.results}
        >
          {
            results.map((result) => {
              return (
                <SearchResult
                  className={styles.result}
                  key={result.cacheId}
                  snippet={result.htmlSnippet}
                  title={result.htmlTitle}
                  url={result.link}
                />
              );
            })
          }
        </div>
      </div>
    </Layout>
  );};

export default SearchResultsPage;
