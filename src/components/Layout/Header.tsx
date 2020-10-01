import PropTypes from 'prop-types';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
