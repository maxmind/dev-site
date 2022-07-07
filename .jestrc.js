module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less)$': 'identity-obj-proxy',
    // eslint-disable-next-line max-len
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',
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
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    '<rootDir>/test',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[jt]s(x)?$': '<rootDir>/test/preprocess.js',
    '^.+\\.scss$': 'jest-scss-transform',
  },
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    'node_modules/(?!(data-uri-to-buffer|fetch-blob|formdata-polyfill|gatsby-link|gatsby-script|node-fetch|typeface-montserrat)/)',
  ],
};
