import React from 'react';

import styles from '../src/components/Layout/Sidebar.module.scss';
import ProductIcon from '../src/components/ProductIcon';
import { IItem } from '../src/types/Item';

const navigation: IItem[] = [
  {
    icon: (
      <ProductIcon
        className={styles['item-icon']}
        family="minfraud"
        svg="MinFraudIcon"
      />
    ),
    items: [
      {
        title: 'Evaluate a Transaction',
        to: '/minfraud/evaluate-a-transaction',
      },
      {
        title: 'Report Transactions',
        to: '/minfraud/report-transactions',
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
    icon: (
      <ProductIcon
        className={styles['item-icon']}
        family="geoip"
        svg="GeoIP2Icon"
      />
    ),
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
    icon: (
      <ProductIcon
        className={styles['item-icon']}
        family="geolite"
        svg="GeoLite2Icon"
      />
    ),
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

export default navigation;
