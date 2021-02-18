import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { FaExternalLinkAlt as ExternalLinkIcon } from 'react-icons/fa';

import navigation from '../../../content/navigation';
import {
  IItem,
  isInternalItem,
} from '../../types/Item';

import styles from './Sidebar.module.scss';

const renderItems = (
  items: IItem[],
  currentPath: string,
  level = 0
): React.ReactElement => (
  <ul
    className={classNames(
      styles.list,
      styles[`list--level${level}`]
    )}
  >
    {items.map((item, index) => {
      let isItemActive = false;
      let isItemCurrent = false;

      if (isInternalItem(item)) {
        isItemActive = currentPath.startsWith(item.to);
        isItemCurrent = currentPath === item.to;
      }

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
              [styles['item--current']]: isItemCurrent,
              [styles['item--has-divider']]: item.hasDivider,
            },
          )}
          data-current-path={currentPath}
          data-item-to={isInternalItem(item) && item.to}
          key={`sidebar-item-${index}`}
        >
          {isInternalItem(item) ? (
            <>
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

              {item.items && renderItems(item.items, currentPath, level + 1)}

              {isItemActive
                && item.secondaryItems
                && renderItems(item.secondaryItems, currentPath, level + 1)
              }
            </>
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
              <ExternalLinkIcon
                className={styles['external-link-icon']}
              />
            </a>
          )}
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
