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

[Learn about the fields in the binary version of this database on our binary
database field reference page.](binary/)

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
          <p>
            This field contains the risk associated with the IP address. The
            value ranges from 0.01 to 99. A higher score indicates a higher
            risk.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/minfraud-ip-risk-score"
            >
              Learn more about the IP risk score on our Knowledge Base.
            </a>
          </p>
          <p>min: 0.01, max: 99</p>
        </td>
      </tr>

      <tr>
        <td>is_anonymous</td>
        <td>boolean</td>
        <td>
          <p>
            1 if the IP address belongs to any sort of anonymous network. Blank
            if not.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#anon-detection"
              >Learn more about anonymizer and proxy detection on our Knowledge
              Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_anonymous_vpn</td>
        <td>boolean</td>
        <td>
          <p>
            1 if the IP address is registered to an anonymous VPN provider.
            Blank if not. If a VPN provider does not register subnets under
            names associated with them, we will likely only flag their IP ranges
            using the
            <code>is_hosting_provider</code> flag.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#VPN"
              >Learn more about VPNs on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_hosting_provider</td>
        <td>boolean</td>
        <td>
          <p>
            1 if the IP address belongs to a hosting provider. Blank if not.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#hosting-provider"
              >Learn more about hosting providers used for anonymizing on our
              Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_public_proxy</td>
        <td>boolean</td>
        <td>
          <p>1 if the IP address belongs to a public proxy. Blank if not.</p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#public-proxies"
              >Learn more about public proxies on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_tor_exit_node</td>
        <td>boolean</td>
        <td>
          <p>1 if the IP address is a Tor exit node. Blank if not.</p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#tor-exit-nodes"
              >Learn more about Tor exit nodes on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>is_residential_proxy</td>
        <td>boolean</td>
        <td>
          <p>
            1 if the IP address is on a suspected anonymizing network and
            belongs to a residential ISP (does not include peer-to-peer proxy
            IPs). Blank if not.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#residential-proxies"
              >Learn more about residential proxies on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>provider_name</td>
        <td>string</td>
        <td>
          <p>
            The name of the VPN provider (e.g., <code>nordvpn</code>,
            <code>surfshark</code>) associated with the network.
          </p>
          <p>
            Please note that MaxMind identifies a subset of VPN providers. A
            current list of VPN providers identified in the IP Risk database is
            available on request.
          </p>
        </td>
      </tr>

      <tr>
        <td>anonymizer_confidence</td>
        <td>integer</td>
        <td>
          <p>
            A score ranging from 1 to 99 that is our percent confidence that the
            network is currently part of an actively used VPN service.
          </p>
          <p>
            Currently we will only provide values of 30 and 99, but the number
            of values will increase as we improve our confidence ratings.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
              >Learn more about anonymizer confidence on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>network_last_seen</td>
        <td>string</td>
        <td>
          <p>
            The last day that the network was sighted in our analysis of
            anonymized networks. This is in the ISO 8601 date format
            (YYYY-MM-DD).
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
              >Learn more about anonymizer and proxy detection on our Knowledge
              Base.</a
            >
          </p>
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

- [GeoIP2-IP-Risk-CSV_Example.zip](/examples/GeoIP2-IP-Risk-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP2-IP-Risk-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-IP-Risk-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Changes

{{< database-changes product="IP Risk" >}}
