+++
title = 'Anycast flag available for GeoIP web services and databases'
date = 2023-12-11T16:00:00Z
draft = false
legacy_anchor = 'anycast-flag-available-for-geoip-web-services-and-databases'
+++

The Anycast data point is now available in all GeoIP web services and all MMDB
format databases. This includes GeoIP Country, GeoIP City, and GeoIP Enterprise.

For GeoIP web services and databases using the MMDB format, this is a
non-breaking change. However, you may need to update to the latest version of
your API to see the Anycast flag.

For CSV databases (including GeoLite Country and City CSV databases), the
Anycast flag will be released in the first database update after January
17, 2024. In most cases, this should also be a non-breaking change if your
integration can accommodate the addition of new fields. As a best practice, we
recommend checking your integration to confirm.

For more details, including what information the Anycast field will contain,
please
[read our previous release note on the Anycast flag](/geoip/release-notes/2023-12-07-anycast-flag-releasing-soon-for-geoip-web-services-and-databases/).
