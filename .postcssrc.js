const postcssPresetEnv = require('postcss-preset-env');
const browsers = require('./.browsersrc');

module.exports = {
  plugins: [
    postcssPresetEnv({
      autoprefixer: {
        grid: 'autoplace',
      },
      browsers,
      stage: 0,
    }),
  ],
};
