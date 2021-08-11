import { setup as setupDevServer } from 'jest-dev-server';

const targetUrl = process.env.E2E_TARGET_URL || 'http://localhost:5000';

export default async (): Promise<void> => {
  if (targetUrl === 'http://localhost:5000') {
    await setupDevServer({
      command: 'yarn serve',
      launchTimeout: 50000,
      port: 5000,
    });
  }
};
