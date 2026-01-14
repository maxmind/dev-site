---
draft: false
title: GeoIP Anonymous Plus Databases
---

{{< alert warning >}} The GeoIP Anonymous Plus database is under active
development. New fields are expected to be added. Please design your
integrations to expect new fields, and ensure you monitor updates to our
[GeoIP release notes](/geoip/release-notes) to get notifications about new
fields and changes to existing ones. {{</ alert >}}

MaxMind's GeoIP Anonymous Plus database helps protect your business by
identifying anonymized proxy traffic and reducing false positives based on
confidence scores, timestamps, and VPN provider names.

To learn more about the GeoIP Anonymous Plus database, please visit the
[GeoIP Anonymous Plus Database page](https://www.maxmind.com/en/geoip-anonymous-plus-database).
If you are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP-Anonymous-Plus" exclude-table="false" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP-Anonymous-Plus-Blocks-IPv4.csv` and
`GeoIP-Anonymous-Plus-Blocks-IPv6.csv` respectively.

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
        <td>is_anonymous</td>
        <td>boolean</td>
        <td>
          1 if the IP address belongs to any sort of anonymous network. Blank if
          not.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#anon-detection"
            >Learn more about anonymizer and proxy detection on our Knowledge
            Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_anonymous_vpn</td>
        <td>boolean</td>
        <td>
          1 if the IP address is registered to an anonymous VPN provider. Blank
          if not. If a VPN provider does not register subnets under names
          associated with them, we will likely only flag their IP ranges using
          the
          <code>is_hosting_provider</code> flag.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#VPN"
            >Learn more about VPNs on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_hosting_provider</td>
        <td>boolean</td>
        <td>
          1 if the IP address belongs to a hosting or VPN provider (see
          description of <code>is_anonymous_vpn</code> flag). Blank if not.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#hosting-provider"
            >Learn more about hosting providers used for anonymizing on our
            Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_public_proxy</td>
        <td>boolean</td>
        <td>
          1 if the IP address belongs to a public proxy. Blank if not.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#public-proxies"
            >Learn more about public proxies on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_tor_exit_node</td>
        <td>boolean</td>
        <td>
          1 if the IP address is a Tor exit node. Blank if not.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#tor-exit-nodes"
            >Learn more about Tor exit nodes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_residential_proxy</td>
        <td>boolean</td>
        <td>
          1 if the IP address is on a suspected anonymizing network and belongs
          to a residential ISP. Blank if not.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#residential-proxies"
            >Learn more about residential proxies on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>provider_name</td>
        <td>string</td>
        <td>
          The name of the VPN provider (e.g., <code>nordvpn</code>,
          <code>surfshark</code>) associated with the network.
          <br />
          Please note that MaxMind identifies a subset of VPN providers. A
          current list of VPN providers identified in the Anonymous Plus
          database is available on request.
        </td>
      </tr>

      <tr>
        <td>anonymizer_confidence</td>
        <td>integer</td>
        <td>
          A score ranging from 1 to 99 that is our percent confidence that the
          network is currently part of an actively used VPN service.
          <br />
          Currently we will only provide values of 30 and 99, but the number of
          values will increase as we improve our confidence ratings.
        </td>
      </tr>

      <tr>
        <td>network_last_seen</td>
        <td>string</td>
        <td>
          The last day that the network was sighted in our analysis of
          anonymized networks. This is in the ISO 8601 date format.
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

- [GeoIP-Anonymous-Plus-CSV_Example.zip](/static/GeoIP-Anonymous-Plus-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP-Anonymous-Plus-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP-Anonymous-Plus-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Sizes

<!-- prettier-ignore-start -->

{{< db-sizes-table dateRange="March to April 2025" >}}
- databaseName: "GeoIP Anonymous Plus"
  csvSizeRange: "330 MB - 340 MB"
  mmdbSizeRange: "285 MB - 295 MB"
  ipv4Range: "9,400,000 - 9,500,000"
  ipv6Range: "114,000 - 118,000"
{{< /db-sizes-table >}}

<!-- prettier-ignore-end -->

## Database Changes

{{< database-changes product="Anonymous Plus" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
