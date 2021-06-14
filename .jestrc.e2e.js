const baseJestConfig = require('./.jestrc');

module.exports = {
  ...baseJestConfig,
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
