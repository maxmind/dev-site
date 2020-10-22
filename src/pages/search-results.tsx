import { RouteUpdateArgs } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import Loading from '../components/Loading';
import H1 from '../components/Mdx/H1';
import SearchResult from '../components/SearchResult';
import GoogleSearch, { ISearchResults } from '../services/GoogleSearch';
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
  ] = useState(true);

  const [
    hasError,
    setHasError,
  ] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      window.scrollTo(0,0);
      try {
        setHasError(false);
        setIsLoading(true);
        setResults(await GoogleSearch(query, startIndex));
      } catch {
        setHasError(true);
      }
      setIsLoading(false);
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
        // Loading
        isLoading &&
        <div
          className={styles.loading}
        >
          <Loading />
        </div>
      }

      {
        // No Query
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
        // There's a server error
        hasError &&
        <div
          className={styles.wrapper}
        >
          <header
            className={styles.header}
          >
            <H1
              className={styles.heading}
            >
              There was an issue performing the search.
            </H1>
            <p>
              Please try again.
            </p>
          </header>
        </div>
      }

      {
        // There's no search results
        !isLoading && !hasError && !results.items && query &&
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
        // We found stuff
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
