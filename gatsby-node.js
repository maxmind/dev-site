/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 * 🚨🚨 This file does not support ES6 modules. This file acts as a shim for an
 * ES6 version of this file.
 * See: https://github.com/gatsbyjs/gatsby/issues/10531#issuecomment-601194536
 *
 */

require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

module.exports = require('./src/gatsby/gatsby-node');
