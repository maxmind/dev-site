const path = require('path');

module.exports = {
  configBasedir: path.resolve(__dirname),
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
  ],
  plugins: [
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
  ],
  rules: {
    indentation: 2,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers: [
          ...([
            'Chrome',
            'Edge',
            'Firefox',
            'Safari',
          ].map(browser => `last 2 ${browser} versions`)),
          'Firefox ESR',
          'IE 11',
        ],
        ignore: [
          'rem',
        ],
      },
    ],
    'selector-class-pattern': '[a-z][a-zA-Z0-9]+$',
  },
};
