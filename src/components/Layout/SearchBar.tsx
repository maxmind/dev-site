import classNames from 'classnames';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import * as styles from './SearchBar.module.scss';

interface ISearchBar {
  className?: string;
}

const SearchBar: React.FC<ISearchBar> = (props) => {
  const [
    isMobileOpen,
    setIsMobileOpen,
  ] = useState(false);

  const [
    searchQuery,
    setSearchQuery,
  ] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const toggleMobileOpen = (): void => {
    setIsMobileOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = ((event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search-results?q=${searchQuery}`);
  });

  let locationSearch: string;

  if (typeof window !== 'undefined') {
    locationSearch = window.location.search;
  } else {
    locationSearch = '';
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(locationSearch);
    setSearchQuery(urlParams.get('q') as string);
  }, [
    locationSearch,
  ]);

  return (
    <div
      className={props.className}
    >
      <form
        action="/search-results"
        className={classNames(
          styles.searchbar,
          isMobileOpen && styles['searchbar__mobileOpen']
        )}
        onSubmit={handleSubmit}
        role="search"
      >
        <FaSearch
          className={styles.mag}
        />
        <input
          aria-label="Search"
          className={styles.input}
          defaultValue={searchQuery}
          id="search"
          name='q'
          onBlur={() => setIsMobileOpen(false)}
          onChange={handleChange}
          placeholder="Search"
          ref={inputRef}
          type="search"
        />
        <input
          aria-label="Submit"
          className={styles.hidden}
          type="submit"
        />
      </form>
      <div
        className={styles.searchMobile}
      >
        <button
          aria-label="Show search bar"
          className={styles.mobileButton}
          onClick={toggleMobileOpen}
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
};

export default SearchBar;
