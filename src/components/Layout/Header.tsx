import PropTypes from 'prop-types';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Logo from '../../assets/svgs/maxmind-logo.svg';
import styles from './Header.module.scss';

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
      <nav className={styles.nav}>
        <a className={styles.logo} href="/">
          <Logo />
        </a>
        <input className={styles.searchBar} placeholder="Search" type="search" />
      </nav>
      <button
        aria-label={isSidebarOpen ? 'Open menu' : 'Close menu'}
        className={styles.toggle}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <FaArrowLeft
            aria-hidden="true"
          />
        ) : (
          <FaArrowRight
            aria-hidden="true"
          />
        )}
      </button>
    </header>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
