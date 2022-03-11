/* eslint-disable compat/compat */
import crypto from 'crypto';
import fetch from 'node-fetch';

import { uriChecksums } from './redirects.fixture';

// JSDOM does not provide TextEncoder, causing fetch-blob to fail
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;

const targetUrl = process.env.E2E_TARGET_URL || 'http://localhost:5000';

describe('Redirects', () => {
  uriChecksums.forEach((uriChecksum) => {
    const { checksum, uriPath } = uriChecksum;
    const url = `${targetUrl}${uriPath}`;

    it(
      `${url} matches checksum`,
      async () => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const view = new Uint8Array(buffer);
        const hash = crypto.createHash('sha1');

        hash.update(view);
        expect(hash.digest('hex')).toBe(checksum);
      }
    );
  });

  it(
    'WordPress pagination urls are redirected to pagination base',
    async () => {
      const status = await fetch(`${targetUrl}/product/geoip/geoip2/page/3`)
        .then((response) => response.status);
      expect(status).not.toBe(404);
    }
  );
});



