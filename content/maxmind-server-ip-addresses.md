---
draft: false
layout: mm-ips
title: MaxMind Server IP Addresses
outputs:
  - rss
  - html
_comment: json feed is handled by module mounts.  see hugo.toml
---

{{< alert warning >}} In January 2024, we began using R2 presigned URLs for all
database downloads. Database downloads will no longer use the IP addresses
specified below.

For information about IP addresses used to serve database downloads see
[the appropriate section below](#database-download-ip-addresses).

[Read our release note for more information.](/geoip/release-notes/2024#presigned-urls-for-database-downloads)
{{</ alert >}}

This page lists the IP addresses that may be used for minFraud, GeoIP, and
GeoLite web service requests by our \*.maxmind.com API hostnames. We strongly
encourage you to use DNS rather than hardcode our IPs. Not all IPs listed on
this page will be in use at a given time. The IPs returned in DNS could change
at any time. Note that the IPs below don’t apply to the `www.maxmind.com`
hostname, which could use any IP and changes frequently.

{{< mm-ips >}}

## Monitoring Changes

MaxMind provides [**RSS**](/maxmind-server-ip-addresses/index.xml) and
[**JSON**](/maxmind-server-ip-addresses.json) feeds, allowing you to monitor
changes to our minFraud, GeoIP, and GeoLite web service server IP addresses.

## Database download IP addresses

MaxMind uses Cloudflare to serve our GeoIP and GeoLite database downloads.

[You can view a list of Cloudflare IP ranges that may be used to serve MaxMind database downloads on their website.](https://www.cloudflare.com/ips/)

Cloudflare also maintains
[an API that can be used to retrieve the list of Cloudflare IP ranges](https://developers.cloudflare.com/api/operations/cloudflare-i-ps-cloudflare-ip-details).
