/* eslint-disable max-len */
const currentYearReleaseNotesRedirects = require('./redirects/release-notes/current-year');
const geoipReleasNotesRedirects = require('./redirects/release-notes/geoip');
const minfraudReleaseNotesRedirects = require('./redirects/release-notes/minfraud');
const staticFileRedirects = require('./redirects/static-files');
const wordpressRedirects = require('./redirects/wordpress');

module.exports = [
  ...currentYearReleaseNotesRedirects,
  ...geoipReleasNotesRedirects,
  ...minfraudReleaseNotesRedirects,
  ...staticFileRedirects,
  ...wordpressRedirects,
];
