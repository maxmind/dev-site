---
draft: false
title: GeoIP Connection Type binary database fields
---

The GeoIP Connection Type binary database contains the following fields for each
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
        <td>connection_type</td>
        <td>string</td>
        <td>
          <p>
            One of the following values: <code>Cable/DSL</code>,
            <code>Cellular</code>, <code>Corporate</code>, or
            <code>Satellite</code>. Additional values may be added in the
            future.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/maxmind-ip-network-data#connection-type-data"
              >Learn more about connection type data on our Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
