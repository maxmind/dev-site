+++
title = 'Update to minimum accuracy_radius value'
date = 2021-09-23T16:00:00Z
draft = false
legacy_anchor = 'update-to-minimum-accuracy_radius-value'
[build]
  list = 'never'
+++

Effective October 4, 2021, the minimum accuracy radius value will be 5km across
our city/postal-level geolocation products and services. Previously, the minimum
accuracy radius value was 1km. This change applies to the following products and
services:

- GeoIP City database
- GeoLite City database
- GeoIP Enterprise database
- GeoIP City Plus web service
- GeoIP Insights web service
- minFraud Insights and Factors web services

We are making this change in order to ensure it is clear that IP geolocation
should not be used to identify a particular street address or household.
