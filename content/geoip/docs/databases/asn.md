---
draft: false
title: GeoLite2 ASN Database
---

Look up the autonomous system number and autonomous system organization
associated with IPv4 and IPv6 addresses.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

{{< table >}}
| Language or Framework | Documentation                                                                      | Example                                                              |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| .NET (C#)             | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-dotnet#database-usage) | [ASN Example](https://github.com/maxmind/GeoIP2-dotnet#asn)          |
| Java                  | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-java#database-usage)   | [ASN Example](https://github.com/maxmind/GeoIP2-java#asn)            |
| Node.js               | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-node#database-usage)   | [ASN Example](https://github.com/maxmind/GeoIP2-node#asn-example)    |
| PHP                   | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-php#database-reader)  | &bull;                                                               |
| Python                | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-python#database-usage) | [ASN Example](https://github.com/maxmind/GeoIP2-python#asn-database) |
| Ruby                  | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-ruby#database-reader) | [ASN Example](https://github.com/maxmind/GeoIP2-ruby#asn-example)    |
{{</ table >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoLite2 ASN" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoLite2-ASN-Blocks-IPv4.csv` and
`GeoLite2-ASN-Blocks-IPv6.csv` respectively.

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
        <td>autonomous_system_number</td>
        <td>integer</td>
        <td>
          The <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)">autonomous system</a> number associated with the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW">Learn more about autonomous system data on our Knowledge Base.</a>
        </td>
    </tr>

    <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>
          The organization associated with the registered autonomous system
          number for the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW">Learn more about autonomous system data on our Knowledge Base.</a>
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
* [GeoLite2-ASN-CSV\_Example.zip](/static/GeoLite2-ASN-CSV_Example.zip)
{{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}
* [GeoLite2-ASN-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoLite2-ASN-Test.mmdb)
{{</ mmdb-example-files >}}

## Database Sizes

{{< db-sizes-table dateRange="March to June 2024" >}}
  {{< db-sizes-row
    databaseName="GeoLite ASN"
    csvSizeRange="27.69 MB - 28.09 MB"
    mmdbSizeRange="8.41 MB - 8.56 MB"
    ipv4Range="505,000 - 510,000"
    ipv6Range="131,000 - 137,000"
  >}}
{{</ db-sizes-table >}}

## Database Changes

{{< database-changes product="ASN" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
