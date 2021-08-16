// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  overrides: [
    {
      extends: [
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: [
        '**/*.{ts,tsx}',
      ],
      parser: '@typescript-eslint/parser',
      plugins: [
        'import',
      ],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            custom: {
              match: true,
              regex: '^I[A-Z]',
            },
            format: [
              'PascalCase',
            ],
            selector: 'interface',
          },
        ],
        'typescript-sort-keys/interface': 1,
        'typescript-sort-keys/string-enum': 1,
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': [
            '.ts',
            '.tsx',
          ],
        },
        'import/resolver': {
          alias: {
            extensions: [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
            ],
            map: [
              [
                '@site',
                path.resolve('./src'),
              ],
              [
                '@theme',
                path.resolve('../../packages/gatsby-theme-maxmind/src'),
              ],
            ],
          },
          node: {
            extensions: [
              '.js',
              '.jsx',
              '.ts',
              '.tsx',
            ],
          },
        },
      },
    },
  ],
};
