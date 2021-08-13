const path = require('path');

module.exports = {
  configBasedir: path.resolve(__dirname),
  defaultSeverity: 'warning',
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
    'max-nesting-depth': 4,
    'order/order': [
      'custom-properties',
      'declarations',
    ],
    'order/properties-alphabetical-order': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: [
          /**
           * Partial support - IE11
           *
           *   Partial support in IE11 refers to calc not working properly
           *   with various use cases mentioned in known issues
           *
           * https://caniuse.com/calc
           */
          'calc',

          /**
           * Not supported - IE 11
           * Partial support - Safari
           *
           * https://caniuse.com/?search=appearance
           */
          'css-appearance',

          /**
           * Not supported - IE11
           *
           * https://caniuse.com/?search=css-featurequeries
           */
          'css-featurequeries',

          /**
           * Not supported - IE11
           *
           * https://caniuse.com/?search=css%20filters
           */
          'css-filters',

          /**
           * Partial support - Safari
           *
           *   Partial support in Safari and Older Firefox versions refers to
           *   not using premultiplied colors which results in unexpected
           *   behavior when using the transparent keyword as advised by the
           *   spec.
           *
           * https://caniuse.com/?search=css-gradients
           */
          'css-gradients',

          /**
           * Not supported - IE11
           *
           * https://caniuse.com/?search=css-initial-value
           */
          'css-initial-value',

          /**
           * Not supported - IE11
           *
           * Partial support - Chromium
           *
           *    Supported on th elements, but not thead or tr
           *
           * Partial support - Firefox
           *
           *    Not supported on any table parts
           *
           * https://caniuse.com/?search=css-sticky
           */
          'css-sticky',

          /**
           * Partial support - IE11
           *
           *   Partial support is due to large amount of bugs present.
           *
           * https://caniuse.com/?search=flexbox
           */
          'flexbox',

          /**
           * Partial support - Chromium, Firefox
           *
           *   Partial support refers to not supporting the avoid-column,
           *   column, and avoid (in the column context) values for the
           *   properties break-before, break-after, and break-inside.
           *
           * https://caniuse.com/?search=multicolumn
           */
          'multicolumn',

          /**
           * Partial support - IE11
           *
           *   Supports the value of invert for outline-color.
           *   Does not support outline-offset.
           *
           * https://caniuse.com/?search=outline
           */
          'outline',

          /**
           * Partial support - IE11
           *
           *   Partial support in IE refers to not supporting the
           *   `transform-style: preserve-3d` property. This prevents nesting 3D
           *   transformed elements.
           *
           * https://caniuse.com/?search=transforms3d
           */
          'transforms3d',

          /**
           * Partial support - IE11
           *
           *   Partial support refers to not supporting the "vmax" unit.
           *
           * https://caniuse.com/viewport-units
           */
          'viewport-units',
        ],
      },
    ],
    'selector-class-pattern': [
      '[a-z]([a-zA-Z0-9]+)?$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'selector-max-compound-selectors': 5,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'global',
        ],
      },
    ],
  },
};
