module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:css-modules/recommended',
    'plugin:compat/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
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
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      modules: true,
    },
    ecmaVersion: 6,
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'css-modules',
    'filenames',
    'json',
    'jsx-a11y',
    'react',
    'security',
    'simple-import-sort',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    'array-bracket-newline': [
      'warn',
      {
        minItems: 1,
        multiline: true,
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
    'eol-last': [
      'warn',
      'always',
    ],
    'filenames/match-exported': [
      1,
      'pascal',
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
        ImportDeclaration: {
          multiline: true,
        },
        ObjectExpression: {
          minProperties: 1,
          multiline: true,
        },
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
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
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
    semi: [
      1,
      'always',
    ],
    'simple-import-sort/imports': [
      'warn',
      {
        // eslint-disable-next-line max-len
        // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
        groups: [
          [
            '^\\u0000',
          ],
          [
            '^@?\\w',
          ],
          [
            '^',
          ],
          [
            '^\\.',
          ],
          [
            '\\.module\\.scss$',
          ],
        ],
      },
    ],
    'sort-keys': [
      'warn',
    ],
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx',
      ],
    },
    polyfills: [
      'CustomEvent',
      'fetch',
      'IntersectionObserver',
      'Promise.all',
      'Promise.race',
      'Promise.resolve',
      'URLSearchParams',
    ],
    react: {
      version: 'detect',
    },
  },
};
