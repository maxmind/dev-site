---
draft: false
title: Testing GeoIP Web Services in the MaxMind Sandbox
---

{{< snippet "snippets/sandbox-intro.md" >}}

## Generate a License Key for the Sandbox

{{< snippet "snippets/sandbox-license-key.md" >}}

## Build your integration

Consult our [quick start guide](/geoip/geolocate-an-ip/web-services) or our
[list of client APIs](/geoip/geolocate-an-ip/web-services#client-apis) to
develop your integration.

## Point your integration to the Sandbox service endpoints

Use the service endpoints for the Sandbox version of the web services, as listed
in the table below:

| Sandbox Service | HTTP Method | Endpoint                                                       |
| --------------- | ----------- | -------------------------------------------------------------- |
| Country         | `GET`       | `https://sandbox.maxmind.com/geoip/v2.1/country/{ip_address}`  |
| City Plus       | `GET`       | `https://sandbox.maxmind.com/geoip/v2.1/city/{ip_address}`     |
| Insights        | `GET`       | `https://sandbox.maxmind.com/geoip/v2.1/insights/{ip_address}` |

Remember to use the license key generated by your Sandbox account to
authenticate your requests.

## Test Data for the GeoIP Sandbox

{{< alert info >}}
The Sandbox will return geolocation and IP intelligence data, but this data is
not accurate and should not be used to evaluate the efficacy of the minFraud
scoring engine, or for geolocation or IP intelligence. It is designed for
testing purposes only.
{{</ alert >}}

There are a limited number of IP addresses in the test database for the GeoIP
web services on the Sandbox. The Sandbox versions of the GeoIP web services use
[special test data that is published to GitHub](https://github.com/maxmind/MaxMind-DB/blob/main/source-data/).

If you attempt to submit an IP address that doesn't exist in the test data, you
will receive an error stating that the IP address does not exist in our
database.

The test data is displayed in JSON format, and would be the expected response
for a query using the listed IP address.
[Learn more about working with our GeoIP test data on our Knowledge Base.](https://support.maxmind.com/hc/en-us/articles/8610782760731-Sandbox-for-the-GeoIP-Web-Services#h_01GC7FJGRWC116ZCDPAJP09V9M)

{{< snippet "snippets/sandbox-limits.md" >}}

## Learn more about the MaxMind Sandbox

{{< snippet "snippets/sandbox-learn-more.md" >}}
