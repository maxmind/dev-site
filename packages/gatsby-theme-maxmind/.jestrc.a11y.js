const pa11yPreset = require('jest-pa11y/jest-preset');

const baseJestConfig = require('./.jestrc');

module.exports = {
  ...baseJestConfig,
  globals: {
    __PATH_PREFIX__: '',
    pa11y: true,
  },
  ...pa11yPreset,
  setupFilesAfterEnv: [
    ...baseJestConfig.setupFilesAfterEnv,
    ...pa11yPreset.setupFilesAfterEnv,
    './test/setup.a11y.ts',
  ],
  testMatch: [
    '**/*.a11y.tsx'
  ],
};
