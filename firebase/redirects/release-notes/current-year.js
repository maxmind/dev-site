const now = new Date();
const year = now.getUTCFullYear();

module.exports = [
  {
    destination: `/geoip/release-notes/${year}`,
    source: '/geoip/release-notes',
    type: 302,
  },
  {
    destination: `/minfraud/release-notes/${year}`,
    source: '/minfraud/release-notes',
    type: 302,
  },
];

