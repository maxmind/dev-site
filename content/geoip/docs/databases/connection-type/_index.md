---
draft: false
title: GeoIP Connection Type Databases
---

Determine the connection type of your visitors based on their IP address. The
database identifies cellular, cable/DSL, corporate, and satellite connection types.

To learn more about the GeoIP Connection Type database, including terms and
pricing, please
[visit the GeoIP Connection Type Database page](https://www.maxmind.com/en/geoip-databases).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

[Learn about the fields in the binary version of this database on our binary
database field reference page.](binary/)

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Connection-Type" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Connection-Type-Blocks-IPv4.csv` and
`GeoIP2-Connection-Type-Blocks-IPv6.csv` respectively.

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Data field name</th>
        <th>Type</th>
        <th>Data field description</th>
      </tr>

      <tr>
        <td>network</td>
        <td>IP network as a string</td>
        <td>
          This is the IPv4 or IPv6 network in CIDR format such as “2.21.92.0/29”
          or “2001:4b0::/64”. We offer a utility to convert this column to
          start/end IPs or start/end integers. See
          <a href="#conversion-utility">the conversion utility section</a> for
          details.
        </td>
      </tr>

      <tr>
        <td>connection_type</td>
        <td>string</td>
        <td>
          <p>
            One of the following values: <code>Cable/DSL</code>,
            <code>Cellular</code>, <code>Corporate</code>, or
            <code>Satellite</code>. Additional values may be added in the
            future.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#connection-type-data"
              >Learn more about connection type data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

### Conversion Utility

{{< snippet "snippets/conversion-utility.md" >}}

## Example Files

{{< snippet "snippets/example-files.md" >}}

### CSV Example Files

{{< csv-example-files >}}

- [GeoIP2-Connection-Type-CSV_Example.zip](/examples/GeoIP2-Connection-Type-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-Connection-Type-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Connection-Type-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="May to August 2026" >}}
- databaseName: "GeoIP Connection Type"
  csvSizeRange: "47.6 MB - 62.3 MB"
  mmdbSizeRange: "12.8 MB - 16.1 MB"
  ipv4Range: "1,106,000 - 1,667,000"
  ipv6Range: "556,000 - 582,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="Connection Type" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
