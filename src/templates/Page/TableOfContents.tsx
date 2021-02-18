import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import useActiveHeading from '../../hooks/useActiveHeading';

import styles from './TableOfContents.module.scss';

export interface IItem {
  items: IItem[];
  title: string;
  url: string;
}

export interface ITableOfContents {
  items: IItem[];
}

const getIds = (
  items: IItem[]
): string[] => items.reduce((accumulator: string[], item: IItem) => {
  const itemIds = item.items ? getIds(item.items) : [];

  return [
    ...accumulator,
    item.url.slice(1),
    ...itemIds,
  ];
}, []);

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
      const regex = new RegExp(/^(\d+)\.\s+([\s|\w|\W]*)$/);
      const matches = title.match(regex);

      if (matches) {
        itemNumber = `${matches[1]}. `;
        title = matches[2];
      }

      return (
        <li
          className={classNames(
            styles.listItem,
            (currentItem && currentItem === `toc-${item.url.slice(1)}`)
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
  const { items, ...rest } = props;

  const itemIds = getIds(items);
  const currentItem = useActiveHeading(itemIds);

  return (
    <nav
      {...rest}
    >
      <span
        className={styles.heading}
      >
        On this Page
      </span>
      {renderItems(items, currentItem)}
    </nav>
  );
};

TableOfContents.propTypes = {
  items: PropTypes.any,
};

export default TableOfContents;
