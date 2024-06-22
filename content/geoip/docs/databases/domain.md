---
draft: false
title: GeoIP2 Domain Databases
---

Look up the second level domain names associated with IPv4 and IPv6 addresses.

To learn more about the GeoIP2 Domain database, including terms and pricing,
please
[visit the GeoIP2 Domain Database page](https://www.maxmind.com/en/geoip2-domain-name-database).

{{< snippet "snippets/data-privacy-warning.md" >}}

## Binary Database

{{< snippet "snippets/binary-databases.md" >}}

{{< table >}}
| Language or Framework | Documentation                                                                      | Example                                                                    |
| --------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| .NET (C#)             | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-dotnet#database-usage) | [Domain Example](https://github.com/maxmind/GeoIP2-dotnet#domain-database) |
| Java                  | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-java#database-usage)   | [Domain Example](https://github.com/maxmind/GeoIP2-java#domain)            |
| Node.js               | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-node#database-usage)   | [Domain Example](https://github.com/maxmind/GeoIP2-node#domain-example)    |
| PHP                   | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-php#database-reader)  | [Domain Example](https://github.com/maxmind/GeoIP2-php#domain-example)     |
| Python                | [GitHub - Database Usage](https://github.com/maxmind/GeoIP2-python#database-usage) | [Domain Example](https://github.com/maxmind/GeoIP2-python#domain-database) |
| Ruby                  | [GitHub - Database Reader](https://github.com/maxmind/GeoIP2-ruby#database-reader) | [Domain Example](https://github.com/maxmind/GeoIP2-ruby#domain-example)    |
{{</ table >}}

## CSV Database

{{< snippet "snippets/csv-databases-intro.md" >}}

{{< zip-file-content product-name="GeoIP2-Domain" >}}

{{< snippet "snippets/file-format.md" >}}

### Blocks Files

There are two CSV files for network blocks, one each for IPv4 and IPv6 blocks.
These are named `GeoIP2-Domain-Blocks-IPv4.csv` and
`GeoIP2-Domain-Blocks-IPv6.csv` respectively.

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
        <td>domain</td>
        <td>string</td>
        <td>
          The domain associated with the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN98A5BNTS0GGWTD2QA4AHXN" target="_blank" rel="nofollow noopener noreferrer">Learn more about domain name data on our Knowledge Base.</a>
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

* [GeoIP2-Domain-CSV\_Example.zip](/static/GeoIP2-Domain-Example.zip)

### MMDB Example Files

We maintain test MMDB files on GitHub:

* [GeoIP2-Domain-Test.mmdb](https://github.com/maxmind/MaxMind-DB/blob/main/test-data/GeoIP2-Domain-Test.mmdb)

Alternatively, you can [view all of our MMDB test data on GitHub](https://github.com/maxmind/MaxMind-DB/tree/main/test-data).

## Database Sizes

<DatabaseSizes dateRange = 'March to June 2024' databaseChanges ={[
    {
       databaseName: 'GeoIP Domain',
       csvSizeRange: '17.44 MB - 17.87 MB',
       mmdbSizeRange: '9.96 MB - 10.3 MB',
       ipv4Range: '502,000 - 508,000',
       ipv6Range: '97,000 - 107,000'
    }
  ]}
/>

## Database Changes

{{< database-changes product="Domain" >}}

## APIs and Third-Party Integrations

{{< snippet "snippets/geoip-db-apis.md" >}}
