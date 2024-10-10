---
draft: false
title: GeoLite Free Geolocation Data
---

GeoLite databases are free IP geolocation databases comparable to, but less
accurate than,
[MaxMind’s GeoIP databases](https://www.maxmind.com/en/geoip2-databases). The
[GeoLite Country and City databases](/static/pdf/GeoLite2-IP-MetaData-Databases-Comparison-Chart.pdf)
are updated twice weekly, every Tuesday and Friday. The GeoLite ASN database is
updated daily. GeoLite data is also available as a web service in the
[GeoLite Country and GeoLite City web services](/static/pdf/GeoLite2-and-GeoIP2-Precision-Web-Services-Comparison.pdf).
Users of the GeoLite web services are limited to 1000 IP address lookups per
service per day.

## Accessing GeoLite Free Geolocation Data

You will need a free GeoLite account to download the GeoLite databases or to
query the GeoLite web services.

{{< link-group/container >}}
  {{< link-group/card heading="Sign Up for GeoLite" href="https://www.maxmind.com/en/geolite2/signup" >}}
    Receive download access to GeoLite databases or query access to GeoLite web services at no charge.
  {{</ link-group/card >}}
  {{< link-group/card heading="Generate a License Key" href="https://www.maxmind.com/en/accounts/current/license-key" >}}
    License keys are used to query the web services and authenticate the GeoIP Update program.
  {{</ link-group/card >}}
{{</ link-group/container >}}

From the side menu in your account portal, you can select
[“Download Files”](https://www.maxmind.com/en/accounts/current/geoip/downloads)
to download GeoLite databases in binary or CSV format. You can select
[“Manage License Keys”](https://www.maxmind.com/en/accounts/current/license-key)
to generate a license key, which can be used to automate GeoLite binary
database downloads with the
[GeoIP Update](/geoip/updating-databases/#using-geoip-update) program or query
the web services.

For more information about using GeoLite, see our
[section on integration](#integration) below.

You may also be interested in our testing and integrations guides for our
[geolocation databases](https://support.maxmind.com/hc/en-us/articles/4408216183835-Test-Databases-and-Lookup-IPs)
and
[web services](https://support.maxmind.com/hc/en-us/articles/4408248793627-Test-the-Web-Services)
on our knowledge base.

You can also access GeoLite data through the
[Snowflake Marketplace](app.snowflake.com/maxmind-test). If you do not have an
existing Snowflake account, you will need to create one before requesting access
to the GeoLite databases. Once approved, you will be able to query GeoLite data
within Snowflake.

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

You can compare accuracy of the GeoLite data and MaxMind's paid GeoIP products
by selecting a country on our
[GeoIP City Accuracy page](https://www.maxmind.com/en/geoip2-city-accuracy-comparison).

## Integration

GeoLite databases and web services use nearly the same integration steps as our
paid GeoIP databases and web services. In fact, our client API libraries can be
used for both GeoIP and GeoLite products, making transitioning from the free
GeoLite product line to the paid GeoIP product line extremely easy.

[Learn more about upgrading from GeoLite to GeoIP on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4407625342875-Upgrade-from-GeoLite2)

### Databases

See our
[Database Documentation page](/geoip/docs/databases#official-client-apis) for a
list of available APIs. GeoIP APIs may be used with GeoLite binary databases
(MMDB). You can also use the
[GeoIP Update program](/geoip/updating-databases/#using-geoip-update) to
automatically keep your GeoLite binary format databases up to date.

GeoLite CSV databases are released in the same basic format as our
[GeoIP CSV databases](/geoip/docs/databases/city-and-country#csv-databases),
but they may contain fewer data points. To support a seamless upgrade to GeoIP,
and to allow the GeoIP databases to continue to be drop-in replacements for
GeoLite database, GeoLite CSV databases include the Anycast field as a data
point. This field is left intentionally blank and will not be populated in
GeoLite CSV databases.

### Web services

See our
[Web Services Documentation page](/geoip/docs/web-services#official-client-apis)
for a list of available web service APIs. GeoIP web service APIs may be used
with the GeoLite web services by changing the hostname to the appropriate
[GeoLite web service URI](/geoip/docs/web-services/requests#geolite2-endpoints).
Using the wrong host will result in a permission error.

You can also review our brief tutorial on
[how to integrate the GeoLite City web service using PHP on our blog](https://blog.maxmind.com/2021/01/integrating-maxminds-free-and-paid-ip-geolocation-web-services-in-php/).

## License

The
[GeoLite end-user license agreement](https://www.maxmind.com/en/geolite2/eula)
incorporates components of the
[Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).
The attribution requirement may be met by including the following in all
advertising and documentation mentioning features of or use of GeoLite data:

```html
This product includes GeoLite data created by MaxMind, available from
<a href="https://www.maxmind.com">https://www.maxmind.com</a>.
```

## Support

MaxMind does not provide official support for the free GeoLite web services or
databases. If you have questions about the GeoLite web services or databases,
or GeoIP APIs, please see
[stackoverflow’s GeoIP questions and answers](https://stackoverflow.com/questions/tagged/geoip)
or the
[GeoIP and GeoLite section of our knowledge base](https://support.maxmind.com/hc/en-us/categories/1260801446650-GeoIP2-and-GeoLite2).

## GeoLite Commercial Redistribution

We also offer redistribution licenses for GeoLite databases that allow you to
package the databases with your commercial products without the need for
attribution. For more information, please
[visit the GeoLite Commercial Redistribution page](https://www.maxmind.com/en/geolite2-commercial-redistribution).

## Earn a Commission with Your Integration

If you’re using GeoLite data to develop an integration or application for IP
geolocation, you may wish to become a MaxMind developer affiliate and add
compatibility with our paid GeoIP databases or web services.

MaxMind developer affiliates can earn a 10% commission on all qualified
purchases by new customers referred to MaxMind. You can build your plugin
packaged with GeoLite data, and offer your users a way to sign up with MaxMind
to get our more accurate, paid IP geolocation data.

You can
[learn more about the MaxMind affiliate program for developers on our Knowledge Base](https://support.maxmind.com/hc/en-us/sections/5066199198619-Affiliate-Program).
