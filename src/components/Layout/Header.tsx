import PropTypes from 'prop-types';
import React from 'react';
import { FaBars } from 'react-icons/fa';

import Logo from '../../assets/svgs/maxmind-logo.svg';
import styles from './Header.module.scss';
import SearchBar from './SearchBar';

interface IHeader {
  isSidebarOpen?: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<IHeader> = (props) => {
  const { isSidebarOpen, toggleSidebar } = props;
  return (
    <header
      className={styles.header}
    >
      <nav
        className={styles.nav}
      >
        <a
          aria-label="Home"
          className={styles.logo}
          href="/"
        >
          <Logo />
        </a>
        <SearchBar
          className={styles.search}
        />
        <button
          aria-label={isSidebarOpen ? 'Open menu' : 'Close menu'}
          className={styles.toggle}
          onClick={toggleSidebar}
        >
          <FaBars
            aria-hidden="true"
          />
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
