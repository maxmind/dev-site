module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:security/recommended',
  ],
  globals: {
    __BASE_PATH__: true,
    __PATH_PREFIX__: true,
    graphql: true,
  },
  ignorePatterns: [
    '**/*.mdx',
    '.cache',
    'node_modules',
    'public',
  ],
  overrides: [
    {
      extends: [
        'plugin:json/recommended',
      ],
      files: [
        '**/*.json',
      ],
      rules: {
        'comma-dangle': [
          'warn',
          'never',
        ],
        'quote-props': [
          'warn',
          'always',
        ],
        quotes: [
          'warn',
          'double',
        ],
        semi: [
          'warn',
          'never',
        ],
      },
    },
    {
      files: [
        'content/**',
      ],
      rules: {
        'filenames/match-exported': [
          0,
        ],
        'filenames/match-regex': [
          1,
          '^[a-z0-9-]+$',
        ],
        'max-len': [
          0,
        ],
      },
    },
  ],
  parser: 'babel-eslint',
  plugins: [
    'filenames',
    'json',
    'react',
    'security',
    'simple-import-sort',
    'sort-keys-fix',
  ],
  root: true,
  rules: {
    'array-bracket-newline': [
      'warn',
      {
        minItems: 1,
      },
    ],
    'array-element-newline': [
      'warn',
      'always',
    ],
    'comma-dangle': [
      'warn',
      'always-multiline',
    ],
    'eol-last': [
      'warn',
      'always',
    ],
    indent: [
      'warn',
      2,
    ],
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
    'no-trailing-spaces': 'warn',
    'object-curly-newline': [
      'warn',
      {
        ExportDeclaration: 'never',
        ImportDeclaration: 'never',
        ObjectExpression: 'always',
        ObjectPattern: {
          multiline: true,
        },
      },
    ],
    'object-curly-spacing': [
      'warn',
      'always',
      {
        objectsInObjects: false,
      },
    ],
    'object-property-newline': 'warn',
    'quote-props': [
      'warn',
      'as-needed',
    ],
    quotes: [
      'warn',
      'single',
    ],
    semi: [
      1,
      'always',
    ],
    'simple-import-sort/sort': 'warn',
    'sort-keys': [
      'warn',
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
