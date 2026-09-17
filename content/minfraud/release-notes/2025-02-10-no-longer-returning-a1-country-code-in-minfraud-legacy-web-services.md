+++
title = 'No longer returning A1 country code in minFraud legacy web services'
date = 2025-02-10T16:00:00Z
draft = false
legacy_anchor = 'no-longer-returning-a1-country-code-in-minfraud-legacy-web-services'
[build]
  list = 'never'
+++

For minFraud legacy web services, we will no longer return `A1` as a country
code.

This change is due to the removal of long-deprecated fields in our GeoIP
databases.
[See our GeoIP release note for more information](/geoip/release-notes/2025/#removal-of-deprecated-fields).
