import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Sidebar.module.scss';
import { IItem, sidebarItems } from './sidebarItems';

const renderItems = (
  items: IItem[],
  currentPath?: string,
): React.ReactElement => (
  <ul
    className={styles.list}
  >
    {items.map((item, index) => {
      const isItemActive = (
        currentPath && item.to && currentPath.startsWith(item.to)
      );

      return (
        <li
          className={classNames(
            styles.item,
            {
              [styles['item--active']]: isItemActive,
            },
            item.className,
          )}
          data-current-path={currentPath}
          data-item-to={item.to}
          key={`sidebar-item-${index}`}
        >
          {item.to ? (
            <Link
              className={styles['item-link']}
              to={item.to}
            >
              {item.icon}
              {item.title}
            </Link>
          ) : (
            <a
              className={styles['item-link']}
              href={item.url}
            >
              {item.icon}
              {item.title}
            </a>
          )}

          {item.items && renderItems(item.items, currentPath)}
          {isItemActive
              && item.secondaryItems
              && renderItems(item.secondaryItems, currentPath)
          }

        </li>
      );
    }
    )}
  </ul>
);


const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <section
      className={styles.sidebar}
    >
      <nav
        className={styles.nav}
      >
        {renderItems(sidebarItems, location.pathname)}
      </nav>
    </section>
  );
};

export default Sidebar;
