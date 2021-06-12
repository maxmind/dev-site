/* eslint-disable filenames/match-exported */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setup: setupDevServer } = require('jest-dev-server');

export default async (): Promise<void> => {
  await setupDevServer({
    command: 'yarn serve',
    launchTimeout: 50000,
    port: 5000,
  });
};
