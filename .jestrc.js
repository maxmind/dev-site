const pa11yPreset = require('jest-pa11y/jest-preset');

module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',
  },
  setupFiles: [
    '<rootDir>/test/loadershim.ts',
  ],
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
  ],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.[jt]s(x)?$': '<rootDir>/test/preprocess.js',
    '^.+\\.module\\.scss$': 'jest-style-transformer-sass-css-modules',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(typeface-montserrat)/)',
  ],
  ...pa11yPreset,
  setupFilesAfterEnv: [
    ...pa11yPreset.setupFilesAfterEnv,
    './test/setup.ts',
  ],
};
