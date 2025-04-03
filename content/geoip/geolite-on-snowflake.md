---
draft: false
title: GeoLite on Snowflake
---

MaxMind offers our GeoLite data through the [Snowflake Marketplace](https://app.snowflake.com/marketplace/providers/GZ2FTZ5POF7/MaxMind). If you do not
have an existing Snowflake account, you will need to create one before
requesting access to the GeoLite datasets. Once approved, you will be able to
query GeoLite data within Snowflake.

The GeoLite Country and City datasets are updated twice weekly, every Tuesday
and Friday. The GeoLite ASN dataset is updated daily.

## IP geolocation accuracy

{{< alert warning >}}
**IP Geolocation Usage**

IP geolocation is inherently imprecise. Locations are often near the center of
the population. Any location provided by a GeoIP database should not be used to
identify a particular address or household.

{{</ alert >}}

Use the Accuracy Radius as an indication of geolocation accuracy for the
latitude and longitude coordinates we return for an IP address. The actual
location of the IP address is likely within the area defined by this radius and
the latitude and longitude coordinates.

## GeoLite dataset

The GeoLite dataset contains geolocation and ASN data depending on the
particular dataset you are querying:

### Geolocation data

{{< csv-block-table isEnterprise="false" >}}

{{< snippet "snippets/coordinates-warning.md" >}}

{{< csv-location-table isEnterprise="false" >}}

### ASN data

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
          “2.21.92.0/29” or “2001:4b0::/80”.
        </td>
    </tr>

    <tr>
        <td>autonomous_system_number</td>
        <td>integer</td>
        <td>
          The <a href="https://en.wikipedia.org/wiki/Autonomous_system_(Internet)">autonomous system</a> number associated with the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW">Learn more about autonomous system data on our Knowledge Base.</a>
        </td>
    </tr>

    <tr>
        <td>autonomous_system_organization</td>
        <td>string</td>
        <td>
          The organization associated with the registered autonomous system
          number for the IP address.
          <br />
          <a href="https://support.maxmind.com/hc/en-us/articles/4408200231067-IP-Network-Data#h_01FN989WWSE56YD6AV4QSPSWDW">Learn more about autonomous system data on our Knowledge Base.</a>
        </td>
    </tr>

  </tbody>
</table>
</div>
{{</ rawhtml >}}

## License

GeoLite data offered through the Snowflake Marketplace is subject to the
[MaxMind Services Terms of Use for the Snowflake Platform](https://www.maxmind.com/en/snowflake-geolite-terms-of-use).
Please note that this is different from the GeoLite2 End User License Agreement,
which governs the use of GeoLite databases and web services served directly from
MaxMind.

## Support

MaxMind does not provide official support for our free GeoLite dataset, but the
documentation for our data on Snowflake includes sample queries and important
information about how to use GeoLite on Snowflake.

For general questions about how to interpret specific GeoLite data points beyond
what is documented in Snowflake, please consult
[the appropriate section of the MaxMind Knowledge Base](https://support.maxmind.com/hc/en-us/articles/4414877149467-IP-Geolocation-Data).
