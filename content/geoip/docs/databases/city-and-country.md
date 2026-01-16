---
draft: false
title: GeoIP and GeoLite City and Country Databases
---

Determine the country, subdivisions (regions), city, and postal code associated
with IPv4 and IPv6 addresses worldwide.

Terms and pricing for the GeoIP City and GeoIP Country databases may be found on
our product pages:

- [GeoIP City](https://www.maxmind.com/en/geoip-databases)
- [GeoIP Country](https://www.maxmind.com/en/geoip-databases)

{{< snippet "snippets/ip-geolocation-usage-warning.md" >}}
{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Databases

{{< snippet "snippets/binary-databases.md" >}}

## CSV Databases

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="{GeoIP2,GeoLite2}-{City,Country}" exclude-table="true" >}}

The downloaded .zip file contains a single directory which in turn contains 13
files:

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Filename</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>COPYRIGHT.txt</code></td>
        <td>Copyright statement</td>
      </tr>

      <tr>
        <td><code>LICENSE.txt</code></td>
        <td>End user license</td>
      </tr>

      <tr>
        <td><code>README.txt</code></td>
        <td>Information file</td>
      </tr>

      <tr>
        <td><code>{GeoIP2,GeoLite2}-{City,Country}-Blocks-IPv4.csv</code></td>
        <td>CSV file containing data on IPv4 addresses</td>
      </tr>

      <tr>
        <td><code>{GeoIP2,GeoLite2}-{City,Country}-Blocks-IPv6.csv</code></td>
        <td>CSV file containing data on IPv6 addresses</td>
      </tr>

      <tr>
        <td>
          <code>{GeoIP2,GeoLite2}-{City,Country}-Locations-{locale}.csv</code>
        </td>
        <td>
          Eight CSV files containing data on locations for each locale code,
          where <code>{locale}</code> can be “de”, "en", “es”, “fr”, “ja”,
          “pt-BR”, “ru”, and “zh-CN”.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These files are named `{GeoIP2,GeoLite2}-{City,Country}-Blocks-IPv4.csv` and
`{GeoIP2,GeoLite2}-{City,Country}-Blocks-IPv6.csv` respectively. An example name
would be `GeoIP2-City-Blocks-IPv4.csv`.

[City subset by continent databases](https://www.maxmind.com/en/geoip-databases)
blocks files have the same columns as the City database.

{{< csv-block-table isEnterprise="false" includeUtility="true">}}

{{< snippet "snippets/coordinates-warning.md" >}}

### Locations Files

The zip file includes one location file for each locale code for which data is
available. There will always be an "en" file containing a record for every
`geoname_id` used in the blocks files. Files corresponding to other locales will
exist and have a record for a `geoname_id` only if data is available. The other
possible locales are "de", "es", "fr", "ja", "pt-BR", "ru", and "zh-CN".

These files are named `{GeoIP2,GeoLite2}-{City,Country}-Locations-{locale}.csv`.
An example name would be `GeoIP2-City-Locations-en.csv`.

[City subset by continent databases](https://www.maxmind.com/en/geoip-databases)
locations files have the same columns as the City database.

{{< csv-location-table isEnterprise="false" >}}

### Returned Values as Database, Map, Dict, or Hash Keys

{{< snippet "snippets/returned-values-as-keys.md" >}}

### Conversion Utility

{{< snippet "snippets/conversion-utility.md" >}}

## Example Files

{{< snippet "snippets/example-files.md" >}}

### CSV Example Files

{{< csv-example-files >}}

- [GeoIP2-City-CSV_Example.zip](/examples/GeoIP2-City-CSV_Example.zip)
- [GeoIP2-Country-CSV_Example.zip](/examples/GeoIP2-Country-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-City-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-City-Test.mmdb)
- [GeoIP2-Country-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Country-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP City"
  csvSizeRange: "583 MB - 637 MB"
  mmdbSizeRange: "108 MB - 113 MB"
  ipv4Range: "6,360,000 - 7,260,000"
  ipv6Range: "2,580,000 - 2,970,000"

- databaseName: "GeoIP Country"
  csvSizeRange: "30.2 MB - 35.6 MB"
  mmdbSizeRange: "6.57 MB - 7.16 MB"
  ipv4Range: "482,000 - 505,000"
  ipv6Range: "284,000 - 389,000"

- databaseName: "GeoLite City"
  csvSizeRange: "231.5 MB - 265.0 MB"
  mmdbSizeRange: "50.8 MB - 54.2 MB"
  ipv4Range: "2,370,000 - 3,400,000"
  ipv6Range: "1,200,000 - 1,670,000"

- databaseName: "GeoLite Country"
  csvSizeRange: "30.6 MB - 38.2 MB"
  mmdbSizeRange: "6.61 MB - 7.57 MB"
  ipv4Range: "478,000 - 496,000"
  ipv6Range: "297,000 - 476,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="City and Country" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
