import classNames from 'classnames';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import styles from './SearchBar.module.scss';

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
    navigate(`/search-results/?q=${searchQuery}`);
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchQuery(urlParams.get('q') as string);
  }, [
    window.location.search
  ]);

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
        onSubmit={handleSubmit}
        role="search"
      >
        <FaSearch
          className={styles.mag}
        />
        <input
          className={styles.input}
          defaultValue={searchQuery}
          name='q'
          onBlur={() => setIsMobileOpen(false)}
          onChange={handleChange}
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

SearchBar.propTypes = {
  className: PropTypes.string,
};

export default SearchBar;
