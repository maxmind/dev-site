+++
title = 'Removal of deprecated fields'
date = 2025-02-10T16:00:00Z
draft = false
legacy_anchor = 'removal-of-deprecated-fields'
+++

We are removing the long-deprecated fields `is_anonymous_proxy` and
`is_satellite_provider` from all web services and all MMDB format databases.
This will be a non-breaking change.

These columns will be set to `0` for all rows in CSV-format databases.

The following services will be impacted:

- GeoIP Country database
- GeoIP City database
- GeoIP Enterprise database
