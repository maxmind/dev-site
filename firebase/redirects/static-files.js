module.exports = [
  {
    destination: '/static/GeoIP2-Enterprise-CSV_Example.zip',
    source: '/GeoIP2-Enterprise-CSV_Example.zip',
    type: 301,
  },
  {
    destination: '/static/svg/bg-pattern.svg',
    source: '/assets/svg/bg-pattern.svg',
    type: 301,
  },
  {
    destination: '/static/csv/fips-iso-map.csv',
    source: '/fips-iso-map.csv',
    type: 301,
  },
  {
    destination: '/static/geoip-test-databases.tar.gz',
    source: '/geoip-test-databases.tar.gz',
    type: 301,
  },
  {
    destination: '/static/checksum.txt',
    source: '/checksum.txt',
    type: 301,
  },
  {
    destination: '/static/csv/:1',
    regex: '^\\/csv-files\\/(.*)$',
    type: 301,
  },
  {
    destination: '/static/csv/codes/maxmind/eu_country_list.csv',
    source: '/static/csv/codes/eu_country_list.csv',
    type: 301,
  },
  {
    destination: '/static/csv/codes/maxmind/ap_country_list.csv',
    source: '/static/csv/codes/ap_country_list.csv',
    type: 301,
  },
  {
    destination: '/static/csv/:1',
    regex: '^\\/csv-files\\/(.*)$',
    type: 301,
  },
  {
    destination: '/static/csv/:1',
    regex: '^\\/csv\\/(.*)$',
    type: 301,
  },
  {
    destination: '/static/pdf/:1',
    regex: '^\\/static\\/pdfs\\/(.*)$',
    type: 301,
  },
  {
    destination: '/static/wsdl/:1',
    regex: '^\\/(minfraud-soap-.*\\.wsdl)$',
    type: 301,
  },
  {
    destination: 'https://www.maxmind.com/download/geoip/misc/region_codes.csv',
    source: '/static/maxmind-region-codes.csv',
    type: 301,
  },

  // WordPress Uploads
  {
    destination: '/static/csv/:1',
    regex: '^\\/20\\d\\d\\/\\d\\d\\/(GeoNames-Monthly-Diff-Report-.*)$',
    type: 301,
  },
  {
    destination: '/static/csv/fips-iso-map.csv',
    source: '/2020/06/fips-iso-map.csv',
    type: 301,
  },
  {
    destination: '/static/GeoIP2-Enterprise-CSV_Example.zip',
    source: '/2015/07/GeoIP2-Enterprise-CSV_Example.zip',
    type: 301,
  },
  {
    destination: '/static/GeoIP2-Enterprise-CSV_Example1.zip',
    source: '/2015/07/GeoIP2-Enterprise-CSV_Example1.zip',
    type: 301,
  },
  {
    destination: '/static/GeoIP2-User-Count-CSV_Example.zip',
    source: '/2017/10/GeoIP2-User-Count-CSV_Example.zip',
    type: 301,
  },
  {
    destination: '/static/csv/fips-iso-map.csv',
    source: '/2020/06/fips-iso-map.csv',
    type: 301,
  },
];
