---
draft: false
title: GeoIP ISP binary database fields
---

The GeoIP ISP binary database contains the following fields for each network.

{{< rawhtml >}}

<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Data field name</th>
        <th>Type</th>
        <th>Data field description</th>
      </tr>

      <tr>
        <td>autonomous_system_number</td>
        <td>uint32</td>
        <td>
          <p>
            The
            <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)"
              >autonomous system</a
            >
            number associated with the IP address.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
              >Learn more about autonomous system data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>
          <p>
            The organization associated with the registered autonomous system
            number for the IP address.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#autonomous-system-data"
              >Learn more about autonomous system data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>isp</td>
        <td>string</td>
        <td>
          <p>The name of the ISP associated with the IP address.</p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data"
              >Learn more about ISP data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>mobile_country_code</td>
        <td>string</td>
        <td>
          <p>
            The
            <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
              >mobile country code (MCC)</a
            >
            associated with the IP address and ISP.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes"
              >Learn more about mobile country codes on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>mobile_network_code</td>
        <td>string</td>
        <td>
          <p>
            The
            <a href="https://en.wikipedia.org/wiki/Mobile_country_code"
              >mobile network code (MNC)</a
            >
            associated with the IP address and ISP.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#mobile-codes"
              >Learn more about mobile network codes on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>

      <tr>
        <td>organization</td>
        <td>string</td>
        <td>
          <p>The name of the organization associated with the IP address.</p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#isp-org-data"
              >Learn more about organization data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
