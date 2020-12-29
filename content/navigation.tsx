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
        hasDivider: true,
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
        svg="GeoIP2Icon"
      />
    ),
    items: [
      {
        secondaryItems: [
          {
            title: 'Database Formats',
            to: '/geoip2/databases/database-formats',
          },
          {
            title: 'Geolocate an IP Address',
            to: '/geoip2/databases/geolocate-an-ip-address',
          },
          {
            title: 'Updating Databases',
            to: '/geoip2/databases/updating-databases',
          },
        ],
        title: 'Databases',
        to: '/geoip2/databases',
      },
      {
        secondaryItems: [
          {
            title: 'Get a Geolocation',
            to: '/geoip2/web-services/geolocate-an-ip-address',
          },
          {
            title: 'Using the JavaScript Client',
            to: '/geoip2/web-services/using-the-javascript-client',
          },
        ],
        title: 'Web Services',
        to: '/geoip2/web-services',
      },
      {
        hasDivider: true,
        secondaryItems: [
          {
            secondaryItems: [
              {
                items: [
                  {
                    title: 'Country',
                    to: '#',
                  },
                ],
                title: 'City',
                to: '#',
              },
              {
                title: 'Country',
                to: '#',
              },
              {
                title: 'Enterprise',
                to: '#',
              },
              {
                title: 'Anonymous IP',
                to: '#',
              },
              {
                title: 'ASN',
                to: '#',
              },
              {
                title: 'Connection Type',
                to: '#',
              },
              {
                title: 'Domain',
                to: '#',
              },
              {
                title: 'ISP',
                to: '#',
              },
            ],
            title: 'Databases',
            to: '/geoip2/api-reference/databases',
          },
          {
            secondaryItems: [
              {
                title: 'Authentication',
                to: '#',
              },
              {
                title: 'Endpoints',
                to: '#',
              },
              {
                title: 'Models',
                to: '#',
              },
            ],
            title: 'Web Services',
            to: '/geoip2/api-reference/web-services',
          },
        ],
        title: 'API Reference',
        to: '/geoip2/api-reference',
      },
      {
        title: 'Release Notes',
        to: '/geoip2/release-notes',
      },
      {
        title: 'Frequently Asked Questions',
        url: 'https://support.maxmind.com/geoip-faq/',
      },
      {
        secondaryItems: [
          {
            items: [
              {
                title: 'ISO 3166 Country Codes',
                to: '#',
              },
              {
                title: 'ISO 3166 Country Codes with Associated Continent',
                to: '#',
              },
              {
                title: 'MaxMind-Specific Codes for Europe',
                to: '#',
              },
              {
                title: 'MaxMind-Specific Codes for the Asia/Pacific Region',
                to: '#',
              },
            ],
            title: 'GeoIP Codes',
            to: '#',
          },
        ],
        title: 'Legacy Documentation',
        to: '/legacy/geoip',
      },
    ],
    title: 'GeoIP2',
    to: '/geoip2',
  },
  {
    icon: (
      <ProductIcon
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
        hasDivider: true,
        title: 'API Reference',
        to: '/geolite2/api-reference',
      },
      {
        title: 'Release Notes',
        to: '/geolite2/release-notes',
      },
      {
        title: 'Frequently Asked Questions',
        url: 'https://support.maxmind.com/geolite-faq/',
      },
    ],
    title: 'GeoLite2',
    to: '/geolite2',
  },
];

export default navigation;
