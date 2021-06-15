/* eslint-disable max-len */

/**
 * These redirects are ported from WPEngine's Dashboard.
 */

module.exports = [
  {
    destination: 'http://www.maxmind.com/download/geoip/misc/region_codes.csv',
    source: '/static/maxmind-region-codes.csv',
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
    destination: '/geoip/geolocate-an-ip/client-side-javascript',
    source: '/geoip/geoip2/javascript-tutorial',
    type: 301,
  },
  {
    destination: '/geoip/legacy/databases',
    regex: '^/geoip/install/.*',
    type: 301,
  },
  {
    destination: '/minfraud/api-documentation',
    regex: 'minfraud-score-and-insights-api-documentation$',
    type: 301,
  },
  {
    destination: '/geoip/legacy/codes',
    regex: '^/geoip/legacy/codes/country_latlon/.*$',
    type: 301,
  },
  {
    destination: '/geoip/legacy/codes',
    source: '/geoip/legacy/codes/state_latlon',
    type: 301,
  },
  {
    destination: '/minfraud/report-a-transaction',
    source: '/minfraud/minfraud-legacy/chargeback',
    type: 301,
  },
  {
    destination: '/geoip',
    source: '/geoip/legacy/geolite',
    type: 301,
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
    destination: '/minfraud/report-a-transaction',
    source: '/minfraud/chargeback',
    type: 302,
  },
];
