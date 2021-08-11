const { existsSync, unlinkSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const cspKeywords = {
  NONE: '\'none\'',
  REPORT_SAMPLE: '\'report-sample\'',
  SCRIPT: '\'script\'',
  SELF: '\'self\'',
  UNSAFE_INLINE: '\'unsafe-inline\'',
};

const config = {
  functions: {
    predeploy: [],
  },
  hosting: {
    headers: [
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
                'knrpc.olark.com',
                'status.maxmind.com',
                'www.google-analytics.com',
                'www.googleapis.com',
              ],
              'default-src': [
                cspKeywords.SELF,
              ],
              'font-src': [
                cspKeywords.SELF,
                'data:',
                'static.olark.com',
              ],
              'form-action ': [
                cspKeywords.SELF,
              ],
              'frame-src': [
                cspKeywords.SELF,
                'static.olark.com',
              ],
              'img-src': [
                cspKeywords.SELF,
                'data:',
                'log.olark.com',
                'www.google-analytics.com',
              ],
              'object-src': [
                cspKeywords.NONE,
              ],
              'script-src': [
                cspKeywords.SELF,
                cspKeywords.REPORT_SAMPLE,
                cspKeywords.UNSAFE_INLINE, // Olark 😕
                'api.olark.com',
                'knrpc.olark.com',
                'static.olark.com',
                'www.google-analytics.com',
                'www.googletagmanager.com',
              ],
              'style-src': [
                cspKeywords.SELF,
                cspKeywords.REPORT_SAMPLE,
                cspKeywords.UNSAFE_INLINE, // Olark 😕
                'static.olark.com',
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
    ],
    ignore: [
      'content',
      'firebase.js',
      'firebase.json',
      'gatsby-*.js',
      'package.json',
      'src',
      'tsconfig.json',
      'yarn.lock',
      '**/.*',
      '**/node_modules/**',
    ],
    public: 'public',
    /* eslint-disable max-len */
    redirects: [
      {
        destination: '/geoip',
        source: '/geoip/geoip2{,/}',
        type: 302,
      },
      {
        destination: '/geoip',
        source: '/normalizing-email-addresses-for-minfraud{,/}',
        type: 302,
      },
      {
        destination: '/geoip',
        source: '/product/geoip{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy',
        source: '/product/geoip/geoip-legacy{,/}',
        type: 302,
      },
      {
        destination: '/geoip',
        source: '/product/geoip/geoip2{,/}',
        type: 302,
      },
      {
        destination: '/geoip',
        source: '/product/geolite2{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolocate-an-ip/client-side-javascript',
        source: '/product/geoip/geoip2/geoip2-js{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/web-services',
        source: '/product/geoip/geoip-legacy-web-services{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/web-services',
        source: '/product/geoip/geoip2-web-services{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/anonymous-ip',
        source: '/geoip/geoip2/geoip2-anonymous-ip-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/asn',
        source: '/geoip/geoip2/geolite2-asn-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/city-and-country',
        source: '/geoip/geoip2/geoip2-city-country-csv-databases{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/connection-type',
        source: '/geoip/geoip2/geoip2-connection-type-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/domain',
        source: '/geoip/geoip2/geoip2-domain-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/enterprise',
        source: '/geoip/geoip2/geoip2-enterprise-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/docs/databases/isp',
        source: '/geoip/geoip2/geoip2-isp-csv-database{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolite2-free-geolocation-data',
        source: '/geoip/geoip2/geolite2{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolocate-an-ip/client-side-javascript',
        source: '/geoip/geoip2/javascript{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolocate-an-ip/client-side-javascript',
        source: '/geoip/geoip2/javascript/tutorial{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolocate-an-ip/databases',
        source: '/geoip/geoip2/downloadable{,/}',
        type: 302,
      },
      {
        destination: '/geoip/geolocate-an-ip/web-services',
        source: '/geoip/geoip2/web-services{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/codes',
        source: '/geoip/legacy/codes/country_continent{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/codes',
        source: '/geoip/legacy/codes/iso3166{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/codes',
        source: '/geoip/legacy/codes/eu_country_list{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/codes',
        source: '/geoip/legacy/codes/ap_country_list{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/databases',
        source: '/geoip/legacy/csv{,/}',
        type: 302,
      },
      {
        destination: '/geoip/legacy/databases',
        source: '/geoip/legacy/downloadable{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes',
        source: '/geoip/geoip2/javascript/release-notes{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes',
        source: '/geoip/geoip2/release-notes{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes',
        source: '/geoip/geoip2/web-services/release-notes{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes',
        source: '/geoip/legacy/release-notes{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes',
        source: '/geoip/legacy/web-services/release-notes{,/}',
        type: 302,
      },
      {
        destination: '/geoip/release-notes/rss.xml',
        source: '/feed/?post_type=release_note&product=geoip2',
        type: 302,
      },
      {
        destination: '/geoip/updating-databases',
        source: '/geoip/geoip-direct-downloads{,/}',
        type: 302,
      },
      {
        destination: '/geoip/updating-databases',
        source: '/geoip/geoipupdate{,/}',
        type: 302,
      },
      {
        destination: '/geoip/updating-databases',
        source: '/geoip/geoipupdate/upgrading-to-geoip-update-4-x{,/}',
        type: 302,
      },
      {
        destination: '/geoip/whats-new-in-geoip2',
        source: '/geoip/geoip2/whats-new-in-geoip2{,/}',
        type: 302,
      },
      {
        destination: 'https://github.com/maxmind/geoip-api-mod_geoip2',
        source: '/geoip/legacy/mod_geoip2{,/}',
        type: 302,
      },
      {
        destination: 'https://github.com/maxmind/MaxMind-DB/blob/main/MaxMind-DB-spec.md',
        source: '/maxmind-db{,/}',
        type: 302,
      },
      {
        destination: '/minfraud',
        source: '/product/minfraud{,/}',
        type: 302,
      },
      {
        destination: '/minfraud/api-documentation',
        source: '/minfraud/minfraud-score-and-insights-api-documentation{,/}',
        type: 302,
      },
      {
        destination: '/minfraud/proxy-detection',
        source: '/product/proxy-detection{,/}',
        type: 302,
      },
      {
        destination: '/minfraud/proxy-detection',
        source: '/proxy-detection{,/}',
        type: 302,
      },
      {
        destination: '/minfraud/release-notes/rss.xml',
        source: '/feed/?post_type=release_note&product=minfraud',
        type: 302,
      },
      {
        destination: '/minfraud/track-devices',
        source: '/minfraud/device{,/}',
        type: 302,
      },
      {
        destination: '/minfraud/working-with-transaction-dispositions',
        source: '/minfraud/dispositions-api{,/}',
        type: 302,
      },
    ],
    /* eslint-enable max-len */
    rewrites: [
      {
        function: 'feedRewrite',
        source: '/feed',
      },
      {
        function: 'releaseNoteRedirect',
        source: '/release-note/**',
      },
    ],
  },
};

const configFile = resolve('firebase.json');

if (existsSync(configFile)) {
  unlinkSync(configFile);
}

writeFileSync(
  configFile,
  `${JSON.stringify(config, null, 2)}\n`,
);
