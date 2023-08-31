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
            'www.googleapis.com',
            'https://www.maxmind.com',

            // HubSpot chat
            'https://api.hubspot.com',
            'https://forms.hscollectedforms.net',
            'https://forms.hsforms.com',
          ],
          'default-src': [
            cspKeywords.SELF,
          ],
          'font-src': [
            cspKeywords.SELF,
            'data:',
          ],
          'form-action ': [
            cspKeywords.SELF,
          ],
          'frame-src': [
            cspKeywords.SELF,

            // HubSpot chat
            'https://app.hubspot.com',
          ],
          'img-src': [
            cspKeywords.SELF,
            'data:',

            // HubSpot chat
            'https://forms.hsforms.com',
          ],
          'object-src': [
            cspKeywords.NONE,
          ],
          'script-src': [
            cspKeywords.SELF,
            cspKeywords.REPORT_SAMPLE,
            cspKeywords.UNSAFE_INLINE, // Misc. inlined scripts 😕
            'www.googletagmanager.com',
            'https://www.maxmind.com',

            // HubSpot chat
            'https://js.hs-scripts.com',
            'https://js.hs-analytics.net',
            'https://js.hscollectedforms.net',
            'https://js.hs-banner.com',
            'https://js.usemessages.com',
          ],
          'style-src': [
            cspKeywords.SELF,
            cspKeywords.REPORT_SAMPLE,
            cspKeywords.UNSAFE_INLINE, // HubSpot chat 😕
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
