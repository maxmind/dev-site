import { sanitize } from 'dompurify';
import PropTypes from 'prop-types';
import React from 'react';

import Link from './Link';

import * as styles from './SearchResult.module.scss';

interface ISearchResult {
  className?: string;
  snippet: string;
  title: string;
  url: string;
}

const sanitizeOpts = {
  ALLOWED_TAGS: [
    'b',
  ],
};

const SearchResult: React.FC<ISearchResult> = (props) => (
  <article
    className={props.className}
  >
    <h2>
      <Link
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: sanitize(props.title, sanitizeOpts),
        }}
        to={props.url.replace('https://dev.maxmind.com/', '/')}
      />
    </h2>
    <small
      className={styles.url}
    >
      {props.url}
    </small>
    <p
      className={styles.snippet}
      dangerouslySetInnerHTML={{
        __html: sanitize(props.snippet, sanitizeOpts),
      }}
    />
  </article>
);

SearchResult.propTypes = {
  className: PropTypes.string,
  snippet: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SearchResult;
