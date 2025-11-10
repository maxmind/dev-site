---
draft: false
title: GeoIP User Count Databases
---

The GeoIP User Count database provides insight into the number of expected users
on an IP address and on the associated subnet during the past 24 hours, helping
identify a variety of fraud including unauthorized access to content and click
fraud.

To learn more about the GeoIP User Count database, including terms and pricing,
please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-User-Count" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-User-Count-Blocks-IPv4.csv` and
`GeoIP2-User-Count-Blocks-IPv6.csv` respectively.

{{< alert warning >}} Please note that the CSV version of the GeoIP User Count
database contains separate CSV files covering the IPv4 and IPv6 space. All the
fields listed below are present as columns in both CSV files, but the values
associated with IPv6 fields in the IPv4 file will be `null`, and the IPv4 fields
in the IPv6 file will be `null`. {{</ alert >}}

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
        <td>ipv4_32</td>
        <td>integer</td>
        <td>
          The estimated number of users sharing the IPv4 address during the past
          24 hours. This is not an exact count of individual users but rather a
          normalized value.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP68K7MXP0H3EJ273ED"
          >
            Learn more about the normalization and values of the user count on
            our Knowledge Base.
          </a>
        </td>
      </tr>

      <tr>
        <td>ipv6_64</td>
        <td>integer</td>
        <td>
          The estimated number of users sharing the IPv6 /64 network during the
          past 24 hours. IPv6 /64 networks are usually assigned to individual
          households and can be considered similar from a user perspective to an
          individual IPv4 address. This is not an exact count of individual
          users but rather a normalized value.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP68K7MXP0H3EJ273ED"
          >
            Learn more about the normalization and values of the user count on
            our Knowledge Base.
          </a>
        </td>
      </tr>

      <tr>
        <td>ipv4_24</td>
        <td>integer</td>
        <td>
          The estimated number of users sharing the IPv4 /24 network that the IP
          address is contained within during the past 24 hours. This is not an
          exact count of individual users but rather a normalized value.
          <br />
          These values should be greater than the values provided in ipv4_32
          because they are representative of the number of users across a larger
          number of IP addresses.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP68K7MXP0H3EJ273ED"
          >
            Learn more about the normalization and values of the user count on
            our Knowledge Base.
          </a>
        </td>
      </tr>

      <tr>
        <td>ipv6_48</td>
        <td>integer</td>
        <td>
          The estimated number of users sharing the IPv6 /48 network that the IP
          address is contained within during the past 24 hours. This is not an
          exact count of individual users but rather a normalized value.
          <br />
          These values should be greater than the values provided in ipv6_64
          because they are representative of the number of users across a larger
          number of IP addresses.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP68K7MXP0H3EJ273ED"
          >
            Learn more about the normalization and values of the user count on
            our Knowledge Base.
          </a>
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

- [GeoIP2-User-Count-CSV_Example.zip](/static/GeoIP2-User-Count-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-User-Count-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-User-Count-Test.mmdb)
  {{</ mmdb-example-files >}}

<!-- ## Database Sizes -->

<!-- prettier-ignore-start -->

<!-- {{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP User Count"
  csvSizeRange: "TBD"
  mmdbSizeRange: "TBD"
  ipv4Range: "TBD"
  ipv6Range: "TBD"
{{< /db-sizes-table >}} -->

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="User Count" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
