---
draft: false
title: GeoIP Anonymous IP binary database fields
---

The GeoIP Anonymous IP binary database contains the following fields for each
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
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
