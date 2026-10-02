+++
title = 'API policies - temporary enforcement on October 17, 2023'
date = 2023-08-17T16:00:00Z
draft = false
legacy_anchor = 'api-policies---temporary-enforcement-on-october-17-2023'
+++

To improve our server infrastructure and allow for better performance and
efficiency, MaxMind will begin enforcing our policies around our API and
database download requests in March 2024. To help customers get ready for this
change, we will have a planned, temporary enforcement of these policies on
October 17, 2023.

**What are the policies?**

- MaxMind will only accept API and database download requests sent with the more
  secure HTTPS protocol.
- MaxMind will only accept API and database download requests that are sent to
  the appropriate hostname as documented in the integration instructions on our
  Developer Portal (see direct links below).

**What do I need to do?** To ensure that your MaxMind service is not
interrupted, please ensure that you are using the correct hostname for your API
requests, and that you are using HTTPS, prior to October 17, 2023. You can view
the appropriate URIs for minFraud services on our Developer Portal using the
links below:

- [minFraud Score, Insights, and Factors web services](/minfraud/api-documentation/requests#service-endpoints)
- [minFraud Device Tracking](/minfraud/track-devices/web#implementation)
- [minFraud Transaction Reporting](/minfraud/report-a-transaction#api-documentation)
- [Legacy minFraud web services](/minfraud/minfraud-legacy#http-api)
- [Legacy Proxy Detection web service](/minfraud/proxy-detection#http-based-api)

**Please note:** This enforcement will also affect GeoIP API requests. If you
are also a GeoIP user, see
[our GeoIP release note on this issue](/geoip/release-notes/2023-08-17-api-policies-temporary-enforcement-on-october-17-2023/).
