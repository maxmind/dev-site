+++
title = 'API policies are now permanently enforced'
date = 2024-03-13T16:00:00Z
draft = false
legacy_anchor = 'api-policies-are-now-permanently-enforced'
+++

To improve our server infrastructure and allow for better performance and
efficiency, our API policies are now being permanently enforced as of March
13, 2024.

**What are the policies?**

- MaxMind only accepts API and database download requests sent with the more
  secure HTTPS protocol.
- MaxMind only accepts API and database download requests that are sent to the
  appropriate hostname as documented in the integration instructions on our
  Developer Portal (see direct links below).

**What do I need to do?** Ensure that you are using the correct hostname for
your API requests, and that you are using HTTPS. Failure to do so will result in
web service or database download requests failing.

You can view the appropriate URIs for minFraud services on our Developer Portal
using the links below:

- [minFraud Score, Insights, and Factors web services](/minfraud/api-documentation/requests#service-endpoints)
- [minFraud Device Tracking](/minfraud/track-devices/web#implementation)
- [minFraud Transaction Reporting](/minfraud/report-a-transaction#api-documentation)
- [Legacy minFraud web services](/minfraud/minfraud-legacy#http-api)
- [Legacy Proxy Detection web service](/minfraud/proxy-detection#http-based-api)

**Please note:** This enforcement will also affect GeoIP web service and
database download requests. If you are also a GeoIP user,
[see our GeoIP release note on this issue](/geoip/release-notes/2024-03-13-api-policies-are-now-permanently-enforced/).
