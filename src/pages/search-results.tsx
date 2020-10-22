import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import H1 from '../components/Mdx/H1';
import SearchResult from '../components/SearchResult';
import googleSearch, { ISearchResults } from '../services/googleSearch';
import styles from './search-results.module.scss';

const SearchResultsPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q') as string;

  const [
    results,
    setResults,
  ] = useState({} as ISearchResults);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setResults(await googleSearch(query));
      } catch {
        setResults({} as ISearchResults);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [
    query,
  ]);


  return (
    <Layout
      title="Search Results"
    >
      {
        !query &&
        <div
          className={styles.wrapper}
        >
          <header
            className={styles.header}
          >
            <H1
              className={styles.heading}
            >
              Please enter a search query
            </H1>
          </header>
        </div>
      }

      {
        results.items &&
        <div
          className={styles.wrapper}
        >
          <header
            className={styles.header}
          >
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
                Displaying results
                {' '}
                {results.queries.request[0].startIndex}
                -
                {results.queries.request[0].startIndex
                + results.queries.request[0].count
                - 1}
                {' '}
                of
                {' '}
                {results.queries.request[0].totalResults}
              </small>
            </>
          </header>
          <div
            className={styles.results}
          >
            {
              results.items?.map((result) => {
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
      }
    </Layout>
  );};

export default SearchResultsPage;
