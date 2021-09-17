module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less)$': 'identity-obj-proxy',
    // eslint-disable-next-line max-len
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',
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
    '^.+\\.scss$': 'jest-style-transformer-sass-css-modules',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(typeface-montserrat)/)',
  ],
};
