/* eslint-disable filenames/match-exported */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { teardown: teardownDevServer } = require('jest-dev-server');

module.exports = async () => {
  await teardownDevServer();
};
