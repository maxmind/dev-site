import js from '@eslint/js';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      '**/*.md',
      '**/.cache',
      '**/public',
      'eslint.config.mjs',
      'bin/format-rawhtml.ts'
    ],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'simple-import-sort/imports': [
        'warn',
        {
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
          ],
        },
      ],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowTernary: true,
      }],
    },
  }, {
  files: [
    '**/*.{js,cjs}',
  ],

  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}, {
  files: [
    '**/*.mjs',
  ],

  languageOptions: {
    globals: {
      ...globals.nodeBuiltin,
    },
  },
}, {
  files: [
    '**/*.ts',
  ],

  languageOptions: {
    parserOptions: {
      project: [
        'tsconfig.json',
      ],
    },
  },

  rules: {
    '@typescript-eslint/naming-convention': ['error',
      {
        selector: 'default', format: ['camelCase'],
      },
      {
        selector: 'classProperty', format: ['camelCase'], leadingUnderscore: 'allow',
      },
      {
        selector: 'enumMember', format: ['PascalCase', 'camelCase'],
      },
      {
        selector: 'import', format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'objectLiteralProperty', format: null,
      },
      {
        selector: 'parameter', format: ['camelCase', 'snake_case'], leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike', format: ['PascalCase'],
      },
      {
        selector: 'typeProperty', format: ['camelCase', 'snake_case'], leadingUnderscore: 'allow',
      },
      // Allow dashes in variable names.  This is useful for things like country codes
      {
        selector: 'typeProperty', format: null, filter: { regex: '^[a-zA-Z-]+', match: true },
      },
      {
        selector: 'variable', format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'], leadingUnderscore: 'allow',
      },
    ],
  },
});
