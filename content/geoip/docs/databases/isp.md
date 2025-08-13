---
draft: false
title: GeoIP ISP Databases
---

Determine the Internet Service Provider, organization name, and autonomous
system organization and number associated with an IP address.

To learn more about the GeoIP ISP database, including terms and pricing, please
[visit the GeoIP ISP Database page](https://www.maxmind.com/en/geoip2-isp-database).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-ISP" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-ISP-Blocks-IPv4.csv` and `GeoIP2-ISP-Blocks-IPv6.csv`
respectively.

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
          This is the IPv4 or IPv6 network in CIDR format such as “2.21.92.0/29”
          or “2001:4b0::/80”. We offer a utility to convert this column to
          start/end IPs or start/end integers. See
          <a href="#conversion-utility">the conversion utility section</a> for
          details.
        </td>
      </tr>

      <tr>
        <td>isp</td>
        <td>string</td>
        <td>
          The name of the ISP associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989KHXR7TGXPB5T2DK0Q77"
            >Learn more about ISP data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>organization</td>
        <td>string</td>
        <td>
          The name of the organization associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989KHXR7TGXPB5T2DK0Q77"
            >Learn more about organization data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>autonomous_system_number</td>
        <td>integer</td>
        <td>
          The
          <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)"
            >autonomous system</a
          >
          number associated with the IP address.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW"
            >Learn more about autonomous system data on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>
          The organization associated with the registered autonomous system
          number for the IP address.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW"
            >Learn more about autonomous system data on our Knowledge Base.</a
          >
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
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FT6Y6ANRH9GWYXE78B4RXAEX"
            >Learn more about mobile country codes on our Knowledge Base.</a
          >
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

          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FT6Y6ANRH9GWYXE78B4RXAEX"
            >Learn more about mobile network codes on our Knowledge Base.</a
          >
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

- [GeoIP2-ISP-CSV_Example.zip](/static/GeoIP2-ISP-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-ISP-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-ISP-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP ISP"
  csvSizeRange: "78.7 MB - 83.9 MB"
  mmdbSizeRange: "14.5 MB - 15 MB"
  ipv4Range: "713,000 - 744,000"
  ipv6Range: "241,000 - 269,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="ISP" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
