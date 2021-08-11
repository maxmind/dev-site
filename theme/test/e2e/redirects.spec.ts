/* eslint-disable compat/compat */
import crypto from 'crypto';
import fetch from 'node-fetch';

import { uriChecksums } from './redirects.fixture';

const targetUrl = process.env.E2E_TARGET_URL || 'http://localhost:5000';

describe('Redirects', () => {
  uriChecksums.forEach((uriChecksum) => {
    const { checksum, uriPath } = uriChecksum;
    const url = `${targetUrl}${uriPath}`;

    it(
      `${url} matches checksum`,
      async () => {
        const result = await fetch(url)
          .then((response) => response.blob())
          .then((blob: any) => new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha1');
            const stream = blob.stream();
            stream.on('error', (err: any) => reject(err));
            stream.on('data', (chunk: any) => hash.update(chunk));
            stream.on('end', () => resolve(hash.digest('hex')));
          }));
        expect(result).toBe(checksum);
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



