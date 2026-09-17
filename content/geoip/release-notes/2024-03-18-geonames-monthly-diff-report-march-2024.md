+++
title = 'GeoNames monthly diff report March 2024'
date = 2024-03-18T16:00:00Z
draft = false
legacy_anchor = 'geonames-monthly-diff-report-march-2024'
+++

[GeoNames monthly diff report (March 2024)](/csv/GeoNames-Monthly-Diff-Report-March-2024.csv)

GeoIP and GeoLite databases incorporate
[GeoNames geographical data](https://www.geonames.org/), which is made available
under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

Monthly updates to GeoNames data are incorporated into our databases as we
refresh them. Above you will find a CSV report of these changes as they apply to
English place names for the month of March as they relate to the following
fields:

- `geoname_id`
- `country_name`
- `country_code`
- `city_name`
- `subdivision_1_iso_code`
- `subdivision_2_iso_code`

Note that the values for the `old_` and `new_` columns for a given field only
differ for the field defined in the `diff_in` column.

\* In this month's update a large number of cities in Israel have improved place
names.

In 2020, Norway merged a number of their subdivisions, but this proved unpopular
and they have now unmerged these subdivisions. We have used the ISO subdivision
codes for these subdivisions from before the 2020 change. The ISO subdivision
codes we will be using for these subdivisions are reflected in this diff report.
