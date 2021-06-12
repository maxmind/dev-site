const baseJestConfig = require('./.jestrc');

module.exports = {
  ...baseJestConfig,
  globalSetup: './test/global-setup.e2e.ts',
  globalTeardown: './test/global-teardown.e2e.ts',
  setupFilesAfterEnv: [
    '<rootDir>test/matchers/toHaveNoBrokenLinks.ts',
  ],
  testMatch: [
    '<rootDir>test/e2e/*.spec.ts'
  ],
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
    '<rootDir>/test/regressions.spec.ts',
    '<rootDir>test/e2e',
  ],
};
