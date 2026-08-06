---
draft: false
title: Web
---

The Device Tracking Add-On is JavaScript code for you to add to your website. It
runs on a visiting device so that the minFraud service can assign a Device ID
and begin collecting fingerprint information. We recommend including the
JavaScript below on your product and landing pages as well as all the pages
within your purchase flow. This will help detect fraudsters if they change or
enable proxies while browsing your website.

To speed page load time, JavaScript should be placed in the footer of the HTML
webpage.

Note that, in order to be effective, the Device Tracking Add-On must, at a
minimum, be included on the page where the IP address is captured for a minFraud
query.

{{< alert warning >}} If you anticipate volume greater than 500 page views per
second, please [contact us](https://support.maxmind.com/knowledge-base).
{{</ alert >}}

## Implementation

Replace `MAXMIND_ACCOUNT_ID` with your
[MaxMind account ID](https://support.maxmind.com/knowledge-base/articles/find-your-maxmind-account-id).

### Classic snippet

{{< alert warning >}} The classic snippet does not support
[explicit device linking](#explicit-device-linking-examples), as it provides no
way to read the tracking token. New integrations should use the
[module snippet](#module-snippet) or the [npm package](#npm-package).
{{</ alert >}}

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

await trackDevice({
  accountId: MAXMIND_ACCOUNT_ID,
});
```

See the [package README](https://github.com/maxmind/device-tracking#readme) for
full API documentation.

## Explicit device linking examples

The following examples show how to capture the tracking token on the client and
send it to your backend for inclusion in a minFraud API request. For more
background on explicit device linking, see [Track
Devices]({{< relref "/minfraud/track-devices" >}}).

### Module snippet with token capture

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
      const field = document.getElementById('tracking-token');
      if (field) {
        field.value = trackingToken;
      }
    })
    .catch((e) => console.error(e));
</script>
```

### npm package with token capture

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

### Backend API request

On your backend, include the token in the minFraud API request:

```json
{
  "device": {
    "ip_address": "2001:db8::ff00:42:8329",
    "tracking_token": "token-value-from-client"
  }
}
```

## Protecting device tracking from ad blockers

Ad blockers can stop the device tracking script from loading, which decreases
the coverage and effectiveness of device tracking.

To reduce this, you can serve the device tracking script from a hostname on your
own domain instead of from `device.maxmind.com`. We set this up with you as a
one-time change, and it does not change how you query the minFraud service.

Because the setup is hands-on, this option is available for higher-volume and
enterprise accounts. As a general guide, accounts sending more than 50,000
queries per month, or accounts with a dedicated customer success manager, are
eligible.

To get started,
[contact us](https://support.maxmind.com/knowledge-base/submit-a-support-request)
or reach out to your customer success manager.

We recommend implementing the
[explicit device linking](#explicit-device-linking-examples) described above
before or at the same time as moving to your own hostname. By default the
tracking script makes both an IPv6 and an IPv4 request; from your own hostname
it makes only one, so matching by IP address can fail when we see the device on
one address family and your minFraud query carries an address from the other.
Explicit device linking matches by tracking token instead, independent of the IP
address. The examples in this section show the two together.

### Choosing a hostname

We recommend a hostname that does not reference MaxMind or device tracking. For
example, use `mm.your-company.com` rather than `maxmind.your-company.com` or
`device.your-company.com`.

Use this hostname only for requests to MaxMind servers. Because the tracking
request sends credentials, any of your cookies scoped to the parent domain (set
with a `Domain` attribute, such as `Domain=your-company.com`) are sent with it.
Setting cookies without a `Domain` attribute keeps them host-only, so they are
not sent to the device tracking hostname.

### How setup works

1. You give us a hostname on your own domain.
2. We add the hostname to our system and send you DNS records to add to your
   domain.
3. You add the DNS records and let us know, and we validate them.
4. After validation succeeds, you update the device tracking code on your site
   to use the new hostname. If your site uses a Content Security Policy, update
   it as well (see
   [CSP requirements](#content-security-policy-csp-requirements)).
5. Device tracking requests should start working on the new hostname shortly
   after. Send us the URL of a page that includes the script so that we can
   verify the integration.

### Updating your integration

Replace `TRACKING_HOSTNAME` with the hostname you set up with us.

Your existing code may hardcode the old hostname in more than one place, and
there have been several versions of our snippet over the years. Search your
integration for the old hostname and replace every occurrence.

The module and npm examples below also capture the tracking token, so that a
single snippet covers both the custom hostname and explicit device linking. The
token capture is optional. The module example fills in a `tracking-token` form
field only if the page has one, so it is safe to use as-is before you have set
up explicit device linking; in the npm example, point the `fetch` at your own
endpoint or remove it. Device tracking works either way.

For the module snippet, use the hostname in the `import()` URL and pass it as
the `host` option:

```html
<script type="module">
  const host = 'TRACKING_HOSTNAME';
  import(`https://${host}/js/device-module.js`)
    .then(({ trackDevice }) =>
      trackDevice({
        accountId: MAXMIND_ACCOUNT_ID,
        host,
      })
    )
    .then(({ trackingToken }) => {
      // Optional: send the tracking token to your backend
      const field = document.getElementById('tracking-token');
      if (field) {
        field.value = trackingToken;
      }
    })
    .catch((e) => console.error(e));
</script>
```

For the npm package, pass the `host` option. The package uses it for both the
script URL and the tracking request, so there is nothing else to change:

```javascript
import { trackDevice } from '@maxmind/device-tracking';

const { trackingToken } = await trackDevice({
  accountId: MAXMIND_ACCOUNT_ID,
  host: 'TRACKING_HOSTNAME',
});

// Optional: send the tracking token to your backend
await fetch('/your-api/transaction', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ trackingToken }),
});
```

{{< alert warning >}} As noted under [Classic snippet](#classic-snippet), the
classic snippet cannot read the tracking token, so it does not support explicit
device linking. {{</ alert >}}

For the classic snippet, set `apiHost` and use it in the script `src`:

```html
<script>
  (function () {
    var mmapiws = (window.__mmapiws = window.__mmapiws || {});
    mmapiws.accountId = MAXMIND_ACCOUNT_ID;
    mmapiws.apiHost = 'TRACKING_HOSTNAME';
    var loadDeviceJs = function () {
      var element = document.createElement('script');
      element.async = true;
      element.src = 'https://' + mmapiws.apiHost + '/js/device.js';
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

In all three cases, the hostname you set must be bare, without a scheme or path:
a scheme produces an invalid URL, and a path is silently dropped rather than
reported as an error. The device tracking script then sends its tracking request
only to your hostname; it does not make the additional IPv4 request that the
default configuration may make.

## Content Security Policy (CSP) requirements

If your site uses a Content Security Policy, you will need to add the following
directives to allow the device tracking script to load and communicate with
MaxMind's servers:

- `script-src`: `device.maxmind.com`
- `connect-src`: `d-ipv4.mmapiws.com`, `d-ipv6.mmapiws.com`

If you serve device tracking from
[a hostname on your own domain](#protecting-device-tracking-from-ad-blockers),
use that hostname in both directives instead: it replaces `device.maxmind.com`
in `script-src` and both `d-ipv4.mmapiws.com` and `d-ipv6.mmapiws.com` in
`connect-src`, which the script then reaches with a single request.

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
