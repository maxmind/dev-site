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

To speed page load time, JavaScript should be placed in footer of the HTML
webpage.

Note that, in order to be effective, the Device Tracking Add-on must, at a
minimum, be included on the page where the IP address is captured for a minFraud
query.

{{< alert warning >}}
If you anticipate volume greater than 100 page views per second, please
[contact us](https://support.maxmind.com/hc/en-us/requests/new).
{{</ alert >}}

## Implementation

Replace `INSERT_MAXMIND_ACCOUNT_ID_HERE` with your
[MaxMind account ID](https://support.maxmind.com/hc/en-us/articles/4412951066779-Find-my-Account-ID).

```html
<script>
  (function() {
    var mmapiws = window.__mmapiws = window.__mmapiws || {};
    mmapiws.accountId = "INSERT_MAXMIND_ACCOUNT_ID_HERE";
    var loadDeviceJs = function() {
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

## Cookie and web storage usage

The device tracking add-on uses both a cookie and local storage as one method of
distinguishing unique devices. The add-on sets a cookie with a two-year
expiration for the effective second-level domain of your site; for instance, on
`www.maxmind.com`, the cookie would be set for `maxmind.com`. Both the cookie
and the local storage key are named `__mmapiwsid`.

MaxMind may use other browser storage techniques in the future to enhance the
performance of the device tracking add-on.
