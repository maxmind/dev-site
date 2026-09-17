+++
title = 'GeoNames Monthly Diff Report September 2023'
date = 2023-09-05T16:00:00Z
draft = false
legacy_anchor = 'geonames-monthly-diff-report-september-2023'
+++

[GeoNames Monthly Diff Report (September 2023)](/csv/GeoNames-Monthly-Diff-Report-September-2023.csv)

GeoIP2 and GeoLite2 databases incorporate
[GeoNames geographical data](https://www.geonames.org/), which is made available
under the
[Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/).

Monthly updates to GeoNames data are incorporated into our databases as we
refresh them. Above you will find a CSV report of these changes for the month of
September as they relate to the following fields:

- `geoname_id`
- `country_name`
- `country_code`
- `city_name`
- `subdivision_1_iso_code`
- `subdivision_2_iso_code`

Note that the values for the `old_` and `new_` columns for a given field only
differ for the field defined in the `diff_in` column.

\* **Please note:** Although we do not include information about `time_zone` in
our monthly Diff Reports, GeoNames is updating the time zones for a number of
locations in Ukraine. These updates will be reflected in our `time_zone` data,
which is present in all of our IP geolocation databases and web services.
