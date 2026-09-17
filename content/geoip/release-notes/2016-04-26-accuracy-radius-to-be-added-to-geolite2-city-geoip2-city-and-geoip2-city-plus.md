+++
title = 'Accuracy radius to be added to GeoLite2 City, GeoIP2 City, and GeoIP2 City Plus'
date = 2016-04-26T16:00:00Z
draft = false
legacy_anchor = 'accuracy-radius-to-be-added-to-geolite2-city-geoip2-city-and-geoip2-city-plus'
+++

MaxMind will be adding accuracy radius to the GeoLite2 City and GeoIP2 City
databases as well as the GeoIP2 City Plus web service.

The Accuracy Radius is an indication in kilometers of geolocation accuracy for
the latitude and longitude coordinates we return for an IP address. The actual
location of the IP address is likely within the area defined by this radius and
the latitude and longitude coordinates.

As a reminder, the latitude and longitude coordinates we return for a given IP
address are near either the population or geographic center of the most granular
location data we return for that IP address (i.e., country, region/state, city,
or postal code) and should not be used to identify a particular address or
household.

For the binary databases and web service, this field will be available at
`/location/accuracy_radius`. All official
[GeoIP2 client APIs](/geoip/geolocate-an-ip/databases/#apis-and-third-party-integrations)
already support this field.

**For the CSV databases, a new `accuracy_radius` column will be added to the end
of the IPv4 and IPv6 blocks files. Please test your integration to ensure
compatibility before updating.** You may test your integration by downloading
the [latest copy](/geoip/geolite2-free-geolocation-data/) of the GeoLite2 CSV
database, which already has the accuracy_radius column appended.

Target availability dates:

- GeoLite2 City – May 3, 2016
- GeoIP2 City – May 17, 2016
- GeoIP2 City Plus – May 19, 2016
