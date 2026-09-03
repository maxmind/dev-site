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

            // https://knowledge.hubspot.com/domains-and-urls/ssl-and-domain-security-in-hubspot#content-security-policy

            // HubSpot API
            'https://api.hubspot.com',

            // HubSpot static assets (conversations embed)
            'https://static.hsappstatic.net',

            'https://*.googleapis.com',

            // https://developers.google.com/tag-platform/security/guides/csp#google_analytics_4_google_analytics
            'https://*.google-analytics.com',
            'https://*.analytics.google.com',
            'https://*.googletagmanager.com',

            // https://developers.google.com/tag-platform/security/guides/csp#google_ads
            'https://*.g.doubleclick.net',
            'https://ad.doubleclick.net',
            'https://www.googleadservices.com',

            // GA4 Google Signals and Google Ads remarketing/conversions
            'https://pagead2.googlesyndication.com',

            // Google domains (various TLDs for international support)
            'https://google.com',
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
            'https://pagead2.googlesyndication.com',
            'https://googleads.g.doubleclick.net',

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
        // While many of these features do not seem to have any security
        // implication, deny them out of an abundance of caution to limit what
        // injected or embedded content can reach. See
        // https://github.com/w3c/webappsec-permissions-policy/blob/main/features.md
        // for the features that exist.
        //
        // Allowed for our own origin, because our own code calls the API:
        //   - clipboard-write: the copy button in
        //     assets/js/copy-markdown.ts calls
        //     navigator.clipboard.writeText.
        //
        // That feature defaults to an allowlist of *, so (self) is not the
        // same as dropping the entry. A cross-origin embed stays denied.
        //
        // Absent from the list, so not denied:
        //   - attribution-reporting: Google Ads conversion measurement uses
        //     it, and we are the advertiser. The publisher-side features of
        //     the same family cost us nothing, which is why browsing-topics is
        //     denied below.
        //   - join-ad-interest-group, run-ad-auction: publisher-side too, so
        //     denying them would also be free, but Chromium is removing the
        //     names.
        //
        // shared-storage, shared-storage-select-url and private-aggregation
        // are publisher-side and might be safe to deny. The ads and analytics
        // tags come from Google Tag Manager, so what they use is a black box.
        'Permissions-Policy': [
          'accelerometer=()',
          'aria-notify=()',
          'autoplay=()',
          'bluetooth=()',
          'browsing-topics=()',
          'camera=()',
          'captured-surface-control=()',
          'ch-device-memory=()',
          'ch-downlink=()',
          'ch-dpr=()',
          'ch-ect=()',
          'ch-prefers-color-scheme=()',
          'ch-prefers-reduced-motion=()',
          'ch-prefers-reduced-transparency=()',
          'ch-rtt=()',
          'ch-save-data=()',
          'ch-ua=()',
          'ch-ua-arch=()',
          'ch-ua-bitness=()',
          'ch-ua-form-factors=()',
          'ch-ua-full-version=()',
          'ch-ua-full-version-list=()',
          'ch-ua-high-entropy-values=()',
          'ch-ua-mobile=()',
          'ch-ua-model=()',
          'ch-ua-platform=()',
          'ch-ua-platform-version=()',
          'ch-ua-wow64=()',
          'ch-viewport-height=()',
          'ch-viewport-width=()',
          'ch-width=()',
          'clipboard-read=()',
          'clipboard-write=(self)',
          'compute-pressure=()',
          'cross-origin-isolated=()',
          'digital-credentials-get=()',
          'display-capture=()',
          'encrypted-media=()',
          'fullscreen=()',
          'gamepad=()',
          'geolocation=()',
          'gyroscope=()',
          'hid=()',
          'identity-credentials-get=()',
          'idle-detection=()',
          'interest-cohort=()',
          'keyboard-map=()',
          'language-detector=()',
          'language-model=()',
          'local-fonts=()',
          'local-network=()',
          'local-network-access=()',
          'loopback-network=()',
          'magnetometer=()',
          'microphone=()',
          'midi=()',
          'on-device-speech-recognition=()',
          'otp-credentials=()',
          'payment=()',
          'picture-in-picture=()',
          'private-state-token-issuance=()',
          'private-state-token-redemption=()',
          'publickey-credentials-create=()',
          'publickey-credentials-get=()',
          'screen-wake-lock=()',
          'serial=()',
          'summarizer=()',
          'sync-xhr=()',
          'translator=()',
          'unload=()',
          'usb=()',
          'web-share=()',
          'window-management=()',
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
      },
    },
  ],
};

export default config;
