const baseJestConfig = require('./.jestrc');

module.exports = {
  ...baseJestConfig,
  testPathIgnorePatterns: [
    'node_modules',
    '\\.cache',
    '<rootDir>.*/public',
  ],
  testMatch: [
    '<rootDir>/test/regressions.spec.ts',
  ],
};
