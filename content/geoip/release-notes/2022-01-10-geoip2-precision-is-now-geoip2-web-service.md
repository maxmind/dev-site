+++
title = 'GeoIP2 Precision is now GeoIP2 web service'
date = 2022-01-10T15:00:00Z
draft = false
legacy_anchor = 'geoip2-precision-is-now-geoip2-web-service'
+++

We're dropping the "Precision" from our GeoIP2 web service names to make the
closest equivalent between our web services and databases clearer, and to make
it clear that IP geolocation is not precise enough to locate individuals or
street addresses.
[You can learn more about the accuracy and limitations to IP geolocation on our knowledge base.](https://support.maxmind.com/knowledge-base/articles/maxmind-geolocation-accuracy)

We are also renaming our city-level geolocation web service to be GeoIP2 City
Plus. We have added "Plus" to this web service to make it clearer that the
city-level geolocation web service also contains IP network data.
[You can see a list of all data points in the GeoIP2 City Plus web service on our main website.](https://www.maxmind.com/en/geoip-api-web-services)

Nothing has changed about how to use our web services, and no changes are
required to your current integration.

Our GeoIP2 web services will be renamed as follows:

| Old Name                              | New Name (Click for the Product Page on our Main Website)                         |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| GeoIP2 Precision Country web service  | [GeoIP2 Country web service](https://www.maxmind.com/en/geoip-api-web-services)   |
| GeoIP2 Precision City web service     | [GeoIP2 City Plus web service](https://www.maxmind.com/en/geoip-api-web-services) |
| GeoIP2 Precision Insights web service | [GeoIP2 Insights web service](https://www.maxmind.com/en/geoip-api-web-services)  |
