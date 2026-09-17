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

**What do I need to do?** If you download GeoIP or GeoLite databases and you use
an up to date version of
[our `geoipupdate` program](/geoip/updating-databases#using-geoip-update), you
do not need to take any action.

If you are using web services, or if you do direct downloads of GeoIP or GeoLite
databases, you should ensure that you are using the correct hostname for your
API requests, and that you are using HTTPS, prior to October 17, 2023. You can
view the appropriate URIs for GeoIP and GeoLite services and downloads on our
Developer Portal using the links below:

- [GeoIP Country, City Plus, and Insights web services](/geoip/docs/web-services/requests#geoip-endpoints)
- [GeoIP and GeoLite database downloads](/geoip/updating-databases/#directly-downloading-databases)
- [GeoIP Legacy web services](/geoip/docs/web-services/legacy#per-service-uris)
- [GeoLite web services](/geoip/docs/web-services/requests#geolite-endpoints)

**Please note:** This enforcement will also affect minFraud API requests. If you
are also a minFraud user, see
[our minFraud release note on this issue.](/minfraud/release-notes/2023-08-17-api-policies-temporary-enforcement-on-october-17-2023/)
