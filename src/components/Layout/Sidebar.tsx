import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import navigation from '../../../content/navigation';
import {
  IItem,
  isInternalItem,
} from '../../types/Item';
import styles from './Sidebar.module.scss';

const renderItems = (
  items: IItem[],
  currentPath?: string,
): React.ReactElement => (
  <ul
    className={styles.list}
  >
    {items.map((item, index) => {
      const isItemActive = (
        currentPath && isInternalItem(item) && currentPath.startsWith(item.to)
      );

      if (item.icon) {
        item.icon = React.cloneElement(item.icon, {
          className: classNames(
            styles['item-icon'],
          ),
        });
      }

      return (
        <li
          className={classNames(
            styles.item,
            {
              [styles['item--active']]: isItemActive,
              [styles['item--has-divider']]: item.hasDivider,
            },
          )}
          data-current-path={currentPath}
          data-item-to={isInternalItem(item) && item.to}
          key={`sidebar-item-${index}`}
        >
          {isInternalItem(item) ? (
            <Link
              className={styles['item-link']}
              to={item.to}
            >
              {item.icon}
              <span
                className={styles['item-title']}
              >
                {item.title}
              </span>
            </Link>
          ) : (
            <a
              className={styles['item-link']}
              href={item.url}
            >
              {item.icon}
              <span
                className={styles['item-title']}
              >
                {item.title}
              </span>
              <FaExternalLinkAlt
                className={styles['item-external-link']}
              />
            </a>
          )}

          {isInternalItem(item)
            && item.items
            && renderItems(item.items, currentPath)
          }

          {isItemActive
            && isInternalItem(item)
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
        id="navigation"
      >
        {renderItems(navigation, location.pathname)}
      </nav>
    </section>
  );
};

export default Sidebar;
