---
draft: false
title: GeoIP Static IP Score binary database fields
---

The GeoIP Static IP Score binary database contains the following fields for each
network.

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
        <td>score</td>
        <td>double</td>
        <td>
          <p>
            An indicator of how static or dynamic an IP address is. The value
            ranges from 0 to 99.99 with higher values meaning a greater static
            association. For example, many IP addresses with a
            <code>user_type</code> of <code>cellular</code> have a score under
            1. Broadband IPs that don't change very often typically have a score
            above 30.
          </p>
          <p>
            This indicator can be useful for deciding whether an IP address
            represents the same user over time.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-user-context-data#static-ip-scoring"
              >Learn more about the static IP score on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
