+++
title = 'GeoNames Monthly Diff Report August 2020'
date = 2020-08-10T16:00:00Z
draft = false
legacy_anchor = 'geonames-monthly-diff-report-august-2020'
+++

[GeoNames Monthly Diff Report (August 2020)](/csv/GeoNames-Monthly-Diff-Report-August-2020.csv)

GeoIP2 and GeoLite2 databases incorporate
[GeoNames geographical data](https://www.geonames.org/), which is made available
under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

Monthly updates to GeoNames data are incorporated into our databases as we
refresh them. Below you will find a CSV report of these changes for the month of
August as they relate to the following fields:

- `geoname_id`
- `country_name`
- `country_code`
- `city_name`
- `subdivision_1_iso_code`
- `subdivision_2_iso_code`

Note that the values for the 'old' and ‘new’ columns for a given field only
differ for the field defined in the ‘diff_in’ column.

\*GeoNames is changing the time zone for some larger cities in Northern Vietnam
to `Asia/Bangkok` instead of `Asia/Ho_Chi_Minh`, though the UTC offset remains
the same. For more info see
[this thread](https://groups.google.com/g/geonames/c/_xNFdHAy07o/m/cW8VWFjGAAAJ).
These changes will show up in this month's GeoIP2 builds.
