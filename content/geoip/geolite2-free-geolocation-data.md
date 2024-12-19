---
draft: false
title: GeoLite Databases and Web Services
---
MaxMind offers a free geolocation and ASN data in downloadable database and web service formats. 

{{< link-group/container >}}
  {{< link-group/card heading="Sign Up for GeoLite" href="https://www.maxmind.com/en/geolite2/signup" >}}
    Start building today with GeoLite databases and web services.
  {{</ link-group/card >}}
  {{< link-group/card heading="Explore GeoLite" href="https://www.maxmind.com/en/geolite-free-ip-geolocation-data" >}}
    Learn more about what you can do with GeoLite, and view redistribution options.
  {{</ link-group/card >}}
{{</ link-group/container >}}

Find what you need: 
* [Understanding IP geolocation](#understanding-ip-geolocation)
* [Integration](#integrating-geolite-databases-and-web-services)
* [Generating a license key to authenticate GeoLite](#generate-a-license-key-to-authenticate-geolite-database-downloads-and-web-service-requests)
* [GeoLite database formats](#decide-how-you-want-to-use-geolite-databases)
* [Automate database downloads and updates](#automate-database-downloads-and-updates)
* [Look up IP addresses in the GeoLite databases and web services](#look-up-ip-addresses-in-the-geolite-databases)
* [Database fields](#geolite-database-fields)
* [Web service fields](#geolite-web-service-fields)
* [Resources for working with GeoLite](#resources-for-working-with-geolite)

## Understanding IP geolocation
IP geolocation is inherently imprecise. Locations in MaxMind’s data are often near population centers. Any location provided by GeoLite or GeoIP® should not be used to identify a particular address or household.

Some IP addresses cannot be geolocated as precisely as others. Almost all IP addresses will have at least a country associated with them, but some will not have a region or city, and many will not have a postal code.

GeoLite City and paid GeoIP City data return a geolocation area rather than a point on a map. A geolocation area is a circle defined by latitude, longitude, and an accuracy radius, which ranges from a few kilometers to 1000 kilometers.

You should build your applications with this accuracy radius in mind to avoid confusing results. For example, an IP address which can only be geolocated to a country will return a latitude and longitude near the center of that country, with a very large accuracy radius. If you do not account for the accuracy radius, it may appear as if many IP addresses are geolocated to a specific place in the center of the country.

[Learn more about MaxMind’s geolocation area data on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4414877149467-IP-Geolocation-Data#h_01FRRHZZP6RAYSNZTYE4MQ3MWY)

## Integrating GeoLite databases and web services
GeoLite databases and web services use the same integration methods as our GeoIP databases and web services. To quickly get started, follow these steps.

Want to work with GeoLite on Snowflake? [Get GeoLite directly through the Snowflake marketplace](https://app.snowflake.com/marketplace/providers/GZ2FTZ5POF7/MaxMind) (Snowflake account required).

### Sign up for a MaxMind account to get GeoLite
Read more about GeoLite, its attribution requirements and applicable use cases, and how to sign up.

[Get started on our GeoLite page.](https://www.maxmind.com/en/geolite-free-ip-geolocation-data)

### Generate a license key to authenticate GeoLite database downloads and web service requests

A license key is like a password used to authenticate database downloads or web service requests. After you have a MaxMind account, you should generate one or more license keys. Some people use different license keys for different servers or use cases.

[Learn how to generate license keys on our Knowledge Base](https://support.maxmind.com/hc/en-us/articles/4407111582235-Generate-a-License-Key), or [go directly to your account portal to generate a new license key](https://www.maxmind.com/en/accounts/current/license-key).

{{< alert warning >}}
Working with the web services instead of the databases? Skip to the [instructions on using the web services below.](#look-up-ip-addresses-in-the-geolite-web-services)
{{</ alert >}}

### Decide how you want to use GeoLite databases

MaxMind provides databases in two formats: 
* a binary (.mmdb) format optimized for fast lookups at scale
* a comma separated values (.csv) format that’s good for manipulating, joining, and transforming the data

If you’re making a web application that needs to perform lookups quickly and at high volume, you should use the binary mmdb format.

If you’re bringing GeoLite data into an existing database structure or application, you should use the csv format.

If you’re working with an existing plugin or integration, check which format that plugin uses.

### Automate database downloads and updates

{{< alert warning >}}
Please note that GeoLite users are limited to 30 database downloads per day. If you need to download more, please [upgrade to GeoIP](https://www.maxmind.com/en/geoip-databases).
{{</ alert >}}

The GeoLite End User License Agreement requires all GeoLite users to keep their data up- to-date. This means you must delete GeoLite databases within 30 days of a new release. The easiest way to keep your GeoLite data up-to-date is to automate downloads and updates.

The method for updating the GeoLite databases depends on the database format you’re using. To help you decide which database format to use, [see the section above](#decide-how-you-want-to-use-geolite-databases).

* [Learn how to update the binary database format for fast lookups at scale.](https://dev.maxmind.com/geoip/updating-databases/#using-geoip-update)
* [Learn how to update the csv database format to join the data or import into SQL.](https://dev.maxmind.com/geoip/updating-databases/#directly-downloading-databases)

### Look up IP addresses in the GeoLite databases
The method you use to look up IP addresses in the GeoLite databases will depend on the database format you’re using and what you’re using it for. To help you decide which database format to use, [see this section above](#decide-how-you-want-to-use-geolite-databases).

* [Use MaxMind’s client APIs to look up IP addresses in the binary databases for fast lookups at scale.](https://dev.maxmind.com/geoip/geolocate-an-ip/databases/)
* [Learn how to import the csv format databases into MySQL or PostgreSQL.](https://dev.maxmind.com/geoip/importing-databases/)
* If you’re using GeoLite in a plugin or application, check the installation instructions for your plugin.

### Look up IP addresses in the GeoLite web services

{{< alert warning >}}
Please note that GeoLite web service users are limited to 1000 lookups per day per service. If you need to do more lookups, please [upgrade to GeoIP](https://www.maxmind.com/en/geoip-databases).
{{</ alert >}}

MaxMind maintains client APIs in many popular languages to help you look up IP addresses in our web services quickly and easily.

[Learn how to look up IP addresses in our web services.](https://dev.maxmind.com/geoip/geolocate-an-ip/web-services/)

MaxMind web services do support a client-side JavaScript lookup, but only for the paid GeoIP web services. [Learn more about client-side JavaScript lookups using the GeoIP web services](https://dev.maxmind.com/geoip/geolocate-an-ip/client-side-javascript/), and [upgrade to GeoIP](https://www.maxmind.com/en/geoip-api-web-services).

## GeoLite database fields

MaxMind provides three different GeoLite databases. Click each link for documentation of all available database fields, client APIs, and sample files.

Fields marked as available in Country will be available in the GeoLite Country database, except as noted in the field description. Fields marked as available in City will be available in the GeoLite City database, except as noted in the field description. 

{{< rawhtml >}}
<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Database</th>
        <th>Use case</th>
      </tr>
      <tr>
        <td><p><a href="https://dev.maxmind.com/geoip/docs/databases/city-and-country/">GeoLite Country database</a></p>
        <p> * Some fields listed in this documentation are not present in GeoLite. Check the description of the fields.</p></td>
        <td>Geolocation at the country-level for analytics, content customization, or compliance use cases in territories that are not disputed.</td>
      </tr>
      <tr>
        <td><p><a href="https://dev.maxmind.com/geoip/docs/databases/city-and-country/">GeoLite City database</a></p>* Some fields listed in this documentation are not present in GeoLite. Check the description of the fields.</p></td>
        <td><p>Geolocation down to the city or postal code for analytics and content customization.</p>
<p><strong>Please note</strong>: The free GeoLite City is considerably less accurate than the paid GeoIP City data, and is not recommended for commercial use cases.</p></td>
</tr>
 <tr>
<td><a href="https://dev.maxmind.com/geoip/docs/databases/asn/">GeoLite ASN database</a></td>
        <td>Provides the autonomous system number and organization for IP addresses for analytics.</td>
      </tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## GeoLite web service fields
MaxMind provides two different GeoLite web services. Click each link for documentation of all available data that can be returned in each service.

Fields marked as available in the GeoIP Country web service will be available in GeoLite Country web service, except as noted in the field description. Fields marked as available in the GeoIP City web service will be available in the GeoLite City web service, except as noted in the field description. 

{{< rawhtml >}}
<div class="table">
  <table>
    <tbody>
      <tr>
        <th>Web service</th>
        <th>Use case</th>
      </tr>
      <tr>
        <td><p><a href="https://c67362b6.dev-site-4ua.pages.dev/geoip/docs/web-services/#geolite2-country">GeoLite Country web service</a> </p> 
        <p>* Some fields listed in this documentation are not present in GeoLite. Check the description of the fields.</p></td>
        <td>Geolocation at the country-level for analytics, content customization, or compliance use cases in territories that are not disputed.</td>
      </tr>
      <tr>
        <td><p><a href="https://c67362b6.dev-site-4ua.pages.dev/geoip/docs/web-services/#geolite2-city">GeoLite City web service</a> </p>
        <p>* Some fields listed in this documentation are not present in GeoLite. Check the description of the fields.</p></td>
        <td><p>Geolocation down to the city or postal code for analytics and content customization. Also includes the autonomous system number and autonomous system organization.</p>
<p> <strong>Please note</strong>: The free GeoLite City is considerably less accurate than the paid GeoIP City data, and is not recommended for commercial use cases.</p> </td>
</tr>
    </tbody>
  </table>
</div>
{{</ rawhtml >}}

## Resources for working with GeoLite

Please note that MaxMind does not provide support for our GeoLite databases and web services. You can use the resources below to learn more about working with IP geolocation data in general and GeoLite in particular.

### What are you permitted to do with GeoLite?

Get resources for licensing and partnership around GeoLite data:
* [Learn about the GeoLite End User License Agreement on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408936666523-Who-is-Covered-by-the-GeoLite2-End-User-License-Agreement)
* [Learn how you are permitted to use GeoLite data in products or services on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/4408936690075-Sell-or-Display-Data-from-GeoLite2-Databases-and-Web-Services)
* [Learn more about MaxMind’s Affiliate Program for developers.](https://www.maxmind.com/en/affiliate-program)

### How does IP geolocation work?

Get resources for understanding the benefits and limitations of IP geolocation and how MaxMind keeps its data safe and in line with privacy-by-design principles:

* [“How accurate is IP geolocation?” on the MaxMind blog](https://blog.maxmind.com/2021/07/how-accurate-is-ip-geolocation/)
* [“Using MaxMind’s accuracy radius” on the MaxMind blog](https://blog.maxmind.com/2022/06/using-maxminds-accuracy-radius/)
* [“Safer IP geolocation with MaxMind” on the MaxMind blog](https://blog.maxmind.com/2023/08/safer-ip-geolocation/)

### What can I do with paid MaxMind data?

In addition to IP more accurate geolocation data, MaxMind has paid products that identify various attributes of an IP address, including:

* ISP name (e.g., AT&T Wireless, Amazon, etc.)
* connection type (e.g., Cellular, Satellite, etc.)
* domain name (e.g., google.com, microsoft.com, etc.)
* user type (e.g., business, residential, etc.)
* proxy identification (e.g., VPNs, Tor exit nodes, etc.)

[Learn more about MaxMind’s paid IP intelligence data.](https://www.maxmind.com/en/solutions/ip-geolocation-databases-api-services)

MaxMind also has a risk scoring web service for fraud prevention and security. [Learn more about minFraud.](https://www.maxmind.com/en/solutions/fraud-prevention/overview)


