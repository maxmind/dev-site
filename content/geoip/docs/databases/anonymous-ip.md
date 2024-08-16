---
draft: false
title: GeoIP2 Anonymous IP Databases
---

MaxMind's GeoIP2 Anonymous IP CSV database helps protect your business by
identifying proxy, VPN, hosting, and other anonymous IP addresses.

To learn more about the GeoIP2 Anonymous IP database, please visit the
[GeoIP2 Anonymous IP Database page](https://www.maxmind.com/en/solutions/geoip2-enterprise-product-suite/anonymous-ip-database).
If you are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/geoip2-enterprise-product-suite#signUp)
for assistance.

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

{{< table >}}
| Language or Framework | Documentation                                                                      | Example                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| .NET (C#)             | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-dotnet#database-usage) | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-dotnet#anonymous-ip-database)       |
| Java                  | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-java#database-usage)   | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-java#anonymous-ip)                  |
| Node.js               | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-node#database-usage)   | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-node#anonymous-ip-database-example) |
| PHP                   | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-php#database-reader)  | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-php#anonymous-ip-example)           |
| Python                | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-python#database-usage) | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-python#anonymous-ip-database)       |
| Ruby                  | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-ruby#database-reader) | [Anonymous IP Example](https://github.com/maxmind/GeoIP2-ruby#anonymous-ip-example)          |
{{</ table >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Anonymous-IP" exclude-table="false" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Anonymous-IP-Blocks-IPv4.csv` and
`GeoIP2-Anonymous-IP-Blocks-IPv6.csv` respectively.

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
          <td>is_anonymous</td>
          <td>boolean</td>
          <td>
            1 if the IP address belongs to any sort of anonymous network. Blank if not.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163-Anonymizer-and-Proxy-Data#h_01FN9BBGV3ZG3TC0357Q9Y07C6">Learn more about anonymizer and proxy detection on our Knowledge Base.</a>
          </td>
      </tr>

      <tr>
          <td>is_anonymous_vpn</td>
          <td>boolean</td>
          <td>
            1 if the IP address is registered to an anonymous VPN provider. Blank if not.

            If a VPN provider does not register subnets under names associated with
            them, we will likely only flag their IP ranges using the
            <code>is_hosting_provider</code> flag.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163#h_01G1EDVJKNQY02XXFRM31N7SS2">Learn more about VPNs on our Knowledge Base.</a>
          </td>
      </tr>

      <tr>
          <td>is_hosting_provider</td>
          <td>boolean</td>
          <td>
            1 if the IP address belongs to a hosting or VPN provider (see
            description of <code>is_anonymous_vpn</code> flag). Blank if not.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163#h_01G1EDVXR9RQFMCY6SAWJM4YH0">Learn more about hosting providers used for anonymizing on our Knowledge Base.</a>
          </td>
      </tr>

      <tr>
          <td>is_public_proxy</td>
          <td>boolean</td>
          <td>
            1 if the IP address belongs to a public proxy. Blank if not.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163#h_01G1EDW5RZQCD4X4A76908DJ6Z">Learn more about public proxies on our Knowledge Base.</a>
          </td>
      </tr>

      <tr>
          <td>is_tor_exit_node</td>
          <td>boolean</td>
          <td>
            1 if the IP address is a Tor exit node. Blank if not.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163#h_01G1EDWR1VQR8A0NB3R8WXT8QF">Learn more about Tor exit nodes on our Knowledge Base.</a>
          </td>
      </tr>

      <tr>
          <td>is_residential_proxy</td>
          <td>boolean</td>
          <td>
            1 if the IP address is on a suspected anonymizing network and belongs
            to a residential ISP. Blank if not.
            <br />
            <a href="https://support.maxmind.com/hc/en-us/articles/4408208507163#h_01G1EDWEW3HAJT97P8EAZFQZMZ">Learn more about residential proxies on our Knowledge Base.</a>
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
* [GeoIP2-Anonymous-IP-CSV\_Example.zip](/static/GeoIP2-Anonymous-IP-CSV_Example.zip)
{{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}
* [GeoIP2-Anonymous-IP-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Anonymous-IP-Test.mmdb)
{{</ mmdb-example-files >}}

## Database Sizes

{{< db-sizes-table dateRange="March to June 2024" >}}
  {{< db-sizes-row
    databaseName="GeoIP Anonymous IP"
    csvSizeRange="4.31 MB - 4.75 MB"
    mmdbSizeRange="2.69 MB - 2.87 MB"
    ipv4Range="155,000 - 166,000"
    ipv6Range="19,000 - 26,000"
  >}}
{{</ db-sizes-table >}}

## Database Changes

{{< database-changes product="Anonymous IP" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}