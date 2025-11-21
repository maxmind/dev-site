/**
 * HTTP Headers Configuration for Cloudflare Pages
 * This file is the source of truth for static/_headers generation
 * Run: npm run build:headers
 */

interface HeadersConfig {
  paths: Array<{
    pattern: string;
    headers: Record<string, string[] | Record<string, string[]>>;
  }>;
}

const config: HeadersConfig = {
  paths: [
    {
      pattern: '/*',
      headers: {
        'Content-Security-Policy': {
          'connect-src': [
            "'self'",
            'https://status.maxmind.com',
            'https://www.maxmind.com',

            // eslint-disable-next-line max-len
            // https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot#content-security-policy

            // HubSpot API
            'https://api.hubspot.com',

            // HubSpot static assets (conversations embed)
            'https://static.hsappstatic.net',

            'https://*.googleapis.com',

            // eslint-disable-next-line max-len
            // https://developers.google.com/tag-platform/security/guides/csp#google_analytics_4_google_analytics
            'https://*.google-analytics.com',
            'https://*.analytics.google.com',
            'https://*.googletagmanager.com',

            // https://developers.google.com/tag-platform/security/guides/csp#google_ads
            'https://*.g.doubleclick.net',

            // Google domains (various TLDs for international support)
            'https://*.google.com',
          ],
          'default-src': ["'self'"],
          'font-src': [
            "'self'",

            // Loaded indirectly by Google Vertex search
            'https://fonts.gstatic.com',
          ],
          'form-action': ["'self'"],
          'frame-ancestors': ["'self'"],
          'frame-src': [
            "'self'",

            // eslint-disable-next-line max-len
            // https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot#content-security-policy

            // HubSpot calls-to-action (pop-ups) and chatflows
            'https://app.hubspot.com',

            // https://developers.google.com/tag-platform/security/guides/csp#google_ads
            'https://www.googletagmanager.com',

            // Google Vertex search
            'https://www.google.com',
          ],
          'img-src': ["'self'", 'data:', 'https:'],
          'object-src': ["'none'"],
          'script-src': [
            "'self'",
            "'report-sample'",
            "'unsafe-inline'",

            // eslint-disable-next-line max-len
            // https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot#content-security-policy

            // HubSpot tracking code
            'https://js.hs-scripts.com',

            // HubSpot Analytics
            'https://js.hs-analytics.net',

            // HubSpot cookie banner
            'https://js.hs-banner.com',

            // HubSpot Conversations and Chatflows
            'https://js.usemessages.com',

            // MaxMind marketing site
            'https://www.maxmind.com',

            // Google Vertex search
            'https://cloud.google.com',
            'https://www.gstatic.com',

            // https://developers.google.com/tag-platform/security/guides/csp#google_ads_conversions
            'https://www.googleadservices.com',
            'https://www.google.com',

            // Google Tag Manager
            'https://*.googletagmanager.com',
          ],
          'style-src': [
            "'self'",
            "'unsafe-inline'",

            // Google Fonts API and Vertex search default styles
            'https://fonts.googleapis.com',

            // Google static assets
            'https://www.gstatic.com',
          ],
        },
        'Feature-Policy': [
          "accelerometer 'none'",
          "autoplay 'none'",
          "camera 'none'",
          "encrypted-media 'none'",
          "fullscreen 'none'",
          "geolocation 'none'",
          "gyroscope 'none'",
          "magnetometer 'none'",
          "microphone 'none'",
          "midi 'none'",
          "payment 'none'",
          "picture-in-picture 'none'",
          "usb 'none'",
          "sync-xhr 'none'",
        ],
        'Permissions-Policy': [
          'accelerometer=()',
          'ambient-light-sensor=()',
          'autoplay=()',
          'battery=()',
          'camera=()',
          'display-capture=()',
          'document-domain=()',
          'encrypted-media=()',
          'execution-while-not-rendered=()',
          'execution-while-out-of-viewport=()',
          'fullscreen=()',
          'gamepad=()',
          'geolocation=()',
          'gyroscope=()',
          'hid=()',
          'idle-detection=()',
          'magnetometer=()',
          'microphone=()',
          'midi=()',
          'payment=()',
          'picture-in-picture=()',
          'publickey-credentials-get=()',
          'screen-wake-lock=()',
          'serial=()',
          'speaker-selection=()',
          'usb=()',
          'web-share=()',
          'xr-spatial-tracking=()',
        ],
        'Referrer-Policy': ['strict-origin-when-cross-origin'],
        'Strict-Transport-Security': [
          'max-age=63072000',
          'includeSubDomains',
          'preload',
        ],
        'X-Content-Type-Options': ['nosniff'],
        'X-Frame-Options': ['DENY'],
        'X-XSS-Protection': ['1', 'mode=block'],
      },
    },
  ],
};

export default config;
