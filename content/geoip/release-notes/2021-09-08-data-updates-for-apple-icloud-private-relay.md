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
  [GeoIP2 ISP](https://www.maxmind.com/en/geoip-databases) and
  [Enterprise](https://www.maxmind.com/en/geoip-enterprise-database) databases,
  and in our
  [GeoIP2 Insights](https://www.maxmind.com/en/geoip-api-web-services) web
  service) by tagging ranges as `iCloud Private Relay`.

Apple has shared the following assurances built into Private Relay:

- Geolocation information for clients is validated by the relay servers using
  signed tokens, and visible to origins through the IP addresses selected by
  relay servers.
  - A user is not able to arbitrarily select their geolocation to evade
    geolocation controls.
- Access to relay servers is rate-limited using device attestation to reduce
  fraud.
- All traffic is secured using TLS 1.3.

To ensure your website and servers are ready for Private Relay, database
customers should be sure to update to the latest MaxMind GeoIP2 databases.

In order to get ISP data that includes Private Relay IPs, update to the latest
GeoIP2 ISP or Enterprise database. In order to get geolocation data for Private
Relay IPs, update to the latest GeoIP2 City or Enterprise database.

GeoIP2 Insights customers do not need to take any action to receive this data.
It will be returned in the
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
