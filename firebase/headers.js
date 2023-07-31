const cspKeywords = {
  NONE: '\'none\'',
  REPORT_SAMPLE: '\'report-sample\'',
  SCRIPT: '\'script\'',
  SELF: '\'self\'',
  UNSAFE_INLINE: '\'unsafe-inline\'',
};

module.exports = [
  {
    headers: [
      {
        key: 'Cache-Control',
        value: 'max-age=0, no-cache',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'no-referrer',
      },
      {
        key: 'Expect-CT',
        value: 'max-age=86400',
      },
      {
        key: 'Permissions-Policy',
        value: [
          'accelerometer',
          'autoplay',
          'camera',
          'document-domain',
          'encrypted-media',
          'fullscreen',
          'geolocation',
          'gyroscope',
          'magnetometer',
          'microphone',
          'midi',
          'payment',
          'picture-in-picture',
          'sync-xhr',
          'usb',
          'xr-spatial-tracking',
        ].map(policy => `${policy}=()`).join(', '),
      },
      {
        key: 'Content-Security-Policy',
        value: Object.entries({
          'base-uri': [
            cspKeywords.SELF,
          ],
          'connect-src': [
            cspKeywords.SELF,
            'status.maxmind.com',
            'www.google-analytics.com',
            'www.googleapis.com',
            'https://*.zopim.com',
            'wss://*.zopim.com',
            'https://www.maxmind.com',
          ],
          'default-src': [
            cspKeywords.SELF,
          ],
          'font-src': [
            cspKeywords.SELF,
            'data:',
            'https://*.zopim.com',
            'wss://*.zopim.com',
          ],
          'form-action ': [
            cspKeywords.SELF,
          ],
          'frame-src': [
            cspKeywords.SELF,
            'https://*.zopim.com',
            'wss://*.zopim.com',
          ],
          'img-src': [
            cspKeywords.SELF,
            'data:',
            'www.google-analytics.com',
            'https://*.zopim.com',
            'wss://*.zopim.com',
          ],
          'object-src': [
            cspKeywords.NONE,
          ],
          'script-src': [
            cspKeywords.SELF,
            cspKeywords.REPORT_SAMPLE,
            cspKeywords.UNSAFE_INLINE, // Misc. inlined scripts 😕
            'www.google-analytics.com',
            'www.googletagmanager.com',
            'https://*.zopim.com',
            'wss://*.zopim.com',
            'https://www.maxmind.com',
          ],
          'style-src': [
            cspKeywords.SELF,
            cspKeywords.REPORT_SAMPLE,
            cspKeywords.UNSAFE_INLINE, // Zendesk 😕
          ],
        })
          .reduce((acc, [
            key,
            values,
          ]) => `${acc} ${key} ${values.join(' ')};`.trim(), ''),
      },
    ],
    source: '/**',
  },
  {
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=604800, immutable',
      },
    ],
    source: `{${[
      '**/*.@(eot|otf|ttc|ttf|woff|woff2)',
      '**/*.@(css|js)',
      '**/*.@(jpg|jpeg|gif|png|svg)',
    ].join(',')}}`,
  },
];
