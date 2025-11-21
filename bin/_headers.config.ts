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
          // Allow AJAX/fetch requests to status page, marketing site, HubSpot,
          // and Google services for analytics and tag management
          'connect-src': [
            "'self'",
            'https://status.maxmind.com',
            'https://www.maxmind.com',
            'https://api.hubspot.com',
            'https://static.hsappstatic.net',
            'https://*.googleapis.com',
            'https://*.google-analytics.com',
            'https://*.analytics.google.com',
            'https://*.googletagmanager.com',
            'https://*.g.doubleclick.net',
            'https://*.google.com',
          ],
          // Fallback for resources not covered by other directives
          'default-src': ["'self'"],
          // Allow fonts from our site and Google Fonts
          'font-src': ["'self'", 'https://fonts.gstatic.com'],
          // Only allow form submissions to our own domain
          'form-action': ["'self'"],
          // Prevent this site from being embedded in iframes on other domains
          'frame-ancestors': ["'self'"],
          // Allow embedding content from HubSpot and Google services
          'frame-src': [
            "'self'",
            'https://app.hubspot.com',
            'https://www.google.com',
            'https://www.googletagmanager.com',
          ],
          // Allow images from our site, data URIs, and any HTTPS source
          'img-src': ["'self'", 'data:', 'https:'],
          // Block all plugins (Flash, Java, etc.)
          'object-src': ["'none'"],
          // Allow scripts from our site, HubSpot, Google services, and inline scripts
          // 'unsafe-inline' needed for HubSpot and Google Tag Manager
          // 'report-sample' includes script sample in violation reports
          'script-src': [
            "'self'",
            "'report-sample'",
            "'unsafe-inline'",
            'https://js.hs-scripts.com',
            'https://js.hs-analytics.net',
            'https://js.hs-banner.com',
            'https://js.usemessages.com',
            'https://www.maxmind.com',
            'https://cloud.google.com',
            'https://www.gstatic.com',
            'https://www.googleadservices.com',
            'https://www.google.com',
            'https://*.googletagmanager.com',
          ],
          // Allow styles from our site, Google Fonts, and inline styles
          // 'unsafe-inline' needed for dynamic styling
          'style-src': [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
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
