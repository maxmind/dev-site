+++
title = 'API policies - temporary enforcement on February 7, 2024'
date = 2024-01-25T16:00:00Z
draft = false
legacy_anchor = 'api-policies---temporary-enforcement-on-february-7-2024'
+++

To improve our server infrastructure and allow for better performance and
efficiency, MaxMind will begin enforcing our policies around our API and
database download requests on March 13, 2024. To help customers get ready for
this change, we will have a planned, temporary enforcement of these policies on
February 7, 2024.

**What are the policies?**

- MaxMind will only accept API and database download requests sent with the more
  secure HTTPS protocol.
- MaxMind will only accept API and database download requests that are sent to
  the appropriate hostname as documented in the integration instructions on our
  Developer Portal (see direct links below).

**What do I need to do?** To ensure that your MaxMind service is not
interrupted, please ensure that you are using the correct hostname for your API
requests, and that you are using HTTPS, prior to February 7, 2024.

If you have not made the requested changes before Wednesday, February 7, 2024,
you might experience a period where web service or database download requests
fail.

You can view the appropriate URIs for minFraud services on our Developer Portal
using the links below:

- [minFraud Score, Insights, and Factors web services](/minfraud/api-documentation/requests#service-endpoints)
- [minFraud Device Tracking](/minfraud/track-devices/web#implementation)
- [minFraud Transaction Reporting](/minfraud/report-a-transaction#api-documentation)
- [Legacy minFraud web services](/minfraud/minfraud-legacy#http-api)
- [Legacy Proxy Detection web service](/minfraud/proxy-detection#http-based-api)

**Please note:** This enforcement also affects GeoIP API requests. If you are
also a GeoIP user,
[see our GeoIP release note on this issue](/geoip/release-notes/2024-01-25-api-policies-temporary-enforcement-on-february-7-2024/).
