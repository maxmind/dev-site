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
    {items.map((item, index) => {
      let itemNumber;
      let { title } = item;
      const regex = new RegExp(/^(\d+)\.\s+([\s|\w]*)$/);
      const matches = title.match(regex);

      if (matches) {
        itemNumber = `${matches[1]}. `;
        title = matches[2];
      }

      return (
        <li
          className={classNames(
            styles.listItem,
            (currentItem && currentItem === item.url)
              ? styles['item--active'] : undefined
          )}
          data-item-number={itemNumber}
          key={`toc-item-${index}`}
        >
          <a
            href={item.url}
          >
            {title}
          </a>
          {item.items && renderItems(item.items, currentItem)}
        </li>
      );
    })}
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
      <span
        className={styles.heading}
      >
        Table of Contents
      </span>
      {renderItems(items, currentItem)}
    </nav>
  );
};

TableOfContents.propTypes = {
  currentItem: PropTypes.string,
  items: PropTypes.any,
};

export default TableOfContents;
