// The year needs to be hardcoded. A page for the new year's
// release notes won't exist until a new MDX file is created
// in the /content/<product>/release-notes folder for that new year.

module.exports = [
  {
    destination: '/geoip/release-notes/2023',
    source: '/geoip/release-notes',
    type: 302,
  },
  {
    destination: '/minfraud/release-notes/2023',
    source: '/minfraud/release-notes',
    type: 302,
  },
];

