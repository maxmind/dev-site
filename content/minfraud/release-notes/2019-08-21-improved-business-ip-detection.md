+++
title = 'Improved business IP detection'
date = 2019-08-21T16:00:00Z
draft = false
legacy_anchor = 'improved-business-ip-detection'
[build]
  list = 'never'
+++

We have made improvements in how we detect business IPs for the user type field
provided as part of the
[GeoIP Insights web service](https://www.maxmind.com/en/geoip-api-web-services)
and
[minFraud services](https://www.maxmind.com/en/solutions/fraud-prevention/overview).
Approximately 1% of residential IPs were recently corrected to the appropriate
business user type as a result of these improvements.
