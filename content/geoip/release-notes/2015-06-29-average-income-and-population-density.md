+++
title = 'Average Income and Population Density'
date = 2015-06-29T16:00:00Z
draft = false
legacy_anchor = 'average-income-and-population-density'
+++

GeoIP2 Insights web service now offers `average_income` and `population_density`
fields within the `location` response. `average_income` represents the weighted
average income in US dollars per person for the zip code(s) associated with the
IP address. `population_density` represents the weighted population per square
kilometer for the zip code(s) associated with the IP address. Note that these
fields are returned for IP addresses located in the US only. These new fields
are documented in the
[GeoIP2 web services API documentation.](/geoip/docs/web-services)
