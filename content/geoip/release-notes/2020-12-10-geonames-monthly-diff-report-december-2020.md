+++
title = 'GeoNames Monthly Diff Report December 2020'
date = 2020-12-10T16:00:00Z
draft = false
legacy_anchor = 'geonames-monthly-diff-report-december-2020'
+++

[GeoNames Monthly Diff Report (December 2020)](/csv/GeoNames-Monthly-Diff-Report-December-2020.csv)

GeoIP2 and GeoLite2 databases incorporate
[GeoNames geographical data](https://www.geonames.org/), which is made available
under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

Monthly updates to GeoNames data are incorporated into our databases as we
refresh them. Above you will find a CSV report of these changes for the month of
December as they relate to the following fields:

- `geoname_id`
- `country_name`
- `country_code`
- `city_name`
- `subdivision_1_iso_code`
- `subdivision_2_iso_code`

Note that the values for the 'old' and ‘new’ columns for a given field only
differ for the field defined in the ‘diff_in’ column.

\* We have updated the names of several countries to their short names (e.g.
`Republic of Lithuania` to `Lithuania`). These changes will show up in this
month's GeoIP2 builds.
