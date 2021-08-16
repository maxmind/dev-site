// process.env.NODE_OPTIONS = '--loader ts-node/esm';

require('source-map-support').install();
require('ts-node').register();

module.exports = require('./src/gatsby/gatsby-config');
