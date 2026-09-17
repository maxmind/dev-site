+++
title = 'is_anonymous_proxy and is_satellite_provider Deprecation in GeoIP2'
date = 2015-07-13T16:00:00Z
draft = false
legacy_anchor = 'is_anonymous_proxy-and-is_satellite_provider-deprecation-in-geoip2'
+++

`is_anonymous_proxy` and `is_satellite_provider` are now deprecated in GeoIP2.

Use the
[GeoIP2 Anonymous IP Database](https://www.maxmind.com/en/geoip-anonymous-ip-database)
to identify anonymous IPs and refer to the
[IP Risk Score](https://www.maxmind.com/en/solutions/fraud-prevention/overview)
to assess whether an IP address is high risk.

Due to the increased coverage by mobile carriers, very few satellite providers
now serve multiple countries. As a result, the `is_satellite_provider` output
does not provide sufficiently relevant data for us to maintain it.
