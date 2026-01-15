---
draft: false
title: GeoIP Enterprise Databases
---

Determine geolocation data such as country, region, state, city, ZIP/postal
code, and additional intelligence such as confidence factors, ISP, domain, and
connection type.

To learn more about the GeoIP Enterprise database, please visit the
[GeoIP Enterprise Database page](https://www.maxmind.com/en/geoip-enterprise-database).

If you are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

{{< snippet "snippets/ip-geolocation-usage-warning.md" >}}
{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Enterprise" exclude-table="true" >}}

The files in the zip archive are:

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
        <td><code>GeoIP2-Enterprise-Blocks-IPv4.csv</code></td>
        <td>CSV file containing data on IPv4 addresses</td>
      </tr>

      <tr>
        <td><code>GeoIP2-Enterprise-Blocks-IPv6.csv</code></td>
        <td>CSV file containing data on IPv6 addresses</td>
      </tr>

      <tr>
        <td><code>GeoIP2-Enterprise-ISP.csv</code></td>
        <td>
          CSV file containing data on ISPs. This may be cross referenced with
          the various blocks files using the shared <code>isp_id</code> key.
        </td>
      </tr>

      <tr>
        <td><code>GeoIP2-Enterprise-Locations-{locale}.csv</code></td>
        <td>
          CSV files containing data on locations. This may be cross referenced
          with the various blocks files using the shared
          <code>geoname_id</code> key.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These files are named `GeoIP2-Enterprise-Blocks-IPv4.csv` and
`GeoIP2-Enterprise-Blocks-IPv6.csv` respectively.

{{< csv-block-table isEnterprise="true" includeUtility="true">}}

{{< snippet "snippets/coordinates-warning.md" >}}

### ISP File

A single CSV file, called `GeoIP2-Enterprise-ISP.csv`, contains information on
ISPs.

{{< rawhtml >}}

<div class="table">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>isp_id</td>
        <td>integer</td>
        <td>
          The identifier for the ISP. This key can be cross referenced with the
          <code>isp_id</code> in the Blocks files.
        </td>
      </tr>
      <tr>
        <td>isp</td>
        <td>string</td>
        <td>The name of the ISP associated with the IP address.</td>
      </tr>
      <tr>
        <td>organization</td>
        <td>string</td>
        <td>The name of the organization associated with the IP address.</td>
      </tr>
      <tr>
        <td>autonomous_system_number</td>
        <td>integer</td>
        <td>The ASN assigned to the ISP for routing.</td>
      </tr>
      <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>The name of the autonomous system organization.</td>
      </tr>
      <tr>
        <td>connection_type</td>
        <td>string</td>
        <td>
          The type of connection. This will be one of the following values:
          <ul>
            <li><code>Cable/DSL</code></li>
            <li><code>Cellular</code></li>
            <li><code>Corporate</code></li>
            <li><code>Satellite</code></li>
          </ul>
        </td>
      </tr>

      <tr>
        <td>user_type</td>
        <td>string</td>
        <td>
          The user type associated with the IP address. This will be one of the
          following values:
          <ul>
            <li><code>business</code></li>
            <li><code>cafe</code></li>
            <li><code>cellular</code></li>
            <li><code>college</code></li>
            <li><code>consumer_privacy_network</code></li>
            <li><code>content_delivery_network</code></li>
            <li><code>government</code></li>
            <li><code>hosting</code></li>
            <li><code>library</code></li>
            <li><code>military</code></li>
            <li><code>residential</code></li>
            <li><code>router</code></li>
            <li><code>school</code></li>
            <li><code>search_engine_spider</code></li>
            <li><code>traveler</code></li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>mobile_country_code</td>
        <td>string</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
            >mobile country code (MCC)</a
          >
          associated with the IP address and ISP.
        </td>
      </tr>
      <tr>
        <td>mobile_network_code</td>
        <td>string</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
            >mobile network code (MNC)</a
          >
          associated with the IP address and ISP.
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Locations Files

The zip file includes one location file for each locale code for which data is
available. There will always be an "en" file containing a record for every
`geoname_id` used in the blocks files. Files corresponding to other locales will
exist and have a record for a `geoname_id` only if data is available. The other
possible locales are "de", "es", "fr", "ja", "pt-BR", "ru", and "zh-CN".

These files are named `GeoIP2-Enterprise-Locations-{locale}.csv`. An example
name would be `GeoIP2-Enterprise-Locations-en.csv`.

{{< csv-location-table isEnterprise="true" >}}

### Returned Values as Database, Map, Dict, or Hash Keys

{{< snippet "snippets/returned-values-as-keys.md" >}}

### Conversion Utility

{{< snippet "snippets/conversion-utility.md" >}}

## Example Files

{{< snippet "snippets/example-files.md" >}}

### CSV Example Files

{{< csv-example-files >}}

- [GeoIP2-Enterprise-CSV_Example.zip](/examples/GeoIP2-Enterprise-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-Enterprise-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Enterprise-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Changes

{{< database-changes product="Enterprise" >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP Enterprise"
  csvSizeRange: "986 MB - 1.05 GB"
  mmdbSizeRange: "344 MB - 358 MB"
  ipv4Range: "7,874,000 - 8,984,000"
  ipv6Range: "3,251,000 - 3,772,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
