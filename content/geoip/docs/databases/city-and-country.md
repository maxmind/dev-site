---
draft: false
title: GeoIP2 and GeoLite City and Country Databases
---

Determine the country, subdivisions (regions), city, and postal code associated
with IPv4 and IPv6 addresses worldwide.

Terms and pricing for the GeoIP2 City and GeoIP2 Country databases may be found
on our product pages:

- [GeoIP2 City](https://www.maxmind.com/en/geoip2-city)
- [GeoIP2 Country](https://www.maxmind.com/en/geoip2-country)

{{< snippet "snippets/ip-geolocation-usage-warning.md" >}}
{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Databases

{{< snippet "snippets/binary-databases.md" >}}

{{< table >}}
| Language or Framework | Documentation                                                                      | Example                                                                |
| --------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| .NET (C#)             | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-dotnet#database-usage) | [City Example](https://github.com/maxmind/GeoIP2-dotnet#city-database) |
| Java                  | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-java#database-usage)   | [City Example](https://github.com/maxmind/GeoIP2-java#city)            |
| Node.js               | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-node#database-usage)   | [City Example](https://github.com/maxmind/GeoIP2-node#city-example)    |
| PHP                   | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-php#database-reader)  | [City Example](https://github.com/maxmind/GeoIP2-php#city-example)     |
| Python                | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-python#database-usage) | [City Example](https://github.com/maxmind/GeoIP2-python#city-database) |
| Ruby                  | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-ruby#database-reader) | [City Example](https://github.com/maxmind/GeoIP2-ruby#city-example)    |
{{</ table >}}

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
        <td><code>{GeoIP2,GeoLite2}-{City,Country}-Locations-{locale}.csv</code></td>
        <td>Eight CSV files containing data location for each locale code, where <code>{locale}</code> can be “de”, "en", “es”, “fr”, “ja”, “pt-BR”, “ru”, and “zh-CN” .</td>
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

[City subset by continent databases](https://www.maxmind.com/en/geoip2-city-database-by-continent)
blocks files have the same columns as the City database.

{{< csv-block-table isEnterprise="false" >}}

{{< snippet "snippets/coordinates-warning.md" >}}

### Locations Files

The zip file includes one location file for each locale code for which data is
available. There will always be an "en" file containing a record for every
`geoname_id` used in the blocks files. Files corresponding to other locales will
exist and have a record for a `geoname_id` only if data is available. The other
possible locales are "de", "es", "fr", "ja", "pt-BR", "ru", and "zh-CN".

These files are named `{GeoIP2,GeoLite2}-{City,Country}-Locations-{locale}.csv`.
An example name would be `GeoIP2-City-Locations-en.csv`.

[City subset by continent databases](https://www.maxmind.com/en/geoip2-city-database-by-continent)
blocks files have the same columns as the City database.

{{< csv-location-table isEnterprise="false" >}}

### Returned Values as Database, Map, Dict, or Hash Keys

{{< snippet "snippets/returned-values-as-keys.md" >}}

### Conversion Utility

{{< snippet "snippets/conversion-utility.md" >}}

## Example Files

{{< snippet "snippets/example-files.md" >}}

### CSV Example Files

{{< csv-example-files >}}
* [GeoIP2-City-CSV\_Example.zip](/static/GeoIP2-City-CSV_Example.zip)
* [GeoIP2-Country-CSV\_Example.zip](/static/GeoIP2-Country-CSV_Example.zip)
{{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}
* [GeoIP2-City-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-City-Test.mmdb)
* [GeoIP2-Country-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Country-Test.mmdb)
{{</ mmdb-example-files >}}

## Database Sizes

<DatabaseSizes dateRange = 'March to June 2024' databaseChanges ={[
    {
       databaseName: 'GeoIP City',
       csvSizeRange: '577 MB - 606 MB',
       mmdbSizeRange: '108 MB - 110 MB',
       ipv4Range: '657,000 - 682,000',
       ipv6Range: '231,000 - 250,000'
    },
    {
       databaseName: 'GeoIP Country',
       csvSizeRange: '29.2 MB - 30.8 MB',
       mmdbSizeRange: '6.29 MB - 6.53 MB',
       ipv4Range: '480,000 - 502,000',
       ipv6Range: '265,000 - 280,000'
    },
    {
       databaseName: 'GeoLite City',
       csvSizeRange: '226.2 MB - 292.7 MB',
       mmdbSizeRange: '50 MB - 63.8 MB',
       ipv4Range: '236,000 - 334,000',
       ipv6Range: '114,000 - 123,000'
    },
    {
       databaseName: 'GeoLite Country',
       csvSizeRange: '30 MB - 31.7 MB',
       mmdbSizeRange: '6.38 MB - 6.64 MB',
       ipv4Range: '480,000 - 490,000',
       ipv6Range: '280,000 - 308,000'
    }
  ]}
/>

## Database Changes

{{< database-changes product="City and Country" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
