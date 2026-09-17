+++
title = 'Geolocation Coordinate Bug Fix'
date = 2022-09-07T16:00:00Z
draft = false
legacy_anchor = 'geolocation-coordinate-bug-fix'
[build]
  list = 'never'
+++

We are aware of a bug in which databases and web services have been returning
[geolocation location coordinates](https://support.maxmind.com/knowledge-base/articles/maxmind-ip-geolocation-data#geolocation-area)
of 0,0 for IPv6 addresses which are geolocated only down to the country-level.

The following databases and web services are affected:

- GeoIP City database
- GeoIP Enterprise database
- GeoIP Legacy City web service
- GeoIP Legacy Omni/Insights web service
- GeoIP City Plus web service
- GeoIP Insights web service
- minFraud Insights web service
- minFraud Factors web service

We have a fix, and it will be released later today.

The updated GeoIP City database is now available for download.

Web service users will see the corrected data as soon as the fix has been
implemented.

We apologize for any inconvenience this may have caused.
