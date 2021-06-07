const { existsSync, unlinkSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const headers = require('./headers');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

const worksWithOrWithoutTrailingSlash = redirect => {
  if (!redirect.source || redirect.source.endsWith('{,/}')) {
    return redirect;
  }

  return {
    ...redirect,
    source: `${redirect.source}{,/}`,
  };
};

const force302Redirect = redirect => ({
  ...redirect,
  type: 302,
});

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
      .map(worksWithOrWithoutTrailingSlash)
      .map(force302Redirect),
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
