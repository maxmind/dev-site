+++
title = 'Anycast flag releasing soon for GeoIP web services and databases'
date = 2023-12-07T16:00:00Z
draft = false
legacy_anchor = 'anycast-flag-releasing-soon-for-geoip-web-services-and-databases'
+++

We’re adding a flag to identify Anycast networks in our GeoIP geolocation
databases to help identify instances where we might not provide geolocation for
a particular IP address due to Anycast routing.

Most home and office networks rely on Unicast routing, where every node on the
network is assigned a unique IP address. Anycast routing allows multiple servers
to share the same IP address.

**GeoIP web services**

The Anycast flag will be available in all GeoIP web services by the end of
December. For GeoIP web service users this will be a non-breaking change.

We will post a new release note once the Anycast data point is available.

**GeoIP databases**

The Anycast flag will have a staggered release for GeoIP geolocation database
users. The Anycast flag will be released for MMDB users by the end of December,
at the same that the flag is available in the GeoIP web services. The flag is a
non-breaking change for MMDB format database users.

The Anycast flag will be released in CSV format databases in mid-January, 2024.
In most cases, the addition of a new field to CSV databases should also be a
non-breaking change, but you should check your integration to make sure that it
can accommodate the addition of new fields.

The field will be present in the following GeoIP databases:

- GeoIP Country database
- GeoIP City database
- GeoIP Enterprise database

**GeoLite databases**

The Anycast field will also be added to the CSV version of GeoLite geolocation
databases, but the new field will be blank. This will allow the GeoIP databases
to continue to be drop in replacements for GeoLite databases, so that it's easy
to upgrade. The field will be present in the following GeoLite databases:

- GeoLite Country database
- GeoLite City database

**Preparing for updated CSV format databases**

MMDB format databases will be able to access the new data through our client
APIs. If you are a CSV user, the following details may be helpful in preparing
your integration for the new data.

- If you're not sure whether you're using the MMDB format, the CSV format, or
  both, you can
  [learn how to check your account's database download history to determine whether you are downloading CSV files on our Knowledge Base.](https://support.maxmind.com/knowledge-base/articles/review-download-history)

- The new field will be added to the Blocks CSV files:
  `{GeoIP2,GeoLite2}-{Enterprise,City,Country}-Blocks-IPv4.csv` and
  `{GeoIP2,GeoLite2}-{Enterprise,City,Country}-Blocks-IPv6.csv`
- The new field name will be `is_anycast`, will be added to the right of
  existing fields, and the cell will either contain 1 (if the network is an
  Anycast network) or be blank (if it is not). The overwhelming majority of
  networks are not Anycast, and so this field will be blank in most cases.

Please use the following example CSV files to test your integration:

- [GeoIP2-Enterprise-CSV_Example.zip](/examples/GeoIP2-Enterprise-CSV_Example.zip)
- [GeoIP2-City-CSV_Example.zip](/examples/GeoIP2-City-CSV_Example.zip)
- [GeoIP2-Country-CSV_Example.zip](/examples/GeoIP2-Country-CSV_Example.zip)

We have also updated our tutorials on importing GeoIP databases. Please see
relevant links below:

- [Importing to PostgreSQL](/geoip/importing-databases/postgresql)
- [Importing to MySQL](/geoip/importing-databases/mysql)
