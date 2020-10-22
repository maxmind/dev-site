import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import styles from './SearchBar.module.scss';

interface ISearch {
  className?: string;
}

const Search: React.FC<ISearch> = (props) => {
  const [
    isMobileOpen,
    setIsMobileOpen,
  ] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleMobileOpen = (): void => {
    setIsMobileOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };

  return (
    <div
      className={props.className}
    >
      <form
        action="/search-results"
        className={classNames(
          styles.searchbar,
          isMobileOpen && styles['searchbar--mobile-open']
        )}
        role="search"
      >
        <FaSearch
          className={styles.mag}
        />
        <input
          className={styles.input}
          name='q'
          onBlur={() => setIsMobileOpen(false)}
          placeholder="Search"
          ref={inputRef}
          type="search"
        />
      </form>
      <div
        className={styles['search-mobile']}
      >
        <button
          className={styles['mobile-button']}
          onClick={toggleMobileOpen}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
