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

**What do I need to do?** If you download GeoIP or GeoLite databases and you use
an up to date version of
[our `geoipupdate` program](/geoip/updating-databases#using-geoip-update), you
do not need to take any action.

If you are using web services, or if you do direct downloads of GeoIP or GeoLite
databases, you should ensure that you are using the correct hostname for your
API requests, and that you are using HTTPS. Failure to do so will result in web
service or database download requests failing.

You can view the appropriate URIs for GeoIP and GeoLite services and downloads
on our Developer Portal using the links below:

- [GeoIP Country, City Plus, and Insights web services](/geoip/docs/web-services/requests#geoip-endpoints)
- [GeoIP and GeoLite database downloads](/geoip/updating-databases/#directly-downloading-databases)
- [GeoIP Legacy web services](/geoip/docs/web-services/legacy#per-service-uris)
- [GeoLite web services](/geoip/docs/web-services/requests#geolite-endpoints)

**Please note:** This enforcement also affects minFraud API requests. If you are
also a minFraud user,
[see our minFraud release note on this issue](/minfraud/release-notes/2024-03-13-api-policies-are-now-permanently-enforced/).
