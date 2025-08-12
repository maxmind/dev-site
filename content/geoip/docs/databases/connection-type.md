---
draft: false
title: GeoIP Connection Type Databases
---

Determine the connection type of your visitors based on their IP address. The
database identifies cellular, cable/DSL, and corporate connection speeds.

To learn more about the GeoIP Connection Type database, including terms and
pricing, please
[visit the GeoIP Connection Type Database page](https://www.maxmind.com/en/geoip2-connection-type-database).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

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
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
    </tr>

    <tr>
        <td>network</td>
        <td>IP network as a string</td>
        <td>
          This is the IPv4 or IPv6 network in CIDR format such as
          “2.21.92.0/29” or “2001:4b0::/80”. We offer a utility to convert
          this column to start/end IPs or start/end integers. See <a
          href="#conversion-utility">the conversion utility section</a> for
          details.
        </td>
    </tr>

    <tr>
        <td>connection_type</td>
        <td>string</td>
        <td>
          One of the following values: <code>Cable/DSL</code>, <code>Cellular</code>, <code>Corporate</code>, or
          <code>Satellite</code>. Additional values may be added in the future.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN988THBX8RVERNTZ12BY2EC">Learn more about connection type data on our Knowledge Base.</a>
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
* [GeoIP2-Connection-Type-CSV\_Example.zip](/static/GeoIP2-Connection-Type-CSV_Example.zip)
{{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}
* [GeoIP2-Connection-Type-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Connection-Type-Test.mmdb)
{{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP ISP"
  csvSizeRange: "1.2 GB - 1.3 GB"
  mmdbSizeRange: "400 MB - 420 MB"
  ipv4Range: "10,000,000 - 10,500,000"
  ipv6Range: "1,200,000 - 1,300,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="Connection Type" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
