+++
title = 'Updated postal codes for some cities in Portugal'
date = 2024-08-12T15:00:00Z
draft = false
legacy_anchor = 'updated-postal-codes-for-some-cities-in-portugal'
+++

We are updating postal code data for the following major cities in Portugal:

- `Amadora`
- `Porto`
- `Vila Nova De Gaia`

When an IP address is geolocated to any of these cities, the last three digits
of the postal code will be set to `001`. This change will be implemented over
time, with some networks being updated starting on Tuesday, August 13, 2024, and
more networks to follow.

The last three digits of postal codes are used in larger cities to provide
geolocation information that is more specific than our underlying data allows
for, so these digits will be set to `001`. In more rural areas, the last three
digits will be maintained.

The changes will be reflected in the following products and services:

- GeoIP Enterprise database
- GeoIP City database
- GeoIP Insights web service
- GeoIP City Plus web service
- minFraud Insights web service
- minFraud Factors web service
- GeoLite City database
- GeoLite City web service
