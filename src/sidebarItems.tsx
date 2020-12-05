/* eslint-disable no-prototype-builtins */
import React from 'react';
import {
  FaGlobe,
  FaShieldAlt,
} from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './components/Layout/Sidebar.module.scss';

interface IBaseItem {
  className?: string;
  icon?: React.ReactElement;
  items?: IItem[];
  secondaryItems?: IItem[];
  title: string;
}

export interface IInternalItem extends IBaseItem {
  to: string;
}

export interface IExternalItem extends IBaseItem {
  url: string;
}

export type IItem = IExternalItem | IInternalItem;

export const isInternalItem = (
  item:  IItem
): item is IInternalItem => item.hasOwnProperty('to');

export const sidebarItems: IItem[] = [
  {
    icon: <FaShieldAlt />,
    items: [
      {
        title: 'Evaluate a Transaction',
        to: '/minfraud/evaluate-a-transaction',
      },
      {
        title: 'Report a transaction',
        to: '/minfraud/report-a-transaction',
      },
      {
        title: 'Track Fraudsters',
        to: '/minfraud/track-fraudsters',
      },
      {
        className: styles['item-divider'],
        secondaryItems: [
          {
            items: [
              {
                title: 'Authentication',
                to: '#',
              },
              {
                title: 'Endpoints',
                to: '#',
              },
            ],
            title: 'Requests',
            to: '/minfraud/api-reference#Request',
          },
          {
            items: [
              {
                title: 'Score',
                to: '/minfraud/api-reference#Response_Score',
              },
              {
                title: 'Factors',
                to: '/minfraud/api-reference#Response_Factors',
              },
              {
                title: 'Insights',
                to: '/minfraud/api-reference#Response_Insights',
              },
            ],
            title: 'Responses',
            to: '#',
          },
          {
            title: 'Models',
            to: '#',
          },
        ],
        title: 'API Reference',
        to: '/minfraud/api-reference',
      },
      {
        title: 'Release Notes',
        to: '/minfraud/release-notes',
      },
    ],
    title: 'minFraud',
    to: '/minfraud',
  },
  {
    icon: <FaGlobe />,
    items: [
      {
        title: 'Setup',
        to: '/geoip2/setup',
      },
      {
        title: 'Geolocate an IP',
        to: '/geoip2/geolocate-an-ip',
      },
      {
        title: 'Updating the database',
        to: '/geoip2/updating-the-database',
      },
      {
        className: styles['item-divider'],
        title: 'API Reference',
        to: '/geoip2/api-reference',
      },
      {
        title: 'CSV Databases',
        to: '/geoip2/csv-databases',
      },
      {
        title: 'Release Notes',
        to: '/geoip2/release-notes',
      },
      {
        title: 'Migrating from GeoIP Legacy',
        to: '/geoip2/migrating-from-geoip-legacy',
      },
    ],
    title: 'GeoIP2',
    to: '/geoip2',
  },
  {
    icon: <FiGlobe />,
    items: [
      {
        title: 'Setup',
        to: '/geolite2/setup',
      },
      {
        title: 'Geolocate an IP',
        to: '/geolite2/geolocate-an-ip',
      },
      {
        title: 'Updating the database',
        to: '/geolite2/updating-the-database',
      },
      {
        className: styles['item-divider'],
        title: 'API Reference',
        to: '/geolite2/api-reference',
      },
      {
        title: 'Release Notes',
        to: '/geolite2/release-notes',
      },
    ],
    title: 'GeoLite2',
    to: '/geolite2',
  },
];
