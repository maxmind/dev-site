module.exports = [
  ...([
    'Chrome',
    'Edge',
    'Firefox',
    'Safari',
  ].map(browser => `last 2 ${browser} versions`)),
  'Firefox ESR',
  'IE 11',
];
