module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less)$': 'identity-obj-proxy',
    // eslint-disable-next-line max-len
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',

    '.+\\.scss$': '<rootDir>/test/identity-obj-proxy-esm.js',
    // eslint-disable-next-line max-len
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/$1', // Workaround for https://github.com/facebook/jest/issues/9771
  },
  setupFiles: [
    '<rootDir>/test/loadershim.tsx',
  ],
  setupFilesAfterEnv: [
    './test/setup.ts',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    '<rootDir>/test',
  ],
  transform: {
    '^.+\\.[jt]s(x)?$': '<rootDir>/test/preprocess.js',
  },
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(ccount|character-entities-html4|character-entities-legacy|comma-separated-tokens|data-uri-to-buffer|fetch-blob|formdata-polyfill|gatsby-link|gatsby-script|hast-util-is-element|hast-util-sanitize|hast-util-to-html|hast-util-whitespace|html-void-elements|linkinator|mdast-util-definitions|mdast-util-to-hast|micromark-util-character|micromark-util-encode|micromark-util-sanitize-uri|node-fetch|property-information|remark-html|space-separated-tokens|srcset|stringify-entities|trim-lines|typeface-montserrat|unist-builder|unist-util-generated|unist-util-is|unist-util-position|unist-util-visit|unist-util-visit-parents)/)',
  ],
};
