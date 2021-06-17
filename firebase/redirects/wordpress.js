/* eslint-disable max-len */

module.exports = [
  {
    destination: ':1',
    regex: '^(.*)/page\\/\\d+$',
    type: 302,
  },
  {
    destination: 'https://support.maxmind.com/',
    source: '/faq',
    type: 302,
  },
  {
    destination: 'https://support.maxmind.com/',
    source: '/faq/*',
    type: 302,
  },
  {
    destination: 'https://support.maxmind.com/',
    source: '/faq/*',
    type: 302,
  },
  {
    destination: '/geoip/release-notes/rss.xml',
    source: '/feed/?post_type=release_note&product=geoip2',
    type: 302,
  },
  {
    destination: '/minfraud/release-notes/rss.xml',
    source: '/feed/?post_type=release_note&product=minfraud',
    type: 302,
  },
  {
    destination: '/geoip/legacy',
    regex: '/geoip/(benchmarks|csv|downloadable|geolite|install|javascript|mod_geoip2|openx|web-service)$',
    type: 302,
  },
  {
    destination: '/geoip/legacy/codes',
    regex: '/geoip/codes(.*)',
    type: 301,
  },
  {
    destination: '/geoip/updating-databases',
    source: '/geoip/geoip-direct-downloads',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/geoip/geoip2',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/databases',
    source: '/geoip/geoip2/downloadable',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/anonymous-ip',
    source: '/geoip/geoip2/geoip2-anonymous-ip-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/city-and-country',
    source: '/geoip/geoip2/geoip2-city-country-csv-databases',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/connection-type',
    source: '/geoip/geoip2/geoip2-connection-type-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/domain',
    source: '/geoip/geoip2/geoip2-domain-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/enterprise',
    source: '/geoip/geoip2/geoip2-enterprise-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/isp',
    source: '/geoip/geoip2/geoip2-isp-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/geolite2-free-geolocation-data',
    source: '/geoip/geoip2/geolite2',
    type: 302,
  },
  {
    destination: '/geoip/docs/databases/asn',
    source: '/geoip/geoip2/geolite2-asn-csv-database',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/client-side-javascript',
    source: '/geoip/geoip2/javascript',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/client-side-javascript',
    source: '/geoip/geoip2/javascript-tutorial',
    type: 301,
  },
  {
    destination: '/geoip/release-notes',
    source: '/geoip/geoip2/javascript/release-notes',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/client-side-javascript',
    source: '/geoip/geoip2/javascript/tutorial',
    type: 302,
  },
  {
    destination: '/geoip/release-notes',
    source: '/geoip/geoip2/release-notes',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/web-services',
    source: '/geoip/geoip2/web-services',
    type: 302,
  },
  {
    destination: '/geoip/release-notes',
    source: '/geoip/geoip2/web-services/release-notes',
    type: 302,
  },
  {
    destination: '/geoip/whats-new-in-geoip2',
    source: '/geoip/geoip2/whats-new-in-geoip2',
    type: 302,
  },
  {
    destination: '/geoip/updating-databases',
    source: '/geoip/geoipupdate',
    type: 302,
  },
  {
    destination: '/geoip/updating-databases',
    source: '/geoip/geoipupdate/upgrading-to-geoip-update-4-x',
    type: 302,
  },
  {
    destination: '/pdf-files/GeoLite2-and-GeoIP2-Precision-Web-Services-Comparison.pdf',
    source: '/geoip/geolite2-free-geolocation-data/GeoLite2-and-GeoIP2-Precision-Web-Services-Comparison.pdf',
    type: 301,
  },
  {
    destination: '/geoip/legacy/databases',
    regex: '^/geoip/install/.*',
    type: 301,
  },
  {
    destination: '/geoip/docs/databases/city-and-country',
    source: '/geoip/install/country',
    type: 301,
  },
  {
    destination: '/geoip/legacy/codes',
    regex: '^/geoip/legacy/codes/country_latlon/.*$',
    type: 301,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/ap_country_list',
    type: 302,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/country_continent',
    type: 302,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/eu_country_list',
    type: 302,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/iso3166',
    type: 302,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/state_latlon',
    type: 301,
  },
  {
    destination: '/geoip/legacy/databases',
    source: '/geoip/legacy/csv',
    type: 302,
  },
  {
    destination: '/geoip/legacy/databases',
    source: '/geoip/legacy/downloadable',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/geoip/legacy/geolite',
    type: 301,
  },
  {
    destination: '/geoip/legacy/javascript',
    source: '/geoip/legacy/javascript/',
    type: 302,
  },
  {
    destination: '/geoip/legacy/javascript',
    source: '/geoip/legacy/migrating-away-from-our-legacy-geoip-javascript-services/',
    type: 302,
  },
  {
    destination: 'https://github.com/maxmind/geoip-api-mod_geoip2',
    source: '/geoip/legacy/mod_geoip2',
    type: 302,
  },
  {
    destination: '/geoip/release-notes',
    source: '/geoip/legacy/release-notes',
    type: 302,
  },
  {
    destination: '/geoip/release-notes',
    source: '/geoip/legacy/web-services/release-notes',
    type: 302,
  },
  {
    destination: 'https://github.com/maxmind/MaxMind-DB/blob/main/MaxMind-DB-spec.md',
    source: '/maxmind-db',
    type: 302,
  },
  {
    destination: '/minfraud/api-documentation',
    regex: 'minfraud-score-and-insights-api-documentation$',
    type: 301,
  },
  {
    destination: '/minfraud/report-a-transaction',
    source: '/minfraud/chargeback',
    type: 302,
  },
  {
    destination: '/minfraud/track-devices',
    source: '/minfraud/device',
    type: 302,
  },
  {
    destination: '/minfraud/working-with-transaction-dispositions',
    source: '/minfraud/dispositions-api',
    type: 302,
  },
  {
    destination: '/minfraud/report-a-transaction',
    source: '/minfraud/minfraud-legacy/chargeback',
    type: 301,
  },
  {
    destination: '/minfraud/api-documentation',
    source: '/minfraud/minfraud-score-and-insights-api-documentation',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/normalizing-email-addresses-for-minfraud',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/product/geoip',
    type: 302,
  },
  {
    destination: '/geoip/legacy',
    source: '/product/geoip/geoip-legacy',
    type: 302,
  },
  {
    destination: '/geoip/legacy/web-services',
    source: '/product/geoip/geoip-legacy-web-services',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/product/geoip/geoip2',
    type: 302,
  },
  {
    destination: '/geoip/docs/web-services',
    source: '/product/geoip/geoip2-web-services',
    type: 302,
  },
  {
    destination: '/geoip/geolocate-an-ip/client-side-javascript',
    source: '/product/geoip/geoip2/geoip2-js',
    type: 302,
  },
  {
    destination: '/geoip',
    source: '/product/geolite2',
    type: 302,
  },
  {
    destination: '/minfraud',
    source: '/product/minfraud',
    type: 302,
  },
  {
    destination: '/minfraud/proxy-detection',
    source: '/product/proxy-detection',
    type: 302,
  },
  {
    destination: '/minfraud/proxy-detection',
    source: '/proxy-detection',
    type: 302,
  },
];
