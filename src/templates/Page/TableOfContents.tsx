import { useLocation } from '@reach/router';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../components/Link';
import useActiveHeading from '../../hooks/useActiveHeading';

import * as styles from './TableOfContents.module.scss';

export interface IItem {
  items: IItem[];
  title: string;
  url: string;
}

export interface ITableOfContents {
  heading?: string;
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

const isActive = (url: string, pathname: string, currentItem?: string) => {
  if (
    url === pathname
    || (
      currentItem && (
        currentItem === `toc-${url.slice(1)}`
        || currentItem === url.slice(1)
      )
    )
  ) {
    return true;
  }

  return false;
};

const renderItems = (
  items: IItem[],
  pathname: string,
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
            isActive(item.url, pathname, currentItem)
              ? styles['item__active'] : undefined
          )}
          data-item-number={itemNumber}
          key={`toc-item-${index}`}
        >
          <Link
            to={item.url}
          >
            {title}
          </Link>
          {item.items && renderItems(item.items, pathname, currentItem)}
        </li>
      );
    })}
  </ul>
);

const TableOfContents: React.FC<
  ITableOfContents & React.HTMLProps<HTMLElement>
> = (props) => {
  const { heading, items, ...rest } = props;

  const pathname = useLocation().pathname;
  const itemIds = getIds(items);
  const currentItem = useActiveHeading(itemIds);

  return (
    <nav
      {...rest}
    >
      <span
        className={styles.heading}
      >
        {heading || 'On this Page'}
      </span>
      {renderItems(items, pathname, currentItem)}
    </nav>
  );
};

TableOfContents.propTypes = {
  heading: PropTypes.string,
  items: PropTypes.any,
};

export default TableOfContents;
