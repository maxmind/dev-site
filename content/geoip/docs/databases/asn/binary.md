---
draft: false
title: GeoLite ASN binary database fields
---

The GeoLite ASN binary database contains the following fields for each network.

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
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
