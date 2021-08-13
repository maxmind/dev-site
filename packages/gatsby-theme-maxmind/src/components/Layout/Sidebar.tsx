import { useLocation } from '@reach/router';
import classNames from 'classnames';
import React from 'react';
import { FaExternalLinkAlt as ExternalLinkIcon } from 'react-icons/fa';

import navigation from '../../../content1/navigation';
import {
  IItem,
  isInternalItem,
} from '../../types/Item';
import Link from '../Link';

import * as styles from './Sidebar.module.scss';

const renderItems = (
  items: IItem[],
  currentPath: string,
  level = 0
): React.ReactElement => (
  <ul
    className={classNames(
      styles.list,
      styles[`list__level${level}`]
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
            styles.itemIcon,
          ),
        });
      }

      return (
        <li
          className={classNames(
            styles.item,
            {
              [styles['item__active']]: isItemActive,
              [styles['item__current']]: isItemCurrent,
              [styles['item__hasDivider']]: item.hasDivider,
            },
          )}
          data-current-path={currentPath}
          data-item-to={isInternalItem(item) && item.to}
          key={`sidebar-item-${index}`}
        >
          {isInternalItem(item) ? (
            <>
              <Link
                className={styles.itemLink}
                to={item.to}
              >
                {item.icon}
                <span>
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
              className={styles.itemLink}
              href={item.url}
            >
              {item.icon}
              <span>
                {item.title}
              </span>
              <ExternalLinkIcon
                className={styles.externalLinkIcon}
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
  let pathname = useLocation().pathname;

  if (pathname.slice(pathname.length -1) === '/') {
    pathname = pathname.slice(0, -1);
  }

  return (
    <section
      className={styles.sidebar}
    >
      <nav
        className={styles.nav}
        id="navigation"
      >
        {renderItems(navigation, pathname)}
      </nav>
    </section>
  );
};

export default Sidebar;
