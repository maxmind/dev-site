const { existsSync, unlinkSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const headers = require('./headers');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

const config = {
  hosting: {
    headers,
    ignore: [
      'content',
      'firebase.js',
      'firebase',
      'gatsby-*.js',
      'package.json',
      'src',
      'tsconfig.json',
      'yarn.lock',
      '**/.*',
      '**/node_modules/**',
    ],
    public: 'public',
    redirects: redirects
    rewrites,
  },
};

const configFile = resolve(__dirname, '../firebase.json');
console.log(configFile);

if (existsSync(configFile)) {
  unlinkSync(configFile);
}

writeFileSync(
  configFile,
  `${JSON.stringify(config, null, 2)}\n`,
);
