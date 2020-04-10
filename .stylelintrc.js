const path = require('path');

module.exports = {
  configBasedir: path.resolve(__dirname),
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
  ],
  plugins: ['stylelint-order'],
  rules: {
    indentation: 2,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
  },
};
