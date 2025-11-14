---
draft: false
title: GeoIP Static IP Score Databases
---

This database indicates how static or dynamic an IP address is, which can be
useful for deciding whether an IP address represents the same user over time.

To learn more about the GeoIP Static IP Score database, including terms and
pricing, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Static-IP-Score" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Static-IP-Score-Blocks-IPv4.csv` and
`GeoIP2-Static-IP-Score-Blocks-IPv6.csv` respectively.

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
          "2.125.160.216/29" or "2001:c50::/32". We offer a utility to convert
          this column to start/end IPs or start/end integers. See
          <a href="#conversion-utility">the conversion utility section</a> for
          details.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989KWHZG902R63XSJ786RK"
          >
            Learn more about the network column on our Knowledge Base.
          </a>
        </td>
      </tr>

      <tr>
        <td>static_ip_score</td>
        <td>decimal</td>
        <td>
          An indicator of how static or dynamic an IP address is. The value
          ranges from 0 to 99.99 with higher values meaning a greater static
          association. For example, many IP addresses with a user_type of
          cellular have a score under one. Broadband IPs that don't change very
          often typically have a score above thirty.
          <br />
          This indicator can be useful for deciding whether an IP address
          represents the same user over time.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP6XQC228W34VCJV88P"
          >
            Learn more about the static IP score on our Knowledge Base.
          </a>
          <br />
          min: 0, max: 99.99
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

- [GeoIP2-Static-IP-Score-CSV_Example.zip](/static/GeoIP2-Static-IP-Score-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-Static-IP-Score-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Static-IP-Score-Test.mmdb)
  {{</ mmdb-example-files >}}

<!-- ## Database Sizes -->

<!-- prettier-ignore-start -->

<!-- {{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP Static IP Score"
  csvSizeRange: "TBD"
  mmdbSizeRange: "TBD"
  ipv4Range: "TBD"
  ipv6Range: "TBD"
{{< /db-sizes-table >}} -->

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="Static IP Score" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
