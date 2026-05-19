---
draft: false
title: GeoIP Residential Proxy Databases
---

{{< alert warning >}} The GeoIP Residential Proxy database is under active
development. New fields are expected to be added. Please design your
integrations to expect new fields, and ensure you monitor updates to our
[GeoIP release notes](/geoip/release-notes) to get notifications about new
fields and changes to existing ones. {{</ alert >}}

MaxMind's GeoIP Residential Proxy database helps protect your business by
identifying IP addresses sighted in a residential proxy network. Residential
proxy networks use IP addresses commonly assigned to homes, small businesses,
and other end users of the internet to provide proxy access via compromised
devices. This feed includes confidence scores, timestamps, and residential
proxy provider names.

The GeoIP Residential Proxy database is included with a license for the
[GeoIP Anonymous Plus database](/geoip/docs/databases/anonymous-plus). If you
are interested in purchasing the database, please
[contact our Enterprise Business team](https://www.maxmind.com/en/solutions/connect-with-a-geoip-expert)
for assistance.

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

[Learn about the fields in the binary version of this database on our binary
database field reference page.](binary/)

### Looking up an IP

The `geoip2` Python client library does not yet ship model classes for this
database. Use the lower-level
[`maxminddb`](https://github.com/maxmind/MaxMind-DB-Reader-python) reader to
read records directly:

```python
import maxminddb

with maxminddb.open_database("GeoIP-Residential-Proxy.mmdb") as reader:
    record = reader.get("1.2.3.4")
    if record is not None:
        print(record["provider_name"])
        print(record["anonymizer_confidence"])
        print(record["network_last_seen"])
```

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP-Residential-Proxy" exclude-table="false" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP-Residential-Proxy-Blocks-IPv4.csv` and
`GeoIP-Residential-Proxy-Blocks-IPv6.csv` respectively.

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
        <td>network</td>
        <td>IP network as a string</td>
        <td>
          This is the IPv4 or IPv6 network in CIDR format such as "2.21.92.0/32"
          or "2001:4b0::/64". Due to the nature of residential proxies, this
          database contains mostly IPv4 /32s and IPv6 /64s. We offer a utility
          to convert this column to start/end IPs or start/end integers. See
          <a href="#conversion-utility">the conversion utility section</a> for
          details.
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
        </td>
      </tr>

      <tr>
        <td>anonymizer_confidence</td>
        <td>integer</td>
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

- [GeoIP-Residential-Proxy-CSV_Example.zip](/examples/GeoIP-Residential-Proxy-CSV_Example.zip)
  {{</ csv-example-files >}}

### MMDB Example Files

{{< mmdb-example-files >}}

- [GeoIP-Residential-Proxy-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP-Residential-Proxy-Test.mmdb)
  {{</ mmdb-example-files >}}

## Database Changes

{{< database-changes product="Residential Proxy" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
