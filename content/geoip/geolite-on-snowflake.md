---
draft: false
title: GeoLite on Snowflake
---

MaxMind offers our GeoLite data through the Snowflake Marketplace. If you do not
have an existing Snowflake account, you will need to create one before
requesting access to the GeoLite datasets. Once approved, you will be able to
query GeoLite data within Snowflake.

The GeoLite Country and City datasets are updated twice weekly, every Tuesday
and Friday. The GeoLite2 ASN dataset is updated daily.

## IP Geolocation Accuracy

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

## License

GeoLite data offered through the Snowflake Marketplace is subject to the
[MaxMind Services Terms of Use for the Snowflake Platform](https://www.maxmind.com/en/snowflake-geolite-terms-of-use).
Please note that this is different from the GeoLite2 end-user license agreement,
which governs the use of GeoLite databases and web services served directly from
MaxMind.

## Support

MaxMind does not provide official support for our free GeoLite dataset, but the
documentation for our data on Snowflake includes sample queries and important
information about how to use GeoLite on Snowflake.

For general questions about how to interpret specific GeoLite data points beyond
what is documented in Snowflake, please consult
[the appropriate section of the MaxMind Knowledge Base](https://support.maxmind.com/hc/en-us/articles/4414877149467-IP-Geolocation-Data).
