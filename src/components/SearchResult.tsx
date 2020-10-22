import PropTypes from 'prop-types';
import React from 'react';

import styles from './SearchResult.module.scss';

interface ISearchResult {
  className?: string;
  snippet: string;
  title: string;
  url: string;
}

const SearchResult: React.FC<ISearchResult> = (props) => (
  <div
    className={props.className}
  >
    <h3>
      <a
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: props.title,
        }}
        href={props.url}
      />
    </h3>
    <small
      className={styles.url}
    >
      {props.url}
    </small>
    <span
      className={styles.snippet}
      dangerouslySetInnerHTML={{
        __html: props.snippet,
      }}
    />
  </div>
);

SearchResult.propTypes = {
  className: PropTypes.string,
  snippet: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default SearchResult;
