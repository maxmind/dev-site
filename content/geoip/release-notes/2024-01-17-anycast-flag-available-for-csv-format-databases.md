+++
title = 'Anycast flag available for CSV format databases'
date = 2024-01-17T15:00:00Z
draft = false
legacy_anchor = 'anycast-flag-available-for-csv-format-databases'
+++

The Anycast data point is now available in all CVS format databases—and, as
[announced in a prior release note](/geoip/release-notes/2023#anycast-flag-available-for-geoip-web-services-and-databases),
it’s also available in all GeoIP web services and all MMDB format databases.

In most cases, the addition of a new field to CSV databases should be a
non-breaking change, but we recommend checking your integration to make sure
that it can accommodate the addition of new fields.

The field is present in the following GeoIP databases:

- GeoIP Country database
- GeoIP City database
- GeoIP Enterprise database

**GeoLite databases**

The Anycast field has also been added to the CSV version of GeoLite geolocation
databases, but the new field is intentionally blank. This allows the GeoIP
databases to continue to be drop-in replacements for GeoLite databases, so that
it's easy to upgrade.

The field is present in the following GeoLite databases:

- GeoLite Country database
- GeoLite City database

**Confirming your integration allows for new data points**

The new field has been added to the Blocks CSV files:
`{GeoIP2,GeoLite2}-{Enterprise,City,Country}-Blocks-IPv4.csv` and
`{GeoIP2,GeoLite2}-{Enterprise,City,Country}-Blocks-IPv6.csv`

The new field name, `is_anycast`, has been added to the right of existing fields
and the cell will either contain 1 (if the network is an Anycast network) or be
blank (if it is not). The overwhelming majority of networks are not Anycast, and
so this field will be blank in most cases.

If you're not sure whether you're using the MMDB format, the CSV format, or
both, you can
[learn how to check your account's database download history to determine whether you are downloading CSV files](https://support.maxmind.com/knowledge-base/articles/review-download-history).

Please use the following example CSV files to test your integration:

- [GeoIP Enterprise example files](/geoip/docs/databases/enterprise/#csv-example-files)
- [GeoIP City and Country example files](/geoip/docs/databases/city-and-country/#csv-example-files)

We have also updated our tutorials on importing GeoIP databases. Please see
relevant links below:

- [Importing to PostgreSQL](/geoip/importing-databases/postgresql)
- [Importing to MySQL](/geoip/importing-databases/mysql)
