const cspKeywords = {
  NONE: '\'none\'',
  REPORT_SAMPLE: '\'report-sample\'',
  SCRIPT: '\'script\'',
  SELF: '\'self\'',
  UNSAFE_INLINE: '\'unsafe-inline\'',
};

// https://www.google.com/supported_domains
// eslint-disable-next-line
  const tldList = ['.google.com', '.google.ad', '.google.ae', '.google.com.af', '.google.com.ag', '.google.al', '.google.am', '.google.co.ao', '.google.com.ar', '.google.as', '.google.at', '.google.com.au', '.google.az', '.google.ba', '.google.com.bd', '.google.be', '.google.bf', '.google.bg', '.google.com.bh', '.google.bi', '.google.bj', '.google.com.bn', '.google.com.bo', '.google.com.br', '.google.bs', '.google.bt', '.google.co.bw', '.google.by', '.google.com.bz', '.google.ca', '.google.cd', '.google.cf', '.google.cg', '.google.ch', '.google.ci', '.google.co.ck', '.google.cl', '.google.cm', '.google.cn', '.google.com.co', '.google.co.cr', '.google.com.cu', '.google.cv', '.google.com.cy', '.google.cz', '.google.de', '.google.dj', '.google.dk', '.google.dm', '.google.com.do', '.google.dz', '.google.com.ec', '.google.ee', '.google.com.eg', '.google.es', '.google.com.et', '.google.fi', '.google.com.fj', '.google.fm', '.google.fr', '.google.ga', '.google.ge', '.google.gg', '.google.com.gh', '.google.com.gi', '.google.gl', '.google.gm', '.google.gr', '.google.com.gt', '.google.gy', '.google.com.hk', '.google.hn', '.google.hr', '.google.ht', '.google.hu', '.google.co.id', '.google.ie', '.google.co.il', '.google.im', '.google.co.in', '.google.iq', '.google.is', '.google.it', '.google.je', '.google.com.jm', '.google.jo', '.google.co.jp', '.google.co.ke', '.google.com.kh', '.google.ki', '.google.kg', '.google.co.kr', '.google.com.kw', '.google.kz', '.google.la', '.google.com.lb', '.google.li', '.google.lk', '.google.co.ls', '.google.lt', '.google.lu', '.google.lv', '.google.com.ly', '.google.co.ma', '.google.md', '.google.me', '.google.mg', '.google.mk', '.google.ml', '.google.com.mm', '.google.mn', '.google.com.mt', '.google.mu', '.google.mv', '.google.mw', '.google.com.mx', '.google.com.my', '.google.co.mz', '.google.com.na', '.google.com.ng', '.google.com.ni', '.google.ne', '.google.nl', '.google.no', '.google.com.np', '.google.nr', '.google.nu', '.google.co.nz', '.google.com.om', '.google.com.pa', '.google.com.pe', '.google.com.pg', '.google.com.ph', '.google.com.pk', '.google.pl', '.google.pn', '.google.com.pr', '.google.ps', '.google.pt', '.google.com.py', '.google.com.qa', '.google.ro', '.google.ru', '.google.rw', '.google.com.sa', '.google.com.sb', '.google.sc', '.google.se', '.google.com.sg', '.google.sh', '.google.si', '.google.sk', '.google.com.sl', '.google.sn', '.google.so', '.google.sm', '.google.sr', '.google.st', '.google.com.sv', '.google.td', '.google.tg', '.google.co.th', '.google.com.tj', '.google.tl', '.google.tm', '.google.tn', '.google.to', '.google.com.tr', '.google.tt', '.google.com.tw', '.google.co.tz', '.google.com.ua', '.google.co.ug', '.google.co.uk', '.google.com.uy', '.google.co.uz', '.google.com.vc', '.google.co.ve', '.google.co.vi', '.google.com.vn', '.google.vu', '.google.ws', '.google.rs', '.google.co.za', '.google.co.zm', '.google.co.zw', '.google.cat']

const updatedTldList = [];
tldList.map((item) => {
  updatedTldList.push('https://*'.concat(item));
});

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

            // eslint-disable-next-line max-len
            // https://developers.google.com/tag-platform/security/guides/csp#google_analytics_4_google_analytics
            'https://*.google-analytics.com',
            'https://*.analytics.google.com',
            'https://*.googletagmanager.com',
            'https://*.g.doubleclick.net',
          ].concat(updatedTldList),
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
            'https://*.googletagmanager.com',
            'https://www.maxmind.com',

            // HubSpot chat
            'https://js.hs-scripts.com',
            'https://js.hs-analytics.net',
            'https://js.hscollectedforms.net',
            'https://js.hs-banner.com',
            'https://js.usemessages.com',

            // eslint-disable-next-line max-len
            // https://developers.google.com/tag-platform/security/guides/csp#google_ads_conversions
            'https://www.googleadservices.com',
            'https://www.google.com',
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
