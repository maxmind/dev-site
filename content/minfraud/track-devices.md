---
draft: false
title: Track Devices
---

The Device Tracking Add-On for the minFraud services identifies devices as they
move across networks and enhances the ability of the minFraud services to detect
fraud. If a fraudster changes proxies while they are browsing your website or
between visits to your website, you may observe an increased risk score in the
minFraud output associated with their transactions.

We may increase the risk score if we detect order velocity on the device. We
also return a
[device ID](/minfraud/api-documentation/responses#schema--response--device__id)
in minFraud Insights and Factors so that you can do your own modeling around
device ID.

## Recommended use

The Device Tracking Add-On is JavaScript code for you to add to your website. It
runs on a visiting device so that the minFraud service can assign a Device ID
and begin collecting fingerprint information. We recommend including the
JavaScript below on your product and landing pages as well as all the pages
within your purchase flow. This will help detect fraudsters if they change or
enable proxies while browsing your website.

To speed page load time, JavaScript should be placed in the footer of the HTML
webpage.

Note that, in order to be effective, the Device Tracking Add-on must, at a
minimum, be included on the page where the IP address is captured for a minFraud
query.

{{< alert warning >}} If you anticipate volume greater than 500 page views per
second, please [contact us](https://support.maxmind.com/knowledge-base).
{{</ alert >}}

## Implementation

Replace `MAXMIND_ACCOUNT_ID` with your
[MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id).

### Standard snippet

```html
<script>
  (function () {
    var mmapiws = (window.__mmapiws = window.__mmapiws || {});
    mmapiws.accountId = MAXMIND_ACCOUNT_ID;
    var loadDeviceJs = function () {
      var element = document.createElement('script');
      element.async = true;
      element.src = 'https://device.maxmind.com/js/device.js';
      document.body.appendChild(element);
    };
    if (window.addEventListener) {
      window.addEventListener('load', loadDeviceJs, false);
    } else if (window.attachEvent) {
      window.attachEvent('onload', loadDeviceJs);
    }
  })();
</script>
```

### Module snippet

If your site targets modern browsers (those supporting
[JavaScript modules](https://caniuse.com/es6-module)), you can use the module
version of the device tracking script. This avoids the use of global variables
and provides direct access to the tracking result.

```html
<script type="module">
  import('https://device.maxmind.com/js/device-module.js')
    .then(({ trackDevice }) =>
      trackDevice({
        accountId: MAXMIND_ACCOUNT_ID,
      })
    )
    .then(({ trackingToken }) => {
      // Optionally capture the tracking token for explicit device linking
      console.log('Tracking token:', trackingToken);
    })
    .catch((e) => console.error(e));
</script>
```

### npm package

If your site uses a JavaScript bundler or build system (e.g., Webpack, Vite,
Next.js), you can install the device tracking module as an npm package.

```sh
npm install @maxmind/device-tracking
```

```javascript
import { trackDevice } from '@maxmind/device-tracking';

const { trackingToken } = await trackDevice({
  accountId: MAXMIND_ACCOUNT_ID,
});

// Optionally capture the tracking token for explicit device linking
console.log('Tracking token:', trackingToken);
```

See the [package README](https://github.com/maxmind/device-tracking#readme) for
full API documentation.

## Explicit device linking

By default, the minFraud service matches devices using IP addresses. This works
well in most cases, but IP-based matching can be less reliable when multiple
users share the same IP address. Common scenarios include:

- **Shared or corporate IPs** where many employees or users share a single
  public IP address.
- **Carrier-Grade NAT (CGNAT)** where an ISP assigns the same public IP to many
  subscribers.
- **VPNs** where multiple users route traffic through the same VPN endpoint.

Explicit device linking solves this by using a `tracking_token` to match devices
with high confidence, independent of the IP address.

### How it works

The `trackDevice()` function returns a Promise that resolves to an object
containing a `trackingToken` string. When you pass this token to the minFraud
API in the
[`/device/tracking_token`](/minfraud/api-documentation/requests#schema--request--device)
field, the service uses it to match the device directly. When a valid token is
found, the device is matched with high confidence regardless of IP address
changes.

### Implementation steps

1. Call `trackDevice()` on the client side and capture the returned
   `trackingToken`.
2. Pass the token to your backend (e.g., via a hidden form field, session
   storage, or API call).
3. Include the token in your minFraud API request's `device` object as
   `tracking_token`.

#### Web (module snippet)

```html
<script type="module">
  import('https://device.maxmind.com/js/device-module.js')
    .then(({ trackDevice }) =>
      trackDevice({
        accountId: MAXMIND_ACCOUNT_ID,
      })
    )
    .then(({ trackingToken }) => {
      // Send the tracking token to your backend
      document.getElementById('tracking-token').value = trackingToken;
    })
    .catch((e) => console.error(e));
</script>
```

On your backend, include the token in the minFraud API request:

```json
{
  "device": {
    "ip_address": "2001:db8::ff00:42:8329",
    "tracking_token": "token-value-from-client"
  }
}
```

#### Web (npm package)

```javascript
import { trackDevice } from '@maxmind/device-tracking';

const { trackingToken } = await trackDevice({
  accountId: MAXMIND_ACCOUNT_ID,
});

// Send the tracking token to your backend for inclusion in the minFraud request
await fetch('/your-api/transaction', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ trackingToken }),
});
```

### Token handling

- The tracking token is an **opaque string**. Do not parse it or make
  assumptions about its format, as the format may change without notice.
- Tokens should be treated as **transient**. Generate a fresh token for each
  session or transaction rather than storing tokens long-term.

### Content Security Policy (CSP) requirements

If your site uses a Content Security Policy, you will need to add the following
directives to allow the device tracking script to load and communicate with
MaxMind's servers:

- `script-src`: `device.maxmind.com`
- `connect-src`: `d-ipv4.mmapiws.com`, `d-ipv6.mmapiws.com`

### Custom hostname

You can configure a custom `hostname` option when calling `trackDevice()` to
serve the device tracking script from your own domain. This can help bypass
ad-blockers that may block requests to third-party domains.

## Cookie and web storage usage

The device tracking add-on uses cookies and local storage as methods of
distinguishing unique devices across visits and domains.

The add-on sets two types of cookies, both named `__mmapiwsid` with two-year
expiration:

1. **First-party cookie**: Set for the effective second-level domain of your
   site; for instance, on `www.maxmind.com`, the cookie would be set for
   `maxmind.com`.

2. **Third-party cookie**: Set by MaxMind's servers to enable cross-domain
   device tracking. This allows the same device to be identified when it visits
   different customer websites using our device tracking.

The local storage key is also named `__mmapiwsid` and provides an additional
method of device identification.

MaxMind may use other browser storage techniques in the future to enhance the
performance of the device tracking add-on.
