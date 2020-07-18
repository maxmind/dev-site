import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';
import { FaBookOpen,
  FaBroadcastTower,
  FaGlobe,
  FaShieldAlt } from 'react-icons/fa';

import styles from './Sidebar.module.scss';

interface IItem {
  icon?: React.ReactElement;
  items?: IItem[];
  title: string;
  to?: string;
  url?: string;
}

const items: IItem[] = [
  {
    icon: <FaBroadcastTower />,
    title: 'Longform Example',
    to: '/pages/longform-example',
  },
  {
    icon: <FaGlobe />,
    title: 'GeoIP',
    url: '/api-reference/geoip',
  },
  {
    icon: <FaShieldAlt />,
    title: 'minFraud',
    to: '/api-reference/minfraud',
  },
  {
    icon: <FaBookOpen />,
    title: 'Other Docs',
    to: '/api-reference/other',
  },
];

const renderItems = (
  items: IItem[],
  currentItem?: string,
): React.ReactElement => (
  <ul
    className={styles.list}
  >
    {items.map((item, index) => (
      <li
        className={classNames(
          styles.item,
          (currentItem && currentItem === item.url)
            ? styles['item--active'] : undefined
        )}
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

        {item.items && renderItems(item.items, currentItem)}
      </li>
    ))}
  </ul>
);

const Sidebar: React.FC = () => {
  return (
    <section
      className={styles.sidebar}
    >
      <nav
        className={styles.nav}
      >
        {renderItems(items)}
      </nav>
    </section>
  );
};

export default Sidebar;
