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
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>

      <tr>
        <td>domain</td>
        <td>string</td>
        <td>
          <p>
            The second-level domain associated with the IP address. This will be
            something like "example.com" or "example.co.uk", not
            "foo.example.com".
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
