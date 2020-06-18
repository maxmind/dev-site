import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './TableOfContents.module.scss';

interface IItem {
  items: IItem[];
  title: string;
  url: string;
}

export interface ITableOfContents {
  currentItem?: string;
  items: IItem[];
}

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
          styles.listItem,
          (currentItem && currentItem === item.url)
            ? styles['item--active'] : undefined
        )}
        key={`toc-item-${index}`}
      >
        <a
          href={item.url}
        >
          {item.title}
        </a>
        {item.items && renderItems(item.items, currentItem)}
      </li>
    ))}
  </ul>
);

const TableOfContents: React.FC<
  ITableOfContents & React.HTMLProps<HTMLElement>
> = (props) => {
  const { currentItem, items, ...rest } = props;
  return (
    <nav
      {...rest}
    >
      {renderItems(items, currentItem)}
    </nav>
  );
};

TableOfContents.propTypes = {
  currentItem: PropTypes.string,
  items: PropTypes.any,
};

export default TableOfContents;
