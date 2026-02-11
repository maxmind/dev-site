---
draft: false
title: GeoIP Anonymous Plus binary database fields
---

The GeoIP Anonymous Plus binary database contains the following fields for each
network.

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
        <td>anonymizer_confidence</td>
        <td>uint16</td>
        <td>
          A score ranging from 1 to 99 that represents our percent confidence
          that the network is currently part of an actively used VPN service.
          <br />
          Currently, we will only provide values of 30 and 99, but the number of
          values will increase as we improve our confidence ratings.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
            >Learn more about anonymizer confidence on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_anonymous</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the IP address belongs to any sort of
          anonymous network.
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
          This is <code>true</code> if the IP address is registered to an
          anonymous VPN provider. If a VPN provider does not register subnets
          under names associated with them, we will likely only flag their IP
          ranges using the <code>is_hosting_provider</code> flag.
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
          This is <code>true</code> if the IP address belongs to a hosting or
          VPN provider (see description of the
          <code>is_anonymous_vpn</code> flag).
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
          This is <code>true</code> if the IP address belongs to a public proxy.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#public-proxies"
            >Learn more about public proxies on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_residential_proxy</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the IP address is on a suspected
          anonymizing network and belongs to a residential ISP (does not include
          peer-to-peer proxy IPs).
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#residential-proxies"
            >Learn more about residential proxies on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>is_tor_exit_node</td>
        <td>boolean</td>
        <td>
          This is <code>true</code> if the IP address is a Tor exit node.
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind#tor-exit-nodes"
            >Learn more about Tor exit nodes on our Knowledge Base.</a
          >
        </td>
      </tr>

      <tr>
        <td>network_last_seen</td>
        <td>string</td>
        <td>
          The last day that the network was sighted in our analysis of
          anonymized networks. This is in the ISO 8601 date format (YYYY-MM-DD).
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
            >Learn more about anonymizer and proxy detection on our Knowledge
            Base.</a
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
          <br />
          <a
            href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
            >Learn more about VPN provider detection on our Knowledge Base.</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
