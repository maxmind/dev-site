+++
title = 'Change in default lat/lon'
date = 2016-04-11T16:00:00Z
draft = false
legacy_anchor = 'change-in-default-latlon'
+++

We are changing the latitude and longitude for two locations in our GeoIP and
GeoLite databases. For IPs in the United States that we are unable to locate to
a particular state or city, we will return 37.751, -97.822. For IPs that resolve
to Ashburn, Virginia with zip code 20147, we will return 39.018, -77.539. We
would like to remind customers that latitude and longitude values contained in
the GeoIP databases are not precise and should not be used to identify a
particular address or household.
