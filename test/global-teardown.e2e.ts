import { teardown as teardownDevServer } from 'jest-dev-server';

const targetUrl = process.env.E2E_TARGET_URL || 'http://localhost:5000';

export default async (): Promise<void> => {
  if (targetUrl === 'http://localhost:5000') {
    await teardownDevServer();
  }
};
