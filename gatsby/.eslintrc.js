module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:css-modules/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:security/recommended',
  ],
  globals: {
    __BASE_PATH__: true,
    __PATH_PREFIX__: true,
    graphql: true,
  },
  ignorePatterns: [
    '.cache',
    'node_modules',
    'public',
  ],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      files: [
        '**/*.{ts,tsx}',
      ],
      parser: '@typescript-eslint/parser',
      rules: {
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
      },
    },
    {
      files: [
        'src/pages/**',
      ],
      rules: {
        'filenames/match-exported': [
          0,
        ],
        'filenames/match-regex': [
          1,
          '^[a-z0-9-]+$',
        ],
      },
    },
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'css-modules',
    'jsx-a11y',
    'react',
    'typescript-sort-keys',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      1,
      {
        allowUnderscorePrefix: true,
        prefixWithI: 'always',
      },
    ],
    'css-modules/no-undef-class': [
      1,
      {
        camelCase: true,
      },
    ],
    'css-modules/no-unused-class': [
      1,
      {
        camelCase: true,
      },
    ],
    'filenames/match-exported': [
      1,
      'pascal',
    ],
    'react/boolean-prop-naming': [
      'warn',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'react/forbid-component-props': [
      1,
      {
        forbid: [
          'style',
        ],
      },
    ],
    'react/forbid-dom-props': [
      1,
      {
        forbid: [
          'style',
        ],
      },
    ],
    'react/jsx-closing-bracket-location': [
      1,
      'tag-aligned',
    ],
    'react/jsx-closing-tag-location': [
      1,
      {
        nonEmpty: 'after-props',
        selfClosing: 'tag-aligned',
      },
    ],
    'react/jsx-first-prop-new-line': [
      1,
      'always',
    ],
    'react/jsx-indent': [
      1,
      2,
      {
        checkAttributes: true,
      },
    ],
    'react/jsx-indent-props': [
      1,
      2,
    ],
    'react/jsx-max-props-per-line': [
      1,
      {
        when: 'always',
      },
    ],
    'react/jsx-one-expression-per-line': [
      1,
      {
        allow: 'single-child',
      },
    ],
    'react/jsx-sort-props': [
      1,
    ],
    'react/jsx-wrap-multilines': [
      1,
      {
        arrow: 'parens-new-line',
        assignment: 'parens-new-line',
        condition: 'ignore',
        declaration: 'parens-new-line',
        logical: 'ignore',
        prop: 'ignore',
        return: 'parens-new-line',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
