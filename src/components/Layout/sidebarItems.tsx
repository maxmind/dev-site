import React from 'react';
import {
  FaGlobe,
  FaShieldAlt,
} from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './Sidebar.module.scss';

export interface IItem {
  className?: string;
  icon?: React.ReactElement;
  items?: IItem[];
  secondaryItems?: IItem[];
  title: string;
  to?: string;
  url?: string;
}

export const sidebarItems: IItem[] = [
  {
    icon: <FaShieldAlt />,
    items: [
      {
        title: 'Setup',
        to: '/minfraud/setup',
      },
      {
        title: 'Evaluate a transaction',
        to: '/minfraud/evaluate-a-transaction',
      },
      {
        title: 'Handle Chargebacks',
        to: '/minfraud/handle-chargebacks',
      },
      {
        title: 'Set a disposition',
        to: '/minfraud/set-a-disposition',
      },
      {
        className: styles['item-divider'],
        secondaryItems: [
          {
            items: [
              {
                className: styles['item-attribute'],
                title: 'account',
                to: '/minfraud/api-reference#Request__account',
              },
              {
                className: styles['item-attribute'],
                title: 'billing',
                to: '/minfraud/api-reference#Request__billing',
              },
              {
                className: styles['item-attribute'],
                title: 'credit_card',
                to: '/minfraud/api-reference#Request__credit_card',
              },
              {
                className: styles['item-attribute'],
                title: '...',
                to: '#',
              },
            ],
            title: 'Request',
            to: '/minfraud/api-reference#Request',
          },
          {
            items: [
              {
                items: [
                  {
                    className: styles['item-attribute'],
                    title: 'disposition',
                    to: '/minfraud/api-reference#Response_Score__disposition',
                  },
                  {
                    className: styles['item-attribute'],
                    title: 'funds_remaining',
                    to: '/minfraud/api-reference#Response_Score__funds_remaining',
                  },
                  {
                    className: styles['item-attribute'],
                    title: 'id',
                    to: '/minfraud/api-reference#Response_Score__',
                  },
                  {
                    className: styles['item-attribute'],
                    title: '...',
                    to: '#',
                  },
                ],
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
