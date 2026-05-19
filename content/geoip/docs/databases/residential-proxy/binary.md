---
draft: false
title: GeoIP Residential Proxy binary database fields
---

The GeoIP Residential Proxy binary database contains the following fields for each
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
        <td>anonymizer_confidence</td>
        <td>uint16</td>
        <td>
          <p>
            A score ranging from 1 to 99 that is our percent confidence that the
            network is currently part of an actively used residential proxy
            service. These scores are bucketed in 5% buckets, but 1 and 99 are
            also possible (1, 5, 10, 15, 20, 25, ... 99).
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

      <tr>
        <td>provider_name</td>
        <td>string</td>
        <td>
          <p>
            The name of the residential proxy provider associated with the
            network.
          </p>
          <p>
            Please note that MaxMind identifies a subset of residential proxy
            providers. A current list of providers identified in the Residential
            Proxy database is available on request.
          </p>
          <p>
            <a
              href="https://support.maxmind.com/knowledge-base/articles/anonymizer-and-proxy-data-maxmind"
              >Learn more about residential proxy provider detection on our
              Knowledge Base.</a
            >
          </p>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}
