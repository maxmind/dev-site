---
draft: false
title: GeoIP IP Risk Databases
---

MaxMind's GeoIP IP Risk database contains IP networks associated with
non-corporate proxies, VPNs, and other anonymous IP addresses, as well as IP
addresses associated with risky activity.

To learn more about the GeoIP IP Risk database, please see the
[GeoIP IP Risk database overview](https://get.maxmind.com/hubfs/Marketing/GeoIP%20IP%20Risk%20database/GeoIP%20IP%20Risk%20database%20product%20overview.pdf).
If you are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

Binary databases make use of the
[MaxMind DB file format](https://maxmind.github.io/MaxMind-DB/).

You can use the [mmdbinspect tool](https://github.com/maxmind/mmdbinspect) (in
beta), a command line interface built with Go, to look up one or more IPs from
one or more MMDB databases and receive output in a parsable JSON format.

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
            href="https://support.maxmind.com/knowledge-base/articles/minfraud-ip-risk-score"
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

## Database Changes

{{< database-changes product="IP Risk" >}}
