import PropTypes from 'prop-types';
import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import Logo from '../../assets/svgs/maxmind-logo.svg';
import useSystemStatus from '../../hooks/useSystemStatus';
import Link from '../Link';
import AccessibilityNav from './AccessibilityNav';
import SearchBar from './SearchBar';

import * as styles from './Header.module.scss';

interface IHeader {
  isSidebarOpen?: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<IHeader> = (props) => {
  const systemStatus = useSystemStatus();
  const { isSidebarOpen, toggleSidebar } = props;
  return (
    <>
      <AccessibilityNav
        className={styles.accessibilityNav}
      />
      {systemStatus && systemStatus.class !== 'operational' && (
        <div
          className={styles.systemStatus}
        >
          <div
            className={styles['systemStatus__content']}
          >
            {systemStatus.icon}
            {' '}
            {systemStatus.title}
            {' - '}
            {systemStatus.message}
            {' '}
            <a
              href="https://status.maxmind.com"
            >
              More info &raquo;
            </a>
          </div>
        </div>
      )}
      <header
        className={styles.header}
      >
        <div
          className={styles.nav}
        >
          <Link
            aria-label="Home"
            className={styles.logo}
            to="/"
          >
            <Logo
              className={styles['logo__svg']}
            />
            <span
              aria-label="Developers"
              className={styles['logo__siteName']}
            >
              Dev
              <span
                className={styles.eloper}
              >
                eloper
              </span>
              s
            </span>
          </Link>
          <SearchBar
            className={styles.search}
          />
          <button
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            className={styles.toggle}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <FaTimes
                aria-hidden="true"
              />
            ) : (
              <FaBars
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
