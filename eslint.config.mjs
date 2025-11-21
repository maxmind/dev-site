import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import security from 'eslint-plugin-security';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: [
      '**/*.md',
      '**/.cache',
      '**/node_modules',
      '**/public',
      'eslint.config.mjs',
      'format-rawhtml.ts'
    ],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      security: fixupPluginRules(security),
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        __BASE_PATH__: true,
        __PATH_PREFIX__: true,
        graphql: true,
      },

      parser: tseslint.parser,
      ecmaVersion: 6,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },

        requireConfigFile: false,
      },
    },

    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': [
          '.ts',
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
    },

    rules: {
      'comma-dangle': [
        'warn',
        'always-multiline',
      ],
      'eol-last': [
        'warn',
        'always',
      ],

      'max-len': [
        'warn',
        {
          code: 100,
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
        {
          avoidEscape: true,
        },
      ],
      semi: [
        1,
        'always',
      ],

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
            [
              '\\.scss$',
            ],
          ],
        },
      ],
      '@typescript-eslint/no-unused-expressions': ['error', {
        allowTernary: true
    }],
    },
  }, {
  files: [
    'content/**',
  ],

  rules: {
    'max-len': [
      0,
    ],
  },
}, ...compat.extends(
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
).map(config => ({
  ...config,
  files: [
    '**/*.ts',
  ],
})), {
  files: [
    '**/*.ts',
  ],

  languageOptions: {
    parser: tseslint.parser,
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: [
        'tsconfig.json',
      ],
    },
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
      ],
    },
  },

  rules: {
    '@typescript-eslint/await-thenable': 'error',

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
