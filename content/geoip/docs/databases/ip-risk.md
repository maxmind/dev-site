---
draft: false
title: GeoIP IP Risk Databases
---

Maxmind's GeoIP IP Risk database contains all IP networks associated with
non-corporate proxies, VPNs, and other anonymous IP addresses, and other IP
addresses associated with risky activity.

To learn more about the GeoIP IP Risk database, please see the
[GeoIP IP Risk database overview](https://get.maxmind.com/hubfs/Marketing/GeoIP%20IP%20Risk%20database/GeoIP%20IP%20Risk%20database%20product%20overview.pdf).
If you are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-IP-Risk" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-IP-Risk-Blocks-IPv4.csv` and
`GeoIP2-IP-Risk-Blocks-IPv6.csv` respectively.

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
        <td>ip_risk</td>
        <td>decimal</td>
        <td>
          This field contains the risk associated with the IP address. The value
          ranges from 0.01 to 99. A higher score indicates a higher risk.
          <br />
          <a
            href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FRRHZZP6TB1P6C99JFT16HCR"
          >
            Learn more about the IP risk score on our Knowledge Base.
          </a>
          <br />
          min: 0.01, max: 99
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

- [GeoIP2-IP-Risk-CSV_Example.zip](/static/GeoIP2-IP-Risk-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-IP-Risk-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-IP-Risk-Test.mmdb)
  {{</ mmdb-example-files >}}

<!-- ## Database Sizes -->

<!-- prettier-ignore-start -->

<!-- {{< db-sizes-table dateRange="August to October 2024" >}}
- databaseName: "GeoIP IP Risk"
  csvSizeRange: "TBD"
  mmdbSizeRange: "TBD"
  ipv4Range: "TBD"
  ipv6Range: "TBD"
{{< /db-sizes-table >}} -->

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="IP Risk" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
