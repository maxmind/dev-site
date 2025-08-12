---
draft: false
title: GeoIP Domain Databases
---

Look up the second level domain names associated with IPv4 and IPv6 addresses.

To learn more about the GeoIP Domain database, including terms and pricing,
please
[visit the GeoIP Domain Database page](https://www.maxmind.com/en/geoip2-domain-name-database).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Domain" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Domain-Blocks-IPv4.csv` and
`GeoIP2-Domain-Blocks-IPv6.csv` respectively.

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
        <td>domain</td>
        <td>string</td>
        <td>
          The domain associated with the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN98A5BNTS0GGWTD2QA4AHXN">Learn more about domain name data on our Knowledge Base.</a>
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

- [GeoIP2-Domain-CSV_Example.zip](/static/GeoIP2-Domain-Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-Domain-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Domain-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP Domain"
  csvSizeRange: "18.07 MB - 18.36 MB"
  mmdbSizeRange: "10.4 MB - 10.6 MB"
  ipv4Range: "509,000 - 516,000"
  ipv6Range: "109,000 - 112,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="Domain" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
