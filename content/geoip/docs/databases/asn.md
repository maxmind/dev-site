---
draft: false
title: GeoLite ASN Databases
---

Look up the autonomous system number and autonomous system organization
associated with IPv4 and IPv6 addresses.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoLite2-ASN" >}}

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
          This is the IPv4 or IPv6 network in CIDR format such as “2.21.92.0/29”
          or “2001:4b0::/80”. We offer a utility to convert this column to
          start/end IPs or start/end integers. See
          <a href="#conversion-utility">the conversion utility section</a> for
          details.
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
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
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
            href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
            >Learn more about autonomous system data on our Knowledge Base.</a
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

- [GeoLite2-ASN-CSV_Example.zip](/examples/GeoLite2-ASN-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoLite2-ASN-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoLite2-ASN-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoLite ASN"
  csvSizeRange: "28.05 MB - 28.38 MB"
  mmdbSizeRange: "8.52 MB - 8.64 MB"
  ipv4Range: "508,000 - 516,000"
  ipv6Range: "137,000 - 140,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="ASN" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
