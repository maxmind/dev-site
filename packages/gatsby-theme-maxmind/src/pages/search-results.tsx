/* eslint-disable react/prop-types */

import { globalHistory } from '@reach/router';
import { RouteUpdateArgs } from 'gatsby';
import React, { useEffect, useState } from 'react';

import Layout from '../components/Layout/Layout';
import Link from '../components/Link';
import Loading from '../components/Loading';
import H1 from '../components/Mdx/H1';
import SearchResult from '../components/SearchResult';
import GoogleSearch, { ISearchResults } from '../services/GoogleSearch';

import * as styles from './search-results.module.scss';

type queryValue = number | string | undefined;

const SearchResultsPage: React.FC<RouteUpdateArgs> = (props) => {
  const urlParams = new URLSearchParams(props.location.search);

  const getQueryUrl = (param: string, q: queryValue): string => {
    if (!q) {
      return '';
    }

    const urlParams = new URLSearchParams(props.location.search);
    urlParams.set(param, q.toString());

    return `${props.uri}?${urlParams.toString()}`;
  };

  const [
    query,
    setQuery,
  ] = useState(urlParams.get('q') as string);

  const [
    startIndex,
    setStartIndex,
  ] = useState(urlParams.get('start') as string);

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
    globalHistory.listen((history) => {
      const historyParams = new URLSearchParams(history.location.search);
      setQuery(historyParams.get('q') as string);
      setStartIndex(historyParams.get('start') as string);
      props.location.search = history.location.search;
    });
  });

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
        isLoading && query &&
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
            { results.spelling &&
              <p>
                Try searching for
                {' '}
                <a
                  className={styles.spellingLink}
                  href={
                    getQueryUrl('q', results.spelling.correctedQuery)
                  }
                >
                  {results.spelling?.correctedQuery}
                </a>
              </p>
            }
          </header>
        </div>

      }

      {
        // We found stuff
        !isLoading && results.items && query &&
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
              <Link
                className={styles.previous}
                omitLangQuery={true}
                to={getQueryUrl(
                  'start',
                  results.queries.previousPage[0].startIndex
                )}
              >
                Previous
              </Link>
            }
            {results.queries.nextPage &&
              <Link
                className={styles.next}
                omitLangQuery={true}
                to={
                  getQueryUrl('start', results.queries.nextPage[0].startIndex)
                }
              >
                Next
              </Link>
            }
          </nav>
        </div>
      }
    </Layout>
  );};

export default SearchResultsPage;
