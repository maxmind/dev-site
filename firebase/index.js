const { existsSync, unlinkSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const blogSiteConfig = require('../sites/blog.maxmind.com/firebase');
const devSiteConfig = require('../sites/dev.maxmind.com/firebase');

const cspKeywords = {
  NONE: '\'none\'',
  REPORT_SAMPLE: '\'report-sample\'',
  SCRIPT: '\'script\'',
  SELF: '\'self\'',
  UNSAFE_INLINE: '\'unsafe-inline\'',
};

const config = {
  functions: {
    predeploy: [],
  },
  hosting: [
    blogSiteConfig(cspKeywords),
    devSiteConfig(cspKeywords),
  ],
};

const configFile = resolve('firebase.json');

if (existsSync(configFile)) {
  unlinkSync(configFile);
}

writeFileSync(
  configFile,
  `${JSON.stringify(config, null, 2)}\n`,
);
