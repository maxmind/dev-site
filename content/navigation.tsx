import React from 'react';

import ProductIcon from '../src/components/ProductIcon';
import { IItem } from '../src/types/Item';

const navigation: IItem[] = [
  {
    icon: (
      <ProductIcon
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
        title: 'Report a Transaction',
        to: '/minfraud/report-a-transaction',
      },
      {
        title: 'Track Devices',
        to: '/minfraud/track-devices',
      },
      {
        title: 'Working with Transaction Dispositions',
        to: '/minfraud/working-with-transaction-dispositions',
      },
      {
        hasDivider: true,
        secondaryItems: [
          {
            title: 'Requests',
            to: '/minfraud/api-documentation/requests',
          },
          {
            title: 'Responses',
            to: '/minfraud/api-documentation/responses',
          },
        ],
        title: 'API Documentation',
        to: '/minfraud/api-documentation',
      },
      {
        hasDivider: true,
        title: 'Release Notes',
        to: '/minfraud/release-notes',
      },
      {
        title: 'minFraud Legacy',
        to: '/minfraud/minfraud-legacy',
      },
      {
        title: 'Frequently Asked Questions',
        url: 'https://support.maxmind.com/minfraud-faq/',
      },
    ],
    title: 'minFraud',
    to: '/minfraud',
  },
  {
    icon: (
      <ProductIcon
        family="geoip"
        svg="GeoIPIcon"
      />
    ),
    items: [
      {
        items: [
          {
            title: 'Databases',
            to: '/geoip/geolocate-an-ip/databases',
          },
          {
            title: 'Web Services',
            to: '/geoip/geolocate-an-ip/web-services',
          },
          {
            title: 'Client-side JavaScript',
            to: '/geoip/geolocate-an-ip/client-side-javascript',
          },
        ],
        title: 'Geolocate an IP',
        to: '/geoip/geolocate-an-ip',
      },
      {
        title: 'Updating Databases',
        to: '/geoip/updating-databases',
      },
      {
        hasDivider: true,
        title: 'API Documentation',
        to: '/geoip/api-documentation',
      },
      {
        secondaryItems: [
          {
            title: 'City and Country Databases',
            to: '/geoip/csv-databases/city-and-country',
          },
          {
            title: 'Enterprise Database',
            to: '/geoip/csv-databases/enterprise',
          },
          {
            title: 'Anonymous IP Database',
            to: '/geoip/csv-databases/anonymous-ip',
          },
          {
            title: 'ASN Database',
            to: '/geoip/csv-databases/asn',
          },
          {
            title: 'Connection Type Database',
            to: '/geoip/csv-databases/connection-type',
          },
          {
            title: 'Domain Database',
            to: '/geoip/csv-databases/domain',
          },
          {
            title: 'ISP Database',
            to: '/geoip/csv-databases/isp',
          },
        ],
        title: 'CSV Databases',
        to: '/geoip/csv-databases',
      },
      {
        hasDivider: true,
        title: 'Release Notes',
        to: '/geoip/release-notes',
      },
      {
        title: 'GeoIP FAQ',
        url: 'https://support.maxmind.com/geoip-faq/',
      },
      {
        title: 'GeoLite FAQ',
        url: 'https://support.maxmind.com/geolite-faq/',
      },
      {
        title: 'MMDB Format Spec',
        url: 'https://support.maxmind.com/geoip-faq/',
      },
    ],
    title: 'GeoIP and GeoLite',
    to: '/geoip',
  },
];

export default navigation;
