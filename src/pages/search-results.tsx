import { RouteUpdateArgs } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import H1 from '../components/Mdx/H1';
import SearchResult from '../components/SearchResult';
import googleSearch, { ISearchResults } from '../services/googleSearch';
import styles from './search-results.module.scss';


const SearchResultsPage: React.FC<RouteUpdateArgs> = (props) => {
  // eslint-disable-next-line react/prop-types
  const urlParams = new URLSearchParams(props.location.search);
  const query = urlParams.get('q') as string;
  const startIndex = urlParams.get('start');

  const setUrl = (startIndex: number): string => {
    // eslint-disable-next-line react/prop-types
    const urlParams = new URLSearchParams(props.location.search);
    urlParams.set('start', startIndex.toString());
    // eslint-disable-next-line react/prop-types
    return `${props.uri}?${urlParams.toString()}`;
  };

  const [
    results,
    setResults,
  ] = useState({} as ISearchResults);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        setResults(await googleSearch(query, startIndex));
      } catch {
        setResults({} as ISearchResults);
      }
      setIsLoading(false);
      window.scrollTo(0,0);
    };

    if (query) {
      fetchResults();
    }
  }, [
    query,
    startIndex,
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
        !isLoading && !results.items &&
        <div
          className={styles.wrapper}
        >
          <header
            className={styles.header}
          >
            <H1
              className={styles.heading}
            >
              No results found for
              {' '}
              <strong>{query}</strong>
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
          <nav
            className={styles.pagination}
          >
            {results.queries.previousPage &&
            <a
              className={styles.previous}
              href={setUrl(results.queries.previousPage[0].startIndex)}
            >
              Previous
            </a>
            }
            {results.queries.nextPage &&
            <a
              className={styles.next}
              href={setUrl(results.queries.nextPage[0].startIndex)}
            >
              Next
            </a>
            }
          </nav>
        </div>
      }
    </Layout>
  );};

export default SearchResultsPage;
