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

<!-- prettier-ignore-start -->

{{< link-group/container heading="Guides" >}}
- heading: "Web"
  url: "/minfraud/track-devices/web"
  text: "Track devices on your website using JavaScript."
- heading: "Android"
  url: "/minfraud/track-devices/android"
  text: "Track devices in your Android app using the MaxMind Device SDK."
{{</ link-group/container >}}

<!-- prettier-ignore-end -->

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

The client-side tracking code returns a tracking token string. When you pass
this token to the minFraud API in the
[`/device/tracking_token`](/minfraud/api-documentation/requests#schema--request--device)
field, the service uses it to match the device directly. When a valid token is
found, the device is matched with high confidence regardless of IP address
changes.

### Implementation steps

1. Collect the tracking token on the client side using the appropriate SDK for
   your platform.
2. Pass the token to your backend (e.g., via a hidden form field, session
   storage, or API call).
3. Include the token in your minFraud API request's `device` object as
   `tracking_token`.

See the [Web](/minfraud/track-devices/web#explicit-device-linking-examples) and
[Android](/minfraud/track-devices/android#explicit-device-linking-examples)
guides for platform-specific examples.

### Token handling

- The tracking token is an **opaque string**. Do not parse it or make
  assumptions about its format, as the format may change without notice.
- Tokens should be treated as **transient**. Generate a fresh token for each
  session or transaction rather than storing tokens long-term.
