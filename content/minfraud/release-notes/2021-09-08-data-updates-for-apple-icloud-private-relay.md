+++
title = 'Data Updates for Apple iCloud Private Relay'
date = 2021-09-08T16:00:00Z
draft = false
legacy_anchor = 'data-updates-for-apple-icloud-private-relay'
+++

We have updated our data in a number of ways in preparation for the rollout of
[iCloud Private Relay](https://developer.apple.com/icloud/prepare-your-network-for-icloud-private-relay/).
We have worked with Apple to ensure that our data accurately reflects how
Private Relay works and delivers the best possible user experience for your
users.

- Geolocation data across our products and services now incorporate the IP
  geolocation feeds published by Apple, which provides coarse city or region
  geolocation mappings for iCloud Private Relay IPs.
- We identify iCloud Private Relay IPs in our ISP dataset (present in our
  [minFraud Insights and Factors](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
  web services) by tagging ranges as `iCloud Private Relay`.

Apple has shared the following assurances built into Private Relay:

- Geolocation information for clients is validated by the relay servers using
  signed tokens, and visible to origins through the IP addresses selected by
  relay servers.
  - A user is not able to arbitrarily select their geolocation to evade
    geolocation controls.
- Access to relay servers is rate-limited using device attestation to reduce
  fraud.
- All traffic is secured using TLS 1.3.

You do not need to take any action to receive this data. It will be returned in
the
[`/traits/isp`](/geoip/docs/web-services/responses/#schema--response--traits__isp)
and
[`/traits/organization`](/geoip/docs/web-services/responses/#schema--response--traits__organization)
outputs.

For more information about Private Relay along with helpful technical
information, visit
[Prepare Your Network or Web Server for Private Relay](https://developer.apple.com/icloud/prepare-your-network-for-icloud-private-relay/)
on Apple’s developer website.

We will continue to monitor these IPs and make any adjustments that are needed
in the future.
