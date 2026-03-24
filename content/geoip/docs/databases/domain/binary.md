---
draft: false
title: GeoIP Domain binary database fields
---

The GeoIP Domain binary database contains the following fields for each network.

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
        <td>domain</td>
        <td>string</td>
        <td>
          <p>
            The second-level domain associated with the IP address. This will be
            something like <code>example.com</code> or
            <code>example.co.uk</code>, not <code>foo.example.com</code>.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#domain-name-data"
              >Learn more about domain name data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
