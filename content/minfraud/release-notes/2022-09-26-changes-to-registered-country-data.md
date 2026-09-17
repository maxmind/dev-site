+++
title = 'Changes to Registered Country data'
date = 2022-09-26T16:00:00Z
draft = false
legacy_anchor = 'changes-to-registered-country-data'
[build]
  list = 'never'
+++

We have made some changes to how we determine the registered country associated
with an IP address. We estimate that this change will affect around 1% of IP
addresses with a registered country value. The following databases and web
services will be affected:

- GeoIP Country database
- GeoIP City database
- GeoIP Enterprise database
- GeoLite Country database
- GeoLite City database
- GeoIP Country web service
- GeoIP City Plus web service
- GeoIP Insights web service
- GeoLite Country web service
- GeoLite City web service
- minFraud Insights web service
- minFraud Factors web service

In some cases where we are no longer confident in the registered country for an
IP, it will be removed. In other cases, the value may be changed.

[You can learn more about the `/registered_country` output in the API schema for GeoIP web services.](/geoip/docs/web-services/responses#schema--response--registered-country)

[You can learn more about the difference between registered country and the IP geolocation on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/country-level-and-city-level-geolocation-maxmind)
