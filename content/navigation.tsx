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
        title: 'minFraud Alerts',
        to: '/minfraud/alerts',
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
        title: 'Contribute',
        to: '/contribute',
      },
      {
        title: 'minFraud Legacy',
        to: '/minfraud/minfraud-legacy',
      },
      {
        title: 'Proxy Detection Legacy Web Service',
        to: '/minfraud/proxy-detection',
      },
      {
        title: 'MaxMind Server IP Addresses',
        to: '/maxmind-server-ip-addresses',
      },
      {
        title: 'Knowledge Base',
        url: 'https://support.maxmind.com/hc/en-us/categories/1260801482329-minFraud-Web-Services',
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
        items: [
          {
            title: 'Import to PostgreSQL',
            to: '/geoip/importing-databases/postgresql',
          },
          {
            title: 'Import to MySQL',
            to: '/geoip/importing-databases/mysql',
          },
        ],
        title: 'Importing Databases',
        to: '/geoip/importing-databases',
      },
      {
        title: 'GeoLite2 Free Geolocation Data',
        to: '/geoip/geolite2-free-geolocation-data',
      },
      {
        title: 'Privacy Exclusions API',
        to: '/geoip/privacy-exclusions-api',
      },
      {
        hasDivider: true,
        secondaryItems: [
          {
            title: 'Requests',
            to: '/geoip/docs/web-services/requests',
          },
          {
            title: 'Responses',
            to: '/geoip/docs/web-services/responses',
          },
        ],
        title: 'Web Services Documentation',
        to: '/geoip/docs/web-services',
      },
      {
        secondaryItems: [
          {
            title: 'City and Country',
            to: '/geoip/docs/databases/city-and-country',
          },
          {
            title: 'Enterprise',
            to: '/geoip/docs/databases/enterprise',
          },
          {
            title: 'Anonymous IP',
            to: '/geoip/docs/databases/anonymous-ip',
          },
          {
            title: 'ISP',
            to: '/geoip/docs/databases/isp',
          },
          {
            title: 'Connection Type',
            to: '/geoip/docs/databases/connection-type',
          },
          {
            title: 'Domain',
            to: '/geoip/docs/databases/domain',
          },
          {
            title: 'ASN',
            to: '/geoip/docs/databases/asn',
          },
        ],
        title: 'Database Documentation',
        to: '/geoip/docs/databases',
      },
      {
        hasDivider: true,
        title: 'Release Notes',
        to: '/geoip/release-notes',
      },
      {
        title: 'Contribute',
        to: '/contribute',
      },
      {
        items: [
          {
            title: 'Legacy Databases',
            to: '/geoip/legacy/databases',
          },
          {
            title: 'Legacy Web Services',
            to: '/geoip/legacy/web-services',
          },
          {
            title: 'Legacy Codes',
            to: '/geoip/legacy/codes',
          },
        ],
        title: 'GeoIP Legacy',
        to: '/geoip/legacy',
      },
      {
        title: 'MaxMind Server IP Addresses',
        to: '/maxmind-server-ip-addresses',
      },
      {
        title: 'Knowledge Base',
        url: 'https://support.maxmind.com/hc/en-us/categories/1260801446650-GeoIP2-and-GeoLite2',
      },
      {
        title: 'MMDB Format Spec',
        url: 'https://maxmind.github.io/MaxMind-DB/',
      },
    ],
    title: 'GeoIP2 and GeoLite2',
    to: '/geoip',
  },
];

export default navigation;
