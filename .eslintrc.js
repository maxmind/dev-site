module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:css-modules/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
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
      files: ['**/*.json'],
      rules: {
        'comma-dangle': [
          'error',
          'never',
        ],
        quotes: [
          'error',
          'double',
        ],
        'quote-props': [
          'error',
          'always',
        ],
        'semi': [
          'error',
          'never',
        ],
      },
    },
    {
      files: ['src/pages/**'],
      rules: {
        'filenames/match-exported': [0],
        'filenames/match-regex': [
          2,
          '^[a-z0-9-]+$',
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'css-modules',
    'filenames',
    'jsx-a11y',
    'react',
    'security',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': [
      2,
      {
        allowUnderscorePrefix: true,
        prefixWithI: 'always',
      },
    ],
    'array-bracket-newline': [
      'error',
      {
        minItems: 2,
      },
    ],
    'array-element-newline': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'css-modules/no-undef-class': [
      2,
      {
        camelCase: true,
      },
    ],
    'css-modules/no-unused-class': [
      2,
      {
        camelCase: true,
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'filenames/match-exported': [
      2,
      'pascal',
    ],
    indent: [
      'error',
      2,
    ],
    'max-len': [
      'error',
      {
        code: 80,
      },
    ],
    'no-trailing-spaces': 'error',
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: 'never',
        ImportDeclaration: 'never',
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true ,
        },
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        objectsInObjects: false,
      },
    ],
    'object-property-newline': 'error',
    'quote-props': [
      'error',
      'as-needed',
    ],
    quotes: [
      'error',
      'single',
    ],
    'react/boolean-prop-naming': [
      'error',
      {
        rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
      },
    ],
    'react/forbid-dom-props': [
      2,
      {
        forbid: ['style'],
      },
    ],
    'react/jsx-closing-bracket-location': [
      2,
      'tag-aligned',
    ],
    'react/jsx-closing-tag-location': [
      2,
      {
        nonEmpty: 'after-props',
        selfClosing: 'tag-aligned',
      },
    ],
    'react/jsx-first-prop-new-line': [
      2,
      'always',
    ],
    'react/jsx-indent': [
      2,
      2,
      {
        checkAttributes: true,
      },
    ],
    'react/jsx-indent-props': [
      2,
      2,
    ],
    'react/jsx-max-props-per-line': [
      2,
      {
        when: 'always',
      },
    ],
    'react/jsx-one-expression-per-line': [
      2,
      {
        allow: 'single-child',
      },
    ],
    'react/jsx-sort-props': [2],
    'react/jsx-wrap-multilines': [
      2,
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
    semi: [
      2,
      'always',
    ],
    'simple-import-sort/sort': 'error',
    'sort-keys': ['error'],
    'sort-keys-fix/sort-keys-fix': 'warn',
    'typescript-sort-keys/interface': 2,
    'typescript-sort-keys/string-enum': 2,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
      ],
    },
    react: {
      version: 'detect',
    },
  },
};
