+++
title = 'GeoNames Monthly Diff Report December 2023'
date = 2023-12-11T15:00:00Z
draft = false
legacy_anchor = 'geonames-monthly-diff-report-december-2023'
+++

[GeoNames Monthly Diff Report (December 2023)](/csv/GeoNames-Monthly-Diff-Report-December-2023.csv)

GeoIP2 and GeoLite2 databases incorporate
[GeoNames geographical data](https://www.geonames.org/), which is made available
under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

Monthly updates to GeoNames data are incorporated into our databases as we
refresh them. Above you will find a CSV report of these changes as they apply to
English place names for the month of December as they relate to the following
fields:

- `geoname_id`
- `country_name`
- `country_code`
- `city_name`
- `subdivision_1_iso_code`
- `subdivision_2_iso_code`

Note that the values for the `old_` and `new_` columns for a given field only
differ for the field defined in the `diff_in` column.

\* In this month's update there are a larger than usual number of changes,
including:

- change of the `country_name` from `Turkey` to `Türkiye`
- a number of Vietnamese locations updated to include non-ASCII characters (for
  example, `Tinh Lam GJong` is now `Lâm Đồng Province`)
- a large number of locations in Brazil and India have updated `geoname_id`s
