const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    'babel-preset-gatsby',
    '@babel/preset-typescript',
  ],
});
