---
draft: false
title: GeoIP2 Connection Type Databases
---

Determine the connection type of your visitors based on their IP address. The
database identifies cellular, cable/DSL, and corporate connection speeds.

To learn more about the GeoIP2 Connection Type database, including terms and
pricing, please
[visit the GeoIP2 Connection Type Database page](https://www.maxmind.com/en/geoip2-connection-type-database).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

{{< table >}}
| Language or Framework | Documentation                                                                      | Example                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| .NET (C#)             | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-dotnet#database-usage) | [Connection Type Example](https://github.com/maxmind/GeoIP2-dotnet#connection-type-database) |
| Java                  | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-java#database-usage)   | [Connection Type Example](https://github.com/maxmind/GeoIP2-java#connection-type)            |
| Node.js               | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-node#database-usage)   | [Connection Type Example](https://github.com/maxmind/GeoIP2-node#connection-type-example)    |
| PHP                   | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-php#database-reader)  | [Connection Type Example](https://github.com/maxmind/GeoIP2-php#connection-type-example)     |
| Python                | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-python#database-usage) | [Connection Type Example](https://github.com/maxmind/GeoIP2-python#connection-type-database) |
| Ruby                  | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-ruby#database-reader) | [Connection Type Example](https://github.com/maxmind/GeoIP2-ruby#connection-type-example)    |
{{</ table >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Connection-Type" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Connection-Type-Blocks-IPv4.csv` and
`GeoIP2-Connection-Type-Blocks-IPv6.csv` respectively.

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
        <td>network</td>
        <td>IP network as a string</td>
        <td>
          This is the IPv4 or IPv6 network in CIDR format such as
          “2.21.92.0/29” or “2001:4b0::/80”. We offer a utility to convert
          this column to start/end IPs or start/end integers. See <a
          href="#conversion-utility">the conversion utility section</a> for
          details.
        </td>
    </tr>

    <tr>
        <td>connection_type</td>
        <td>string</td>
        <td>
          One of the following values: <code>Cable/DSL</code>, <code>Cellular</code>, <code>Corporate</code>, or
          <code>Satellite</code>. Additional values may be added in the future.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN988THBX8RVERNTZ12BY2EC">Learn more about connection type data on our Knowledge Base.</a>
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

We maintain examples of the CSV files as they would be downloaded from the account portal:

* [GeoIP2-Connection-Type-CSV\_Example.zip](/static/GeoIP2-Connection-Type-CSV_Example.zip)

### MMDB Example Files

We maintain test MMDB files on GitHub:

* [GeoIP2-Connection-Type-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Connection-Type-Test.mmdb)

Alternatively, you can [view all of our MMDB test data on GitHub](https://github.com/maxmind/MaxMind-DB/tree/main/test-data).

## Database Changes

{{< database-changes product="Connection Type" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
