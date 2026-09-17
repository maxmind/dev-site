+++
title = 'New Data Point is_residential_proxy Released for GeoIP2 Anonymous IP'
date = 2020-10-20T16:00:00Z
draft = false
legacy_anchor = 'new-data-point-is_residential_proxy-released-for-geoip2-anonymous-ip'
+++

We have released an additional data point for the
[GeoIP2 Anonymous IP Database](https://www.maxmind.com/en/geoip-anonymous-ip-database).
Subscribers can now identify whether an IP address is likely a
[residential proxy](https://en.wikipedia.org/wiki/Proxy_server#Residential_proxy):

- is_residential_proxy – 1 if the IP address is on a suspected anonymizing
  network and belongs to a residential ISP. Blank if not.

**CSV file users:** A new data column will be added to the end of the following
files:

- GeoIP2-Anonymous-IP-Blocks-IPv4.csv
- GeoIP2-Anonymous-IP-Blocks-IPv6.csv

**Binary MMDB file users:** You will need to update your
[MMDB reader](/geoip/geolocate-an-ip/databases/#apis-and-third-party-integrations)
to support look-ups containing the new output when it is released.
