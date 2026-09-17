+++
title = 'Updates to geolocation confidence factors'
date = 2026-03-23T16:00:00Z
draft = false
legacy_anchor = 'updates-to-geolocation-confidence-factors'
[build]
  list = 'never'
+++

Starting tomorrow, Tuesday, March 24 2026, we're deploying updates to our
geolocation confidence factors to make them more accurate.

For networks located outside of the United States, we will be adjusting country
level confidence to be higher in circumstances where those networks are used
exclusively in a single country.

For all networks, we will be improving the accuracy of our subdivision, city,
and postal confidence. These will be minor changes. Most significantly, some
subdivision confidence values of 99 will be reduced to 95.

The following products and services will be improved:

- minFraud Insights web services
- minFraud Factors web services
- GeoIP Insights web service
- GeoIP Enterprise database
